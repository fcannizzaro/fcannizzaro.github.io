---
name: exocommand
description: A centralized MCP server that manages multiple projects with user-defined shell commands for AI coding assistants
url: https://github.com/fcannizzaro/exocommand
repo: fcannizzaro/exocommand
language: TypeScript
featured: true
tags: [exocommand, mcp, bun, typescript, ai]
order: 0
---

![exocommand](https://raw.githubusercontent.com/fcannizzaro/exocommand/main/media/logo.webp)

**Exocommand** is a centralized [MCP](https://modelcontextprotocol.io) server that manages multiple projects, each with its own set of shell commands defined in a `.exocommand` YAML file. Instead of giving an AI agent unrestricted terminal access, you register projects with the server and control exactly which commands each agent can discover and execute.

## Motivation

I wanted a way to give AI coding assistants controlled access to the terminal without handing over the keys entirely. Most agent frameworks provide unrestricted shell access, which is fine for sandboxed environments but risky in real projects. I needed a thin layer that lets me define exactly which commands the agent can run, and blocks everything else. As I started using it across multiple repositories, I also needed a single server process that could manage all of them -- each project with its own config and its own access key.

## Features

- **Multi-project registry** -- register multiple projects, each with a unique access key; the server manages them all from a single process
- **TUI dashboard** -- real-time terminal dashboard with project tabs, execution cards, status indicators, and animated spinners
- **YAML configuration** -- define commands per project in a `.exocommand` file with a name, description, and shell command
- **Live reload** -- the server watches each project's config file for changes and notifies connected clients automatically
- **Streaming output** -- stdout and stderr are streamed line-by-line via SSE in real time; if the server crashes mid-execution, the client retains all lines already received
- **Task mode** -- opt-in execution mode backed by the MCP experimental tasks API for crash-resilient, independently-pollable command execution
- **Cancellation** -- long-running commands can be cancelled by the client; the spawned process is killed immediately
- **Multi-session** -- uses the Streamable HTTP transport, supporting multiple concurrent MCP sessions across projects

## Getting started

Create a config file in your project directory:

```bash
bunx @fcannizzaro/exocommand init
```

Register the project with the server:

```bash
bunx @fcannizzaro/exocommand add .
```

This validates the config and prints an access key:

```
  ✓ Project registered

    Key     a1b2c3d4e5f6
    Header  exocommand-project: a1b2c3d4e5f6
    Config  /path/to/project/.exocommand
```

Start the server:

```bash
bunx @fcannizzaro/exocommand
```

> Use `@fcannizzaro/exocommand@latest` to always run the latest version from npm.

Create a `.exocommand` file in your project root:

```yaml
build:
  description: "Run the production build"
  command: "cargo build --release"

clippy:
  description: "Run clippy linter"
  command: "cargo clippy"

list-external:
  description: "List files in parent directory"
  command: "ls -a"
  cwd: ../
```

Each top-level key is a command. Commands must have a `description` and a `command` field, and may include an optional `cwd` to set the working directory. Names may contain letters, numbers, hyphens, and underscores.

Point your MCP client at `http://127.0.0.1:5555/mcp` with the `exocommand-project` header set to your access key. In OpenCode, for example:

```json
{
  "mcp": {
    "exocommand": {
      "enabled": true,
      "type": "remote",
      "url": "http://host.docker.internal:5555/mcp",
      "headers": {
        "exocommand-project": "<access-key>"
      }
    }
  }
}
```

## Links

- [GitHub](https://github.com/fcannizzaro/exocommand)
- [npm: @fcannizzaro/exocommand](https://www.npmjs.com/package/@fcannizzaro/exocommand)
