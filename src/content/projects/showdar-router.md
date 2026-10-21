---
title: Showdar Router
subtitle: Local-first AI routing gateway
summary: A single OpenAI-compatible endpoint for multiple AI providers, models, and fallback routes—with dashboard and CLI workflows.
category: AI & Developer Tools
featured: true
order: 2
icon: route
tags:
  - Node.js
  - AI Routing
  - API Gateway
  - CLI
repository: https://github.com/caongocquy/showdar-router
highlights:
  - OpenAI-compatible local endpoint
  - Ordered provider and model fallback
  - Health-aware routing and a local dashboard
---

## Why I built it

Switching models and providers across developer tools can be repetitive and fragile. Showdar Router provides one local integration point for direct model routing and configurable fallback paths.

## How it works

You configure providers and models once, then point compatible clients at the local gateway. The router manages candidate eligibility, fallback order, and recovery behavior.

## Quick start

```bash
npm install -g showdar-router
showdar-router
```

See the README for supported providers, configuration, and security considerations.
