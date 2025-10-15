*** Settings ***
Documentation     Common keywords and variables for all tests
Library           SeleniumLibrary

*** Variables ***
${BASE_URL}       http://localhost:3000
${BROWSER}        chrome
${TIMEOUT}        10s

*** Keywords ***
Open Application
    [Documentation]    Opens the browser and navigates to the application
    Open Browser    ${BASE_URL}    ${BROWSER}
    Maximize Browser Window
    Set Selenium Timeout    ${TIMEOUT}

Close Application
    [Documentation]    Closes the browser
    Close Browser

Wait For Page Load
    [Documentation]    Waits for the page to load completely
    Wait Until Element Is Visible    tag:body    timeout=${TIMEOUT}

Navigate To Login Page
    [Documentation]    Navigates to the login page
    Go To    ${BASE_URL}/login
    Wait For Page Load

Navigate To Register Page
    [Documentation]    Navigates to the register page
    Go To    ${BASE_URL}/register
    Wait For Page Load

Navigate To Dashboard
    [Documentation]    Navigates to the dashboard page
    Go To    ${BASE_URL}/dashboard
    Wait For Page Load
