*** Settings ***
Library           Selenium2Library

*** Test Cases ***
testHelloWorld
    Open Browser    https://roysung.github.io/User-Management-Web/    chrome
    Maximize Browser Window
    Page Should Contain    UserName
    [Teardown]    Close Browser
