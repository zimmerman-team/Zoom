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

// --------- File Upload ---------
//https://github.com/cypress-io/cypress/issues/170
Cypress.Commands.add('upload_file', (fileName, fileType = ' ', selector) => {
  cy.get(selector).then(subject => {
    cy.fixture(fileName, 'base64')
      .then(function() {
        Cypress.Blob.base64StringToBlob();
      })
      .then(blob => {
        const el = subject[0];
        const testFile = new File([blob], fileName, { type: fileType });
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(testFile);
        el.files = dataTransfer.files;

        cy.wrap(subject).trigger('change', { force: true });
      });
  });
});

// --------- Sign In ---------
//TODO: Refactor to login programmatically without using the UI, this would reduce the test time quite a bit.
//https://docs.cypress.io/guides/references/best-practices.html#When-logging-in
Cypress.Commands.add(
  'signIn',
  (username = Cypress.env('username'), password = Cypress.env('password')) => {
    cy.visit('/home');
    cy.waitPageLoader();
    cy.waitPageLoader2();

    cy.wait(4000);
    cy.get('body').then($body => {
      if ($body.find('[data-cy="dialog-overlay"]').length) {
        cy.get('[data-cy="dialog-overlay"]').click();
      }
    });

    //Check if signed in
    cy.get('[data-cy=sidebar-toggle]').click();
    cy.get('body').then($body => {
      if ($body.find('[data-cy=sidebar-logout-button]').length) {
        cy.get('[data-cy=sidebar-logout-button]').click();
        cy.wait(4000);
      } else {
        cy.get('[data-cy=sidebar-close]').click();
      }
    });

    cy.get('[data-cy=sidebar-toggle]').click();
    cy.get('[data-cy=sidebar-login-email-input]').type(username);
    cy.get('[data-cy=sidebar-pass-email-input]').type(password);
    cy.get('[data-cy=sidebar-login-button]').click();

    //Instead of wait => wait till request has been done and page has fully loaded
    cy.wait(10000);
  }
);

Cypress.Commands.add('signOut', () => {
  cy.get('[data-cy=sidebar-toggle]').click();
  cy.get('body').then($body => {
    if ($body.find('[data-cy=sidebar-logout-button]').length) {
      cy.get('[data-cy=sidebar-logout-button]').click();
      cy.wait(4000);
    } else {
      cy.get('[data-cy=sidebar-close]').click();
    }
  });
});

// --------- Loaders ---------
//This is the circular progress loader icon
Cypress.Commands.add('waitPageLoader', (timeout = 1750000) => {
  cy.get('[data-cy=loader]', { timeout }).should('not.be.visible');
});

//This is the "Loading" text that appears in the top-left corner
Cypress.Commands.add('waitPageLoader2', (timeout = 1750000) => {
  cy.get('[data-cy=loader2]', { timeout }).should('not.be.visible');
});

Cypress.Commands.add('waitForIndicatorsLoad', (timeout = 1750000) => {
  cy.get('[data-cy=indicator-1]', { timeout }).should('not.have.text', 'Select indicator(0)');
});

// --------- Hover ---------
Cypress.Commands.add('hover', (selectorHoverItem, selectorShowItem, n = 0) => {
  cy.get(selectorHoverItem)
    .eq(n)
    .scrollIntoView()
    .trigger('mouseover', { force: true });
  cy.get(selectorShowItem).should('be.visible');
});

// --------- Sidebar Navigation ---------
Cypress.Commands.add('navigateToCreateGeo', () => {
  cy.get('[data-cy="appbar-right-button"]').click();
  cy.get('[data-cy="nav-pane-item-0"]').click();
  cy.get('[data-cy="nav-pane-item-0"]').click();
});

Cypress.Commands.add('navigateToCountryFocusKenya', () => {
  cy.get('[data-cy="appbar-right-button"]').click();
  cy.get('[data-cy="nav-pane-item-0"]').click();
  cy.get('[data-cy="nav-pane-item-1"]').click();
});

Cypress.Commands.add('navigateToCountryFocusNetherlands', () => {
  cy.get('[data-cy="appbar-right-button"]').click();
  cy.get('[data-cy="nav-pane-item-0"]').click();
  cy.get('[data-cy="nav-pane-item-2"]').click();
});

Cypress.Commands.add('navigateToCreateLinechart', () => {
  cy.get('[data-cy="appbar-right-button"]').click();
  cy.get('[data-cy="nav-pane-item-0"]').click();
  cy.get('[data-cy="nav-pane-item-3"]').click();
});

Cypress.Commands.add('navigateToTablechart', () => {
  cy.visit('/visualizer/tablechart/vizID/edit');
});

Cypress.Commands.add('navigateToBarchart', () => {
  cy.visit('/visualizer/barchart/vizID/edit');
});

Cypress.Commands.add('navigateToDonutchart', () => {
  cy.visit('/visualizer/donutchart/vizID/edit');
});

//https://stackoverflow.com/questions/55516990/cypress-testing-pseudo-css-class-before
function unquote(str) {
  return str.replace(/(^")|("$)/g, '');
}

Cypress.Commands.add(
  'after',
  {
      prevSubject: 'element',
  },
  (el, property) => {
      const win = el[0].ownerDocument.defaultView;
      const after = win.getComputedStyle(el[0], 'after');
      return unquote(after.getPropertyValue(property));
  },
);
