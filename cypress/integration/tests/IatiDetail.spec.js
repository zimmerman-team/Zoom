describe('IATI activity page', () => {
  let data;
  beforeEach(() => {
    cy.setCookie('cookieNotice', 'false');
    cy.setCookie('homeDialogShown', 'true');
    cy.fixture('IatiDetailFixture.json').then(responseData => {
      data = responseData;
    });
  });
  it('IATI activity page should display correct content', () => {
    // First we navigate to activity page
    cy.signIn();
    cy.visit('/iati-activity/2769536');

    // We get rid of the cookienotice

    // We take a percy snapshot
    cy.waitPageLoader();
    cy.waitPageLoader2();
    cy.percySnapshot('IATI Detail');

    // We check if the correct data is being displayed
    cy.queryByText(data.Header.StartDatePlannedLabel).should('exist');
    cy.queryByText(data.Header.StartDatePlannedValue).should('exist');

    cy.queryByText(data.Header.StartDateActualLabel).should('exist');
    cy.queryByText(data.Header.StartDateActualValue).should('exist');

    cy.queryByText(data.Header.EndDatePlannedLabel).should('exist');
    cy.queryByText(data.Header.EndDatePlannedValue).should('exist');

    cy.queryByText(data.Header.EndDateActualLabel).should('exist');
    cy.queryByText(data.Header.EndDateActualValue).should('exist');

    cy.queryByText(data.Header.Title).should('exist');

    cy.queryByText(data.Header.LastProjectUpdateLabel).should('exist');
    cy.queryByText(data.Header.LastProjectUpdateValue).should('exist');

    cy.queryByText(data.Header.StatusLabel).should('exist');
    cy.queryByText(data.Header.StatusValue).should('exist');

    cy.queryByText(data.Header.BeneficiaryCountryLabel).should('exist');
    cy.getAllByText(data.Header.BeneficiaryCountryValue).trigger('mouseover');
    cy.queryByText(data.Header.BeneficiaryCountryMoreValue).should('exist');
    cy.getAllByText(data.Header.BeneficiaryCountryValue).trigger('mouseout');
    cy.queryByText(data.Header.BeneficiaryCountryMoreValue).should('not.exist');

    cy.queryByText(data.Header.DataSourceLabel).should('exist');
    cy.queryByText(data.Header.DataSourceValue).should('exist');

    cy.queryByText(data.Header.ReportedByLabel).should('exist');
    cy.queryByText(data.Header.ReportedByValue).should('exist');

    cy.queryByText(data.Header.IatiIDLabel).should('exist');
    cy.queryByText(data.Header.IatiIDValue).should('exist');
  });

  it('Check Total budget bar chart component', () => {
    cy.get('[data-cy=tooltip-fragment-info]')
      .eq(0)
      .trigger('mouseover');

    cy.get('[data-cy=tooltip-fragment-info]')
      .eq(0)
      .trigger('mouseout');
  });

  it('Check Sectors treemap component', () => {
    cy.queryByText('Sectors').should('exist');

    cy.get('[data-cy=tooltip-fragment-info]')
      .eq(1)
      .trigger('mouseover');

    cy.get('[data-cy=tooltip-fragment-info]')
      .eq(1)
      .trigger('mouseout');

    cy.queryByText(data.Sectors.Sector1Label).should('exist');
    cy.queryByText(data.Sectors.Sector1Value).should('exist');

    cy.queryByText(data.Sectors.Sector2Label).should('exist');
    cy.queryByText(data.Sectors.Sector2Value).should('exist');

    cy.queryByText(data.Sectors.Sector3Label).should('exist');
    cy.queryByText(data.Sectors.Sector3Value).should('exist');

    cy.queryByText(data.Sectors.Sector4Label).should('exist');
    cy.queryByText(data.Sectors.Sector4Value).should('exist');
  });
});
