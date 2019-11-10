const testvalues = {
  indicator: "new hiv infections",
  chartTitle: "cypress_test_chart",
  chartTitleEdited: "edited_cypress_test_chart"
}

function plotData(){
  cy.get('[data-cy="indicator-1"]').click();
  cy.contains(testvalues.indicator).click();

  //Here we wait till the data has been mapped
  cy.waitPageLoader();
  cy.wait(16000);
  cy.get('[data-cy="legendLayer-label"]').should(
    'contain',
    testvalues.indicator
  );
}

function typeChartTitle(title) {
  cy.location().then((location) => {
    cy.get(`[href="/visualizer/geomap/${location.pathname.split('/')[3]}/context"]`).click();
    cy.waitPageLoader();
    cy.waitPageLoader2();
    cy.get('[class *= MuiInputBase-input]')
      .first()
      .clear()
      .type(title);
  })
}

beforeEach(() => {
  // README keep in mind that Cypress clears the whole state before each test. => signIn() before each test.
  // set this for skipping landing dialog
  cy.setCookie('cookieNotice', 'false');
});

describe('Chartbuilder geomap chart fragment e2e', function() {
  it('Should be able to save, edit, preview, download and delete a chart', function() {
    cy.signIn();
    cy.wait(2000);
    cy.navigateToCreateGeo();
    cy.wait(5000);
    cy.log("**PLOTTING CHART**");
    plotData();
    typeChartTitle(testvalues.chartTitle);

    cy.log("**PREVIEW CHART**");
    cy.get('[href="/visualizer/geomap/vizID/preview"]').click();
    cy.get('[class*= ContextHeader]').should(
      'contain.text',
      testvalues.chartTitle
    );

    cy.log("DOWNLOAD CHART");
    cy.get('[href="/visualizer/geomap/vizID/download"]').click();
    cy.get('[data-cy="dowload-option-PNG"]').click();
    //todo: test if file is actually being downloaded

    cy.log("**SAVING CHART**");
    cy.get('[data-cy=geomap-close-save-button]').click();
    cy.wait(5000);
    cy.get(":nth-child(1) > [class*= GridItemstyles]").first().should('contain.text', testvalues.chartTitle)

    cy.log("**EDITING CHART**");
    cy.wait(5000);
    cy.get(":nth-child(1) > [class*= GridItemstyles]").first().trigger('mouseover');
    cy.get("[class *= GridItemToolbar]:nth-child(1)").first().click();
    cy.get('[data-cy="indicator-1"]').should('contain.text', testvalues.indicator);
    typeChartTitle(testvalues.chartTitleEdited)

    cy.get('[data-cy=geomap-close-save-button]').click();
    cy.get(":nth-child(1) > [class*= GridItemstyles]").first().should('contain.text', testvalues.chartTitle)

    cy.log("**DELETING CHART**");
    cy.wait(5000);
    cy.get(":nth-child(1) > [class*= GridItemstyles]").first().trigger('mouseover');
    cy.get("[class *= GridItemToolbar]:nth-child(4)").first().click();
    cy.wait(5000);
    cy.queryByText(testvalues.chartTitleEdited).should("not.exist")
  });
});

