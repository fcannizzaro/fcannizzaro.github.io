---
title: 'React Components on Stream Deck Hardware'
description: 'A library that lets you build Elgato Stream Deck plugins with React -- JSX, hooks, and state instead of imperative SDK callbacks and manual image generation.'
pubDate: 'Mar 07 2026'
heroImage: ./streamdeck-react.webp
tags: ['streamdeck-react', 'react', 'stream-deck', 'typescript', 'elgato']
---

The official `@elgato/streamdeck` SDK is powerful but low-level. You track state manually, wire hardware events by hand, and generate key images yourself. Even a simple counter becomes a mix of event handlers, state bookkeeping, and rendering code. I wanted the same model I use in React apps -- declare what the key looks like, let the framework handle the rest. So I built `@fcannizzaro/streamdeck-react`.

## How it works

You write a React component for each action surface. `defineAction()` maps it to a manifest UUID. `createPlugin()` registers your actions and fonts, then `plugin.connect()` attaches to the Stream Deck runtime.

Each visible action instance on the hardware gets its own isolated React root -- separate state, separate lifecycle. When state changes trigger a re-render, the library renders the JSX tree to an image and pushes it to the device via `setImage()`. Output is hashed so identical frames are never sent twice.

<div style="background:#262626;padding:16px;padding-bottom:1px;border-radius:8px;margin:1.5rem 0">

<span style="opacity: 0.7">1st row: zustand state, 2rd row: tanstack query, react basic hooks</span>

![streamdeck-react in action](./streamdeck-react.gif)

</div>

<div style="background:#262626;padding:16px;padding-bottom:1px;border-radius:8px;margin:1.5rem 0">

<span style="opacity: 0.7">snake game in the Stream Deck+ LCD display</span>

![streamdeck-react in action](./streamdeck-react-snake.gif)

</div>

## A counter example looks like this:

```tsx
import { readFile } from 'node:fs/promises';
import { createPlugin, defineAction, useKeyDown, tw } from '@fcannizzaro/streamdeck-react';
import { useState } from 'react';

function CounterKey() {
  const [count, setCount] = useState(0);

  useKeyDown(() => setCount((c) => c + 1));

  return (
    <div
      className={tw(
        'flex h-full w-full flex-col items-center justify-center gap-1',
        'bg-linear-to-br from-[#0f172a] to-[#1d4ed8]',
      )}
    >
      <span className="text-[12px] font-semibold uppercase tracking-[0.2em] text-white/70">
        Count
      </span>
      <span className="text-[34px] font-black text-white">{count}</span>
    </div>
  );
}

const counterAction = defineAction({
  uuid: 'com.example.react-counter.counter',
  key: CounterKey,
});

const plugin = createPlugin({
  fonts: [
    {
      name: 'Inter',
      data: await readFile(new URL('../fonts/Inter-Regular.ttf', import.meta.url)),
      weight: 400,
      style: 'normal',
    },
  ],
  actions: [counterAction],
});

await plugin.connect();
```

## What you get

- **Declarative rendering** -- describe keys as JSX, not imperative draw calls
- **Full React hooks** -- `useState`, `useEffect`, `useRef`, `useContext`, custom hooks all work as expected
- **Hardware-aware hooks** -- `useKeyDown`, `useDialRotate`, `useTouchTap`, settings hooks, lifecycle hooks, and SDK helpers compose with the rest of React
- **Built-in primitives** -- `Box`, `Text`, `Image`, `Icon`, `ProgressBar`, `CircularGauge`, and `ErrorBoundary` for compact device UIs
- **Flexible styling** -- inline styles, `className`, and a `tw()` helper for Tailwind-like utility strings
- **Encoder and dial support** -- separate `key` and `dial` components per action, with `useDialHint` for Stream Deck+ trigger descriptions
- **Shared state** -- Zustand stores work out of the box, Jotai and others plug in through the wrapper API on `createPlugin` or `defineAction`
- **Output caching** -- FNV-1a hashing skips `setImage()` when the frame hasn't changed
- **Error boundaries** -- every action root is wrapped automatically, one crash doesn't take down the plugin

## Get started

```bash
bun create streamdeck-react
```

The CLI scaffolds a complete `.sdPlugin` project -- manifest, Rollup config, fonts, and a starter example. Pick from minimal, counter, Zustand, Jotai, or React Query templates.

For manual setup:

```bash
bun add @fcannizzaro/streamdeck-react react
```

Full documentation at [streamdeckreact.fcannizzaro.com](https://streamdeckreact.fcannizzaro.com). Source on [GitHub](https://github.com/fcannizzaro/streamdeck-react).
