# Contributing to @loyalteez/react-components

Thank you for your interest in contributing! This document provides guidelines and instructions for contributing.

## Development Setup

### Prerequisites

- Node.js 18+
- pnpm 9+

### Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/Alpha4-Labs/loyalteez-react-components.git
   cd loyalteez-react-components
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Start Storybook:
   ```bash
   pnpm dev
   ```

4. Open [http://localhost:6006](http://localhost:6006) to view Storybook.

## Development Workflow

### Creating a New Component

1. Create a new directory in `src/components/`:
   ```
   src/components/MyComponent/
   ├── MyComponent.tsx        # Main component
   ├── MyComponent.styles.ts  # CVA styles
   ├── MyComponent.stories.tsx # Storybook stories
   ├── MyComponent.test.tsx   # Tests
   ├── useMyComponent.ts      # Headless hook (optional)
   ├── types.ts               # TypeScript types
   └── index.ts               # Exports
   ```

2. Export from `src/components/index.ts`

3. Export from `src/index.ts`

### Code Style

- Use TypeScript for all code
- Follow existing patterns in the codebase
- Use CVA (class-variance-authority) for component variants
- Use `cn()` utility for className merging
- Write tests for all components
- Create Storybook stories for visual documentation

### Running Tests

```bash
# Run all tests
pnpm test

# Run tests with UI
pnpm test:ui

# Run tests with coverage
pnpm test:coverage
```

### Linting and Formatting

```bash
# Lint
pnpm lint

# Fix lint errors
pnpm lint:fix

# Format code
pnpm format

# Check formatting
pnpm format:check

# Type check
pnpm typecheck
```

### Building

```bash
# Build the library
pnpm build

# Build Storybook
pnpm build-storybook
```

## Creating a Changeset

When you make changes that should be released, create a changeset:

```bash
pnpm changeset
```

Follow the prompts to describe your changes. Changesets should be included with your PR.

## Pull Request Process

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Run tests and linting
5. Create a changeset if needed
6. Commit your changes (`git commit -m 'feat: add amazing feature'`)
7. Push to your fork (`git push origin feature/amazing-feature`)
8. Open a Pull Request

### Commit Message Format

We follow [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc.)
- `refactor:` - Code refactoring
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks

## Component Guidelines

### Accessibility

- All components must be accessible (WCAG 2.1 AA)
- Use semantic HTML elements
- Include proper ARIA attributes
- Support keyboard navigation
- Test with screen readers

### Performance

- Keep bundle size small
- Use tree-shaking friendly exports
- Avoid unnecessary re-renders
- Lazy load when appropriate

### Documentation

- Write clear JSDoc comments
- Create comprehensive Storybook stories
- Include usage examples in stories
- Document all props

## Questions?

Feel free to open an issue or reach out to the maintainers!

