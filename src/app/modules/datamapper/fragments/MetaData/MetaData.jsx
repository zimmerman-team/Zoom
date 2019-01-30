/* base */
/* third party*/
import React from 'react';
import PropTypes from 'prop-types';
import { Box } from 'grommet';
import findIndex from 'lodash/findIndex';

/* custom components */
import ZoomSelect from 'components/Select/ZoomSelect';
import CheckboxesGroup from 'components/CheckboxesGroup/CheckboxesGroup';
import RadioButtonGroup from 'components/RadioButtonGroup/RadioButtonGroup';
import TextField from 'components/sort/TextField';
import InputFieldLabel from 'components/InputFieldLabel/InputFieldLabel';
import InputFieldDivider from 'components/Dividers/InputFieldDivider';
import ChipInput from 'components/ChipInput/ChipInput';

/* style */
import {
  FieldContainer,
  ModuleContainer,
  DataSourceTextCont,
  SelectSurround,
  TwoFieldContainer,
  SelectContainer,
  OrLabel,
} from './MetaData.style';

/* mock data */
import {
  options1,
  options2,
  checkBoxOptions2,
  checkBoxOptions3,
  checkBoxOptions51,
  numberOptions,
} from './MetaData.mock';
import { SectionHeading } from 'components/theme/ThemeSheet';

const propTypes = {
  data: PropTypes.array,
};
const defaultProps = {
  data: [],
};

