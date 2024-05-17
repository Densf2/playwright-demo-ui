For trigger the api tests need to run the `test` command from package.json \
In case of trigger another file - need to update the path for file in package.json \

_commands_ \
test - will be trigger the api tests for user functionality \
In case adding new tests for user functionality - add in name of file (userBLA-BLA.test.ts) \
run-playwith-ui-tests - trigger the UI tests with steps that login once the user and reuse the auth state in the all tests after. Steps for this located in the config file for playwright, auth.setup.

_structure of UI tests_ \
For saving all selectors inn one plase used the principle POM (page object model) - stored in the directory pages. \
For storing selectors related to specific element header - created directory with name - components. \
For better usage of elements/selectors implemented example of fixture that use the selectors from POM/component.
