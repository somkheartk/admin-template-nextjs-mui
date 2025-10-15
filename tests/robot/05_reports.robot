*** Settings ***
Documentation     Reports page tests
Resource          resources/common.robot
Suite Setup       Open Application
Suite Teardown    Close Application

*** Test Cases ***
Should Load Reports Page
    [Documentation]    Verifies that the reports page loads successfully
    [Tags]    smoke    reports
    Go To    ${BASE_URL}/reports
    Wait For Page Load
    Location Should Contain    ${BASE_URL}/reports

Should Display Page Title
    [Documentation]    Verifies the reports page has the correct title
    [Tags]    reports
    Go To    ${BASE_URL}/reports
    Wait For Page Load
    Page Should Contain    Reports & Analytics

Should Display Key Metrics Cards
    [Documentation]    Verifies that all key metric cards are displayed
    [Tags]    reports    metrics
    Go To    ${BASE_URL}/reports
    Wait For Page Load
    Page Should Contain    Total Revenue
    Page Should Contain    Products Sold
    Page Should Contain    Shipments
    Page Should Contain    Avg Order Value

Should Display Top Products Table
    [Documentation]    Verifies the top products table is present
    [Tags]    reports    table
    Go To    ${BASE_URL}/reports
    Wait For Page Load
    Page Should Contain    Top Performing Products
    Page Should Contain    Product Name
    Page Should Contain    SKU
    Page Should Contain    Sales
    Page Should Contain    Revenue
    Page Should Contain    Growth

Should Display Category Performance
    [Documentation]    Verifies category performance section is displayed
    [Tags]    reports    performance
    Go To    ${BASE_URL}/reports
    Wait For Page Load
    Page Should Contain    Category Performance
    Page Should Contain    Electronics
    Page Should Contain    Furniture
    Page Should Contain    Clothing
    Page Should Contain    Books

Should Display Period Summary
    [Documentation]    Verifies period summary statistics are shown
    [Tags]    reports    summary
    Go To    ${BASE_URL}/reports
    Wait For Page Load
    Page Should Contain    Period Summary
    Page Should Contain    Order Fulfillment Rate
    Page Should Contain    Avg Delivery Time
    Page Should Contain    Customer Satisfaction
    Page Should Contain    Return Rate

Should Show Revenue Metrics
    [Documentation]    Verifies revenue-related information is displayed
    [Tags]    reports    revenue
    Go To    ${BASE_URL}/reports
    Wait For Page Load
    Page Should Contain    Total Revenue
    Page Should Contain Element    xpath://h4[contains(text(), '$')]

Should Display Product Performance Data
    [Documentation]    Verifies product performance data is shown
    [Tags]    reports    products
    Go To    ${BASE_URL}/reports
    Wait For Page Load
    Page Should Contain    Premium Widget Pro
    Page Should Contain    Standard Widget
    Page Should Contain    WGT-PRO-001
    Page Should Contain    WGT-STD-002

Should Have Responsive Layout On Mobile
    [Documentation]    Tests reports page responsive design on mobile viewport
    [Tags]    reports    responsive    mobile
    Set Window Size    375    667
    Go To    ${BASE_URL}/reports
    Wait For Page Load
    Page Should Contain Element    tag:body
    Page Should Contain    Reports & Analytics

Should Have Responsive Layout On Tablet
    [Documentation]    Tests reports page responsive design on tablet viewport
    [Tags]    reports    responsive    tablet
    Set Window Size    768    1024
    Go To    ${BASE_URL}/reports
    Wait For Page Load
    Page Should Contain Element    tag:body
    Page Should Contain    Top Performing Products

Should Display Growth Indicators
    [Documentation]    Verifies growth trend indicators are visible
    [Tags]    reports    trends
    Go To    ${BASE_URL}/reports
    Wait For Page Load
    Page Should Contain Element    xpath://*[contains(text(), '%')]

Should Show Category Progress Bars
    [Documentation]    Verifies category performance has progress indicators
    [Tags]    reports    visual
    Go To    ${BASE_URL}/reports
    Wait For Page Load
    Page Should Contain    Electronics
    Page Should Contain    Furniture
    ${element_count}=    Get Element Count    css:.MuiLinearProgress-root
    Should Be True    ${element_count} > 0

Should Navigate From Dashboard To Reports
    [Documentation]    Tests navigation from dashboard to reports page
    [Tags]    reports    navigation
    Go To    ${BASE_URL}/dashboard
    Wait For Page Load
    Go To    ${BASE_URL}/reports
    Wait For Page Load
    Location Should Contain    /reports
    Page Should Contain    Reports & Analytics
