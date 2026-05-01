# Sportz – Live Sports Commentary Service

Sportz is a real‑time backend for managing sports matches and live commentary. It provides REST APIs for match and commentary data, plus a WebSocket server that pushes commentary updates to subscribed clients. Built with Node.js, Express, PostgreSQL (Drizzle ORM), and Arcjet security.

## Features

- ✅ Create and list matches (teams, sport, start/end times, scores)
- ✅ Add commentary entries with rich metadata (minute, period, event type, actor, tags, etc.)
- ✅ Real‑time commentary broadcast over WebSocket (per‑match subscriptions)
- ✅ Full validation with Zod
- ✅ PostgreSQL database with Drizzle ORM and migrations
- ✅ Arcjet protection: shield, bot detection, rate limiting (optional)
- ✅ Seeding script – loads a commentary feed from JSON, auto‑creates matches, and streams commentary via the REST API
- ✅ APM Insight monitoring (optional)

> **Note:** This version does **not** include dynamic score update endpoints. Match scores are set only when a match is created. The seeding script contains commented‑out logic for live score updates, but it is disabled.

## Tech Stack

| Layer          | Technology                                                   |
|----------------|--------------------------------------------------------------|
| Runtime        | Node.js (ES modules)                                         |
| Framework      | Express 5                                                    |
| Database       | PostgreSQL + Drizzle ORM                                     |
| Security       | Arcjet (shield, bot detection, sliding window rate limits)   |
| Validation     | Zod                                                          |
| WebSockets     | `ws` library                                                 |
| Monitoring     | Apminsight (optional)                                        |
| Dev tools      | `drizzle-kit`, `wscat`, Node.js `--watch`                    |

## Getting Started

### Prerequisites

- Node.js **18+** (tested with v20)
- PostgreSQL **14+** running (local or remote)
- (Optional) Arcjet API key – sign up at [arcjet.com](https://arcjet.com)

### Installation

```bash
git clone <your-repo-url>
cd sportz
npm install
