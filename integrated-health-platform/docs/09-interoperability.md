# 09 — Interoperability & Integration

The platform is the **orchestrating layer, not the end point**. Every integration is
reliable, standardised, and independently testable. It builds what is missing and
integrates what the state already runs.

## National & external integrations

| System | Method | Used for |
|---|---|---|
| **NIDA** | REST over HTTPS; returns verified demographic profile (partnership-gated) | Registration, staff onboarding |
| **RSSB / KWIVUZA** | REST; eligibility (sync), claim submission (batch), settlement webhook | Insurance eligibility, claims |
| **RRA EBM 2.0** | REST; submit JSON invoice → receive cryptographic certification token | Every sale transaction |
| **DHIS2 / HMIS** | HL7 FHIR R4 bundles pushed hourly | National health reporting |
| **eIDSR** | DHIS2 data-entry API; notifiable-disease counts + outbreak triggers | Disease surveillance |
| **SAMU / E-Banguka** | REST; emergency requests with GPS, ambulance status, pre-hospital stream | Emergency dispatch |
| **UNHCR ProGres** | REST; refugee registration status by case file (agreement required) | Refugee intake |
| **MTN MoMo / Airtel Money** | Open developer API; collections, disbursements, webhook confirmation | Co-payments, payroll |
| **Africa's Talking** | REST; SMS + USSD sessions | All SMS / USSD flows |
| **Maps / geolocation** | Geolocation, routing, place search | Patient find-care, EMS routing |
| **National Pharmacy Council** | API / scheduled sync verifying pharmacist licence | Pharmacist onboarding |

## Resilience — Circuit Breaker pattern

If a national system (NIDA, KWIVUZA) becomes unavailable, the circuit breaker **opens**:

- The platform **queues** requests and **degrades gracefully** — registration proceeds
  with manual entry; insurance check is deferred.
- When the external system recovers, queued requests are **replayed automatically**.

> **No integration failure ever stops a patient from receiving care.**

## Data flow principles

- Every care event automatically feeds the relevant national system — no manual report at
  any tier.
- FHIR bundles push to DHIS2/eIDSR on schedule; EBM receipts transmit in real time per sale.
- All exchange uses open standards (FHIR R4, DICOM, ICD, ATC) so each integration is
  independently testable and the sovereign systems stay in government hands.
