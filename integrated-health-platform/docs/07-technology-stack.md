# 07 — Technology Stack

Every technology is production-proven, open-standard where possible, and chosen for
reliability under intermittent connectivity, at scale, with the highest data-sensitivity
classification.

## Backend & API
| Concern | Choice |
|---|---|
| Language / runtime | Python 3.12 |
| API framework | Django + Django REST Framework; FastAPI for high-throughput streaming |
| Real-time / streaming | Django Channels (WebSocket) for vitals; gRPC over HTTP/2 for anaesthesia high-frequency data |
| Task queue | Celery + Redis broker (EBM transmission, FHIR push, SMS, claim batching) |
| API gateway | Kong / AWS API Gateway — rate limiting, JWT validation, routing |

## Frontend & mobile
| Surface | Choice |
|---|---|
| Web admin / desktop | React 18 + TypeScript (keyboard-first command bar SPA) |
| Patient mobile | Flutter (Dart), offline-first with local SQLite |
| CHW mobile | Flutter + Hive; iCCM decision trees + GPS polygon check run on-device, offline |
| Ambulance tablet | Flutter on ruggedised Android; local case file during connectivity loss |
| SMS / USSD | Africa's Talking API |
| Push | Firebase Cloud Messaging; SMS fallback for critical notifications |

## Database
| Concern | Choice |
|---|---|
| Primary relational | PostgreSQL 16 — ACID, row-level security, PostGIS |
| Connection pooling | PgBouncer (transaction mode) |
| Cache | Redis 7 — sessions, JWT blacklist, rate limits, dashboard pre-compute, broker |
| Document / PACS | MinIO (S3-compatible), on-premises, no PHI leaves the country |
| Time-series | TimescaleDB — vitals streams, IoT temperature, telemetry |
| Search | Elasticsearch — patient record + drug catalogue lookup |

## Infrastructure & deployment
| Concern | Choice |
|---|---|
| Containerisation | Docker |
| Orchestration | Kubernetes |
| Service mesh | Istio (mTLS, traffic management, observability) |
| Load balancer | HAProxy (app tier) + NGINX (reverse proxy / TLS terminator) |
| Edge / WAF | Cloudflare Enterprise (DDoS, WAF, CDN) |
| CI/CD | GitHub Actions |
| IaC | Terraform (provisioning) + Ansible (config) |
| Postgres HA | Patroni — primary + ≥2 hot standbys, failover < 10s |

## Interoperability & standards
| Concern | Choice |
|---|---|
| Health data exchange | HL7 FHIR R4 |
| Imaging | DICOM; Orthanc PACS |
| Diagnosis coding | ICD-10/11; WHO ATC for drugs |
| Identity | OpenID Connect / OAuth 2.0; JWT (RS256) |
| Geospatial | GeoJSON + PostGIS |

## Monitoring & observability
| Concern | Choice |
|---|---|
| Metrics | Prometheus + Grafana |
| Logging | Structured JSON → Elasticsearch → Kibana |
| Tracing | Jaeger |
| Alerting | Alertmanager → PagerDuty on-call |
| Uptime | Synthetic checks every 60s from multiple locations |

## Performance targets
| Operation | Target |
|---|---|
| Patient registration (NIDA → encounter) | < 2s (p95) |
| Prescription code lookup | < 500ms |
| Dashboard load (materialised view) | < 1s |
| EBM invoice transmission | < 3s |
| FHIR bundle push to DHIS2 | < 30s (hourly batch) |
| Database failover | < 10s |
