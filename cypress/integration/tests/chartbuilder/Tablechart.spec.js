beforeEach(() => {
  // README keep in mind that Cypress clears the whole state before each test. => signIn() before each test.
  // set this for skipping landing dialog
  cy.setCookie('cookieNotice', 'false');
});

describe('Chartbuilder table chart fragment e2e', function() {
  it('Should contain /tablechart in the url and map new hiv infections data', function() {
    cy.signIn();
    cy.navigateToTablechart();
    cy.waitPageLoader2();
    cy.waitPageLoader();
    cy.url().should('include', '/visualizer/tablechart');

    cy.wait(4000);
    cy.get('[data-cy="year-2005"]').click();
    //Here we wait till the indicators have loaded.
    cy.wait(2000);
    cy.get('[data-cy="indicator-1"]').click();

    cy.contains('new hiv infections').click();
    cy.waitPageLoader();
    cy.get('thead').should('contain', 'new hiv infections');
  });

  //   it('Should make a snapshot of the visual current state', function() {
  //     cy.waitPageLoader();
  //     cy.waitPageLoader2();
  //     cy.wait(2000);
  //     cy.percySnapshot('Chartbuilder - Tablechart');
  //   });
  //
  //   it('Should sort on Geolocation', function() {
  //     cy.get(
  //       ':nth-child(2) > .MUIDataTableHeadCell-toolButton > .MUIDataTableHeadCell-data'
  //     ).click();
  //     cy.waitPageLoader();
  //   });
  //
  //   it('Should only display Kenya data when searching "kenya"', function() {
  //     cy.get('[aria-label="Search"]').click();
  //     cy.get('.MuiInputBase-root > .MuiInputBase-input').type('kenya');
  //     cy.waitPageLoader();
  //     cy.get('tbody>tr').should('contain', 'kenya');
  //   });
  //
  //   it('Should be able to delete Kenya data from table', function() {
  //     cy.get('tbody>tr').within(() => {
  //       cy.get('input[type="checkbox"]').click();
  //     });
  //     cy.get('[aria-label="Delete Selected Rows"]').click();
  //     cy.waitPageLoader();
  //     cy.get('tbody>tr').should('not.contain', 'Kenya');
  //
  //     cy.get('[aria-label="Search"]').click();
  //     cy.get('.MUIDataTableSearch-main').within(() => {
  //       cy.get('[type="button"]').click();
  //     });
  //   });
  //
  //   it('Resetting all values should populate data with No Data rows', function() {
  //     cy.get('[data-cy="data-explorer-panel-reset"]').click();
  //     cy.waitPageLoader();
  //
  //     cy.get('tbody>tr').should('contain', 'No Data');
  //   });
  //
  //   it('Should make a snapshot of the visual current state', function() {
  //     cy.waitPageLoader();
  //     cy.waitPageLoader2();
  //     cy.wait(2000);
  //     cy.percySnapshot('Chartbuilder - Tablechart empty state');
  //   });
});

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
        //Refactor when cypress has added support for upper/lowercase contains()
        //Because this code is a no go
        //https://github.com/cypress-io/cypress/pull/5653

        const capitalizedIndicatorValue = indicatorValue.replace(
          /^./,
          indicatorValue[0].toUpperCase()
        );
        indicatorValues.push(indicatorValue);
        indicatorValues.push(capitalizedIndicatorValue);
      });
  }
}

function plotData(indicatorIndex) {
  cy.waitForIndicatorsLoad();
  cy.contains(indicatorValues[indicatorIndex]).click();
  //Here we wait till the data has been mapped
  cy.waitPageLoader();
  cy.wait(16000);
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
    cy.get('.MuiInputBase-root > .MuiInputBase-input')
      .first()
      .clear()
      .type(title);
  });
}

describe('Chartbuilder tablechart chart fragment e2e', function() {
  it('Should navigate to geomap and save indicator values', function() {
    cy.navigateToTablechart();
    cy.wait(5000);
    getIndicatorValues(2);
  });

  it('Should be able to save, edit, preview, download and delete a chart', function() {
    cy.log('**PLOTTING CHART**');
    plotData(0);
    cy.get('thead').should('contain.text', indicatorValues[1]);

    typeChartTitle(testvalues.chartTitle, 'tablechart');

    cy.log('**PREVIEW CHART**');
    cy.get('[href="/visualizer/tablechart/vizID/preview"]').click();
    cy.get('[class*= ContextHeader]').should(
      'contain.text',
      testvalues.chartTitle
    );

    cy.log('DOWNLOAD CHART');
    cy.get('[href="/visualizer/tablechart/vizID/download"]').click();
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
    cy.wait(5000);
    cy.get('[data-cy="indicator-1"]').click();
    plotData(2);
    cy.get('thead').should('contain.text', indicatorValues[3]);

    typeChartTitle(testvalues.chartTitleEdited, 'tablechart');
    cy.get('[data-cy=geomap-close-save-button]').click();

    cy.log('**CHECKING IF EDITS ARE SUCCESFULL**');
    cy.get(':nth-child(1) > [class*= GridItemstyles]')
      .first()
      .should('contain', testvalues.chartTitleEdited);
    cy.wait(5000);
    cy.get(':nth-child(1) > [class*= GridItemstyles]')
      .first()
      .trigger('mouseover');
    cy.get('[class *= GridItemToolbar]:nth-child(1)')
      .first()
      .click();
    cy.get('[data-cy="indicator-1"]').should(
      'contain.text',
      indicatorValues[2]
    );
    cy.get('thead').should('contain.text', indicatorValues[3]);

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
