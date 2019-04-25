function signOut() {
  cy.clearCookies();
  cy.clearLocalStorage();
}
function signIn() {
  cy.visit('/');
  cy.wait(1000);
  cy.get('[data-cy="dialog-overlay"]').click();
  signOut();
  cy.get('[data-cy=sidebar-toggle]').click();
  cy.get('[data-cy=sidebar-login-email-input]').type(Cypress.env('username'));
  cy.get('[data-cy=sidebar-pass-email-input]').type(Cypress.env('password'));
  cy.get('[data-cy=sidebar-login-button]').click();
  cy.wait(6000);
}

const firstStepVal = {
  title: 'Metadata title',
  desc: 'Metadata Description',
  tags: ['tag1', 'tag2'],
  dataSource: 'Meta data Data Source',
  sharedData: 'Yes',
  surveyData: 'Yes',
  q1: 'Dont know',
  q2: ['Respondents', 'Representative group of respondents'],
  q21: 'Dont know',
  q22: 'Dont know',
  q3: ['Multistage sampling', 'Other'],
  q4: '25',
  q5: 'Dont know',
  q51: ['Join, delimite or concatenate data', 'Other']
};

// so these are the file columns that should be in the 'CypressSample.csv'
const fileColumns = [
  'Indicator',
  'Unit',
  'Subgroup',
  'Area',
  'Area ID',
  'Time Period',
  'Source',
  'Data Value',
  'Source.1',
  'Footnotes'
];

// and this is an array of summaries for each file column
// each arrays index is in relation to the fileColumns array indexes
// and this contains an array of texts, that should be found in each associated cell
const fileSummaries = [
  [
    'Count of values',
    '27',
    'Number of unique values',
    '1',
    'Most frequent value',
    'CypressIndicator',
    'CypressIndicator count',
    '27'
  ],
  [
    'Count of values',
    '27',
    'Number of unique values',
    '1',
    'Most frequent value',
    'Number',
    'Number count',
    '27'
  ],
  [
    'Count of values',
    '27',
    'Number of unique values',
    '2',
    'Most frequent value',
    'All sexes Young people (15-24) lower estimate',
    'All sexes Young people (15-24) lower estimate count',
    '24'
  ],
  [
    'Count of values',
    '27',
    'Number of unique values',
    '4',
    'Most frequent value',
    'Lesotho',
    'Lesotho count',
    '12'
  ],
  [
    'Count of values',
    '27',
    'Number of unique values',
    '3',
    'Most frequent value',
    'LSO',
    'LSO count',
    '14'
  ],
  [
    'Count of values',
    '27',
    'Number of unique values',
    '26',
    'Most frequent value',
    '1999',
    '1999 count',
    '2'
  ],
  [
    'Count of values',
    '27',
    'Number of unique values',
    '1',
    'Most frequent value',
    'UNAIDS_Spectrum Estimates_',
    'UNAIDS_Spectrum Estimates_ count',
    '27'
  ],
  [
    'Count of values',
    '27.0',
    'Average',
    '13032.703703703704',
    'Std',
    '12681.469778972221',
    'Min value',
    '0.0',
    '25%',
    '2.0',
    '50%',
    '12261.0',
    '75%',
    '26034.0',
    'Max value',
    '31830.0'
  ],
  [
    'Count of values',
    '15',
    'Number of unique values',
    '1',
    'Most frequent value',
    'AidFonds',
    'AidFonds count',
    '15'
  ],
  [
    'Count of values',
    '0.0',
    'Average',
    'nan',
    'Std',
    'nan',
    'Min value',
    'nan',
    '25%',
    'nan',
    '50%',
    'nan',
    '75%',
    'nan',
    'Max value',
    'nan'
  ]
];

