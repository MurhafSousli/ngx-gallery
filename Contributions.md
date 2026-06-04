# Contributing to ng-gallery

Thank you for your interest in contributing! To maintain high code quality and ensure SSR compatibility,
please follow these guidelines. This project is built with **Angular v21** (Signals-first, Zoneless) and **Storybook v10 (CFS Next)**.

## 🛠️ Development Workflow

### 1. Environment Setup

Ensure you have [Node.js](https://nodejs.org/)@26 installed.

```bash
# Install dependencies
npm install
```

```bash
# Install Playwright browsers (Required for Vitest browser testing)
npx playwright install chromium
```

### 2. Local Development

We use Storybook 10 for component documentation and interactive guides.

 * Storybook: npm run storybook-serve

### 3. The Demo App (ng-gallery-demo)

The demo app is a standalone Angular application used specifically to test the library within a real Angular environment and to verify Server-Side Rendering (SSR) compatibility.

 * Run Demo: `npm run start`

***

## 🧪 Testing & Quality Control

Our CI pipeline enforces a strict `Build Lib` ➔ `Lint Lib` ➔ `Test Lib` ➔ `Build SSR` flow.
Please run these locally before submitting a Pull Request.

### 1. Build the Library

The library must be built first to ensure ng-packagr configurations and entry points are correct.

```bash
npm run build-lib
```

### 2. Linting

We use angular-eslint and typescript-eslint to maintain code standards.

```bash
npm run lint-lib
```

### 3. Running Tests

We use Vitest with Playwright Chromium for fast, reliable component testing.

```bash
# Run tests with the browser UI
npm run test-lib
```

### 4. SSR Verification

Because Storybook is not a native Angular SSR environment, you must verify that your changes do not break Server-Side Rendering.
We do this by building the `ng-gallery-demo` project.

```bash
# Build the demo application with SSR enabled
npm run build-ssr
```

> Note: If this build fails, it usually means your code is referencing browser-only globals (like `window` or `localStorage`) without a platform check.

***

## 📝 Pull Request Process

 1. Branching: Create a feature branch from `master`.
 2. Signals & State: This project is "Zoneless". Ensure all new inputs use the `input()` signal and state management uses `signal()` or `computed()`.
 3. SSR Safety: Always use `isPlatformBrowser` or `inject(PLATFORM_ID)` when using browser-specific APIs.
 4. Verification: Ensure your local scripts pass in this order: `Build Lib` ➔ `Lint` ➔ `Test` ➔ `Build SSR`.
