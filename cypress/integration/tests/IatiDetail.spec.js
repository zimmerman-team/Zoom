context('IATI activity page', () => {
  let data;
  beforeEach(() => {
    cy.fixture('IatiDetailFixture.json').then(responseData => {
      data = responseData;
    });
  });
  it('Visit IATI activity page', () => {
    cy.visit('/');
    cy.get('[data-cy=sidebar-toggle]').click();
    cy.get('[data-cy=sidebar-iati]').click();
    cy.wait(1000);
  });
  it('Check Header fields', () => {
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

    cy.queryByText(data.TotalBudget.InfoTooltip).should('exist');
    cy.get('[data-cy=tooltip-fragment-info]')
      .eq(0)
      .trigger('mouseout');
  });
  it('Check Sectors treemap component', () => {
    cy.queryByText('Sectors').should('exist');

    cy.get('[data-cy=tooltip-fragment-info]')
      .eq(1)
      .trigger('mouseover');
    cy.queryByText(data.Sectors.SectorsInfo).should('exist');
    cy.get('[data-cy=tooltip-fragment-info]')
      .eq(1)
      .trigger('mouseout');

    cy.queryByText(data.Sectors.Values[0]).should('exist');
    cy.queryByText(data.Sectors.Values[1]).should('exist');
    cy.queryByText(data.Sectors.Values[2]).should('exist');
    cy.queryByText(data.Sectors.Values[3]).should('exist');
  });
});
