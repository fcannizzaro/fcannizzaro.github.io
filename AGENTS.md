# AGENTS.md

## Tech Stack

- **Framework**: Astro 5 (static site generation)
- **Styling**: Tailwind CSS v4 (via Vite plugin, no config file — theme defined with `@theme` in `src/styles/global.css`)
- **Runtime**: Bun
- **Font**: JetBrains Mono (monospace)
- **Design**: Dark terminal aesthetic (`#0e0e0e` background, muted grays, bracket notation for UI elements like `[tag]`, `[github]`)

## Writing Style

- First-person, concise, technical
- No emojis
- Focus on what and why, not exhaustive API documentation
- Code samples should be short and practical
- Prefer bullet lists over long paragraphs

## Content Collections

### Blog (`src/content/blog/`)

Frontmatter schema:

```yaml
title: string          # required
description: string    # required
draft: boolean         # defaults to false — hidden from production listings
pubDate: date          # required
updatedDate: date      # optional
heroImage: image       # optional, local file reference
tags: string[]         # defaults to []
```

Draft posts are excluded from all production pages and the RSS feed. In dev mode, drafts are still rendered (with a `[draft]` badge) and listed at `/drafts/`.

### Projects (`src/content/projects/`)

Frontmatter schema:

```yaml
name: string                    # required — display name
description: string             # required — short one-line description
url: string                     # required — external URL (GitHub or project site)
repo: string                    # required — GitHub owner/repo slug (used for star count)
language: string                # required — primary language(s)
featured: boolean               # defaults to false — shown on homepage
tags: string[]                  # defaults to []
order: number                   # defaults to 0 — sort order (ascending)
status: 'alpha' | 'beta'       # optional — maturity badge
cover: image                    # optional — local file reference for cover image
```

## Project Page Structure

Every project page body **must** follow this fixed structure. All sections are required.

```
(introduction paragraph — no heading)

## Motivation

## Features

## Getting started

## Links
```

### Section rules

1. **Introduction** (no heading) — a single paragraph describing what the project is. Keep it to 1-3 sentences.

2. **## Motivation** — why the project was built and what problem it solves. First-person perspective. 1-2 short paragraphs.

3. **## Features** — a flat bullet list of key features. Each item is bold label + dash + short description. No sub-headings within this section.

4. **## Getting started** — starts with an install command in a fenced code block, followed by a minimal usage example (code block or short instructions). Keep it practical.

5. **## Links** — a bullet list of relevant external links (documentation, marketplace, npm, GitHub, etc.). Each item is a markdown link.
