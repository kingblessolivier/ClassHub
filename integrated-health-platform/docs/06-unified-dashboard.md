# 06 — Unified Dashboard

There is **one** dashboard. It is not designed per role — it **renders itself from the
commands the logged-in user holds**, at the user's data altitude (`ANVW`).

## Anatomy

```
┌──────────────────────────────────────────────────────────────────────┐
│ TOP BAR (deep green #06402B)                                           │
│  Logo · COMMAND BAR (⌘K "Type a command or search…") · Synced pill ·  │
│  notifications · user avatar + name + role/facility                    │
├───────────────┬──────────────────────────────────────────────────────┤
│ LEFT NAV      │ MAIN CONTENT                                           │
│ (generated    │  Scope line: "Showing your patients only · OPD · …"   │
│  from the     │  ── renders ONE of: ──                                │
│  user's       │   • Command bar result (power user)                   │
│  command      │   • Tile launcher of entitled commands (occasional)   │
│  bundle)      │   • ANVW analytics at the user's altitude             │
│               │                                                        │
│  Your scope ◀─── always shows the four-axis window the user is in     │
└───────────────┴──────────────────────────────────────────────────────┘
```

## Three rendering modes (same engine)

| Mode | For | What renders |
|---|---|---|
| **Command bar** | Power users (clinicians, pharmacists, finance, admin) | `⌘K` field; type a 4-letter code → execute. Autocomplete shows **only entitled commands** (`RXDP — Dispense prescription`). |
| **Tile launcher** | Occasional / lower-literacy staff | Auto-generated grid of the user's entitled commands (icon + label). |
| **Analytics (`ANVW`)** | Oversight users | KPI cards, maps, drill-downs — **aggregated and de-identified** as altitude rises. |

## Rules baked into the screen

- **Entitlement-aware:** you can never autocomplete to or see a command you don't hold.
- **Scope is visible:** a persistent "Your scope" element shows Geography · Tenant ·
  Sensitivity so the user always knows their four-axis window.
- **Safety-first:** allergy / interaction / critical alerts use 🔴 and are impossible to miss.
- **Sync state is load-bearing:** a 🟢 Synced / 🟠 Offline pill is always visible.
- **Altitude discipline:** oversight users see rates and maps, never a patient name.
- **Accessibility:** status shown by icon + text (never color alone); ≥48dp targets.

## Command bar interaction

1. User presses `⌘K` (or taps the bar).
2. Types a code or partial (e.g. `RX`).
3. Autocomplete lists entitled RX commands with code + human label.
4. `Enter` → the command's screen/resource loads in the main content area.
5. Recents & favorites surface frequent commands; `?` lists all entitled commands.

## Admin variant (create user & assign commands)

The admin runs `ADUC` → identity (NIDA) → scope → assign bundle/commands →
effective-access preview → save. See
[04 — Access-Control Model](04-access-control-model.md#admin-flow-create-user--assign-commands).

## Design prompt (for AI design tools / Canva / v0 / Figma)

> Design a single unified, command-driven dashboard for the Integrated National Health
> Platform (Rwanda). Desktop web, React SPA, 1440px, light theme, calm
> medical-government aesthetic. Deep-green top bar (#06402B) with a centered command bar
> ("Type a command or search… ⌘K"), a green "Synced" pill, notifications, and user
> avatar + role/facility. Left nav generated from the user's assigned commands. Main area
> shows a scope line ("Showing your patients only · OPD · Kigali University Teaching
> Hospital") and renders either: an entitlement-aware command-bar result, a tile launcher
> of entitled commands (icon + label), or role-scoped analytics (KPI cards + map,
> de-identified at high altitude). Use teal #0E7C7B brand; semantic red #D32F2F / amber
> #F5A623 / green #2E7D32 for state only; Inter type. Status never by color alone; ≥48dp
> targets; high contrast.
