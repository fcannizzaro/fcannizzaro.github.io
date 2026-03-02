---
name: Hoyodeck
description: A Stream Deck plugin for Genshin Impact / Honkai Star Rail / Zenless Zone Zero
url: https://github.com/fcannizzaro/hoyodeck
repo: fcannizzaro/hoyodeck
language: TypeScript
featured: true
tags: [stream-deck, genshin-impact, plugin]
order: 2
---

A Stream Deck plugin for HoYoverse games. Track your Genshin Impact, Honkai: Star Rail, and Zenless Zone Zero stats directly on your Stream Deck through the HoYoLAB API.

## Motivation

I wanted a quick way to check my resin, trailblaze power, and battery charge without opening the game or the HoYoLAB app. A Stream Deck key that shows the current value at a glance felt like the right fit -- especially since I already had a Stream Deck on my desk for other plugins.

## Features

- **Genshin Impact** -- resin counter, daily commissions, expeditions, teapot currency, transformer cooldown, spiral abyss timer, banner countdown
- **Honkai: Star Rail** -- trailblaze power, banner countdown
- **Zenless Zone Zero** -- battery charge, banner countdown
- **Daily rewards** -- view and claim HoYoLAB check-in rewards for all three games
- **Real-time updates** -- data refreshes automatically at a configurable interval
- **HoYoLAB authentication** -- uses cookie-based auth extracted from your browser

## Getting started

If you want to try the plugin early or contribute, you can clone the repo and start building locally:

```bash
git clone https://github.com/fcannizzaro/hoyodeck.git
cd hoyodeck
bun install
bun run link
bun run dev
```

To use the plugin, you need to extract your HoYoLAB cookies from your browser's DevTools and paste them into the plugin settings. The plugin then uses those cookies to fetch your game data from the HoYoLAB API.

Otherwise, you can wait for the official release on the Elgato Marketplace.

## Links

- [GitHub](https://github.com/fcannizzaro/hoyodeck)
