# 01 — Architecture

## Vision

Rwanda runs strong national health systems — DHIS2 (reporting), eIDSR (surveillance),
RSSB/KWIVUZA (insurance), NIDA (identity), RMS (medical supply), SAMU 912 (emergency),
RRA EBM (tax invoicing). Their shared weakness is **fragmentation**: they do not talk
to each other at the point of care.

The platform is **one unified national health rail** that connects every actor on one
shared core, where every care event automatically feeds the national systems, and each
actor sees precisely the slice of data their role, location, organisation, and clearance
permit.

## The four layers

Every layer depends on the one below it and feeds the one above it.

```
┌─────────────────────────────────────────────────────────────┐
│ Layer 4 — Oversight & Intelligence                           │
│ MoH, RBC, FDA, RSSB, RMS, provinces, districts, sectors.     │
│ Analytics, surveillance, vital statistics.                   │
│ Data here is ALWAYS aggregated and de-identified.            │
├─────────────────────────────────────────────────────────────┤
│ Layer 3 — Three User Faces                                   │
│ Clinical face · Pharmacy face · Patient face                 │
│ (web SPA, Flutter mobile, SMS/USSD, ambulance tablet)        │
├─────────────────────────────────────────────────────────────┤
│ Layer 2 — Shared Core                                        │
│ One patient record · One medicine catalogue ·               │
│ One inventory ledger · One financial ledger.                 │
│ The single source of truth.                                  │
├─────────────────────────────────────────────────────────────┤
│ Layer 1 — Foundation                                         │
│ Identity & access (NIDA, JWT, four-axis), HL7 FHIR,          │
│ consent management, immutable audit chain, offline-first.    │
└─────────────────────────────────────────────────────────────┘
```

## The four-axis access model

No actor receives "the system." Every login resolves to a bounded window cut
simultaneously along four dimensions, enforced by combined role-based (RBAC) and
attribute-based (ABAC) access control.

| Axis | Meaning | Example |
|---|---|---|
| **Role / Command** | What the actor is authorised to do | A cashier cannot write a clinical diagnosis |
| **Geography** | Where they may operate | A Karongi district officer sees Karongi only |
| **Tenant / organisation** | Whose data they may touch | A private insurer sees only its own claims |
| **Sensitivity / altitude** | How identifiable the data may be | The Minister sees rates, never a patient's name |

**As altitude rises, data is progressively aggregated and de-identified.**

In this platform the **Role axis is expressed as commands** (see
[04 — Access-Control Model](04-access-control-model.md)). The command grants the
*function*; the other three axes bound the *data*.
