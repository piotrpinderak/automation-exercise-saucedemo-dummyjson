# Automation Exercise

This repository contains an end-to-end automation framework prepared as a recruitment task.
It covers both **UI automation** for https://www.saucedemo.com and **API automation**
for https://dummyjson.com.

The framework is built using CodeceptJS, Playwright, Gherkin syntax
and Allure Report for test execution analysis and reporting.

# UI and API in One Repository – Design Decision

For this recruitment task, UI and API automation were implemented within a single repository, but as fully separated suites (independent configurations, folders, and execution commands).

This approach was selected intentionally and balances clarity, maintainability.

For this assignment, a single repository provides several advantages:

- Clear ownership and easier review
- The reviewer can clone one repository and see the complete solution:
- UI automation
- API automation
- configuration
- reporting
- documentation
- No need to switch between repositories or compare implementations across projects

Consistent tooling and standards:
The same stack is used for both UI and API:
- CodeceptJS
- Gherkin
- Allure reporting

This ensures:
- consistent test style
- consistent reporting format
- consistent execution commands

Logical separation without duplication. Although UI and API live in one repository, they are strictly separated:

- separate folders (ui/, api/)
- separate CodeceptJS configs
- separate Allure result directories
- independent execution (test:ui, test:api)

This avoids:
- duplicated dependencies
- duplicated configuration
- duplicated documentation


## Technology Stack

- Node.js
- CodeceptJS
- Playwright
- REST helper
- Gherkin
- Allure Report
- JavaScript 

## Project Structure

```.
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

Only source files (ui/, api/, docs/, configs) are committed.
Generated folders (output/, allure-report/) are created automatically during execution.

## UI Test Coverage

### Scenario_1 – Standard user completes checkout flow

- Feature file: ui/features/ui.checkout.standard_user.success.feature

### Scenario_2 – Problem user adds product from details page

- Feature file: ui/features/ui.cart.problem_user.add_from_details.feature

### Scenario_3 – Standard user sorts products by name

- Feature file: ui/features/ui.products.standard_user.sort.feature

### Scenario_4 – Locked out user cannot log in

- Feature file: ui/features/ui.auth.locked_out.feature

## Additional UI Scenarios

### Scenario_5 – Negative checkout validation
- Feature file: ui/features/ui.checkout.standard_user.negative.feature
- Purpose:
  - validate required checkout fields
  - verify proper error handling

### Scenario_6 – Session robustness / logout
- Feature file: ui/features/ui.session.standard_user.logout_robustness.feature
- Purpose:
  - validate logout functionality
  - ensure protected pages are not accessible after logout

## API Test Coverage (mapped to task scenarios)

### Scenario_1 – Get products list

- Feature file: api/features/api.products.list.feature

### Scenario_2 – Create new product

- Feature file: api/features/api.products.create.feature

### Scenario_3 – Update existing product

- Feature file: api/features/api.products.update_third.feature

### Scenario_4 – Delay

- Feature file: api/features/api.products.delay.feature

## Additional API Scenario

### Scenario_5 - Pagination robustness

- Feature file: api/features/api.products.pagination_robustness.feature
- Purpose:
  - validate API behavior for invalid pagination parameters (limit, skip)
  - ensure no server error occurs
  - verify response is handled gracefully

Observed API behavior:
- skip < 0 is treated as 0
- limit < 0 is normalized relative to total number of products


# Installation

## Prerequisites

### 1. Install Git
Download from: https://git-scm.com

During installation select:

Git from the command line and also from 3rd‑party software**

### 2. Install Node.js (includes npm)
Download: https://nodejs.org

Verify installation:

```
node -v
npm -v
```

If PowerShell blocks npm scripts with an error like:

```
running scripts is disabled on this system
```

run:

```
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
```

or use Git Bash instead of PowerShell.

---

### 3. Install Java (required for Allure reports)

Allure Commandline requires Java.

Download JDK:  
https://adoptium.net

Set environment variable:

```
JAVA_HOME = C:\Program Files\Eclipse Adoptium\jdk-XX
```

Add to PATH:

```
%JAVA_HOME%\bin
```

Verify:

```
java -version
```

---

## Clone the repository

```
git clone https://github.com/piotrpinderak/automation-exercise-saucedemo-dummyjson.git
cd automation-exercise-saucedemo-dummyjson
```

---

## Install Node.js dependencies

```
npm install
```

This installs:

- CodeceptJS  
- Playwright (library)  
- Allure commandline wrapper  
- Other dev dependencies  

---

## Install Playwright browsers

Run:

```
npx playwright install
```

## Running tests

### Full UI test suite with report

```
npm run test:ui:report
```

### Running a single test

#### If using Git Bash or PowerShell 7+:

```
npm run clean:ui && npx codeceptjs run -c codecept.conf.js ui/features/<path-to-feature>.feature --steps && npm run allure:generate:ui && npm run allure:open:ui
```

#### If using Windows PowerShell 5.1 (no support for &&):

```
npm run clean:ui; npx codeceptjs run -c codecept.conf.js ui/features/<path-to-feature>.feature --steps; npm run allure:generate:ui; npm run allure:open:ui
```

## Notes for Windows users

- Prefer Git Bash for running chained commands (`&&` works there).
- PowerShell 5.1 does **not** support `&&`.
- Ensure Java and Playwright browsers are installed, otherwise Allure and UI tests will fail.

## Running Tests

### Run all UI tests + generate + open Allure report (UI)
npm run test:ui:report

- Cleans previous UI results
- Runs all UI scenarios
- Generates fresh Allure UI report
- Opens report in browser

### Run all API tests + generate + open Allure report (API)
npm run test:api:report

- Cleans previous API results
- Runs all API scenarios
- Generates fresh Allure API report
- Opens report in browser

### Run full suite (UI + API) + generate reports
npm run test:all:report

- Runs all UI and API tests
- Generates both Allure reports
- Reports can be opened manually:
  - UI:  npm run allure:open:ui
  - API: npm run allure:open:api

### Run ONE single test with Allure report

#### UI – single feature
npm run clean:ui && npx codeceptjs run -c codecept.conf.js ui/features/ui.products.standard_user.sort.feature --steps && npm run allure:generate:ui && npm run allure:open:ui

#### API – single feature
npm run clean:api && npx codeceptjs run -c codecept.api.conf.js api/features/api.products.create.feature --steps && npm run allure:generate:api && npm run allure:open:api

This is the recommended way to:
- verify one scenario
- generate a clean report
- take screenshots for review

## Proof of Execution

Screenshots and example results are available in:

docs/execution-proof/ui

docs/execution-proof/api