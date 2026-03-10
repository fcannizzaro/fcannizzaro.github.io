---
name: native-window
description: Create native desktop windows with embedded web content from Bun, Deno & Node.js
url: https://nativewindow.fcannizzaro.com
repo: nativewindow/webview
language: TypeScript, Rust
featured: true
tags: [native-window, bun, deno, typescript, desktop, webview]
order: 0
status: beta
---

A Rust napi-rs addon built on [wry](https://github.com/tauri-apps/wry) and [tao](https://github.com/tauri-apps/tao) that uses platform-native webview engines -- WebKit on macOS and Linux, WebView2 on Windows -- to create real desktop windows with embedded web content from Bun, Deno & Node.js. No Electron or Chromium bundled.

## Motivation

I needed a way to open native windows from Elgato Stream Deck plugins -- to expand on a key's details or provide richer interaction beyond the small key UI. There was no lightweight way to do this without pulling in Electron or dealing with signed external webview runtimes that support bidirectional communication between the host process and the webview.

## Features

- **Cross-platform webviews** -- WebKit on macOS/Linux, WebView2 on Windows
- **Multi-window** -- create and manage multiple independent windows
- **HTML & URL loading** -- load inline HTML strings or navigate to URLs
- **Typed IPC** -- schema-first messaging layer with compile-time type checking and runtime validation via Zod, Valibot, or any `safeParse()`-compatible library
- **React hooks** -- `useChannelEvent`, `useSend`, and `ChannelProvider` for idiomatic React integration
- **Full window control** -- title, size, position, min/max size, decorations, transparency, always-on-top
- **Window events** -- close, resize, move, focus, blur, page load, title change
- **Security hardening** -- URL scheme blocking, CSP, trusted origin filtering, IPC bridge hardening, message size limits, schema validation
- **Runtime detection** -- `checkRuntime()` and `ensureRuntime()` for WebView2 availability on Windows

## Getting started

```bash
bun add @nativewindow/webview
```

```ts
import { init, NativeWindow } from "@nativewindow/webview";

const win = new NativeWindow({
  title: "My App",
  width: 800,
  height: 600,
});

win.loadUrl("https://myapp.com");

win.onClose(() => {
  process.exit(0);
});
```

## Links

- [Documentation](https://nativewindow.fcannizzaro.com)
- [GitHub](https://github.com/nativewindow/webview)
- [npm: @nativewindow/webview](https://www.npmjs.com/package/@nativewindow/webview)
- [npm: @nativewindow/ipc](https://www.npmjs.com/package/@nativewindow/ipc)
- [npm: @nativewindow/react](https://www.npmjs.com/package/@nativewindow/react)
- [npm: @nativewindow/tsdb](https://www.npmjs.com/package/@nativewindow/tsdb)
