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

Cypress.Commands.add('upload_file', (fileName, fileType = ' ', selector) => {
  cy.get(selector).then(subject => cy.window().then(win => cy.fixture(fileName, 'base64')
    .then(Cypress.Blob.base64StringToBlob, fileType)
    .then((blob) => {
      console.log(subject)
      const el = subject[0];
      const testFile = new win.File([blob], fileName , { type : fileType });
      console.log(testFile)
      const dataTransfer = new win.DataTransfer();
      dataTransfer.items.add(testFile);
      el.files = dataTransfer.files;
      console.log(el.files);
      cy.wrap(subject).trigger('change', { force: true })
      console.log(subject)
    })))
});