// and this is an array of data types for each file column
// each arrays index is in relation to the fileColumns array indexes
// also each index is an array, because there can be several data type
// strings in the same column
const fileDataType = [
  ['100% of data a text value.'],
  ['100% of data a text value.'],
  ['100% of data a text value.'],
  ['85% of data a country value.', '15% of data a text value.'],
  ['93% of data a iso3 value.', '7% of data a text value.'],
  ['96% of data a date value.', '4% of data a text value.'],
  ['100% of data a text value.'],
  ['100% of data a numeric value.'],
  ['56% of data a text value.', '44% of data a blank value.'],
  ['100% of data a blank value.']
];

// and this is an array of blank cells for each file column
// each arrays index is in relation to the fileColumns array indexes
const blankCells = [0, 0, 0, 0, 0, 0, 0, 0, 12, 27];

describe('Datamapper e2e tests', function() {
  function selectItem(rowNumber, valNumber) {
    //  we click the column selection to select which column values to find
    cy.get(
      `tbody tr:nth-child(${rowNumber}) td:nth-child(2) [data-name="selectHeader"]`
    ).click();

    // we click the 'Source.1' column to check find all the 'nan' values
    cy.get(`li:nth-child(${valNumber})`).click();
  }

  it('Go to datamapper', function() {
    signIn();
    cy.visit('/mapper');

  });

  it('Page should contain first steps title', function() {
    cy.get('[class*=Headings__BaseHeading]').should(
      'contain',
      'Describe meta data'
    );
  });

  it('Check user restriction to the next step with no fields entered', function() {
    cy.contains('next').click();
    cy.wait(1000);
    cy.get('[class*=Headings__BaseHeading]').should(
      'contain',
      'Describe meta data'
    );
  });

  it('Check user restriction to the next step with two required empty fields', function() {
    // enters title
    cy.get('[class*=MetaDatastyle__FieldContainer]:nth-child(2) input').type(
      firstStepVal.title
    );

    cy.contains('next').click();
    cy.wait(1000);
    cy.get('[class*=Headings__BaseHeading]').should(
      'contain',
      'Describe meta data'
    );
  });

  it('Check filling out the first step and going to the next step', function() {
    // so the title should be entered from the previous test
    // so here we start from the description
    cy.get(
      '[class*=MetaDatastyle__FieldContainer]:nth-child(3) textarea:nth-child(3)'
    ).type(firstStepVal.desc);

    // and this is the tag input
    firstStepVal.tags.forEach(tag => {
      cy.get('[class*=MetaDatastyle__FieldContainer]:nth-child(4) input').type(
        tag
      );
      cy.get('[class*=MetaDatastyle__FieldContainer]:nth-child(4) input').type(
        '{enter}'
      );
      cy.wait(500);
    });

    // oke and here we'll be adding a new name for the data source, unless a name like this already exists in the database
    // but either way, the dropdown should be adjusted according to this text input field
    // if the new name exists the dropdown should be selected as 'Add new'
    // and if it doesn't the dropdown selected should be the entered name
    cy.get(
      '[class*=MetaDatastyle__FieldContainer]:nth-child(5) > [class*=MetaDatastyle__DataSourceTextCont]  input'
    ).type(firstStepVal.dataSource);

    // we press yes for the shared data
    cy.get(
      '[class*=MetaDatastyle__FieldContainer]:nth-child(6) label:nth-child(1)'
    ).click();

    // we press yes for the survey data
    cy.get(
      '[class*=MetaDatastyle__FieldContainer]:nth-child(8) label:nth-child(1)'
    ).click();

    // we press dont know for the first survey question
    cy.get(
      '[class*=MetaDatastyle__FieldContainer]:nth-child(10) label:nth-child(3)'
    ).click();

    // we press 'Respondents' for the second survey quesiton
    cy.get(
      '[class*=MetaDatastyle__FieldContainer]:nth-child(12) label:nth-child(3)'
    ).click();
    // we press 'Representative group of respondents' for the second survey quesiton
    cy.get(
      '[class*=MetaDatastyle__FieldContainer]:nth-child(12) label:nth-child(4)'
    ).click();

    // we press dont know for the 2.1 survey question
    cy.get(
      '[class*=MetaDatastyle__FieldContainer]:nth-child(14) label:nth-child(3)'
    ).click();

    // we press dont know for the 2.2 survey question
    cy.get(
      '[class*=MetaDatastyle__FieldContainer]:nth-child(16) label:nth-child(3)'
    ).click();

    //  we press 'Multistage sampling' for the third survey quesiton
    cy.get(
      '[class*=MetaDatastyle__FieldContainer]:nth-child(18) label:nth-child(5)'
    ).click();
    //  we press 'Other' for the third survey quesiton
    cy.get(
      '[class*=MetaDatastyle__FieldContainer]:nth-child(18) label:nth-child(6)'
    ).click();
    //  we enter 'Other' value for the third survey quesiton
    cy.get(
      '[class*=MetaDatastyle__FieldContainer]:nth-child(18) > div input'
    ).type(firstStepVal.q3[1]);

    // we enter a value for the fourth survey question(should work similarly to dataSource field)
    cy.get(
      '[class*=MetaDatastyle__FieldContainer]:nth-child(20) > [class*=MetaDatastyle__DataSourceTextCont]  input'
    ).type(firstStepVal.q4);

    // we press dont know for the 5 survey question
    cy.get(
      '[class*=MetaDatastyle__FieldContainer]:nth-child(22) label:nth-child(3)'
    ).click();

    //  we press 'Join, delimite or concatenate data' for the 5.1 survey quesiton
    cy.get(
      '[class*=MetaDatastyle__FieldContainer]:nth-child(24) label:nth-child(5)'
    ).click();
    //  we press 'Other' for the 5.1 survey quesiton
    cy.get(
      '[class*=MetaDatastyle__FieldContainer]:nth-child(24) label:nth-child(6)'
    ).click();
    //  we enter 'Other' value for the third survey quesiton
    cy.get(
      '[class*=MetaDatastyle__FieldContainer]:nth-child(24) > div input'
    ).type(firstStepVal.q51[1]);

    cy.contains('next').click();
    cy.wait(1000);
  });

  it('Check if its the upload step', function() {
    cy.get('[class*=Headings__BaseHeading]').should('contain', 'Upload CSV');
  });

  it('Try progressing without uploading file', function() {
    cy.contains('next').click();
    cy.wait(1000);
    cy.get('[class*=Headings__BaseHeading]').should('contain', 'Upload CSV');
  });

  it('Try progressing after uploading incorrect file', function() {
    const fileName = 'IncorrectFile.txt';
    const fileType = 'text/plain';
    const fileInput = 'input[type=file]';

    cy.upload_file(fileName, fileType, fileInput);

    cy.contains('next').click();
    cy.wait(1000);
    cy.get('[class*=Headings__BaseHeading]').should('contain', 'Upload CSV');
  });

  it('Check upload correct file and progress to the next step', function() {
    const fileName = 'CypressSample.csv';
    const fileType = 'text/csv';
    const fileInput = 'input[type=file]';

    cy.upload_file(fileName, fileType, fileInput);

    cy.wait(20000);

    // So the step should show the uploaded file
    cy.contains(fileName);

    cy.contains('next').click();
    cy.wait(1000);
  });

  it('Check if its the overview step', function() {
    cy.get('[class*=Headings__BaseHeading]').should('contain', 'Overview');
  });

  it('Check if overview table is generated correctly', function() {
    fileColumns.forEach((column, index) => {
      // checking if the 'File Column' cell contains the fileColumn name
      cy.get(`tbody tr:nth-child(${index + 1}) > th`).should('contain', column);

      // checking if the 'Summary' cell contains the summary texts
      fileSummaries[index].forEach(summary => {
        cy.get(`tbody tr:nth-child(${index + 1}) > td:nth-child(2)`).should(
          'contain',
          summary
        );
      });

      // checking if the 'Data types' cell contains the data types texts
      fileDataType[index].forEach(type => {
        cy.get(`tbody tr:nth-child(${index + 1}) > td:nth-child(3)`).should(
          'contain',
          type
        );
      });

      // checking if the 'Blank cells' cell contains the correct cell number
      cy.get(`tbody tr:nth-child(${index + 1}) > td:nth-child(4)`).should(
        'contain',
        blankCells[index]
      );
    });
  });

  it('Go to Correct errors step', function() {
    cy.contains('next').click();
    cy.wait(1000);
  });

  it('Check if its the correct errors step', function() {
    cy.get('[class*=Headings__BaseHeading]').should(
      'contain',
      'Check & correct erorrs'
    );
  });

  it('Try progressing without correcting errors', function() {
    cy.contains('next').click();
    cy.wait(1000);
    cy.get('[class*=Headings__BaseHeading]').should(
      'contain',
      'Check & correct erorrs'
    );
  });

  it('Check Find Errors', function() {
    // we click on find errors tab
    cy.get('[class*=ErrorStepstyles__TabContainer] div:nth-child(3)').click();
    cy.wait(1000);

    // verify that the errors are found correctly at least for the first page
    // in total for the file 'CypressSample.csv' there should be 6 errors shown
    cy.get('tbody tr:nth-child(1) td:nth-child(2)').should($el => {
      expect($el).to.have.css('background-color', 'rgb(255, 128, 127)');
    });
    cy.get('tbody tr:nth-child(6) td:nth-child(2)').should($el => {
      expect($el).to.have.css('background-color', 'rgb(255, 128, 127)');
    });
    cy.get('tbody tr:nth-child(7) td:nth-child(4)').should($el => {
      expect($el).to.have.css('background-color', 'rgb(255, 128, 127)');
    });
    cy.get('tbody tr:nth-child(8) td:nth-child(4)').should($el => {
      expect($el).to.have.css('background-color', 'rgb(255, 128, 127)');
    });
    cy.get('tbody tr:nth-child(9) td:nth-child(4)').should($el => {
      expect($el).to.have.css('background-color', 'rgb(255, 128, 127)');
    });
    cy.get('tbody tr:nth-child(10) td:nth-child(4)').should($el => {
      expect($el).to.have.css('background-color', 'rgb(255, 128, 127)');
    });
  });

  it('Check deleting rows', function() {
    // so these are the error will be deleting along with the rows
    // and we will use this to check successfull deletion below
    // both cells are under the column 'Area'
    const delRowCells = ['ola', 'hello'];
    // so we select the first row
    cy.get('tbody tr:nth-child(1) th [class*=CustomCheckBoxstyles]')
      .first()
      .click();

    // and we select the sixth row
    cy.get('tbody tr:nth-child(6) th [class*=CustomCheckBoxstyles]')
      .first()
      .click();

    cy.get('[class*=ErrorStepstyles__ButtonContainer] button').click();

    cy.wait(1000);

    // and here we check if those two deleted row cells
    delRowCells.forEach(cell => {
      cy.get('tbody').should('not.contain', cell);
    });

    // and we also check if the delete rows button has dissapeared
    cy.get('[class*=ErrorStepstyles__ButtonContainer]').should(
      'not.contain',
      'delete rows'
    );
  });

  it('Check update cell', function() {
    const cellText = 'Lithuania';

    // so we will update an area cell with the cellText it should contain a valid country name
    cy.get('tbody tr:nth-child(1) td:nth-child(2) [class*=CellValue]').click();

    cy.get('[type=text]').clear();
    cy.get('[type=text]').type(cellText);

    // and we click save
    cy.get(
      '[class*=SimpleEditDialogstyle__ButtonContainer]:nth-child(1) button'
    ).click();

    cy.wait(1000);

    cy.get('tbody tr:nth-child(1) td:nth-child(2) [class*=CellValue]').should(
      'contain',
      cellText
    );
  });

  it('Check find', function() {
    const findValue = 'nan';

    // we click on find and replace
    cy.get('[class*=ErrorStepstyles__TabContainer] div:nth-child(5)').click();

    //  we click the column selection to select which column values to find
    cy.get('[data-name="selectHeader"]').click();

    // we click the 'Source.1' column to check find all the 'nan' values
    cy.get('li:nth-child(9)').click();

    // we type the find value
    cy.get(
      '[class*=FindReplacestyles__FieldContainer]:nth-child(2) input'
    ).type(findValue);

    // we click find
    cy.get(
      '[class*=FindReplacestyles__FieldContainer]:nth-child(2) button'
    ).click();

    cy.wait(1000);

    // we verify that at least the first column contains the findValue
    //  and the texts color is blue
    cy.get('tbody tr:nth-child(1) td:nth-child(4) [class*=CellValue]').should(
      'contain',
      findValue
    );

    cy.get('tbody tr:nth-child(1) td:nth-child(4) [class*=CellValue]').should(
      $el => {
        expect($el).to.have.css('color', 'rgb(0, 0, 255)');
      }
    );
  });

  it('Check replace', function() {
    const replaceValue = 'AidsFonds';

    // we click on find and replace
    cy.get('[class*=ErrorStepstyles__TabContainer] div:nth-child(5)').click();

    // we type the replace value
    cy.get(
      '[class*=FindReplacestyles__FieldContainer]:nth-child(3) input'
    ).type(replaceValue);

    // we click replace
    cy.get(
      '[class*=FindReplacestyles__FieldContainer]:nth-child(3) button'
    ).click();

    cy.wait(1000);

    // we verify that at least the first column contains the replaceValue
    //  and the texts color is blue
    cy.get('tbody tr:nth-child(1) td:nth-child(4) [class*=CellValue]').should(
      'contain',
      replaceValue
    );

    cy.get('tbody tr:nth-child(1) td:nth-child(4) [class*=CellValue]').should(
      $el => {
        expect($el).to.have.css('color', 'rgb(0, 0, 255)');
      }
    );
  });

  it('Cleaning up last of the errors and progressing to manual mapping', function() {
    cy.get('[class*=Headings__BaseHeading]').click();

    // we click on find errors
    cy.get('[class*=ErrorStepstyles__TabContainer] div:nth-child(3)').click();
    cy.wait(1000);

    // we press on next to go to the next page
    cy.get('.pagination li:nth-child(5)').click();
    cy.wait(1000);

    // and we delete the rows containing the last three errors
    // so we select the first row
    cy.get('tbody tr:nth-child(1) th [class*=CustomCheckBoxstyles]')
      .first()
      .click();

    cy.wait(1000);

    // and we select the fourth row
    cy.get('tbody tr:nth-child(4) th [class*=CustomCheckBoxstyles]')
      .first()
      .click();

    cy.wait(1000);

    // and we select the sixth row
    cy.get('tbody tr:nth-child(6) th [class*=CustomCheckBoxstyles]')
      .first()
      .click();

    cy.wait(1000);

    // and we select the seventh row
    cy.get('tbody tr:nth-child(7) th [class*=CustomCheckBoxstyles]')
      .first()
      .click();

    cy.wait(1000);

    cy.wait(1000);

    // and we click delete
    cy.get('[class*=ErrorStepstyles__ButtonContainer] button').click();

    cy.wait(1000);

    // and we continue to the manual mapping step
    cy.contains('next').click();
    cy.wait(1000);
  });

  it('Check if its the manual mapping step', function() {
    cy.get('[class*=Headings__BaseHeading]').should(
      'contain',
      'Manual mapping'
    );
  });

  it('Try progressing without doing any mapping', function() {
    cy.contains('next').click();
    cy.wait(1000);
    // verify its still the same page
    cy.get('[class*=Headings__BaseHeading]').should(
      'contain',
      'Manual mapping'
    );
  });

  it('Map the data by selecting zoom model types', function() {
    // we select the indicator
    selectItem(1, 9);

    // we select the sub indicator
    selectItem(3, 8);

    // we select the geolocation
    selectItem(4, 7);

    // we select the date
    selectItem(6, 6);

    // we select the value as number value
    selectItem(8, 4);

    // and we progress and check what the wrapup step tells us
    cy.contains('next').click();
    cy.wait(1000);

    cy.get('[class*=Headings__BaseHeading]').should(
      'contain',
      'Your data set was updated/uploaded succesfully!'
    );
  });
});
