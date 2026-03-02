---
name: mkdocs-sequence-js-plugin
description: MkDocs plugin to render sequence.js blocks
url: https://github.com/fcannizzaro/mkdocs-sequence-js-plugin
repo: fcannizzaro/mkdocs-sequence-js-plugin
language: Python
featured: false
tags: [mkdocs, documentation, plugin]
order: 6
---

A [MkDocs](https://www.mkdocs.org/) plugin that renders [js-sequence-diagrams](https://bramp.github.io/js-sequence-diagrams/) blocks directly in your documentation. Write sequence diagrams as fenced code blocks in Markdown, and the plugin converts them into rendered diagrams at build time.

## Motivation

I was using MkDocs for project documentation and wanted to include sequence diagrams without exporting images manually. js-sequence-diagrams has a clean text-based syntax, so I built a plugin that converts `sequence` code blocks into rendered diagrams during the MkDocs build.

## Features

- **Fenced code blocks** -- write diagrams using the `sequence` language tag in standard Markdown code blocks
- **Two themes** -- choose between `simple` (clean) and `hand` (hand-drawn) diagram styles
- **Click to zoom** -- optional popup mode lets readers click a diagram to view it full-size
- **Build-time rendering** -- diagrams are rendered during `mkdocs build`, no client-side JavaScript required

## Getting started

```bash
pip install mkdocs-sequence-js-plugin
```

Add the plugin to your `mkdocs.yml`:

```yaml
plugins:
  - sequence-js:
      theme: simple
      popup: true
```

Then write sequence diagrams in your Markdown:

````
```sequence
Alice->Bob: Hello Bob, how are you?
Note right of Bob: Bob thinks
Bob-->Alice: I am good thanks!
```
````

## Links

- [GitHub](https://github.com/fcannizzaro/mkdocs-sequence-js-plugin)
- [js-sequence-diagrams](https://bramp.github.io/js-sequence-diagrams/)
- [MkDocs](https://www.mkdocs.org/)
