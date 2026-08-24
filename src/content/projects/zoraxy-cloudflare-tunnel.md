---
name: Zoraxy Cloudflare Tunnel
description: A Zoraxy plugin to expose selected proxy routes through a managed Cloudflare Tunnel
url: https://github.com/fcannizzaro/zoraxy-cloudflare-tunnel
repo: fcannizzaro/zoraxy-cloudflare-tunnel
language: Go
featured: false
tags: [zoraxy, cloudflare, homelab, tunnel, plugin]
order: 8
---

Zoraxy Cloudflare Tunnel is a Zoraxy Utilities plugin that creates and manages a remotely managed Cloudflare Tunnel, mapping selected public hostnames back to existing Zoraxy proxy routes.

## Motivation

I wanted to expose a few homelab services without maintaining Cloudflare DNS records and tunnel ingress rules separately. The plugin keeps that configuration next to the Zoraxy routes while leaving local-only services untouched.

## Features

- **Automatic tunnel setup** -- creates or reuses a remotely managed Cloudflare Tunnel
- **Ingress management** -- maps public hostnames to the Zoraxy HTTPS listener
- **DNS configuration** -- creates proxied CNAME records for each hostname
- **Runtime controls** -- starts and stops `cloudflared` from the plugin dashboard
- **Automatic startup** -- restarts the tunnel with Zoraxy and after configuration changes
- **Secure credentials** -- stores the scoped API token with restricted file permissions

## Getting started

Install `cloudflared` on the same host or container as Zoraxy, then verify it:

```bash
cloudflared --version
```

Install Cloudflare Tunnel from the Zoraxy plugin marketplace. Open the plugin, enter the Cloudflare account ID, zone ID, and a scoped API token, then add the public hostnames and apply the configuration.

Each hostname must already have a matching proxy rule in Zoraxy.

## Links

- [GitHub](https://github.com/fcannizzaro/zoraxy-cloudflare-tunnel)
- [Cloudflare Tunnel documentation](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/)
- [Related blog post](/blog/zoraxy-cloudflare-tunnel/)
