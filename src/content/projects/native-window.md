---
name: native-window
description: Create native desktop windows with embedded web content from Bun or Node.js
url: https://nativewindow.fcannizzaro.com
repo: native-window/webview
language: TypeScript, Rust
featured: true
tags: [native-window, bun, typescript, desktop, webview]
order: 0
status: alpha
---

A Rust napi-rs addon built on [wry](https://github.com/tauri-apps/wry) and [tao](https://github.com/tauri-apps/tao) that uses platform-native webview engines -- WKWebView on macOS, WebKitGTK on Linux, and WebView2 on Windows -- to create real desktop windows with embedded web content from Bun or Node.js. No bundled Chromium, no Electron runtime.

## Motivation

I needed a way to open native windows from Elgato Stream Deck plugins -- to expand on a key's details or provide richer interaction beyond the small key UI. There was no lightweight way to do this without pulling in Electron or dealing with signed external webview runtimes that support bidirectional communication between the host process and the webview.

## Features

- **Cross-platform webviews** -- WKWebView on macOS, WebKitGTK on Linux, WebView2 on Windows
- **Multi-window** -- create and manage multiple independent windows
- **HTML & URL loading** -- load inline HTML strings or navigate to URLs
- **Typed IPC** -- schema-first messaging layer with compile-time type checking and runtime validation via Zod, Valibot, or any `safeParse()`-compatible library
- **React hooks** -- `useChannelEvent`, `useSend`, and `ChannelProvider` for idiomatic React integration
- **Full window control** -- title, size, position, min/max size, decorations, transparency, always-on-top, and `setIcon()` for custom window icons
- **Window events** -- close, resize, move, focus, blur, page load, title change, and navigation blocked
- **Navigation host restriction** -- `allowedHosts` option to restrict all navigations with wildcard support
- **Permission controls** -- deny-by-default device permissions for camera, microphone, and file system access
- **Webview sandboxing** -- popup blocking and file picker suppression built-in
- **Cookie detection** -- `getCookies()` with timeout to prevent indefinite waits
- **Runtime detection** -- check for WebView2 availability on Windows and auto-install

## Getting started

```bash
bun add @fcannizzaro/native-window
```

```ts
import { NativeWindow } from "@fcannizzaro/native-window";

const win = new NativeWindow({
  title: "My App",
  width: 800,
  height: 600,
  allowedHosts: ["myapp.com"],
});

win.loadUrl("https://myapp.com");

win.onNavigationBlocked((url) => {
  console.warn("Blocked:", url);
});

win.onClose(() => {
  // do something when the window is closed
});
```

## Links

- [Documentation](https://nativewindow.fcannizzaro.com)
- [GitHub](https://github.com/fcannizzaro/native-window)
- [npm: @fcannizzaro/native-window](https://www.npmjs.com/package/@fcannizzaro/native-window)
- [npm: @fcannizzaro/native-window-ipc](https://www.npmjs.com/package/@fcannizzaro/native-window-ipc)
- [npm: @fcannizzaro/native-window-ipc-react](https://www.npmjs.com/package/@fcannizzaro/native-window-ipc-react)
- [npm: @fcannizzaro/native-window-tsdb](https://www.npmjs.com/package/@fcannizzaro/native-window-tsdb)
