# **Playwright Automation Framework (POM + CI/CD)**

![Playwright Tests](https://github.com/SumonMohammad/softwrd-assesment/actions/workflows/playwright.yml/badge.svg)

## Framework Choice & Rationale

### **Chosen Stack**

- Playwright (TypeScript)
- Page Object Model (POM)
- Allure + HTML Reporting
- GitHub Actions (CI/CD)

### **Why Playwright?**

- Built-in auto-waiting -> no flaky tests
- Native support for parallel execution
- Powerful locator strategy (data-test, role, etc.)
- Supports network interception, tracing, screenshots
- Better performance vs Selenium

### **Alternatives Considered**

| Tool                     | Reason Not Chosen                      |
|--------------------------|----------------------------------------|
|Selenium                  |Requires manual waits, more boilerplate |
|Cypress                   |Limited multi-tab support, less flexible|
|WebdriverIO               |More setup complexity                   |


## Final decision: **Playwright** = *fast, reliable, modern*


# **Architecture Overview**

softwrd_automation/
│
├── src/
│   ├── pages/                # Page Objects (UI actions)
│   │   ├── login-page.ts
│   │   ├── inventory-page.ts
│   │   ├── cart-page.ts
│   │   ├── checkout-page.ts
│   │   ├── checkout-complete-page.ts
│   │   ├── checkout-info-page.ts
│   │   ├── checkout-overview-page.ts
│   │
│   ├── fixtures/             # Custom fixtures (inject pages)
│   │   └── base-fixture.ts
│   │
│   ├── config/global               # Config & global setup
│   │            └── global-setup.ts
│   │
│   ├── utils/               
│         └──test-data/                # Test data layer
│              ├── users.ts
│              ├── products.ts
│              ├── checkout.ts
│    
├── tests/                   # Test specs (ONLY assertions)
│   ├── cart.spec.ts
│   ├── checkout.spec.ts
│   ├── login.spec.ts
│   ├── inventory.spec.ts
│
├── playwright.config.ts
├── package.json
└── .github/workflows/playwright.yml


# **Key Design Principles**

- Separation of concerns
      - Test = assertions and method calling
      - Page = UI actions 
- No hardcoded data
- Reusable methods everywhere
- Scalable structure


# **Setup & Run Instructions**

## **1. Clone Repo**

```
git clone https://github.com/SumonMohammad/softwrd-assesment.git
cd softwrd-assesment

```

## **2. Install Dependencies**

```
npm install
```

## **3. Setup Environment**

Create `.env` file:

```
BASE_URL=https://www.saucedemo.com/
INVENTORY_PAGE=/inventory.html

```
## **4. Run Tests**

### **Run all tests**

```
npm test
```

### **Run regression only**
```
npx playwright test --grep @regression
```

### **Run specific test**

```
npx playwright test tests/cart.spec.ts
```

## **5. View Reports**

### *HTML Report*

```
npx playwright show-report
```

### **Allure Report**

```
npm run allure:generate
npm run allure:open
```

# **CI/CD Pipeline**

## **Location**

*.github/workflows/playwright.yml*

## **Pipeline Steps**

- Checkout code
- Install dependencies (with cache)
- Install browsers
- Run tests
- Upload reports (HTML + Allure)

## **Secrets Setup (GitHub)**

### *Go to :-*

*Repo -> Settings -> Secrets -> Actions*

### *Add:-*

```
BASE_URL=your_secret_url
INVENTORY_PAGE=your_secret_url
```

### *Then use in workflow:*

```
YAML
env:
  BASE_URL: ${{ secrets.BASE_URL }}
```

## **View Pipeline & Reports**

- Go to GitHub --> Actions tab
- Click latest run
- Download artifact:
    - playwright-report
    - allure-results

# **Test Coverage Summary**

## **Covered Areas**

### **Authentication**
- Valid login
- Invalid login (wrong password, empty fields, SQL injection)
- Locked-out user
- Error user behavior

### **Cart**

- Add single item
- Add multiple items
- Remove item
- Cart persistence

### **Checkout**

- Full purchase flow
- Required field validation
- Order summary calculation (total, tax)
- Confirmation screen validation


### **Special Users**

- *problem_user* --> image mismatch detection (sl-404)
- *performance_glitch_user* --> slow login handling (auto-wait)
- *error_user* --> action failure validation

### **Performance & Resilience**

- Smart waits (no hardcoded sleep)
- Retry logic (CI only)
- Parallel execution

# **Not Covered (Intentionally)**


| Area                    | Reason                                 |
|-------------------------|----------------------------------------|
|API Testing              |Scope limited to UI                     |
|Mobile testing           |Not required for this assignment        |
|Security deep testing    |Only basic validation included          |


# **Reusable Utilities**

- *Storage state (session reuse)*


# NB :- *** I have experience validating UI data against API responses using Playwright. I can also integrate CI/CD pipelines that automatically trigger on code pushes or pull requests in both Dev and QA repositories, ensuring deployments are blocked if any tests fail. ***


