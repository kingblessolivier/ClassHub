# 08 — Security & Cryptography

## Legal framework

- Compliant with Rwanda's data-protection law **N° 058/2021**.
- All personally identifiable health data hosted **exclusively on infrastructure
  physically located within Rwanda**.
- Patient consent is a **first-class object** — enforced *in addition to* technical
  authorisation, not instead of it.

## Authentication

- Every user authenticates through a secure login; sessions are a **JWT** carrying role/
  command set, facility, tenant, and geographic scope.
- Tokens are short-lived and refreshed; expired tokens auto-invalidated.
- **MFA required** for all clinical and administrative roles.
- Failed logins beyond a threshold → automatic account lock + SOC alert.

## Authorisation — four-axis model

- Every API request carries the JWT; the platform verifies command + geography + tenant +
  sensitivity before executing any query.
- An out-of-scope request returns **403**, terminates the session, blacklists the token,
  and logs the event.
- **Principle of least privilege:** every account holds only the commands its function
  requires.

## Encryption

| Layer | Mechanism |
|---|---|
| In transit | TLS 1.3 — no unencrypted connections accepted |
| At rest | AES-256 — database volumes, backups, exported files |
| PHI fields | Additional application-layer encryption before write |
| Keys | HSM / HashiCorp Vault, rotated on schedule, never stored beside data |

## Audit chain

- Every sensitive action writes a log entry **chained to the previous using SHA-256**.
- Any attempt to modify a historical entry breaks the chain and is detected immediately.
- Satisfies legal requirements for forensic evidence and regulatory inspection.

## Cryptography catalogue

| Mechanism | Application |
|---|---|
| AES-256-GCM | Data at rest |
| TLS 1.3 | All data in transit |
| mTLS | Service-to-service authentication in-cluster |
| RSA-4096 / ECDSA P-256 | Digital signatures: prescriptions, radiology, HR contracts, dispensing |
| SHA-256 | Audit-chain hash function |
| Argon2id | Password hashing (memory-hard, GPU-resistant) |
| HMAC-SHA256 | MAC on payment / EBM webhook payloads |
| JWT (RS256) | Session tokens; private key never leaves the HSM |
| PBKDF2 / KDF | Per-tenant key derivation from a master key |
| Certificate pinning | Mobile apps pin server TLS cert (MITM detection) |
| QR code signing | Contracts & dispensing labels carry a signed hash for tamper verification |

## Network security

- Public endpoints behind **Cloudflare Enterprise WAF** (SQLi, XSS dropped at the edge).
- DDoS protection always on.
- Internal communication uses **mTLS**; **zero-trust** — no internal service implicitly trusted.

## Threat monitoring & incident response

- **24/7 SOC** dashboard: active sessions, failed auth, anomalous access, WAF events.
- Alert triage: critical (immediate), high (1h), medium (24h).
- Anomaly detection: off-hours access, export spikes, geographic-scope violations.
- **LOCK command (`SELK`)**: compromised session terminated, JWT blacklisted in Redis,
  account locked — within seconds.
- Response flow: Detection → Assessment → Containment → Eradication → Recovery →
  Post-incident report from the audit chain.
- Confirmed PHI breach → National Cybersecurity Authority + data-protection regulator
  notified within the legally required timeframe.
- Independent penetration tests at minimum annually; container/dependency scanning on
  every deploy; critical/high vulns patched within 48h, medium within 14 days.
