# 03 — Command Catalogue

The command is the **atomic unit of access**. Naming convention:
**`<2-char domain><2-char action>`** — learnable mnemonics in the spirit of Finacle
menu codes.

Every command maps to exactly one action + one resource and is **independently
auditable**: each execution writes `who · command · resource · when` to the audit chain.

`ANVW` (the dashboard) is held by **every** user; it renders at the holder's data altitude.

---

## Command catalogue (~110 commands, 28 domains)

### PT — Patient
| Code | Action |
|---|---|
| `PTRG` | Register patient (NIDA auto-fill) |
| `PTSR` | Search patient |
| `PTVW` | View longitudinal record |
| `PTED` | Edit demographics |
| `PTMG` | Merge duplicate (master patient index) |
| `PTTM` | Create temporary identity (newborn / emergency / refugee) |
| `PTFC` | Find care (patient-facing) |

### CN — Consent
| Code | Action |
|---|---|
| `CNVW` | View consent settings |
| `CNGR` | Grant consent |
| `CNRV` | Revoke consent |

### EN — Encounter / Clinical
| Code | Action |
|---|---|
| `ENNW` | Open / new encounter |
| `ENHX` | Review history / timeline |
| `ENVT` | Record vitals |
| `ENDX` | Diagnosis (ICD-10/11) |
| `ENNT` | Clinical notes |
| `ENCL` | Close encounter |

### RX — Prescription
| Code | Action |
|---|---|
| `RXNW` | Prescribe (digital sign) |
| `RXVW` | View prescriptions |
| `RXVF` | Verify prescription (pharmacist) |
| `RXDP` | Dispense (FEFO + barcode) |
| `RXAD` | Administer medication (nurse, five rights) |
| `RXCN` | Cancel / amend |

### LB — Laboratory
| Code | Action |
|---|---|
| `LBOR` | Order lab test |
| `LBSP` | Specimen track-and-trace |
| `LBRS` | Result entry |
| `LBSN` | Result sign-off |
| `LBVW` | View results |

### IM — Imaging / Radiology
| Code | Action |
|---|---|
| `IMOR` | Order imaging |
| `IMVW` | View DICOM images |
| `IMRP` | Draft report |
| `IMSN` | Sign report (digital signature) |

### SX — Surgery / Theatre
| Code | Action |
|---|---|
| `SXSL` | WHO surgical safety checklist |
| `SXVT` | Perioperative vitals stream |
| `SXRC` | Operative record |

### MT — Maternity
| Code | Action |
|---|---|
| `MTAN` | Antenatal visit |
| `MTDL` | Delivery record |
| `MTBR` | Birth registration |
| `MTPN` | Postnatal follow-up |

### MR — Mortuary / Death
| Code | Action |
|---|---|
| `MRDR` | Death record (ICD cause) |
| `MRCR` | Civil-registration feed |

### CH — Community Health (CHW / iCCM)
| Code | Action |
|---|---|
| `CHHH` | Household visit list |
| `CHIC` | iCCM assessment (sick child) |
| `CHRD` | RDT result + auto dose calc |
| `CHKT` | Virtual health-kit balance |
| `CHFP` | Family planning |
| `CHTB` | TB DOT |
| `CHNC` | NCD prevention |
| `CHKA` | Kit audit (cell coordinator) |
| `CHVD` | Validate community data |

### RF — Referral
| Code | Action |
|---|---|
| `RFNW` | Create referral (6-digit tracking code) |
| `RFRC` | Receive referral by code |
| `RFTR` | Track referral status |

### ST — Stock / Inventory
| Code | Action |
|---|---|
| `STIN` | Stock inquiry / levels |
| `STRC` | Receive goods (batch / expiry) |
| `STTK` | Stock take / reconcile |
| `STTR` | Inter-facility transfer |
| `STEX` | Expiry monitoring (90/60/30) |
| `STCC` | Cold-chain monitoring |

### PH — Pharmacy POS
| Code | Action |
|---|---|
| `PHPS` | Point-of-sale sale |
| `PHSP` | Insurer / patient split |
| `PHMM` | Mobile-money request-to-pay |
| `PHEB` | RRA EBM certified receipt |
| `PHCS` | Controlled-substance register |

