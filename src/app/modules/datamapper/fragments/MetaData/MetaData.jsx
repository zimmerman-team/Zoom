/* base */
/* third party */
import React from 'react';
import PropTypes from 'prop-types';
import { Box } from 'grommet';

/* custom components */
import ZoomSelect from 'components/Select/ZoomSelect';
import CheckboxesGroup from 'components/CheckboxesGroup/CheckboxesGroup';
import RadioButtonGroup from 'components/RadioButtonGroup/RadioButtonGroup';
import TextField from 'components/sort/TextField';
import InputFieldLabel from 'components/InputFieldLabel/InputFieldLabel';
import InputFieldDivider from 'components/Dividers/InputFieldDivider';
import ChipInput from 'components/ChipInput/ChipInput';

/* style */
import { SectionHeading } from 'components/sort/Headings';
import {
  FieldContainer,
  ModuleContainer,
  DataSourceTextCont,
  SelectSurround,
  TwoFieldContainer,
  SelectContainer,
  OrLabel
} from './MetaData.style';
import theme from 'theme/Theme';

/* const data */
import { step1InitialData } from '__consts__/DataMapperStepConsts';
import {
  options1,
  options2,
  checkBoxOptions2,
  checkBoxOptions3,
  checkBoxOptions51,
  numberOptions,
  dataSourceOptions
} from './MetaData.consts';

const propTypes = {
  /**
   Label for the button.
   */
  simpleChange: PropTypes.func,
  checkBoxChange: PropTypes.func,
  otherCheckBoxText: PropTypes.func,
  dropDownChange: PropTypes.func,
  otherDropdownText: PropTypes.func,
  data: PropTypes.shape({
    metaData: PropTypes.shape({
      title: PropTypes.string,
      desc: PropTypes.string,
      tags: PropTypes.arrayOf(PropTypes.string),
      dataSource: PropTypes.shape({
        key: PropTypes.string,
        label: PropTypes.string,
        value: PropTypes.string
      }),
      shared: PropTypes.Boolean,
      surveyData: PropTypes.Boolean,
      q1: PropTypes.string,
      q2: PropTypes.arrayOf(
        PropTypes.shape({
          label: PropTypes.string,
          value: PropTypes.string
        })
      ),
      q21: PropTypes.string,
      q22: PropTypes.string,
      q3: PropTypes.arrayOf(
        PropTypes.shape({
          label: PropTypes.string,
          value: PropTypes.string
        })
      ),
      q4: PropTypes.shape({
        key: PropTypes.string,
        label: PropTypes.string,
        value: PropTypes.string
      }),
      q5: PropTypes.string,
      q51: PropTypes.arrayOf(
        PropTypes.shape({
          label: PropTypes.string,
          value: PropTypes.string
        })
      ),
      sourceText: PropTypes.string,
      q3Text: PropTypes.string,
      q4Text: PropTypes.string,
      q51Text: PropTypes.string,
      fileSources: PropTypes.arrayOf(
        PropTypes.shape({
          label: PropTypes.string,
          value: PropTypes.string
        })
      )
    }),
    environment: PropTypes.shape({})
  }),
  metaDataEmptyFields: PropTypes.arrayOf(PropTypes.string)
};
const defaultProps = {
  metaDataEmptyFields: [],
  data: step1InitialData,
  simpleChange: undefined,
  checkBoxChange: undefined,
  otherCheckBoxText: undefined,
  dropDownChange: undefined,
  otherDropdownText: undefined
};

class MetaData extends React.Component {
  // so we will control this components rendering
  // with this, because it really shouldn't
  // render when text fields are change
  // because the text fields are and should be uncontrolled
  // and when they change it shouldn't rerender
  // the whole component, cause it makes everything lag
  shouldComponentUpdate(nextProps) {
    // so we will list out the conditional logic
    // for when this component should NOT rerender
    if (
      (this.props.data.title !== nextProps.data.title &&
        nextProps.data.title !== undefined) ||
      (this.props.data.desc !== nextProps.data.desc &&
        nextProps.data.desc !== undefined) ||
      (this.props.data.sourceText !== nextProps.data.sourceText &&
        nextProps.data.sourceText !== undefined) ||
      this.props.data.q3Text !== nextProps.data.q3Text ||
      this.props.data.q4Text !== nextProps.data.q4Text ||
      this.props.data.q51Text !== nextProps.data.q51Text
    )
      return false;

    // console.log('SHOULD UPDATE');
    // if any other field is being changed rerendering is ooke
    return true;
  }

  validateField(field) {
    let length = this.props.data[field].length === 0;
    if (field === 'dataSource')
      length = this.props.data[field].value.length === 0;
    return this.props.metaDataEmptyFields.indexOf(field) !== -1 && length;
  }

