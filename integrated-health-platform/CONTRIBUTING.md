# Contributing

Thanks for your interest in the Integrated National Health Platform.

## Ground rules

- This is a health system handling sensitive data. **Never commit real patient
  data, credentials, API keys, or `.env` files.**
- Documentation lives in [`docs/`](docs/). Keep the numbered ordering and update the
  index in [`README.md`](README.md) when you add a doc.
- Use clear, descriptive commit messages.

## Workflow

1. Create a feature branch off `main`.
2. Make your change (docs or code).
3. Open a pull request describing what changed and why.
4. At least one review is required before merge; squash-and-merge is preferred.

## Design & architecture decisions

Architectural changes (the command catalogue, the access-control model, the
four-axis scoping) should be discussed in an issue before implementation, since they
affect every part of the platform. See:

- [docs/04-access-control-model.md](docs/04-access-control-model.md)
- [docs/03-command-catalogue.md](docs/03-command-catalogue.md)

## Style

- Markdown: wrap prose reasonably; use tables for catalogues; keep headings hierarchical.
- Code (when added): follow the conventions in [docs/07-technology-stack.md](docs/07-technology-stack.md).
