---
title: 'Lightweight Native Webviews for Bun and Node.js'
description: 'A lightweight library to create native desktop windows with embedded web content from Bun or Node.js -- no Electron required, now with Linux support.'
pubDate: 'Feb 18 2026'
heroImage: ./native-window.webp
tags: ['native-window', 'bun', 'typescript', 'desktop', 'webview']
---

While building [Elgato Stream Deck](https://www.elgato.com/stream-deck) plugins, I kept needing to open native windows from key presses -- for richer interaction beyond the small key UI. There's no built-in way to do this without Electron or signed external webview runtimes (see [comparison](https://nativewindow.fcannizzaro.com/comparison)).

So I built **native-window** -- a library that creates native OS windows with embedded web content directly from Bun or Node.js. It uses [wry](https://github.com/tauri-apps/wry) and [tao](https://github.com/tauri-apps/tao) (the libraries behind Tauri) for cross-platform support.

## What it is

[native-window](https://nativewindow.fcannizzaro.com) is a Rust [napi-rs](https://napi.rs) addon using platform-native webview engines -- WKWebView on macOS, WebKitGTK on Linux, WebView2 on Windows. No bundled Chromium.

```ts
import { NativeWindow } from "@fcannizzaro/native-window";

const win = new NativeWindow({
  title: "My App",
  width: 800,
  height: 600,
});

win.loadUrl("https://example.com");
win.onClose(() => process.exit(0));
```

## Key highlights

- **Cross-platform** -- native webview engines, no bundled browser
- **Typed IPC** -- schema-first messaging with compile-time type checking via Zod, Valibot, or any `safeParse()`-compatible library
- **React hooks** -- `useChannelEvent`, `useSend`, and `ChannelProvider` for idiomatic React integration
- **TanStack DB adapter** -- sync host-side data to reactive TanStack DB collections
- **Security built-in** -- host restriction, deny-by-default device permissions, popup blocking, schema validation, prototype pollution defenses

## Typed IPC in action

```ts
import { z } from "zod";
import { createWindow } from "@fcannizzaro/native-window-ipc";

const ch = createWindow(
  { title: "My App", width: 800, height: 600 },
  {
    schemas: {
      "user-click": z.object({ x: z.number(), y: z.number() }),
      "update-title": z.string(),
    },
  },
);

ch.send("update-title", "Hello!");
ch.on("user-click", (pos) => {
  console.log(`Click at ${pos.x}, ${pos.y}`);
});
```

## Packages

| Package | Description |
| --- | --- |
| `@fcannizzaro/native-window` | Core -- native window and webview APIs |
| `@fcannizzaro/native-window-ipc` | Typed IPC channel layer |
| `@fcannizzaro/native-window-ipc-react` | React hooks for typed IPC |
| `@fcannizzaro/native-window-tsdb` | TanStack DB collection adapter |

## Get started

```bash
bun add @fcannizzaro/native-window
```

Full documentation at [nativewindow.fcannizzaro.com](https://nativewindow.fcannizzaro.com).
