<div align="center">

# 🏥 Integrated National Health Platform

### One unified national health rail for Rwanda — every actor, one shared core

</div>

---

## Overview

The Integrated National Health Platform is the **orchestrating layer** that connects
every actor in Rwanda's health system — from the village community health worker
(*umujyanama w'ubuzima*) to the Minister of Health — on a single shared core.

It does **not** replace Rwanda's sovereign national systems (DHIS2, eIDSR,
RSSB/KWIVUZA, NIDA, RMS, SAMU 912, RRA EBM). It connects them at the point of care
and feeds them automatically.

> **Design principle:** *Build what is missing, integrate what the state already runs.*

## The shift to command-driven access

Unlike a traditional system where each role gets a hand-built dashboard, this
platform is **command-driven** (in the spirit of core-banking systems such as
Finacle):

- The **command** is the atomic unit of access.
- A **user** is created and **assigned a set of commands** (a command bundle).
- The **single unified dashboard** renders itself from whatever commands the user holds.
- Data is then bounded by the **four-axis** model: Role(command) · Geography · Tenant · Sensitivity.

There is **one dashboard**, not 40. What you see is the set of commands you are
entitled to, at your data altitude.

## Documentation

| Doc | Description |
|---|---|
| [01 — Architecture](docs/01-architecture.md) | Four-layer architecture and the four-axis access model |
| [02 — Users & Access](docs/02-users-and-access.md) | Every user group and its data scope |
| [03 — Command Catalogue](docs/03-command-catalogue.md) | All ~110 commands across 28 domains + bundles |
| [04 — Access-Control Model](docs/04-access-control-model.md) | Command-driven Function-Level Access Control (FLAC) |
| [05 — Design System](docs/05-design-system.md) | Colors, typography, components, accessibility |
| [06 — Unified Dashboard](docs/06-unified-dashboard.md) | The single command-driven dashboard |
| [07 — Technology Stack](docs/07-technology-stack.md) | Backend, frontend, data, infrastructure |
| [08 — Security & Cryptography](docs/08-security-and-cryptography.md) | Authn/z, encryption, audit chain |
| [09 — Interoperability](docs/09-interoperability.md) | National-system integrations |

## Status

Documentation and design specification. Specific regulatory approvals, data-hosting
agreements, and integration partnership contracts must be confirmed with the relevant
Rwandan authorities (Ministry of Health, RBC, Rwanda FDA, RSSB, RRA) and qualified
legal advisers before implementation commences.