  render() {
    return (
      <ModuleContainer>
        <SectionHeading>Describe meta data</SectionHeading>
        {/*////////////////////////////////////////////////////////////////////*/}
        <FieldContainer>
          <TextField
            error={this.validateField('title')}
            defaultValue={this.props.data.title}
            label="Title data set"
            onChange={e => this.props.simpleChange(e.target.value, 'title')}
            required
          />
        </FieldContainer>

        {/*////////////////////////////////////////////////////////////////////*/}
        <FieldContainer>
          <TextField
            multiline
            defaultValue={this.props.data.desc}
            error={this.validateField('desc')}
            label="Description"
            onChange={e => this.props.simpleChange(e.target.value, 'desc')}
            required
          />
        </FieldContainer>

        {/*////////////////////////////////////////////////////////////////////*/}
        <FieldContainer>
          <ChipInput
            value={this.props.data.tags}
            label="Tags"
            onAdd={chip => this.props.onChipAdd(chip)}
            onDelete={(chip, index) => this.props.onChipDelete(index)}
          />
        </FieldContainer>

        {/*////////////////////////////////////////////////////////////////////*/}
        <TwoFieldContainer>
          <SelectContainer>
            <InputFieldLabel
              text="Select data source*"
              style={{
                color: this.validateField('dataSource')
                  ? theme.color.aidsFondsRed
                  : ''
              }}
            />
            <SelectSurround>
              <ZoomSelect
                search={false}
                dropDownWidth={290}
                placeHolder="Connect to Zoom data source"
                data={dataSourceOptions.concat(this.props.data.fileSources)}
                valueSelected={this.props.data.dataSource.label}
                selectVal={value =>
                  this.props.dropDownChange(value, 'dataSource', 'sourceText')
                }
              />
            </SelectSurround>
          </SelectContainer>
          <OrLabel> or </OrLabel>
          <DataSourceTextCont>
            <TextField
              error={this.validateField('dataSource')}
              defaultValue={this.props.data.sourceText}
              label="Create new name for data source"
              onChange={e =>
                this.props.otherDropdownText(
                  e.target.value,
                  'dataSource',
                  'sourceText',
                  dataSourceOptions.concat(this.props.data.fileSources)
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
              value={this.props.data.shared}
              options={options1}
              onChange={value => this.props.simpleChange(value, 'shared')}
            />
          </Box>
        </FieldContainer>

        <InputFieldDivider />

        {/*////////////////////////////////////////////////////////////////////*/}
        <FieldContainer>
          <InputFieldLabel text="Is this a survey data set?" />
          <Box>
            <RadioButtonGroup
              direction="column"
              options={options1}
              value={this.props.data.surveyData}
              onChange={value => this.props.simpleChange(value, 'surveyData')}
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
              value={this.props.data.q1}
              onChange={value => this.props.simpleChange(value, 'q1')}
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
            values={this.props.data.q2}
            options={checkBoxOptions2}
            onChange={value => this.props.checkBoxChange(value, 'q2')}
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
              value={this.props.data.q21}
              direction="row"
              options={options2}
              onChange={value => this.props.simpleChange(value, 'q21')}
            />
          </Box>
        </FieldContainer>

        <InputFieldDivider />

        {/*////////////////////////////////////////////////////////////////////*/}
        <FieldContainer>
          <InputFieldLabel
            text="2.2 - It was possible for respondents to not answer certain questions
          if they found them to personal/senstive?"
          />
          <Box direction="row">
            <RadioButtonGroup
              value={this.props.data.q22}
              direction="row"
              options={options2}
              onChange={value => this.props.simpleChange(value, 'q22')}
            />
          </Box>
        </FieldContainer>

        <InputFieldDivider />

        {/*////////////////////////////////////////////////////////////////////*/}
        <FieldContainer>
          <InputFieldLabel text="3. How did you select respondents?" />
          <CheckboxesGroup
            values={this.props.data.q3}
            options={checkBoxOptions3}
            onChange={value => this.props.checkBoxChange(value, 'q3', 'q3Text')}
          />
          <TextField
            label="If other, explain"
            defaultValue={this.props.data.q3Text}
            onChange={e =>
              this.props.otherCheckBoxText(e.target.value, 'q3', 'q3Text')
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
                dropDownWidth={290}
                search={false}
                placeHolder="Select or add number of respondents"
                data={numberOptions}
                valueSelected={this.props.data.q4.label}
                selectVal={value =>
                  this.props.dropDownChange(value, 'q4', 'q4Text')
                }
              />
            </SelectSurround>
          </SelectContainer>
          <OrLabel> or </OrLabel>
          <DataSourceTextCont>
            <TextField
              label="Enter a number"
              defaultValue={this.props.data.q4Text}
              //
              onChange={e =>
                this.props.otherDropdownText(
                  e.target.value,
                  'q4',
                  'q4Text',
                  numberOptions
                )
              }
            />
          </DataSourceTextCont>
        </TwoFieldContainer>

        <InputFieldDivider />

        {/*////////////////////////////////////////////////////////////////////*/}
        <FieldContainer>
          <InputFieldLabel text="5. Did you clean/edit the data before uploading it?" />
          <RadioButtonGroup
            direction="row"
            options={options2}
            value={this.props.data.q5}
            onChange={value => this.props.simpleChange(value, 'q5')}
          />
        </FieldContainer>

        <InputFieldDivider />

        {/*////////////////////////////////////////////////////////////////////*/}
        <FieldContainer>
          <InputFieldLabel text="5.1 Which data cleaning techniques did you use?" />
          <CheckboxesGroup
            values={this.props.data.q51}
            options={checkBoxOptions51}
            onChange={value =>
              this.props.checkBoxChange(value, 'q51', 'q51Text')
            }
          />
          <TextField
            label="If other, explain"
            defaultValue={this.props.data.q51Text}
            onChange={e =>
              this.props.otherCheckBoxText(e.target.value, 'q51', 'q51Text')
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
