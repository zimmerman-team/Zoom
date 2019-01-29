/* base */
/* third party*/
import React from 'react';
import PropTypes from 'prop-types';
import { Box } from 'grommet';

/* custom components */
import ZoomSelect from 'components/Select/ZoomSelect';
import ChipsArray from 'components/ChipsArray/Chips';
import CheckboxesGroup from 'components/CheckboxesGroup/CheckboxesGroup';
import RadioButtonGroup from 'components/RadioButtonGroup/RadioButtonGroup';
import TextField from 'components/sort/TextField';
import InputFieldLabel from 'components/InputFieldLabel/InputFieldLabel';
import InputFieldDivider from 'components/Dividers/InputFieldDivider';

/* style */
import { FieldContainer, ModuleContainer } from './MetaData.style';

/* mock data */
import { options1, options2, options3 } from './MetaData.mock';
import { SectionHeading } from 'components/theme/ThemeSheet';

const propTypes = {
  data: PropTypes.array,
};
const defaultProps = {
  data: [],
};

const MetaData = props => {
  return (
    <ModuleContainer>
      <SectionHeading>Describe meta data</SectionHeading>
      {/*////////////////////////////////////////////////////////////////////*/}
      <FieldContainer>
        <InputFieldLabel text="Title data set*" />
        <TextField />
      </FieldContainer>

      {/*////////////////////////////////////////////////////////////////////*/}
      <FieldContainer>
        <InputFieldLabel text="Description*" />
        <TextField />
      </FieldContainer>

      {/*////////////////////////////////////////////////////////////////////*/}
      <FieldContainer>
        <InputFieldLabel text="Tags*" />
        <Box direction="row">
          <ChipsArray />
        </Box>
      </FieldContainer>

      {/*////////////////////////////////////////////////////////////////////*/}
      <FieldContainer>
        <InputFieldLabel text="Select data source*" />
        <ZoomSelect />
      </FieldContainer>

      {/*////////////////////////////////////////////////////////////////////*/}
      <FieldContainer>
        <InputFieldLabel text="Share data set?" />
        <Box>
          <RadioButtonGroup direction="column" options={options1} />
        </Box>
      </FieldContainer>

      <InputFieldDivider />

      {/*////////////////////////////////////////////////////////////////////*/}
      <FieldContainer>
        <InputFieldLabel text="Is this a servey data set?" />
        <Box>
          <RadioButtonGroup direction="column" options={options2} />
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
          <RadioButtonGroup direction="row" options={options1} />
        </Box>
      </FieldContainer>

      <InputFieldDivider />

      {/*////////////////////////////////////////////////////////////////////*/}
      <FieldContainer>
        <InputFieldLabel
          text="2. Have you tested the tool in a pilot or with a test group before
          conducting it?"
        />
        <Box direction="row">
          <RadioButtonGroup direction="row" options={options1} />
        </Box>
      </FieldContainer>

      <InputFieldDivider />

      {/*////////////////////////////////////////////////////////////////////*/}
      <FieldContainer>
        <InputFieldLabel
          text="2.1 - Staff was trained on how to ask the senstive information to
          avoid influencing the respondent’s anwers?"
        />
        <CheckboxesGroup />
        <InputFieldLabel text="If other, explain" />
        <TextField />
      </FieldContainer>

      {/*////////////////////////////////////////////////////////////////////*/}
      <FieldContainer>
        <InputFieldLabel
          text="2.2 - It was possible for respondents to not answer certain questions
          if they found them to personal/senstive?"
        />
      </FieldContainer>

      {/*////////////////////////////////////////////////////////////////////*/}
      <FieldContainer>
        <InputFieldLabel text="3. How did you select respondents?" />
        <RadioButtonGroup direction="row" options={options1} />
      </FieldContainer>

      <InputFieldDivider />

      {/*////////////////////////////////////////////////////////////////////*/}
      <FieldContainer>
        <InputFieldLabel text="4. How many respondents were interviewed/participated?" />
      </FieldContainer>

      {/*////////////////////////////////////////////////////////////////////*/}
      <FieldContainer>
        <InputFieldLabel text="5. Did you clean/edit the data before uploading it?" />
        <RadioButtonGroup direction="row" options={options1} />
      </FieldContainer>

      <InputFieldDivider />

      {/*////////////////////////////////////////////////////////////////////*/}
      <FieldContainer>
        <InputFieldLabel text="5.1 Which data cleaning techniques did you use?" />
        <CheckboxesGroup />
        <InputFieldLabel text="If other, explain" />
        <TextField />
      </FieldContainer>
    </ModuleContainer>
  );
};

MetaData.propTypes = propTypes;
MetaData.defaultProps = defaultProps;

export default MetaData;