class MetaData extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {
        title: undefined,
        desc: undefined,
        tags: [],
        dataSource: {
          key: '',
          label: '',
          value: '',
        },
        shared: false,
        surveyData: false,
        q1: undefined,
        q2: [],
        q21: undefined,
        q22: undefined,
        q3: [],
        q4: {
          key: '',
          label: '',
          value: '',
        },
        q5: undefined,
        q51: [],
        sourceText: '',
        q3Text: '',
        q4Text: '',
        q51Text: '',
      },
    };

    this.simpleChange = this.simpleChange.bind(this);
  }

  simpleChange(value, question) {
    this.setState(prevState => {
      const { data } = prevState;
      data[question] = value;
      return { data };
    });
  }

  // so for check box change we tweek the changing a little
  // bit to encapsulate the 'other' logic
  checkBoxChange(value, question, qText = false) {
    const check = this.state.data[question];
    const checkInd = findIndex(check, ['label', value]);

    if (checkInd === -1) {
      // so if a checked doesnt exist we add it
      // and if it does exist we remove it
      let val = value;
      // so if its other we gonna add the text as value for it
      if (value.toLowerCase() === 'other' && qText) {
        val = this.state.data[qText];
      }
      check.push({
        label: value,
        value: val,
      });
    } else {
      check.splice(checkInd, 1);
    }

    this.simpleChange(check, question);
  }

  // so this will happen when the other text will be changed,
  // and it will be a bit more than just
  otherCheckBoxText(value, question, qText) {
    const check = this.state.data[question];

    const otherInd = findIndex(
      check,
      item => item.label.toLowerCase() === 'other',
    );

    // so if 'other' label exists in the selected checkboxes
    // we add it the changed text value straight to the array
    if (otherInd !== -1) {
      check[otherInd].value = value;
      this.simpleChange(check, question);
    }

    // otherwise it will be added when the checkbox is selected, but we still
    // save the currently entered text
    this.setState({
      [qText]: value,
    });
  }

  // for dropdown selection we'll also have a little tweek
  // of change logic, cause of those freetexts as well
  dropDownChange(value, question, qText) {
    let val = value.value;
    if (val === 'other') val = this.state.data[qText];

    this.simpleChange(
      {
        key: value.value,
        label: value.label,
        value: val,
      },
      question,
    );
  }

  // and we'll have a specific text change
  // if 'other' option is chosen from the dropdowns
  otherDropdownText(value, question, qText) {
    if (this.state.data[question].key === 'other')
      this.simpleChange(
        {
          key: this.state.data[question].key,
          label: this.state.data[question].label,
          value,
        },
        question,
      );

    this.simpleChange(value, qText);
  }

  render() {
    console.log(this.state.data);
    console.log(this.state.data.dataSource.value);

    return (
      <ModuleContainer>
        <SectionHeading>Describe meta data</SectionHeading>
        {/*////////////////////////////////////////////////////////////////////*/}
        <FieldContainer>
          <InputFieldLabel text="Title data set*" />
          <TextField
            placeholder={undefined}
            InputProps={{
              disableUnderline: false,
            }}
            onChange={e => this.simpleChange(e.target.value, 'title')}
          />
        </FieldContainer>

        {/*////////////////////////////////////////////////////////////////////*/}
        <FieldContainer>
          <InputFieldLabel text="Description*" />
          <TextField
            placeholder={undefined}
            InputProps={{
              disableUnderline: false,
            }}
            onChange={e => this.simpleChange(e.target.value, 'desc')}
          />
        </FieldContainer>

        {/*////////////////////////////////////////////////////////////////////*/}
        <FieldContainer>
          <InputFieldLabel text="Tags*" />
          <ChipInput onChange={tags => this.simpleChange(tags, 'tags')} />
        </FieldContainer>

        {/*////////////////////////////////////////////////////////////////////*/}
        <TwoFieldContainer>
          <SelectContainer>
            <InputFieldLabel text="Select data source*" />
            <SelectSurround>
              <ZoomSelect
                placeHolder={'Connect to Zoom data source'}
                data={[
                  { value: 'other', label: 'Add New' },
                  { value: 'hello', label: 'hello' },
                  { value: 'hello1', label: 'hello2' },
                ]}
                valueSelected={this.state.data.dataSource.label}
                selectVal={e =>
                  this.dropDownChange(e.value, 'dataSource', 'sourceText')
                }
              />
            </SelectSurround>
          </SelectContainer>
          <OrLabel> or </OrLabel>
          <DataSourceTextCont>
            <InputFieldLabel text="Create new name for  data source" />
            <TextField
              placeholder={undefined}
              InputProps={{
                disableUnderline: false,
              }}
              onChange={e =>
                this.otherDropdownText(
                  e.target.value,
                  'dataSource',
                  'sourceText',
                )
              }
            />
          </DataSourceTextCont>
        </TwoFieldContainer>

        {/*////////////////////////////////////////////////////////////////////*/}
        <FieldContainer>
          <InputFieldLabel text="Share data set?" />
          <Box>
            <RadioButtonGroup
              direction="column"
              options={options1}
              onChange={value => this.simpleChange(value, 'shared')}
            />
          </Box>
        </FieldContainer>

        <InputFieldDivider />

        {/*////////////////////////////////////////////////////////////////////*/}
        <FieldContainer>
          <InputFieldLabel text="Is this a servey data set?" />
          <Box>
            <RadioButtonGroup
              direction="column"
              options={options1}
              onChange={value => this.simpleChange(value, 'surveyData')}
            />
          </Box>
        </FieldContainer>

        <InputFieldDivider />

        {/*////////////////////////////////////////////////////////////////////*/}
        <FieldContainer>
          <InputFieldLabel
            text="1. Have you tested the tool in a pilot or with a test group before
          conducting it?"
          />
          <Box direction="row">
            <RadioButtonGroup
              direction="row"
              options={options2}
              onChange={value => this.simpleChange(value, 'q1')}
            />
          </Box>
        </FieldContainer>

        <InputFieldDivider />

        {/*////////////////////////////////////////////////////////////////////*/}
        <FieldContainer>
          <InputFieldLabel
            text="2. Have you tested the tool in a pilot or with a test group before
          conducting it?"
          />
          <CheckboxesGroup
            options={checkBoxOptions2}
            onChange={value => this.checkBoxChange(value, 'q2')}
          />
        </FieldContainer>

        <InputFieldDivider />

        {/*////////////////////////////////////////////////////////////////////*/}
        <FieldContainer>
          <InputFieldLabel
            text="2.1 - Staff was trained on how to ask the senstive information to
          avoid influencing the respondent’s anwers?"
          />
          <Box direction="row">
            <RadioButtonGroup
              direction="row"
              options={options2}
              onChange={value => this.simpleChange(value, 'q21')}
            />
          </Box>
        </FieldContainer>

        {/*////////////////////////////////////////////////////////////////////*/}
        <FieldContainer>
          <InputFieldLabel
            text="2.2 - It was possible for respondents to not answer certain questions
          if they found them to personal/senstive?"
          />
          <Box direction="row">
            <RadioButtonGroup
              direction="row"
              options={options2}
              onChange={value => this.simpleChange(value, 'q22')}
            />
          </Box>
        </FieldContainer>

        {/*////////////////////////////////////////////////////////////////////*/}
        <FieldContainer>
          <InputFieldLabel text="3. How did you select respondents?" />
          <CheckboxesGroup
            options={checkBoxOptions3}
            onChange={value => this.checkBoxChange(value, 'q3', 'q3Text')}
          />
          <InputFieldLabel text="If other, explain" />
          <TextField
            placeholder={undefined}
            InputProps={{
              disableUnderline: false,
            }}
            onChange={e =>
              this.otherCheckBoxText(e.target.value, 'q3', 'q3Text')
            }
          />
        </FieldContainer>

        <InputFieldDivider />

        {/*////////////////////////////////////////////////////////////////////*/}
        <TwoFieldContainer>
          <SelectContainer>
            <InputFieldLabel text="4. How many respondents were interviewed/participated?" />
            <SelectSurround>
              <ZoomSelect
                placeHolder={'Select or add number of respondents'}
                data={numberOptions}
                valueSelected={this.state.data.q4.label}
                selectVal={e => this.dropDownChange(e.value, 'q4', 'q4Text')}
              />
            </SelectSurround>
          </SelectContainer>
          <OrLabel> or </OrLabel>
          <DataSourceTextCont>
            <InputFieldLabel text="Enter a number" />
            <TextField
              placeholder={undefined}
              InputProps={{
                disableUnderline: false,
              }}
              onChange={e =>
                this.otherDropdownText(e.target.value, 'q4', 'q4Text')
              }
            />
          </DataSourceTextCont>
        </TwoFieldContainer>

        {/*////////////////////////////////////////////////////////////////////*/}
        <FieldContainer>
          <InputFieldLabel text="5. Did you clean/edit the data before uploading it?" />
          <RadioButtonGroup
            direction="row"
            options={options2}
            onChange={value => this.simpleChange(value, 'q5')}
          />
        </FieldContainer>

        <InputFieldDivider />

        {/*////////////////////////////////////////////////////////////////////*/}
        <FieldContainer>
          <InputFieldLabel text="5.1 Which data cleaning techniques did you use?" />
          <CheckboxesGroup
            options={checkBoxOptions51}
            onChange={value => this.checkBoxChange(value, 'q51', 'q51Text')}
          />
          <InputFieldLabel text="If other, explain" />
          <TextField
            placeholder={undefined}
            InputProps={{
              disableUnderline: false,
            }}
            onChange={e =>
              this.otherCheckBoxText(e.target.value, 'q51', 'q51Text')
            }
          />
        </FieldContainer>
      </ModuleContainer>
    );
  }
}

MetaData.propTypes = propTypes;
MetaData.defaultProps = defaultProps;

export default MetaData;
