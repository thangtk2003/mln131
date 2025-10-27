# Contributing Guidelines

## How to Contribute

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Make your changes**
4. **Test your changes**
5. **Commit with clear messages**
   ```bash
   git commit -m "Add: feature description"
   ```
6. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```
7. **Create a Pull Request**

## Code Style

### Python (Backend)

- Follow PEP 8
- Use docstrings for functions and classes
- Use type hints where possible
- Keep functions small and focused

### TypeScript (Frontend)

- Use functional components
- Follow Airbnb style guide
- Use TypeScript for type safety
- Keep components under 200 lines

## Commit Message Format

```
Type: Short description

Detailed description if needed

Fixes #issue-number
```

Types:

- `Add:` New feature
- `Fix:` Bug fix
- `Update:` Update existing feature
- `Refactor:` Code refactoring
- `Docs:` Documentation
- `Style:` Formatting
- `Test:` Add/update tests

## Testing

- Write tests for new features
- Ensure all tests pass before PR
- Include integration tests when needed

## Pull Request Process

1. Update README.md if needed
2. Update documentation
3. Ensure CI/CD passes
4. Request review from maintainers
5. Address review comments
6. Squash commits if requested

## Questions?

Open an issue for discussion before major changes.
