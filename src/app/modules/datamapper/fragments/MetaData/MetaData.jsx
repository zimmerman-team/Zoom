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
import { step1InitialData } from '__consts__/MetaDataStepConsts';
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
    ),
    environment: PropTypes.shape({})
  })
};
const defaultProps = {
  data: step1InitialData,
  simpleChange: undefined,
  checkBoxChange: undefined,
  otherCheckBoxText: undefined,
  dropDownChange: undefined,
  otherDropdownText: undefined
};

const MetaData = props => (
  <ModuleContainer>
    <SectionHeading>Describe meta data</SectionHeading>
    {/*////////////////////////////////////////////////////////////////////*/}
    <FieldContainer>
      <TextField
        error={props.data.title === undefined}
        placeholder={undefined}
        value={props.data.title}
        label="Title data set*"
        InputLabelProps={{
          shrink: true
        }}
        onChange={e => props.simpleChange(e.target.value, 'title')}
      />
    </FieldContainer>

    {/*////////////////////////////////////////////////////////////////////*/}
    <FieldContainer>
      <TextField
        multiline
        error={props.data.desc === undefined}
        placeholder={undefined}
        label="Description*"
        InputLabelProps={{
          shrink: true
        }}
        value={props.data.desc}
        onChange={e => props.simpleChange(e.target.value, 'desc')}
      />
    </FieldContainer>

    {/*////////////////////////////////////////////////////////////////////*/}
    <FieldContainer>
      <ChipInput
        placeholder={undefined}
        label="Tags"
        InputLabelProps={{
          shrink: true
        }}
        value={props.data.tags}
        onAdd={chip => props.onChipAdd(chip)}
        onDelete={(chip, index) => props.onChipDelete(index)}
      />
    </FieldContainer>

    {/*////////////////////////////////////////////////////////////////////*/}
    <TwoFieldContainer>
      <SelectContainer>
        <InputFieldLabel
          text="Select data source*"
          style={{
            color:
              props.data.dataSource.value === undefined
                ? theme.color.aidsFondsRed
                : ''
          }}
        />
        <SelectSurround>
          <ZoomSelect
            search={false}
            dropDownWidth={290}
            placeHolder="Connect to Zoom data source"
            data={dataSourceOptions.concat(props.data.fileSources)}
            valueSelected={props.data.dataSource.label}
            selectVal={value =>
              props.dropDownChange(value, 'dataSource', 'sourceText')
            }
          />
        </SelectSurround>
      </SelectContainer>
      <OrLabel> or </OrLabel>
      <DataSourceTextCont>
        <TextField
          error={props.data.dataSource.value === undefined}
          placeholder={undefined}
          label="Create new name for  data source"
          InputLabelProps={{
            shrink: true
          }}
          value={props.data.sourceText}
          onChange={e =>
            props.otherDropdownText(
              e.target.value,
              'dataSource',
              'sourceText',
              dataSourceOptions.concat(props.data.fileSources)
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
          value={props.data.shared}
          options={options1}
          onChange={value => props.simpleChange(value, 'shared')}
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
          value={props.data.surveyData}
          onChange={value => props.simpleChange(value, 'surveyData')}
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
          value={props.data.q1}
          onChange={value => props.simpleChange(value, 'q1')}
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
        values={props.data.q2}
        options={checkBoxOptions2}
        onChange={value => props.checkBoxChange(value, 'q2')}
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
          value={props.data.q21}
          direction="row"
          options={options2}
          onChange={value => props.simpleChange(value, 'q21')}
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
          value={props.data.q22}
          direction="row"
          options={options2}
          onChange={value => props.simpleChange(value, 'q22')}
        />
      </Box>
    </FieldContainer>

    <InputFieldDivider />

    {/*////////////////////////////////////////////////////////////////////*/}
    <FieldContainer>
      <InputFieldLabel text="3. How did you select respondents?" />
      <CheckboxesGroup
        values={props.data.q3}
        options={checkBoxOptions3}
        onChange={value => props.checkBoxChange(value, 'q3', 'q3Text')}
      />
      <TextField
        placeholder={undefined}
        label="If other, explain"
        InputLabelProps={{
          shrink: true
        }}
        value={props.data.q3Text}
        onChange={e => props.otherCheckBoxText(e.target.value, 'q3', 'q3Text')}
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
            valueSelected={props.data.q4.label}
            selectVal={value => props.dropDownChange(value, 'q4', 'q4Text')}
          />
        </SelectSurround>
      </SelectContainer>
      <OrLabel> or </OrLabel>
      <DataSourceTextCont>
        <TextField
          placeholder={undefined}
          label="Enter a number"
          InputLabelProps={{
            shrink: true
          }}
          value={props.data.q4Text}
          onChange={e =>
            props.otherDropdownText(
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
        value={props.data.q5}
        onChange={value => props.simpleChange(value, 'q5')}
      />
    </FieldContainer>

    <InputFieldDivider />

    {/*////////////////////////////////////////////////////////////////////*/}
    <FieldContainer>
      <InputFieldLabel text="5.1 Which data cleaning techniques did you use?" />
      <CheckboxesGroup
        values={props.data.q51}
        options={checkBoxOptions51}
        onChange={value => props.checkBoxChange(value, 'q51', 'q51Text')}
      />
      <TextField
        placeholder={undefined}
        label="If other, explain"
        InputLabelProps={{
          shrink: true
        }}
        value={props.data.q51Text}
        onChange={e =>
          props.otherCheckBoxText(e.target.value, 'q51', 'q51Text')
        }
      />
    </FieldContainer>
  </ModuleContainer>
);

MetaData.propTypes = propTypes;
MetaData.defaultProps = defaultProps;

export default MetaData;
