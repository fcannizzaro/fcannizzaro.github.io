---
name: win-audio
description: Get, set and watch speaker/microphone volumes on Windows
url: https://github.com/fcannizzaro/win-audio
repo: fcannizzaro/win-audio
language: Typescript, C++
featured: true
tags: [windows, audio, native]
order: 3
---

A Node.js native addon to control Windows audio. Get, set, and watch speaker and microphone volumes programmatically using the Windows Core Audio API.

## Motivation

I needed a way to control system audio from Node.js. The Windows Core Audio API is powerful but requires C++ -- this package wraps it with a simple JavaScript API and adds real-time volume change events via polling.

## Features

- **Speaker and microphone** -- both `audio.speaker` and `audio.mic` expose the same API
- **Get/set volume** -- read or set the current volume as a percentage
- **Increase/decrease** -- adjust volume by a relative percentage
- **Mute/unmute** -- toggle mute state programmatically
- **Watch for changes** -- listen for volume and mute state changes in real-time
- **N-API** -- built with N-API for stable ABI across Node.js versions

## Getting started

```bash
npm install win-audio
```

Requires [node-gyp](https://github.com/nodejs/node-gyp#installation) to build the native C++ addon. Node.js >= 8.6.0 (N-API).

```ts
import audio from "win-audio";

const speaker = audio.speaker;

speaker.start(200);

speaker.on("change", (volume) => {
  console.log("old %d%% -> new %d%%", volume.old, volume.new);
});

speaker.set(40);
speaker.increase(20);
speaker.decrease(10);
speaker.mute();
speaker.unmute();

console.log(speaker.get());

speaker.stop();
```

## Links

- [GitHub](https://github.com/fcannizzaro/win-audio)
- [npm](https://www.npmjs.com/package/win-audio)
