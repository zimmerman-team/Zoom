/* eslint-disable func-names */
const testvalues = {
  chartTitle: 'cypress_test_chart',
  chartTitleEdited: 'edited_cypress_test_chart'
};

const indicatorValues = [];

function getIndicatorValues(amount) {
  cy.get('[data-cy="indicator-1"]').click();
  for (let index = 0; index < amount; index++) {
    cy.get(
      '[class *= ZoomSelectstyles__DropDownItem]:not([class *= ZoomSelectstyles__CategoryItem]) div'
    )
      .eq(index)
      .then($el => {
        const indicatorValue = $el.text();
        indicatorValues.push(indicatorValue);
      });
  }
}

function plotData(indicatorIndex) {
  cy.contains(indicatorValues[indicatorIndex]).click();
  //Here we wait till the data has been mapped
  cy.waitPageLoader();
  cy.wait(1000);
  cy.get('[data-cy="legendLayer-label"]').should(
    'contain',
    indicatorValues[indicatorIndex]
  );
}

function typeChartTitle(title, fragment) {
  cy.location().then(location => {
    cy.get(
      `[href="/visualizer/${fragment}/${
        location.pathname.split('/')[3]
      }/context"]`
    ).click();
    cy.waitPageLoader();
    cy.waitPageLoader2();
    cy.get('[class *= MuiInputBase-input]')
      .first()
      .clear()
      .type(title);
  });
}

beforeEach(() => {
  // README keep in mind that Cypress clears the whole state before each test. => signIn() before each test.
  // set this for skipping landing dialog
  cy.setCookie('cookieNotice', 'false');
});

describe('Chartbuilder country focus NL fragment e2e', function() {
  it('Should be able to navigate to country focus NL and save indicator values', function() {
    cy.signIn();
    cy.wait(2000);
    cy.navigateToCountryFocusNetherlands();
    cy.wait(10000);
    getIndicatorValues(2);
  });

  it('Should be able to save, edit, preview, download and delete a chart', function() {
    cy.log('**PLOTTING CHART**');
    plotData(0);
    typeChartTitle(testvalues.chartTitle, 'focusNL');

    cy.log('**PREVIEW CHART**');
    cy.get('[href="/visualizer/focusNL/vizID/preview"]').click();
    cy.get('[class*= ContextHeader]').should(
      'contain.text',
      testvalues.chartTitle
    );

    cy.log('DOWNLOAD CHART');
    cy.get('[href="/visualizer/focusNL/vizID/download"]').click();
    cy.get('[data-cy="dowload-option-PNG"]').click();
    //todo: test if file is actually being downloaded

    cy.log('**SAVING CHART**');
    cy.get('[data-cy=geomap-close-save-button]').click();
    cy.wait(5000);
    cy.get(':nth-child(1) > [class*= GridItemstyles]')
      .first()
      .should('contain.text', testvalues.chartTitle);

    cy.log('**EDITING CHART**');
    cy.wait(5000);
    cy.get(':nth-child(1) > [class*= GridItemstyles]')
      .first()
      .trigger('mouseover');
    cy.get('[class *= GridItemToolbar]:nth-child(1)')
      .first()
      .click();
    cy.wait(16000);
    cy.get('[data-cy="indicator-1"]').click();
    plotData(1);
    typeChartTitle(testvalues.chartTitleEdited, 'focusNL');
    cy.get('[data-cy=geomap-close-save-button]').click();

    cy.log('**CHECKING IF EDITS ARE SUCCESFULL**');
    cy.get(':nth-child(1) > [class*= GridItemstyles]')
      .first()
      .should('contain.text', testvalues.chartTitleEdited);
    cy.wait(5000);
    cy.get(':nth-child(1) > [class*= GridItemstyles]')
      .first()
      .trigger('mouseover');
    cy.get('[class *= GridItemToolbar]:nth-child(1)')
      .first()
      .click();
    cy.get('[data-cy="indicator-1"]').should(
      'contain.text',
      indicatorValues[1]
    );
    cy.get('[data-cy="legendLayer-label"]').should(
      'contain.text',
      indicatorValues[1]
    );
    cy.get('[data-cy=geomap-close-save-button]').click();

    cy.log('**DELETING CHART**');
    cy.wait(5000);
    cy.get(':nth-child(1) > [class*= GridItemstyles]')
      .first()
      .trigger('mouseover');
    cy.get('[class *= GridItemToolbar]:nth-child(4)')
      .first()
      .click();
    cy.wait(5000);
    cy.queryByText(testvalues.chartTitleEdited).should('not.exist');

    cy.log('**REMOVE CHARTS INDEFINITE**');
    cy.get('[href="/dashboard/trash"]').click();
    cy.queryByText(testvalues.chartTitleEdited).should('exist');
    cy.get('[class *=GridListOptionstyles__RemoveButton]').click();
    cy.wait(2000);
    cy.queryByText(testvalues.chartTitleEdited).should('not.exist');
  });
});
