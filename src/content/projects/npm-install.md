---
name: npm-install
description: Sublime package to auto install/uninstall npm modules, show current status, open npmjs documentation
url: https://github.com/fcannizzaro/npm-install
repo: fcannizzaro/npm-install
language: Python
featured: false
tags: [sublime-text, npm, developer-tools]
order: 5
---

A Sublime Text 3 package that adds npm workflow integration directly into the editor. Auto-install and uninstall npm modules, see status icons next to require/import statements, autocomplete installed modules, and open npmjs documentation -- all without leaving the editor.

## Motivation

Back when I used Sublime Text as my main editor, I kept switching to the terminal to install or remove npm packages. I wanted a tighter integration where the editor would detect missing modules, install them on save, and show me the status of each dependency at a glance.

## Features

- **Auto-install on save** -- detects new modules in your code and installs them automatically
- **Uninstall from editor** -- remove packages via command palette or context menu
- **Status icons** -- gutter icons show whether each module is installed, missing, or currently installing
- **Autocomplete** -- autocomplete `require()` paths for installed node modules
- **Open documentation** -- jump to any package's npmjs page with a shortcut
- **Multiple package managers** -- supports npm, yarn, and pnpm

## Getting started

Install through [Package Control](https://packagecontrol.io/packages/npm-install):

1. Press `Cmd/Ctrl + Shift + P` to open the command palette
2. Type **Install Package** and press Enter
3. Search for **npm-install**

Once installed, the package works automatically. Use `Ctrl+Alt+I` (Windows/Linux) or `Cmd+Option+I` (macOS) to install modules, and `Ctrl+Alt+D` / `Cmd+Option+D` to open documentation for the module under your cursor.

## Links

- [GitHub](https://github.com/fcannizzaro/npm-install)
- [Package Control](https://packagecontrol.io/packages/npm-install)
