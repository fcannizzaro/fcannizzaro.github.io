---
name: rollup-stream-deck-package
description: Rollup plugin to create a distribution package for Elgato Stream Deck plugins
url: https://github.com/fcannizzaro/rollup-stream-deck-package
repo: fcannizzaro/rollup-stream-deck-package
language: TypeScript
featured: false
tags: [rollup, stream-deck, build-tool]
order: 4
---

A Rollup plugin that automates the packaging step for Elgato Stream Deck plugins. It wraps the [Elgato Distribution Tool](https://docs.elgato.com/sdk/plugins/packaging) so that the `.streamDeckPlugin` distribution file is generated as part of your build.

## Motivation

When building Stream Deck plugins, you need to run the Elgato Distribution Tool manually to package the `.sdPlugin` folder into a distributable `.streamDeckPlugin` file. I wanted to integrate that step directly into my Rollup build so the final package is produced alongside the bundled code, without an extra manual step.

## Features

- **Automatic packaging** -- generates the `.streamDeckPlugin` file as part of the Rollup build
- **Distribution Tool wrapper** -- uses the official Elgato Distribution Tool under the hood
- **Simple configuration** -- just point it to your `.sdPlugin` folder
- **Custom output path** -- optionally specify where the package should be written

## Getting started

```bash
npm install -D @fcannizzaro/rollup-stream-deck-package
```

```ts
import streamDeckPackage from "@fcannizzaro/rollup-stream-deck-package";

export default {
  plugins: [
    streamDeckPackage({
      plugin: "./com.sample.plugin.sdPlugin",
      output: "./dist",
    }),
  ],
};
```

## Links

- [GitHub](https://github.com/fcannizzaro/rollup-stream-deck-package)
- [npm](https://www.npmjs.com/package/@fcannizzaro/rollup-stream-deck-package)
- [Elgato Distribution Tool docs](https://docs.elgato.com/sdk/plugins/packaging)
