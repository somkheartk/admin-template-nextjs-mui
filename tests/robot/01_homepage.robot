*** Settings ***
Documentation     Homepage tests
Resource          resources/common.robot
Suite Setup       Open Application
Suite Teardown    Close Application

*** Test Cases ***
Should Load The Homepage
    [Documentation]    Verifies that the homepage loads successfully
    [Tags]    smoke    homepage
    Go To    ${BASE_URL}
    Wait For Page Load
    Location Should Contain    ${BASE_URL}

Should Have Proper Title
    [Documentation]    Verifies that the page has proper title containing 'Admin'
    [Tags]    smoke    homepage
    Go To    ${BASE_URL}
    Wait For Page Load
    ${title}=    Get Title
    Should Match Regexp    ${title}    (?i)admin
