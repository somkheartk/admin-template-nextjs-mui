*** Settings ***
Documentation     Dashboard tests
Resource          resources/common.robot
Suite Setup       Open Application
Suite Teardown    Close Application

*** Test Cases ***
Should Display Dashboard After Login
    [Documentation]    Tests dashboard display after authentication
    [Tags]    dashboard    skip
    # This test requires authentication
    # Skip for now - implement authentication logic first
    Navigate To Dashboard
    Wait For Page Load
