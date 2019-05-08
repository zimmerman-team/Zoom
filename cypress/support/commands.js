// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

import 'cypress-testing-library/add-commands';
import '@percy/cypress';

//https://github.com/cypress-io/cypress/issues/170
Cypress.Commands.add('upload_file', (fileName, fileType = ' ', selector) => {
  cy.get(selector).then(subject => {
    cy.fixture(fileName, 'base64')
      .then(Cypress.Blob.base64StringToBlob)
      .then(blob => {
        const el = subject[0];
        const testFile = new File([blob], fileName, { type: fileType });
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(testFile);
        el.files = dataTransfer.files;

        // cy.wrap(subject).trigger('change', { force: true });
      });
  });
});

Cypress.Commands.add('waitPageLoader', (timeout = 1750000) => {
  cy.get('[data-cy=loader]', { timeout }).should('not.be.visible');
});

Cypress.Commands.add('waitPageLoader2', (timeout = 1750000) => {
  cy.get('[data-cy=loader2]', { timeout }).should('not.be.visible');
});
