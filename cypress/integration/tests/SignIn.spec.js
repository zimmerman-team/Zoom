// context('Sign in', () => {
//   it('Visit Homepage', () => {
//     cy.visit('/');
//     cy.wait(1000);
//     cy.get('[data-cy="dialog-overlay"]').click();
//   });
//
//   it('Check if signed in', () => {
//     cy.get('[data-cy=sidebar-toggle]').click();
//     cy.wait(1000);
//
//     cy.get('body').then($body => {
//       if ($body.find('[data-cy=sidebar-logout-button]').length) {
//         cy.get('[data-cy=sidebar-logout-button]').click();
//         cy.wait(1000);
//       } else {
//         cy.get('[data-cy=sidebar-close]').click();
//       }
//     });
//   });
//
//   it('Do sign-in procedure', () => {
//     cy.get('[data-cy=cookie-notice]').click();
//     cy.get('[data-cy=sidebar-toggle]').click();
//     //Here we wait till the map is loaded
//     cy.wait(15000);
//     cy.percySnapshot('Sidebar - login');
//     cy.get('[data-cy=sidebar-login-email-input]').type(Cypress.env('username'));
//     cy.get('[data-cy=sidebar-pass-email-input]').type(Cypress.env('password'));
//     cy.get('[data-cy=sidebar-login-button]').click();
//     cy.wait(4000);
//     cy.location('pathname').should('include', '/dashboard/charts');
//     cy.get('[data-cy=sidebar-toggle]').click();
//     //Here we wait till the map is loaded
//     cy.wait(15000);
//     cy.percySnapshot('Sidebar - logout');
//     cy.get('[data-cy=sidebar-logout-button]').contains('Sign out');
//   });
// });

describe('login', () => {
  it('should successfully log into our app', () => {
    cy.login()
      .then(resp => {
        return resp.body;
      })
      .then(body => {
        const { access_token, expires_in, id_token } = body;
        const auth0State = {
          nonce: '',
          state: 'some-random-state'
        };
        const callbackUrl = `/callback#access_token=${access_token}&scope=openid&id_token=${id_token}&expires_in=${expires_in}&token_type=Bearer&state=${
          auth0State.state
        }`;
        cy.visit(callbackUrl, {
          onBeforeLoad(win) {
            win.document.cookie =
              'com.auth0.auth.some-random-state=' + JSON.stringify(auth0State);
          }
        });
      });
  });
});
