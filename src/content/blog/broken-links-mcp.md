---
title: 'Let AI Agents Detect and Replace Broken Links'
description: 'An MCP server that scans your files for HTTP links and validates them -- reporting broken URLs with file, line number, and status in a markdown table.'
pubDate: 'Feb 22 2026'
heroImage: ./broken-links-mcp.webp
tags: ['broken-links', 'mcp', 'bun', 'typescript', 'ai']
---

Links rot. Documentation, READMEs, code comments -- over time every project accumulates URLs that quietly stop working. I built an MCP server to check all of them at once, so any compatible AI assistant can scan a directory and get a clear report of what's broken.

## The problem

Links appear in many formats across a codebase:

- **Markdown links** -- `[text](https://...)`
- **Markdown images** -- `![alt](https://...)`
- **HTML anchors** -- `<a href="https://...">`
- **HTML images** -- `<img src="https://...">`
- **Plain URLs** -- bare `https://...` in comments or configs

A proper scanner needs to extract all of these, deduplicate them, validate each one, and report back with enough context to fix the problem -- file, line number, and status.

## How it works

The server exposes a single `check-links` tool. It takes a `directory` and an array of `extensions` to include. It recursively walks the tree, parses each file for HTTP links, deduplicates, then validates in batches of 10 concurrent HEAD requests (falling back to GET when HEAD fails).

The result is a markdown table:

```
| File       | Line | URL                              | Status | Issue         |
|------------|------|----------------------------------|--------|---------------|
| readme.md  | 10   | https://httpbin.org/status/404   | 404    | 404 Not Found |
| docs/api.md| 25   | https://dead.example.com         | -      | DNS resolution failed |

Found **2** broken link(s) out of **15** total across **3** file(s).
```

## Setting it up

For Claude Desktop, add to your `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "broken-links": {
      "command": "bunx",
      "args": ["--bun", "@fcannizzaro/broken-links-mcp"]
    }
  }
}
```

For OpenCode, add to your `opencode.json`:

```json
{
  "mcp": {
    "broken-links": {
      "type": "local",
      "command": ["bunx", "--bun", "@fcannizzaro/broken-links-mcp"]
    }
  }
}
```

Once configured, ask your assistant to check for broken links and it will discover the tool automatically.

Source is on [GitHub](https://github.com/fcannizzaro/broken-links-mcp).