### SC — Supply Chain / B2B
| Code | Action |
|---|---|
| `SCMP` | B2B marketplace browse |
| `SCRO` | Reorder recommendation |
| `SCPO` | Purchase order |
| `SCRV` | Goods-receiving verify |
| `SCCT` | Distributor catalogue (seller side) |
| `SCNS` | National supply intelligence |

### CL — Claims / Insurance
| Code | Action |
|---|---|
| `CLEL` | Eligibility check |
| `CLSB` | Submit claim / batch |
| `CLSC` | AI scrubbing queue |
| `CLRV` | Review dispute |
| `CLST` | Settlement status |
| `CLUT` | Utilisation reporting |

### CB — CBHI / Mutuelle
| Code | Action |
|---|---|
| `CBEN` | Enrolment |
| `CBPR` | Premiums / collections |
| `CBPP` | Provider payments |
| `CBFB` | Fund balance |

### BL — Billing / Payments
| Code | Action |
|---|---|
| `BLVW` | View bills |
| `BLPY` | Pay (mobile money) |
| `BLXB` | Cross-border payment (diaspora) |

### HR — Workforce
| Code | Action |
|---|---|
| `HRON` | Onboard (NIDA + licence check) |
| `HRCT` | Generate digital contract |
| `HRTR` | Transfer staff |
| `HRLC` | Licence / compliance tracking |
| `HRTN` | Training records |

### PY — Payroll
| Code | Action |
|---|---|
| `PYRN` | Run payroll |
| `PYDD` | Statutory deductions (PAYE / RSSB) |
| `PYAD` | Salary advance |
| `PYSL` | Payslip self-service |

### EM — Emergency / Ambulance
| Code | Action |
|---|---|
| `EMSO` | Patient SOS (one-tap, GPS) |
| `EMIN` | Intake request (912 / SOS / transfer) |
| `EMDS` | Dispatch nearest unit (PostGIS) |
| `EMRT` | Route to crew |
| `EMCF` | Pre-hospital case file |
| `EMTL` | Vitals telemetry stream |
| `EMDM` | Destination matching |
| `EMHO` | Handover to ED |
| `EMFL` | Fleet management |

### SV — Surveillance / Epidemiology
| Code | Action |
|---|---|
| `SVMP` | Disease cluster map (real-time) |
| `SVAL` | Outbreak alert / threshold |
| `SVOR` | Outbreak response |
| `SVDQ` | Data quality / completeness |

### PB — Performance-Based Financing
| Code | Action |
|---|---|
| `PBVW` | View PBF score |
| `PBSC` | PBF scoring |
| `PBAP` | Approve / trigger payment |

### RG — Regulatory (Rwanda FDA)
| Code | Action |
|---|---|
| `RGDR` | Drug registration |
| `RGLI` | Import licence |
| `RGPV` | Pharmacovigilance / ADR |
| `RGRC` | Recall management |
| `RGLC` | Licence registry |

### CT — Catalogue (medicine master)
| Code | Action |
|---|---|
| `CTVW` | View catalogue |
| `CTMG` | Manage catalogue (FDA reg / ATC / EBM tax) |

### AN — Analytics
| Code | Action |
|---|---|
| `ANVW` | Role-scoped dashboard view (renders at user altitude) |

### RS — Research
| Code | Action |
|---|---|
| `RSRQ` | Research data request |
| `RSDS` | Provision anonymised dataset |

### DN — Donor
| Code | Action |
|---|---|
| `DNRP` | Programme reporting (anonymised) |

### AD — Administration
| Code | Action |
|---|---|
| `ADUC` | User create |
| `ADUE` | User edit / scope |
| `ADCA` | Assign commands to user |
| `ADCB` | Manage command bundles |
| `ADUR` | Revoke / deactivate user |
| `ADAU` | Audit-chain view |

### SE — Security / SOC
| Code | Action |
|---|---|
| `SESD` | Security dashboard |
| `SELK` | LOCK (kill session, blacklist JWT, lock account) |
| `SEWA` | WAF rules management |
| `SEAN` | Anomaly / fraud alerts |
| `SEKR` | Key management / rotation |
| `SEPT` | Pen-test / vulnerability management |

