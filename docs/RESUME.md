# Resume: Search Console MCP

Scaffold only. No API calls, no OAuth app, and no published packages. Start from this file.

Kaneo was unavailable when this was written (`/api/auth/get-session: Application not found`), so this document is the tracker.

Search analytics, sitemaps, and URL inspection. Read-only until those reads are what Cursor uses.

## Related scaffolds

Each API family has its own repository. Do not add their tools here.

| Repo | Role |
| --- | --- |
| [google-analytics-mcp](https://github.com/lemon-squared/google-analytics-mcp) | GA4 Admin and Data |
| [google-tag-manager-mcp-server](https://github.com/lemon-squared/google-tag-manager-mcp-server) | Tag Manager |
| [google-business-profile-mcp-server](https://github.com/lemon-squared/google-business-profile-mcp-server) | Business Profile |
| [google-search-console-mcp-server](https://github.com/lemon-squared/google-search-console-mcp-server) | Search Console |
| [google-pagespeed-mcp-server](https://github.com/lemon-squared/google-pagespeed-mcp-server) | PageSpeed Insights and CrUX |
| [google-ads-mcp-server](https://github.com/lemon-squared/google-ads-mcp-server) | Ads conversion actions |
| [bing-webmaster-mcp-server](https://github.com/lemon-squared/bing-webmaster-mcp-server) | Bing Webmaster |
| [indexnow-mcp-server](https://github.com/lemon-squared/indexnow-mcp-server) | IndexNow URL pushes |
| [google-indexing-mcp-server](https://github.com/lemon-squared/google-indexing-mcp-server) | Indexing API for 8ball.live streams |
| [google-merchant-mcp-server](https://github.com/lemon-squared/google-merchant-mcp-server) | Google Merchant Center for the WMS |
| [microsoft-advertising-mcp-server](https://github.com/lemon-squared/microsoft-advertising-mcp-server) | Microsoft Advertising, REST |
| [microsoft-merchant-mcp-server](https://github.com/lemon-squared/microsoft-merchant-mcp-server) | Microsoft Merchant Center |
| [bing-places-mcp-server](https://github.com/lemon-squared/bing-places-mcp-server) | Bing Places trusted-partner listings |
| [microsoft-clarity-mcp-server](https://github.com/lemon-squared/microsoft-clarity-mcp-server) | Clarity dashboard export |

## This repository

TypeScript, formatted with Ultracite. The local CLI keeps client data on the machine that holds the credentials.

| Path | Package | Status |
| --- | --- | --- |
| `packages/core` | `@lemon-squared/google-search-console-mcp-core` | `SearchConsoleAuthProvider` only. Tools go here. |
| `packages/cli` | `@lemon-squared/google-search-console-mcp` | Exits immediately and points at this file. |
| `apps/worker` | not created | Hosted credentials, after the CLI is in use. |

`SearchConsoleAuthProvider.getAccessToken()` is the only auth seam. The CLI and a later worker both implement it. Tools never see how the credential was obtained.

Do not put that value in a committed `.cursor/mcp.json`. When the CLI speaks MCP over stdio, user-level Cursor config is `~/.cursor/mcp.json` so every internal and client project can see it.

Scope for the first tools: `https://www.googleapis.com/auth/webmasters.readonly`.

### Tools to add

Reads first.

| Tool | Purpose |
| --- | --- |
| `list_sites` | Properties the token can see. |
| `query_search_analytics` | Queries, pages, countries, devices, and search appearance. |
| `list_sitemaps` | Sitemaps submitted on a property. |
| `inspect_url` | Index status for one URL. |

A normal call is `list_sites`, then search analytics or a sitemap list, then `inspect_url` for a URL that looks wrong.

Later writes: submit or delete a sitemap. Domain property for `runur.co.uk`, and the shop property on `shop.runur.co.uk`, stay separate sites.

## Order of work

1. Implement the four read tools in `packages/core`, then make `packages/cli` an stdio MCP server.
2. Add sitemap submit and delete after those reads are what Cursor uses.
3. Add a hosted OAuth worker only after the local CLI is what Cursor uses for client projects.

## Constraints

- Format with Ultracite (`bun run format`). The config extends `ultracite/biome/core`.
- Keep client data on the local CLI until a hosted worker exists.
- Do not send an order id or any other private path to URL Inspection.
