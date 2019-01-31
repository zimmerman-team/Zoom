/* base */
/* third party*/
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
import {
  FieldContainer,
  ModuleContainer,
  DataSourceTextCont,
  SelectSurround,
  TwoFieldContainer,
  SelectContainer,
  OrLabel,
} from './MetaData.style';
import { SectionHeading } from 'components/theme/ThemeSheet';

/* mock data */
import {
  options1,
  options2,
  checkBoxOptions2,
  checkBoxOptions3,
  checkBoxOptions51,
  numberOptions,
  dataSourceOptions,
} from './MetaData.mock';

const propTypes = {
  simpleChange: PropTypes.func,
  checkBoxChange: PropTypes.func,
  otherCheckBoxText: PropTypes.func,
  dropDownChange: PropTypes.func,
  otherDropdownText: PropTypes.func,
  fileSources: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string,
    }),
  ),
  data: PropTypes.shape({
    title: PropTypes.string,
    desc: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string),
    dataSource: PropTypes.shape({
      key: PropTypes.string,
      label: PropTypes.string,
      value: PropTypes.string,
    }),
    shared: PropTypes.Boolean,
    surveyData: PropTypes.Boolean,
    q1: PropTypes.string,
    q2: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string,
        value: PropTypes.string,
      }),
    ),
    q21: PropTypes.string,
    q22: PropTypes.string,
    q3: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string,
        value: PropTypes.string,
      }),
    ),
    q4: PropTypes.shape({
      key: PropTypes.string,
      label: PropTypes.string,
      value: PropTypes.string,
    }),
    q5: PropTypes.string,
    q51: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string,
        value: PropTypes.string,
      }),
    ),
    sourceText: PropTypes.string,
    q3Text: PropTypes.string,
    q4Text: PropTypes.string,
    q51Text: PropTypes.string,
  }),
};
const defaultProps = {
  data: {},
  fileSources: [],
  simpleChange: undefined,
  checkBoxChange: undefined,
  otherCheckBoxText: undefined,
  dropDownChange: undefined,
  otherDropdownText: undefined,
};

const MetaData = props => (
  <ModuleContainer hello={console.log(props)}>
    <SectionHeading>Describe meta data</SectionHeading>
    {/*////////////////////////////////////////////////////////////////////*/}
    <FieldContainer>
      <InputFieldLabel text="Title data set*" />
      <TextField
        placeholder={undefined}
        InputProps={{
          disableUnderline: false,
        }}
        onChange={e => props.simpleChange(e.target.value, 'title')}
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
        onChange={e => props.simpleChange(e.target.value, 'desc')}
      />
    </FieldContainer>

    {/*////////////////////////////////////////////////////////////////////*/}
    <FieldContainer>
      <InputFieldLabel text="Tags*" />
      <ChipInput onChange={tags => props.simpleChange(tags, 'tags')} />
    </FieldContainer>

    {/*////////////////////////////////////////////////////////////////////*/}
    <TwoFieldContainer>
      <SelectContainer>
        <InputFieldLabel text="Select data source*" />
        <SelectSurround>
          <ZoomSelect
            placeHolder={'Connect to Zoom data source'}
            data={dataSourceOptions.concat(props.fileSources)}
            valueSelected={props.data.dataSource.label}
            selectVal={e =>
              props.dropDownChange(e.value, 'dataSource', 'sourceText')
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
            props.otherDropdownText(
              e.target.value,
              'dataSource',
              'sourceText',
              dataSourceOptions,
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
          onChange={value => props.simpleChange(value, 'shared')}
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
          direction="row"
          options={options2}
          onChange={value => props.simpleChange(value, 'q21')}
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
          onChange={value => props.simpleChange(value, 'q22')}
        />
      </Box>
    </FieldContainer>

    {/*////////////////////////////////////////////////////////////////////*/}
    <FieldContainer>
      <InputFieldLabel text="3. How did you select respondents?" />
      <CheckboxesGroup
        options={checkBoxOptions3}
        onChange={value => props.checkBoxChange(value, 'q3', 'q3Text')}
      />
      <InputFieldLabel text="If other, explain" />
      <TextField
        placeholder={undefined}
        InputProps={{
          disableUnderline: false,
        }}
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
            placeHolder={'Select or add number of respondents'}
            data={numberOptions}
            valueSelected={props.data.q4.label}
            selectVal={e => props.dropDownChange(e.value, 'q4', 'q4Text')}
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
            props.otherDropdownText(
              e.target.value,
              'q4',
              'q4Text',
              numberOptions,
            )
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
        onChange={value => props.simpleChange(value, 'q5')}
      />
    </FieldContainer>

    <InputFieldDivider />

    {/*////////////////////////////////////////////////////////////////////*/}
    <FieldContainer>
      <InputFieldLabel text="5.1 Which data cleaning techniques did you use?" />
      <CheckboxesGroup
        options={checkBoxOptions51}
        onChange={value => props.checkBoxChange(value, 'q51', 'q51Text')}
      />
      <InputFieldLabel text="If other, explain" />
      <TextField
        placeholder={undefined}
        InputProps={{
          disableUnderline: false,
        }}
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
