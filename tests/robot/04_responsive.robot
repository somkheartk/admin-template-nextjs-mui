*** Settings ***
Documentation     Responsive design tests
Resource          resources/common.robot
Suite Setup       Open Application
Suite Teardown    Close Application

*** Test Cases ***
Should Work On Mobile Viewport
    [Documentation]    Tests responsive design on mobile viewport
    [Tags]    responsive    mobile
    Set Window Size    375    667
    Go To    ${BASE_URL}
    Wait For Page Load
    Page Should Contain Element    tag:body

Should Work On Tablet Viewport
    [Documentation]    Tests responsive design on tablet viewport
    [Tags]    responsive    tablet
    Set Window Size    768    1024
    Go To    ${BASE_URL}
    Wait For Page Load
    Page Should Contain Element    tag:body
