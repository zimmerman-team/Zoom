// beforeEach(() => {
//   // README keep in mind that Cypress clears the whole state before each test. => signIn() before each test.
//   // set this for skipping landing dialog
//   cy.setCookie('cookieNotice', 'false');
// });

// describe('Chartbuilder line chart fragment e2e', function() {
//   it('Should contain /linechart/ in the url', function() {
//     cy.log('**Signs in and and navigates to linechart**');
//     cy.signIn();
//     cy.wait(2000);
//     cy.navigateToCreateLinechart();

//     cy.log('**URL is correct**');
//     cy.url().should('include', '/visualizer/linechart');

//     cy.log('**Plots new hiv infections**');
//     cy.get('[data-cy="indicator-1"]').click();
//     cy.contains('new hiv infections').click();
//     cy.get('body').click();
//     cy.wait(10000);
//     cy.waitPageLoader();
//     cy.get('[data-cy="legend-label"]').should('have.css', 'content');

//     cy.log('**Tooltip shows right content**');
//     cy.get('[data-cy="tooltip-info-button"]')
//       .scrollIntoView()
//       .trigger('mouseenter', { force: true });
//     cy.get('[data-cy="tooltip-content"]').should(
//       'have.text',
//       'Datasource: Public Indicators'
//     );

//     cy.log('**Hovering over chart displays correct content**');
//     cy.wait(4000);
//     cy.waitPageLoader();
//     cy.get('.recharts-surface')
//       .scrollIntoView()
//       .trigger('mouseover', { force: true });

//     cy.contains(
//       'number of new hiv infections - adolescents (10 to 19) lower bound'
//     );
//   });

//   it('Should make a snapshot of the visual current state', function() {
//     cy.waitPageLoader();
//     cy.waitPageLoader2();
//     cy.wait(10000);
//     cy.percySnapshot('Chartbuilder - Linechart');
//   });
// });

const testvalues = {
  indicator: "avg. height men",
  chartTitle: "cypress_test_chart",
  chartTitleEdited: "edited_cypress_test_chart"
}

function plotData(){
  cy.get('[data-cy="indicator-1"]').click();
  cy.contains(testvalues.indicator).click();

  //Here we wait till the data has been mapped
  cy.waitPageLoader();
  cy.wait(16000);
  cy.get("[data-cy=legend-label]").after('content').should('eq', `${testvalues.indicator  } - all`)

}

function typeChartTitle(title, fragment) {
  cy.location().then((location) => {
    cy.get(`[href="/visualizer/${fragment}/${location.pathname.split('/')[3]}/context"]`).click();
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

describe('Chartbuilder linechart fragment e2e', function() {
  it('Should be able to save, edit, preview, download and delete a chart', function() {
    cy.signIn();
    cy.wait(2000);
    cy.navigateToCreateLinechart();
    cy.wait(5000);
    cy.log("**PLOTTING CHART**");
    plotData();
    typeChartTitle(testvalues.chartTitle, "linechart");

    cy.log("**PREVIEW CHART**");
    cy.get('[href="/visualizer/linechart/vizID/preview"]').click();
    cy.get('[class*= ContextHeader]').should(
      'contain.text',
      testvalues.chartTitle
    );

    cy.log("DOWNLOAD CHART");
    cy.get('[href="/visualizer/linechart/vizID/download"]').click();
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
    typeChartTitle(testvalues.chartTitleEdited, "linechart")

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


