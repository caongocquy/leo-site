---
title: Code Atlas
subtitle: Repository intelligence for coding agents
summary: A local-first code intelligence engine that maps symbols, calls, dependencies, and change impact into structured context for coding agents.
category: AI & Developer Tools
featured: true
order: 1
icon: graph
tags:
  - TypeScript
  - MCP
  - Code Intelligence
  - CLI
repository: https://github.com/caongocquy/code-atlas
packageUrl: https://www.npmjs.com/package/@showdar2112/code-atlas
screenshots:
  - src: https://raw.githubusercontent.com/caongocquy/code-atlas/master/docs/assets/readme/cli-init.svg
    alt: "Real Code Atlas CLI initialization output"
    caption: "CLI initialization"
  - src: https://raw.githubusercontent.com/caongocquy/code-atlas/master/docs/assets/readme/cli-inspect-change.svg
    alt: "Actual Code Atlas inspect-change terminal output"
    caption: "Change impact exploration"
demoCommands:
  - "npm install -g @showdar2112/code-atlas"
  - "code-atlas init"
  - "code-atlas connect"
highlights:
  - Local-first repository graph and lexical indexing
  - Symbol, call graph, and impact exploration
  - CLI and Model Context Protocol integration
---

## Why I built it

Coding agents are most effective when they can understand the shape of a codebase before editing it. Code Atlas helps surface the relevant structure—symbols, dependencies, execution paths, and blast radius—without requiring a hosted service.

## How it works

It builds a local representation of your repository and exposes tools through a CLI and MCP. Agents can ask focused questions about code relationships and retrieve the context they need for a task.

## Getting started

Use the terminal walkthrough above to view and copy the setup commands. Run them in the appropriate project directory and consult the repository README for prerequisites.

For implementation details and the supported integrations, see the project README.
