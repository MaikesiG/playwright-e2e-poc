# 🎭 Playwright E2E POC

A production-ready Playwright E2E test suite integrated with Azure DevOps CI/CD pipeline.

## 📁 Project Structure

```text
playwright-e2e-poc/
├── tests/
│   ├── smoke/
│   │   ├── homepage.spec.ts       # Homepage smoke tests
│   │   └── navigation.spec.ts     # Navigation smoke tests
│   └── e2e/
│       └── docs.spec.ts           # Full E2E flow tests
├── playwright.config.ts           # Playwright configuration
├── azure-pipelines.yml            # Azure DevOps CI/CD pipeline
├── package.json
├── tsconfig.json
└── .env.example                   # Environment variable template
```

## 🚀 Quick Start

### Prerequisites

- Node.js v18 or higher
- npm v8 or higher

### Installation

```bash
# Clone the repository
git clone https://github.com/MaikesiG/playwright-e2e-poc.git
cd playwright-e2e-poc

# Install dependencies
npm install

# Install Playwright browsers
npx playwright install chromium
```

### Environment Setup

```bash
# Copy the example env file
cp .env.example .env
```

Edit `.env` with your target environment URL:

```env
BASE_URL=https://playwright.dev
```

## 🧪 Running Tests

### Run all tests

```bash
npm run test
```

### Run smoke tests only

```bash
npm run test:smoke
```

### Run E2E tests only

```bash
npm run test:e2e
```

### Run tests in headed mode

```bash
npm run test:headed
```

### View HTML report

```bash
npm run report
```

## 🌐 Environments

| Environment | BASE_URL                                 | How to run             |
| ----------- | ---------------------------------------- | ---------------------- |
| Local       | `https://playwright.dev` (default)       | `npm run test`         |
| Dev         | Set `BASE_URL` in Azure DevOps variables | Auto-triggered on push |

## ⚙️ Azure DevOps Pipeline

The pipeline is defined in `azure-pipelines.yml` and runs automatically on:

- Every push to `main` or `dev` branch
- Every Pull Request targeting `main`

### Pipeline Stages

```text
Push to GitHub
      ↓
Stage 1: Test
  - Install Node.js 20
  - npm ci
  - Install Playwright Chromium
  - Run smoke tests
  - Publish JUnit results
  - Publish HTML report artifact
      ↓
Stage 2: Deploy (only if tests pass ✅)
  - Deploy to dev environment
```

### Setting Up the Pipeline

1. Go to `https://dev.azure.com`
2. Open **North Star POC** project
3. Click **Pipelines** → **New Pipeline**
4. Select **GitHub** → choose this repo
5. Select **Existing Azure Pipelines YAML file** → `/azure-pipelines.yml`
6. Add pipeline variable: `BASE_URL` = your target URL
7. Click **Save and Run**

### Viewing Test Results

After each pipeline run:

- **Tests tab** — pass/fail breakdown per test
- **Artifacts** → `playwright-report` → download and open `index.html`

## 📊 Test Coverage

| Suite              | Tests        | Description                             |
| ------------------ | ------------ | --------------------------------------- |
| `smoke/homepage`   | 4 tests      | Page load, title, heading, CTA button   |
| `smoke/navigation` | 3 tests      | Link clicks, URL changes, logo nav      |
| `e2e/docs`         | 3 tests      | Full user flow, install docs, meta tags |
| **Total**          | **10 tests** | All passing ✅                          |

## 🔧 Configuration

Key settings in `playwright.config.ts`:

| Setting    | Local          | CI             |
| ---------- | -------------- | -------------- |
| `retries`  | 0              | 2              |
| `workers`  | 2              | 4              |
| `headless` | true           | true           |
| `timeout`  | 60s            | 60s            |
| `trace`    | on-first-retry | on-first-retry |

## 📝 Adding New Tests

### Add a smoke test

Create a new file in `tests/smoke/`:

```ts
import { test, expect } from '@playwright/test';

test.describe('Smoke - Your Feature', () => {
  test('your test name', async ({ page }) => {
    await page.goto('/your-path');
    await expect(page.locator('h1')).toBeVisible();
  });
});
```

### Add an E2E test

Create a new file in `tests/e2e/`:

```ts
import { test, expect } from '@playwright/test';

test.describe('E2E - Your Flow', () => {
  test('complete user flow', async ({ page }) => {
    await page.goto('/');
    // your steps here
  });
});
```

## 🛠️ Tech Stack

- Playwright v1.54+
- TypeScript v5.8+
- Azure DevOps Pipelines
- GitHub

## 📌 Next Steps

- [ ] Connect to real dev/staging environment
- [ ] Add authentication tests with `storageState`
- [ ] Expand to Firefox and WebKit browsers
- [ ] Add Slack notifications on pipeline failure
- [ ] Set up Power BI dashboard for test metrics

## 👤 Author

Xingchi Guo — Site Reliability Engineer
