# Robot Framework E2E Tests

This directory contains end-to-end tests written in Robot Framework using SeleniumLibrary.

## Structure

```
tests/robot/
├── resources/
│   └── common.robot          # Common keywords and variables
├── 01_homepage.robot         # Homepage tests
├── 02_authentication.robot   # Authentication flow tests
├── 03_dashboard.robot        # Dashboard tests
├── 04_responsive.robot       # Responsive design tests
└── README.md                 # This file
```

## Prerequisites

1. **Python 3.8+** installed on your system
2. **Chrome browser** (default) or Firefox
3. **ChromeDriver** (automatically managed by webdriver-manager)

## Installation

Install Python dependencies:

```bash
# From the project root
pip install -r requirements.txt
```

## Running Tests

### Run all tests

```bash
# From the project root
npm run test:e2e

# Or directly with robot command
robot --outputdir test-results tests/robot
```

### Run specific test file

```bash
robot --outputdir test-results tests/robot/01_homepage.robot
```

### Run tests with specific tags

```bash
# Run only smoke tests
robot --outputdir test-results --include smoke tests/robot

# Run authentication tests
robot --outputdir test-results --include authentication tests/robot

# Exclude skip tests
robot --outputdir test-results --exclude skip tests/robot
```

### Run with different browser

```bash
robot --outputdir test-results --variable BROWSER:firefox tests/robot
```

## Test Results

After running tests, you can find the results in the `test-results/` directory:

- **report.html** - High-level test report with statistics
- **log.html** - Detailed execution log with keywords and arguments
- **output.xml** - Machine-readable output for further processing

### View Results

Open the report in your browser:

```bash
# On macOS
open test-results/report.html

# On Linux
xdg-open test-results/report.html

# On Windows
start test-results/report.html
```

## Writing New Tests

### Test File Structure

```robot
*** Settings ***
Documentation     Description of what this test suite covers
Resource          resources/common.robot
Suite Setup       Open Application
Suite Teardown    Close Application

*** Test Cases ***
Test Case Name
    [Documentation]    Description of the test case
    [Tags]    tag1    tag2
    # Test steps here
    Go To    ${BASE_URL}/page
    Wait For Page Load
    Page Should Contain    Expected Text
```

### Common Keywords

The `resources/common.robot` file provides these keywords:

- `Open Application` - Opens browser and navigates to the base URL
- `Close Application` - Closes the browser
- `Wait For Page Load` - Waits for page to load completely
- `Navigate To Login Page` - Navigates to /login
- `Navigate To Register Page` - Navigates to /register
- `Navigate To Dashboard` - Navigates to /dashboard

### Variables

- `${BASE_URL}` - Application base URL (default: http://localhost:3000)
- `${BROWSER}` - Browser to use (default: chrome)
- `${TIMEOUT}` - Default timeout for operations (default: 10s)

## Test Tags

Tests are organized with the following tags:

- `smoke` - Quick smoke tests to verify basic functionality
- `homepage` - Homepage related tests
- `authentication` - Authentication flow tests
- `dashboard` - Dashboard tests
- `responsive` - Responsive design tests
- `skip` - Tests that should be skipped (require special setup)

## CI/CD Integration

These tests are automatically run in GitHub Actions CI pipeline:

- Triggered on pull requests
- Python dependencies are installed automatically
- Test results are uploaded as artifacts
- Both frontend and backend are started before tests run

## Troubleshooting

### Browser not found

If you get "WebDriverException: Message: 'chromedriver' executable needs to be in PATH":

```bash
# Install/update webdriver-manager
pip install --upgrade webdriver-manager
```

### Tests fail with timeout

Increase the timeout in `resources/common.robot`:

```robot
${TIMEOUT}    30s
```

### Application not running

Make sure the application is running before executing tests:

```bash
# Terminal 1 - Start backend
cd backend
npm run start:dev

# Terminal 2 - Start frontend
npm run dev

# Terminal 3 - Run tests
npm run test:e2e
```

## Best Practices

1. **Use meaningful test names** - Test names should clearly describe what is being tested
2. **Add documentation** - Use [Documentation] to explain test purpose
3. **Tag appropriately** - Add relevant tags for test organization
4. **Keep tests independent** - Each test should be able to run standalone
5. **Use keywords** - Create reusable keywords for common operations
6. **Handle waits properly** - Always wait for elements before interacting with them
7. **Use appropriate locators** - Prefer CSS selectors, ID, or name attributes

## Resources

- [Robot Framework User Guide](https://robotframework.org/robotframework/latest/RobotFrameworkUserGuide.html)
- [SeleniumLibrary Documentation](https://robotframework.org/SeleniumLibrary/SeleniumLibrary.html)
- [Robot Framework Best Practices](https://github.com/robotframework/HowToWriteGoodTestCases/blob/master/HowToWriteGoodTestCases.rst)
