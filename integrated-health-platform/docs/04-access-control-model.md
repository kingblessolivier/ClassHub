# 04 — Access-Control Model

## Command-driven Function-Level Access Control (FLAC)

This platform replaces hand-built per-role dashboards with a **command-driven** model,
in the spirit of core-banking systems such as Finacle. Access is **capability-based**:
you hold a set of commands, and the UI is generated from them.

```
COMMAND  =  the atomic unit of access (code + action + resource)
USER     →  assigned a set of COMMANDS (a command bundle)
ACCESS   =  "does the user hold this command?"  — not "which dashboard do they have?"
```

A user is not "an OPD doctor with the doctor dashboard." A user is *"someone who holds
`PTSR PTVW ENNW ENDX CPOE RXNW LBOR`"* — and the single dashboard shows exactly those.

## Reconciling commands with the four-axis model

The **command replaces the Role axis**. The other three axes still apply as **data
scope** layered on top:

```
COMMAND      = WHAT you may do          (RXDP = you may dispense)
GEOGRAPHY    = WHERE                     (CHW → village; clerk → facility)
TENANT       = WHOSE data               (private insurer → own claims only)
SENSITIVITY  = HOW identifiable          (high altitude → aggregates, no names)
```

Same command, different result by scope: a CHW running `PTSR` sees their village; a
hospital clerk running `PTSR` sees the facility. **Command grants the function; ABAC
bounds the data.**

## Authorisation flow (every request)

1. Request arrives carrying the JWT (role/command set + geography + tenant + sensitivity).
2. **Command check** — does `user_commands` contain the requested command? If not → `403`.
3. **Scope check** — does the target data fall within the user's geography, tenant, and
   sensitivity ceiling? If not → `403`.
4. On `403`: terminate session, blacklist token (Redis), and log the event to the audit chain.
5. On success: execute, then write `who · command · resource · when` to the audit chain.

## Data model

```
commands        (code PK, domain, action, label, resource, sensitivity_min)
command_bundles (bundle_id PK, name)
bundle_commands (bundle_id FK, code FK)
users           (user_id PK, nida_id, geography, tenant_id, sensitivity_ceiling, status)
user_commands   (user_id FK, code FK, granted_by, granted_at)   ← the access table
audit_log       (actor_id, command_code, resource_id, ts, hash_chain)   ← append-only
```

## Admin flow: create user → assign commands

1. **Identity** — NIDA lookup auto-fills the person.
2. **Scope** — set Geography, Tenant / Facility, and Sensitivity ceiling.
3. **Assign commands** — apply a **bundle** (template), then add/remove individual commands.
4. **Effective-access preview** — show the final command list + data scope before saving.
5. **Save** — audit-logged; JWT provisioned with exactly those command codes.

## Presentation layers (one engine, three faces)

The command engine is the single source of truth. It is presented differently per user:

| Presentation | For | Behaviour |
|---|---|---|
| **Command bar** (`⌘K`) | Power users (clinicians, pharmacists, finance, admin) | Type a 4-letter code → execute. Entitlement-aware autocomplete. |
| **Tile launcher** | Occasional / lower-literacy staff | Auto-generated grid of the user's entitled commands (icon + label). |
| **Friendly buttons** | Patients / CHW mobile | Codes hidden; a fixed allowed command set behind plain-language actions. |

See [06 — Unified Dashboard](06-unified-dashboard.md) for the screen design.
