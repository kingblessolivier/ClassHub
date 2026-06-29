# 02 — Users & Access

The platform serves every human who touches Rwanda's health system. Each group has a
precisely bounded slice, defined by its **command bundle** (what it can do) and its
**data scope** (Geography · Tenant · Sensitivity).

## National government & regulatory

| User | Data scope |
|---|---|
| Minister / PS / DG Health | National — aggregate & de-identified only |
| RBC programme managers (HIV, TB, malaria, immunisation) | National programme + eIDSR surveillance |
| Rwanda FDA | National regulatory — drugs, licences, recalls, imports |
| RSSB | National insurance / claims clearing house |
| RMS (Rwanda Medical Supply) | National procurement, warehousing, EML |
| National Pharmacy Council | Pharmacist licence registry |
| MoH planning / M&E / financing | National aggregates, budgets, PBF |
| DG Digitisation / National IT | System-wide admin, SOC, audit chain |

## Province / District / Sector / Cell

| User | Data scope |
|---|---|
| Provincial coordinator / director | Province (district aggregates) |
| District Health Officer / director | District (all facilities) |
| District epidemiologist | District surveillance |
| District pharmacist / stock manager | District inventory |
| District CBHI / mutuelle manager | District fund |
| Health-centre director / sector in-charge | Facility + community |
| Cell health coordinator | Cell — supervises CHWs |

## Community health workers (abajyanama b'ubuzima)

| User | Data scope |
|---|---|
| Binôme (male-female CHW pair) | Their **village polygon** only |
| ASM (Agent de Santé Maternelle) | Their village — maternal & newborn |
| CHW cooperative | Cooperative PBF only |

## Facility clinical staff

Reception / ADT clerk · OPD clinician & specialist · Emergency physician · Ward nurse ·
Anaesthetist / theatre team · Laboratory technologist · Radiologist · Midwife ·
Mortuary officer.

**Scope:** facility tenant, patient-in-their-care.

## Hospital leadership & back office

Hospital director · Finance officer · HR officer · Claims officer · Data / M&E officer.

**Scope:** facility-scoped management dashboards.

## Pharmacy & supply chain

Dispensing pharmacist · Pharmacy cashier / technician · Pharmacy owner ·
Procurement officer · Wholesalers / distributors (SOPHAR, Ubipharm, Abacus…).

**Scope:** own pharmacy tenant / B2B marketplace.

## Patients & citizens

Patient (smartphone) · Patient (feature phone, SMS/USSD) · Caregiver / proxy ·
Diaspora (cross-border payment).

**Scope:** own record only, or delegated within consent.

## Humanitarian

Refugees / displaced persons (identity via UNHCR ProGres) · Camp clinic medical officers ·
Camp pharmacists (donor grant ledger, zero patient cost).

**Scope:** camp tenant.

## Partners & external organisations

Private hospitals / clinics (own tenant) · Private insurers (own claims) ·
Donors & multilaterals (read-only, anonymised) · International NGOs (their districts) ·
International suppliers (import side) · Research & academic partners (governed, anonymised).

## What each user may NOT see (examples)

| Actor | May NOT see |
|---|---|
| CHW | Patients from another village; notes they did not write |
| Cell coordinator | Individual patient clinical records |
| District epidemiologist | Patient names or individual clinical notes |
| District CBHI manager | Clinical content of claims |
| MoH / DG Health | Any individually identifiable patient record |
| Pharmacy owner | Individual patient records / clinical details |
| Donor / multilateral | Individual records; financial detail beyond programme spend |
| SOC / IT analyst | Clinical content of patient records |

See [03 — Command Catalogue](03-command-catalogue.md) for the exact command bundle
assigned to each user group.
