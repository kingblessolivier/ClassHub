# 05 — Design System

The foundation every face is built on. Multi-platform (React web, Flutter mobile,
SMS/USSD, ambulance tablet) means **shared design tokens** are mandatory so one source
of truth drives both React (CSS variables) and Flutter (Dart theme).

## Color

Color does functional work here — it carries **state**, so semantic colors are reserved
*only* for their meaning and never used decoratively.

### Brand
| Role | Hex | Use |
|---|---|---|
| Primary teal-green | `#0E7C7B` | Brand, accents, active states |
| Primary deep green | `#06402B` | Top bar, headers, dark surfaces (nods to Rwanda) |
| Primary tint | `#E6F2F1` | Backgrounds, selected fills |

### Semantic (load-bearing)
| Meaning | Hex | Use |
|---|---|---|
| 🔴 Critical / Emergency | `#D32F2F` | SOS, interaction alerts, expired batch, account lock |
| 🟠 Warning / Offline-autonomous | `#F5A623` | Sync banner (offline), low stock, licence expiring |
| 🟢 Success / Synced / Healthy | `#2E7D32` | Synced banner, claim paid, in-range vitals |
| 🔵 Info / Neutral action | `#1565C0` | Links, info notices (kept distinct from brand teal) |

### Neutrals
| Role | Hex |
|---|---|
| Ink / primary text | `#1A1A2E` |
| Secondary text | `#5A6472` |
| Border / divider | `#D9DEE4` |
| App background | `#F4F6F8` |
| Surface / card | `#FFFFFF` |

### Data-visualization (colorblind-safe, distinct from alerts)
`#0E7C7B · #4C9F70 · #8AB17D · #E9C46A · #F4A261 · #6A8EAE` + sequential teal ramp for
choropleth disease maps.

**Discipline:** Teal = brand. Red/Amber/Green = state only. Blue = info. Greys =
everything else. Never use color alone — always pair with an icon + text label.

## Typography

Humanist sans (**Inter**), legible at small sizes and in sunlight.

| Token | Size | Use |
|---|---|---|
| Display | 32 | Page titles |
| H1 | 24 | Section headers |
| H2 | 20 | Sub-sections |
| Body | 16 | Default |
| Caption | 13 | Metadata, labels |

Must render **Kinyarwanda diacritics** cleanly; plan for ~30% text expansion across
Kinyarwanda / French / English.

## Spacing & density

- 8px base grid; cards 8px radius; subtle shadows.
- **Two density modes:** dense (clinical desktop, dashboards) vs spacious with ≥48dp tap
  targets (CHW, patient, ambulance).

## Core components

NIDA-lookup field · longitudinal timeline · FEFO batch picker · status badge ·
**sync banner** · barcode-scan overlay · consent toggle · KPI card · drill-down map ·
**command bar** · tile launcher.

## Accessibility & inclusion

- **WCAG 2.2 AA**: body text ≥ 4.5:1, large text / UI ≥ 3:1.
- High contrast for **sunlight readability** (CHWs, ambulance crews work outdoors).
- Icons **always paired with text labels** (low-literacy users).
- Status **never by color alone**.
- Screen-reader support; large tap targets.
- Test every semantic color in grayscale + a deuteranopia simulator before shipping.

## Per-face tone

- **Patient app:** warmer, friendlier, more whitespace, multilingual.
- **Clinical / dashboards:** neutral, dense; saturated color reserved for status.
- **Ambulance tablet:** consider a dark surface so a bright screen doesn't blind a night
  driver; high-contrast vitals.
