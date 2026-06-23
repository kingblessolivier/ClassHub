# Contributing to ClassHub

Thanks for your interest in improving ClassHub! 🎉

## Ways to contribute
- 🐛 Report bugs via [issues](https://github.com/kingblessolivier/ClassHub/issues)
- 💡 Suggest features
- 📝 Improve documentation
- 🔧 Submit pull requests

## Development workflow

1. **Fork** the repo and clone your fork.
2. Create a feature branch:
   ```bash
   git checkout -b feature/short-description
   ```
3. Make your change. Keep commits small and focused.
4. Test in the browser (open `classhub.html` against your Firebase project).
5. Push and open a **Pull Request** against `main`.

## Commit messages
Use clear, imperative messages, e.g.:
- `Add toast notifications for submission errors`
- `Fix calendar deadline off-by-one`

## Code style
- Vanilla JS — keep functions small and named by what they do.
- Match the existing CSS-variable naming in the `<style>` block.
- No new build tooling unless discussed in an issue first.

## Pull request checklist
- [ ] The change works in the browser
- [ ] Firestore rules still pass (`firebase deploy --only firestore:rules --dry-run`)
- [ ] No secrets committed
- [ ] README/docs updated if behavior changed

Happy hacking! 🚀