### IT — IT Ops / Integration
| Code | Action |
|---|---|
| `ITSY` | Cluster / SysOps health |
| `ITBK` | Backup / restore |
| `ITSN` | Offline-sync management |
| `ITIN` | Integration endpoints (NIDA / EBM / FHIR) |
| `ITDQ` | Data-quality monitoring |
| `ITEP` | Endpoint / device management |

---

## Command bundles (preset packs per user)

Bundles are templates the admin applies, then adds/removes individual commands.
The command remains the atom; bundles are convenience. `ANVW` is implied in all.

| Bundle | Commands |
|---|---|
| CHW – Binôme | `CHHH CHIC CHRD CHKT CHFP CHTB CHNC RFNW RFTR PTTM PTVW PBVW` |
| CHW – ASM | `MTAN MTPN CHHH RFNW RFTR PTTM PBVW` |
| Cell coordinator | `CHKA CHVD STIN SVAL PBVW` |
| Reception / ADT clerk | `PTRG PTSR PTVW ENNW CLEL BLVW BLPY` |
| OPD clinician | `PTSR PTVW ENNW ENHX ENVT ENDX ENNT ENCL RXNW LBOR IMOR RFNW CNVW` |
| Emergency physician | OPD clinician + `PTTM EMTL EMDM` |
| Ward nurse | `PTVW ENVT RXVW RXAD` |
| Anaesthetist / theatre | `SXSL SXVT SXRC ENVT` |
| Lab technologist | `LBSP LBRS LBSN LBVW` |
| Radiologist | `IMVW IMRP IMSN` |
| Midwife | `MTAN MTDL MTBR MTPN PTTM` |
| Mortuary officer | `MRDR MRCR` |
| Dispensing pharmacist | `RXVF RXDP STIN STEX PHCS CTVW` |
| Pharmacy cashier | `PHPS PHSP PHMM PHEB STIN` |
| Pharmacy owner | `STIN STEX CLST SCRO BLVW` |
| Procurement officer | `SCMP SCRO SCPO SCRV STIN STRC` |
| Wholesaler / distributor | `SCCT SCMP PHEB` |
| Health-centre / sector director | `RFRC STIN PBSC PBAP CBFB` |
| Hospital director | `STIN CLST HRLC PBSC` |
| Hospital finance | `CLSB CLST BLVW CBFB` |
| Hospital HR | `HRON HRCT HRTR HRLC HRTN ADUC ADUE` |
| Claims officer | `CLSB CLSC CLRV CLST` |
| District Health Officer | `STIN STTR CBFB EMFL PBSC` |
| District epidemiologist | `SVMP SVAL SVOR SVDQ STIN` |
| District pharmacist | `STIN STTR STEX SCNS` |
| District CBHI manager | `CBEN CBPR CBPP CBFB CLST` |
| Provincial coordinator | `ANVW` (province aggregates) |
| MoH / national | `SVMP SCNS CBFB ITDQ` (de-identified) |
| RBC programme | `SVMP SVAL` |
| Rwanda FDA | `RGDR RGLI RGPV RGRC RGLC CTMG` |
| RSSB | `CLSC CLRV CLST CLUT SEAN` |
| RMS | `SCNS STIN CTMG` |
| Pharmacy Council | `RGLC` |
| Patient (app) | `PTVW PTFC RXVW LBVW IMVW BLVW BLPY CNGR CNRV RFTR EMSO` |
| Patient (feature phone) | `RXVW BLPY RFTR` (USSD subset) |
| Caregiver / proxy | patient subset, consent-delegated |
| Diaspora | `BLXB BLVW` (named dependant, within consent) |
| Ambulance crew | `EMCF EMTL EMDM EMHO EMRT` |
| SAMU dispatcher | `EMIN EMDS EMFL EMRT` |
| Camp MO | OPD clinician (camp tenant) |
| Camp pharmacist | `RXDP PHPS STIN` (donor ledger, zero-cost) |
| Private insurer | `CLEL CLRV CLST` (own claims) |
| Donor / multilateral | `DNRP` (anonymised) |
| Researcher | `RSRQ RSDS` (governed / anonymised) |
| IT / SOC analyst | `SESD SELK SEWA SEAN SEKR SEPT ADAU ITSY ITBK ITSN ITIN ITDQ ITEP` |
| Super-admin (DG Digitisation) | all `AD*` + `SE*` + `IT*` |
