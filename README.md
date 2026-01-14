# Automation Exercise

This repository contains an end-to-end automation framework prepared as a recruitment task.  
It covers both **UI automation** for https://www.saucedemo.com and **API automation** for https://dummyjson.com.

The framework is built using CodeceptJS, Playwright, Gherkin syntax and Allure Report for test execution analysis and reporting.

# UI and API in One Repository – Design Decision

For this recruitment task, UI and API automation were implemented within a single repository, but as fully separated suites (independent configurations, folders, and execution commands).

This approach was selected intentionally and balances clarity and maintainability.

A single repository provides several advantages:

- Clear ownership and easier review
- Reviewer can clone one repository and see the complete solution:
  - UI automation  
  - API automation  
  - configuration  
  - reporting  
  - documentation  
- No need to switch between repositories

Consistent tooling and standards:

- CodeceptJS  
- Gherkin  
- Allure reporting  

This ensures:

- consistent test style  
- consistent reporting format  
- consistent execution commands  

Logical separation without duplication:

- separate folders (`ui/`, `api/`)  
- separate CodeceptJS configs  
- separate Allure result directories  
- independent execution (`test:ui`, `test:api`)  

This avoids:

- duplicated dependencies  
- duplicated configuration  
- duplicated documentation  

---

## Technology Stack

- Node.js  
- CodeceptJS  
- Playwright  
- REST helper  
- Gherkin  
- Allure Report  
- JavaScript  

---

## Project Structure

```text
.
├── ui/
│   ├── features/          # UI Gherkin feature files
│   ├── pages/             # Page Object Model
│   ├── steps/             # UI step definitions
│   └── support/           # UI test data

├── api/
│   ├── features/          # API Gherkin feature files
│   ├── steps/             # API step definitions
│   └── support/           # API test data

├── docs/
│   └── execution-proof/   # Screenshots
│       ├── ui/
│       └── api/

├── output/
│   ├── ui/                # Raw Allure results for UI tests
│   └── api/               # Raw Allure results for API tests

├── allure-report/
│   ├── ui/                # Allure HTML report – UI
│   └── api/               # Allure HTML report – API

├── codecept.conf.js       # UI CodeceptJS configuration
├── codecept.api.conf.js   # API CodeceptJS configuration
├── package.json           # NPM scripts & dependencies
└── README.md              # Project documentation
```

Only source files (`ui/`, `api/`, `docs/`, configs) are committed.  
Generated folders (`output/`, `allure-report/`) are created automatically during execution.

---

## UI Test Coverage

### Scenario_1 – Standard user completes checkout flow
```text
ui/features/ui.checkout.standard_user.success.feature
```

### Scenario_2 – Problem user adds product from details page
```text
ui/features/ui.cart.problem_user.add_from_details.feature
```

### Scenario_3 – Standard user sorts products by name
```text
ui/features/ui.products.standard_user.sort.feature
```

### Scenario_4 – Locked out user cannot log in
```text
ui/features/ui.auth.locked_out.feature
```

---

## Additional UI Scenarios

### Scenario_5 – Negative checkout validation
```text
ui/features/ui.checkout.standard_user.negative.feature
```

Purpose:

- validate required checkout fields  
- verify proper error handling  

### Scenario_6 – Session robustness / logout
```text
ui/features/ui.session.standard_user.logout_robustness.feature
```

Purpose:

- validate logout functionality  
- ensure protected pages are not accessible after logout  

---

## API Test Coverage

### Scenario_1 – Get products list
```text
api/features/api.products.list.feature
```

### Scenario_2 – Create new product
```text
api/features/api.products.create.feature
```

### Scenario_3 – Update existing product
```text
api/features/api.products.update_third.feature
```

### Scenario_4 – Delay
```text
api/features/api.products.delay.feature
```

---

## Additional API Scenario

### Scenario_5 – Pagination robustness
```text
api/features/api.products.pagination_robustness.feature
```

Purpose:

- validate API behavior for invalid pagination parameters  
- ensure no server error occurs  
- verify response is handled gracefully  

Observed API behavior:

- `skip < 0` is treated as `0`  
- `limit < 0` is normalized relative to total number of products  

---

# Installation

## Prerequisites

### 1. Install Git
Download: https://git-scm.com

During installation select:

```
Git from the command line and also from 3rd‑party software
```

---

### 2. Install Node.js (includes npm)
Download: https://nodejs.org

Verify installation:

```bash
node -v
npm -v
```

If PowerShell blocks npm scripts:

```bash
running scripts is disabled on this system
```

Fix:

```bash
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
```

or use Git Bash.

---

### 3. Install Java (required for Allure reports)

Download JDK:  
https://adoptium.net

Set environment variable:

```bash
JAVA_HOME="C:\Program Files\Eclipse Adoptium\jdk-XX"
```

Add to PATH:

```bash
%JAVA_HOME%\bin
```

Verify:

```bash
java -version
```

---

## Clone the repository

```bash
git clone https://github.com/piotrpinderak/automation-exercise-saucedemo-dummyjson.git
cd automation-exercise-saucedemo-dummyjson
```

---

## Install Node.js dependencies

```bash
npm install
```

---

## Install Playwright browsers

```bash
npx playwright install
```

---

# Running tests

## Full UI test suite with report

```bash
npm run test:ui:report
```

---

## Running a single test

### If using Git Bash or PowerShell 7+

```bash
npm run clean:ui && npx codeceptjs run -c codecept.conf.js ui/features/<path-to-feature>.feature --steps && npm run allure:generate:ui && npm run allure:open:ui
```

### If using Windows PowerShell 5.1 (no support for &&)

```bash
npm run clean:ui; npx codeceptjs run -c codecept.conf.js ui/features/<path-to-feature>.feature --steps; npm run allure:generate:ui; npm run allure:open:ui
```

---

## Notes for Windows users

- Prefer Git Bash (`&&` works there)  
- PowerShell 5.1 does **not** support `&&`  
- Ensure Java + Playwright browsers are installed  

---

# Running Tests

## Run all UI tests + generate + open Allure report (UI)

```bash
npm run test:ui:report
```

## Run all API tests + generate + open Allure report (API)

```bash
npm run test:api:report
```

## Run full suite (UI + API) + generate reports

```bash
npm run test:all:report
```

Reports can be opened manually:

```bash
npm run allure:open:ui
npm run allure:open:api
```

---

## Run ONE single test with Allure report

### UI – single feature

```bash
npm run clean:ui && npx codeceptjs run -c codecept.conf.js ui/features/ui.products.standard_user.sort.feature --steps && npm run allure:generate:ui && npm run allure:open:ui
```

### API – single feature

```bash
npm run clean:api && npx codeceptjs run -c codecept.api.conf.js api/features/api.products.create.feature --steps && npm run allure:generate:api && npm run allure:open:api
```

---

# Proof of Execution

Screenshots and example results:

```
docs/execution-proof/ui
docs/execution-proof/api
```
