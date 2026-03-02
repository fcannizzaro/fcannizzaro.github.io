---
name: broken-links-mcp
description: An MCP server that scans directories for broken HTTP links and reports them in a markdown table
url: https://github.com/fcannizzaro/broken-links-mcp
repo: fcannizzaro/broken-links-mcp
language: TypeScript
featured: false
tags: [broken-links, mcp, bun, typescript]
order: 7
---

**broken-links-mcp** is an MCP server that recursively scans directories for files, extracts HTTP links from multiple formats, and validates each one -- reporting broken links in a structured markdown table with file paths, line numbers, and status codes.

## Motivation

Links break silently across documentation, READMEs, and source files. I wanted a tool I could run through my AI assistant on demand -- point it at a directory, get back a table of every broken URL with the exact file and line number. Building it as an MCP server means any compatible client can use it without additional setup or CI configuration.

## Features

- **Recursive scanning** -- traverses directories and filters files by extension
- **Multi-format extraction** -- detects Markdown links, Markdown images, HTML anchors, HTML images, and plain URLs
- **HTTP validation** -- HEAD request with GET fallback for each unique URL
- **Deduplication** -- skips redundant requests for URLs that appear in multiple files
- **Batched requests** -- 10 concurrent connections to avoid overwhelming servers
- **Structured output** -- markdown table with file path, line number, HTTP status, and issue description

## Getting started

Run the server via stdio:

```bash
bunx --bun @fcannizzaro/broken-links-mcp
```

Add it to your MCP client configuration. For Claude Desktop (`claude_desktop_config.json`):

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

For OpenCode (`opencode.json`):

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

The server exposes a single `check-links` tool with two parameters: `directory` (root path to scan) and `extensions` (file types to include, e.g. `[".md", ".html"]`).

> Use `@fcannizzaro/broken-links-mcp@latest` to always run the latest version from npm.

## Links

- [GitHub](https://github.com/fcannizzaro/broken-links-mcp)
- [npm: @fcannizzaro/broken-links-mcp](https://www.npmjs.com/package/@fcannizzaro/broken-links-mcp)
