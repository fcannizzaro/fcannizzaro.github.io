---
title: 'Lightweight Native Webviews for Bun, Deno & Node.js'
description: 'A lightweight library to create native desktop windows with embedded web content from Bun, Deno & Node.js -- no Electron required, now with Linux support.'
pubDate: 'Feb 18 2026'
heroImage: ./native-window.webp
tags: ['native-window', 'bun', 'deno', 'typescript', 'desktop', 'webview']
---

While building [Elgato Stream Deck](https://www.elgato.com/stream-deck) plugins, I kept needing to open native windows from key presses -- for richer interaction beyond the small key UI. There's no built-in way to do this without Electron or signed external webview runtimes (see [comparison](https://nativewindow.fcannizzaro.com/comparison)).

So I built **native-window** -- a library that creates native OS windows with embedded web content directly from Bun, Deno & Node.js. It uses [wry](https://github.com/tauri-apps/wry) and [tao](https://github.com/tauri-apps/tao) (the libraries behind Tauri) for cross-platform support.

## What it is

[native-window](https://nativewindow.fcannizzaro.com) is a Rust [napi-rs](https://napi.rs) addon using platform-native webview engines -- WebKit on macOS and Linux, WebView2 on Windows. No bundled Chromium.

```ts
import { NativeWindow } from "@nativewindow/webview";

const win = new NativeWindow({
  title: "My App",
  width: 800,
  height: 600,
});

win.loadUrl("https://example.com");

win.onClose(() => {
  process.exit(0);
});
```

## Key highlights

- **Cross-platform** -- native webview engines, no bundled browser
- **Typed IPC** -- schema-first messaging with compile-time type checking via Zod, Valibot, or any `safeParse()`-compatible library
- **React hooks** -- `useChannelEvent`, `useSend`, and `ChannelProvider` for idiomatic React integration
- **TanStack DB adapter** -- sync host-side data to reactive TanStack DB collections
- **Security built-in** -- URL scheme blocking, CSP, trusted origin filtering, IPC bridge hardening, message size limits, schema validation

## Typed IPC in action

```ts
import { z } from "zod";
import { createWindow } from "@nativewindow/ipc";

const ch = createWindow(
  { title: "My App", width: 800, height: 600 },
  {
    schemas: {
      host: {
        "update-title": z.string(),
      },
      client: {
        "user-click": z.object({ x: z.number(), y: z.number() }),
      },
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
| `@nativewindow/webview` | Rust napi-rs addon providing native window + webview APIs |
| `@nativewindow/ipc` | Pure TypeScript typesafe IPC channel layer |
| `@nativewindow/react` | React bindings for the typed IPC layer |
| `@nativewindow/tsdb` | TanStack DB collection adapter for native-window IPC |

## Get started

```bash
bun add @nativewindow/webview
```

Full documentation at [nativewindow.fcannizzaro.com](https://nativewindow.fcannizzaro.com).
