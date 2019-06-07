beforeEach(() => {
  // README keep in mind that Cypress clears the whole state before each test. => signIn() before each test.
  // set this for skipping landing dialog
  cy.setCookie('cookieNotice', 'false');
});

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
    '11',
    'Number of unique values',
    '1',
    'Most frequent value',
    'CypressIndicator',
    'CypressIndicator count',
    '11'
  ],
  [
    'Count of values',
    '11',
    'Number of unique values',
    '1',
    'Most frequent value',
    'Number',
    'Number count',
    '11'
  ],
  [
    'Count of values',
    '11',
    'Number of unique values',
    '2',
    'Most frequent value',
    'All sexes Young people (15-24) lower estimate',
    'All sexes Young people (15-24) lower estimate count',
    '10'
  ],
  [
    'Count of values',
    '11',
    'Number of unique values',
    '4',
    'Most frequent value',
    'Lesotho',
    'Lesotho count',
    '7'
  ],
  [
    'Count of values',
    '11',
    'Number of unique values',
    '2',
    'Most frequent value',
    'LSO',
    'LSO count',
    '9'
  ],
  [
    'Count of values',
    '11.0',
    'Average',
    '1998.4545454545455',
    'Std',
    '6.424385361474455',
    'Min value',
    '1992.0',
    '25%',
    '1994.5',
    '50%',
    '1997.0',
    '75%',
    '2000.0',
    'Max value',
    '2015.0'
  ],
  [
    'Count of values',
    '11',
    'Number of unique values',
    '1',
    'Most frequent value',
    'UNAIDS_Spectrum Estimates_',
    'UNAIDS_Spectrum Estimates_ count',
    '11'
  ],
  [
    'Count of values',
    '11.0',
    'Average',
    '30905.909090909092',
    'Std',
    '29509.203555685966',
    'Min value',
    '2.0',
    '25%',
    '14607.5',
    '50%',
    '26034.0',
    '75%',
    '30527.0',
    'Max value',
    '86330.0'
  ],
  [
    'Count of values',
    '8',
    'Number of unique values',
    '1',
    'Most frequent value',
    'AidFonds',
    'AidFonds count',
    '8'
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
  ['82% of data a country value.', '18% of data a text value.'],
  ['100% of data a iso3 value.'],
  ['100% of data a date value.'],
  ['100% of data a text value.'],
  ['100% of data a numeric value.'],
  ['73% of data a text value.', '27% of data a blank value.'],
  ['100% of data a blank value.']
];

// and this is an array of blank cells for each file column
// each arrays index is in relation to the fileColumns array indexes
const blankCells = [0, 0, 0, 0, 0, 0, 0, 0, 3, 11];

