## Repository created for testing project with API tests based on axios & UI tests based on playwirght.

_commands_ \
test - will be trigger the API tests for user functionality \
run-playwith-ui-tests - trigger the UI tests with steps that login once the user and reuse the auth state in the all tests after. Steps for this located in the config file for playwright & auth.setup.

_structure of UI tests_ \
For saving all selectors in one plase used the principle POM (page object model) - stored in the directory pages. \
For storing selectors related to specific element header - created directory with name - components. \
For better usage of elements/selectors implemented example of fixture that use the selectors from POM/component. \
The file 'storage-state.\*' reuse the auth state and contains the combination of UI & API tests based on Playwright methods.

_env variables usage_ \
By default for running all the tests need to add env variables in dir env in the root directory of the project. \
For trigger the tests on GitHub Actions - created list of secrets for actions. \
Detailed information about GA & secrets: https://docs.github.com/en/actions/security-for-github-actions/security-guides/using-secrets-in-github-actions