describe('Datamapper e2e tests', function() {
  function selectItem(rowNumber, valNumber) {
    //  we click the column selection to select which column values to find
    cy.get(
      `tbody tr:nth-child(${rowNumber}) td:nth-child(2) [data-name="selectHeader"]`
    ).click({ force: true });

    // we click the 'Source.1' column to check find all the 'nan' values
    cy.get(`li:nth-child(${valNumber})`).click({ force: true });
  }

  it('Page should contain first steps title', function() {
    cy.signIn();
    cy.waitPageLoader2();
    cy.waitPageLoader();
    cy.wait(5000);
    cy.get('[data-cy="appbar-right-button"]').click();
    cy.get('[data-cy="nav-pane-item-1"]').click();
    cy.get('[class*=Headings__BaseHeading]').should(
      'contain',
      'Describe meta data'
    );
  });

  it('Should make a snapshot of the visual current state', function() {
    cy.percySnapshot('Datamapper page - step 1');
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

    //
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

  it('Should make a snapshot of the visual current state', function() {
    cy.waitPageLoader();
    cy.waitPageLoader2();
    //Here we wait for the styling to be loaded
    cy.wait(5000);
    cy.percySnapshot('Datamapper page - step 2');
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
    cy.get('[class*=Headings__BaseHeading]').should('contain', 'Upload CSV');
  });

  // it('Check upload correct file and progress to the next step', function() {
  //   const fileName = 'CypressSample.csv';
  //   const fileType = 'text/csv';
  //   const fileInput = 'input[type=file]';
  //   cy.upload_file(fileName, fileType, fileInput);
  //
  //   // So the step should show the uploaded file
  //   cy.contains(fileName);
  //   cy.waitPageLoader();
  //   cy.waitPageLoader2();
  //   cy.contains('next').click();
  // });
  //
  // it('Check if its the overview step', function() {
  //   cy.get('[class*=Headings__BaseHeading]').should('contain', 'Overview');
  // });
  //
  // it('Should make a snapshot of the visual current state', function() {
  //   cy.waitPageLoader();
  //   cy.waitPageLoader2();
  //   cy.percySnapshot('Datamapper page - step 3');
  // });
  //
  // it('Check if overview table is generated correctly', function() {
  //   fileColumns.forEach((column, index) => {
  //     // checking if the 'File Column' cell contains the fileColumn name
  //     cy.get(`tbody tr:nth-child(${index + 1}) > th`).should('contain', column);
  //
  //     // checking if the 'Summary' cell contains the summary texts
  //     fileSummaries[index].forEach(summary => {
  //       cy.get(`tbody tr:nth-child(${index + 1}) > td:nth-child(2)`).should(
  //         'contain',
  //         summary
  //       );
  //     });
  //
  //     // checking if the 'Data types' cell contains the data types texts
  //     fileDataType[index].forEach(type => {
  //       cy.get(`tbody tr:nth-child(${index + 1}) > td:nth-child(3)`).should(
  //         'contain',
  //         type
  //       );
  //     });
  //
  //     // checking if the 'Blank cells' cell contains the correct cell number
  //     cy.get(`tbody tr:nth-child(${index + 1}) > td:nth-child(4)`).should(
  //       'contain',
  //       blankCells[index]
  //     );
  //   });
  // });
  //
  // it('Go to Correct errors step', function() {
  //   cy.contains('next').click();
  //   cy.wait(1000);
  // });
  //
  // it('Should make a snapshot of the visual current state', function() {
  //   cy.wait(8000);
  //   //cy.percySnapshot('Datamapper page - step 4');
  // });
  //
  // it('Check if its the correct errors step', function() {
  //   cy.get('[class*=Headings__BaseHeading]').should(
  //     'contain',
  //     'Check & correct erorrs'
  //   );
  // });
  //
  // it('Try progressing without correcting errors', function() {
  //   cy.contains('next').click();
  //   cy.wait(1000);
  //   cy.get('[class*=Headings__BaseHeading]').should(
  //     'contain',
  //     'Check & correct erorrs'
  //   );
  // });
  //
  // it('Check Find Errors', function() {
  //   // we click on find errors tab
  //   cy.get('[class*=ErrorStepstyles__TabContainer] div:nth-child(3)').click();
  //   cy.wait(1000);
  //
  //   // verify that the errors are found correctly at least for the first page
  //   // in total for the file 'CypressSample.csv' there should be 5 errors shown
  //   cy.get('tbody tr:nth-child(1) td:nth-child(1)').should($el => {
  //     expect($el).to.have.css('background-color', 'rgb(255, 128, 127)');
  //   });
  //   cy.get('tbody tr:nth-child(2) td:nth-child(1)').should($el => {
  //     expect($el).to.have.css('background-color', 'rgb(255, 128, 127)');
  //   });
  //   cy.get('tbody tr:nth-child(3) td:nth-child(6)').should($el => {
  //     expect($el).to.have.css('background-color', 'rgb(255, 128, 127)');
  //   });
  //   cy.get('tbody tr:nth-child(4) td:nth-child(6)').should($el => {
  //     expect($el).to.have.css('background-color', 'rgb(255, 128, 127)');
  //   });
  //   cy.get('tbody tr:nth-child(5) td:nth-child(6)').should($el => {
  //     expect($el).to.have.css('background-color', 'rgb(255, 128, 127)');
  //   });
  // });
  //
  // it('Check deleting rows', function() {
  //   // so these are the error will be deleting along with the rows
  //   // and we will use this to check successfull deletion below
  //   // both cells are under the column 'Area'
  //   const delRowCells = ['ola', 'hello'];
  //
  //   // so we select the first row
  //   cy.get('tbody tr:nth-child(1) th input[type="checkbox"]')
  //     .first()
  //     .click();
  //   // so we select the first row
  //   cy.get('tbody tr:nth-child(2) th input[type="checkbox"]')
  //     .first()
  //     .click();
  //
  //   cy.get('[class*=ErrorStepstyles__ButtonContainer] button').click();
  //   cy.wait(1000);
  //   cy.waitPageLoader();
  //   cy.waitPageLoader2();
  //
  //   // and here we check if those two deleted row cells
  //   delRowCells.forEach(cell => {
  //     cy.get('tbody').should('not.contain', cell);
  //   });
  //
  //   // and we also check if the delete rows button has dissapeared
  //   cy.get('[class*=ErrorStepstyles__ButtonContainer]').should(
  //     'not.contain',
  //     'delete rows'
  //   );
  // });
  //
  // it('Check find', function() {
  //   const findValue = 'nan';
  //
  //   // we click on find and replace
  //   cy.get('[class*=ErrorStepstyles__TabContainer] div:nth-child(5)').click();
  //
  //   //  we click the column selection to select which column values to find
  //   cy.get('[data-name="selectHeader"]').click();
  //
  //   // we click the 'Source.1' column to check find all the 'nan' values
  //   cy.get('li:nth-child(9)').click();
  //
  //   // we type the find value
  //   cy.get(
  //     '[class*=FindReplacestyles__FieldContainer]:nth-child(2) input'
  //   ).type(findValue);
  //
  //   // we click find
  //   cy.get(
  //     '[class*=FindReplacestyles__FieldContainer]:nth-child(2) button'
  //   ).click();
  //
  //   cy.wait(1000);
  //
  //   // we verify that at least the first column contains the findValue
  //   //  and the texts color is blue
  //   cy.get('tbody tr:nth-child(1) td:nth-child(4) [class*=CellValue]').should(
  //     'contain',
  //     findValue
  //   );
  //
  //   cy.get('tbody tr:nth-child(1) td:nth-child(4) [class*=CellValue]').should(
  //     $el => {
  //       expect($el).to.have.css('color', 'rgb(0, 0, 255)');
  //     }
  //   );
  // });
  //
  // it('Check replace', function() {
  //   const replaceValue = 'AidsFonds';
  //
  //   // we click on find and replace
  //   cy.get('[class*=ErrorStepstyles__TabContainer] div:nth-child(5)').click();
  //
  //   // we type the replace value
  //   cy.get(
  //     '[class*=FindReplacestyles__FieldContainer]:nth-child(3) input'
  //   ).type(replaceValue);
  //
  //   // we click replace
  //   cy.get(
  //     '[class*=FindReplacestyles__FieldContainer]:nth-child(3) button'
  //   ).click();
  //
  //   cy.wait(65000);
  //
  //   // we verify that at least the first column contains the replaceValue
  //   //  and the texts color is blue
  //   cy.get('tbody tr:nth-child(1) td:nth-child(4) [class*=CellValue]').should(
  //     'contain',
  //     replaceValue
  //   );
  //
  //   cy.get('tbody tr:nth-child(1) td:nth-child(4) [class*=CellValue]').should(
  //     $el => {
  //       expect($el).to.have.css('color', 'rgb(0, 0, 255)');
  //     }
  //   );
  // });
  //
  // it('Cleaning up last of the errors and progressing to manual mapping', function() {
  //   cy.get('[class*=Headings__BaseHeading]').click();
  //
  //   // we click on find errors
  //   cy.get('[class*=ErrorStepstyles__TabContainer] div:nth-child(3)').click();
  //   cy.wait(1000);
  //
  //   // // we press on next to go to the next page
  //   // cy.get('.pagination li:nth-child(5)').click();
  //   // cy.wait(1000);
  //
  //   // and we delete the rows containing the last three errors
  //   // so we select the first row
  //   // cy.get('tbody tr:nth-child(1) th [class*=CustomCheckBoxstyles]')
  //   //   .first()
  //   //   .click();
  //   //
  //   // cy.wait(1000);
  //   //
  //   // // and we select the fourth row
  //   // cy.get('tbody tr:nth-child(4) th [class*=CustomCheckBoxstyles]')
  //   //   .first()
  //   //   .click();
  //   //
  //   // cy.wait(1000);
  //   //
  //   // // and we select the sixth row
  //   // cy.get('tbody tr:nth-child(6) th [class*=CustomCheckBoxstyles]')
  //   //   .first()
  //   //   .click();
  //   //
  //   // cy.wait(1000);
  //   //
  //   // // and we select the seventh row
  //   // cy.get('tbody tr:nth-child(7) th [class*=CustomCheckBoxstyles]')
  //   //   .first()
  //   //   .click();
  //   //
  //   // cy.wait(1000);
  //   //
  //   // cy.wait(1000);
  //   //
  //   // // and we click delete
  //   // cy.get('[class*=ErrorStepstyles__ButtonContainer] button').click();
  //   //
  //   // cy.wait(1000);
  //
  //   // and we continue to the manual mapping step
  //   cy.contains('next').click();
  //   cy.wait(1000);
  // });
  //
  // it('Check if its the manual mapping step', function() {
  //   cy.get('[class*=Headings__BaseHeading]').should(
  //     'contain',
  //     'Manual mapping'
  //   );
  // });
  //
  // it('Should make a snapshot of the visual current state', function() {
  //   cy.waitPageLoader();
  //   cy.waitPageLoader2();
  //   //cy.percySnapshot('Datamapper page - step 5');
  // });
  //
  // it('Try progressing without doing any mapping', function() {
  //   cy.contains('next').click();
  //   cy.wait(1000);
  //   // verify its still the same page
  //   cy.get('[class*=Headings__BaseHeading]').should(
  //     'contain',
  //     'Manual mapping'
  //   );
  // });
  //
  // // it('Map the data by selecting zoom model types', function() {
  // //   // // we select the indicator
  // //   // selectItem(1, 9);
  // //   //
  // //   // // we select the sub indicator
  // //   // selectItem(3, 8);
  // //
  // //   // we select the indicator
  // //   selectItem(11, 5);
  // //
  // //   // we select the date
  // //   selectItem(11, 2);
  // //
  // //   // we select the geolocation
  // //   selectItem(11, 4);
  // //
  // //   // and we progress and check what the wrapup step tells us
  // //   cy.contains('next').click();
  // //   cy.wait(1000);
  // //
  // //   cy.get('[class*=Headings__BaseHeading]').should(
  // //     'contain',
  // //     'Your data set was updated/uploaded succesfully!'
  // //   );
  // // });
});
