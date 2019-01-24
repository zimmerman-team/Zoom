/* base */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Stepper from 'components/stepper/Stepper';
import RadioButtonGroup from 'components/RadioButton/RadioButtonGroup';
import {
  RadioButton,
  Box,
  Grommet,
  TextArea,
  TextInput,
  Text,
  CheckBox,
} from 'grommet';
import ZimmermanTextField from 'components/sort/ZimmermanTextField';
import ZoomSelect from 'components/Select/ZoomSelect';
import ChipsArray from 'components/ChipsArray/Chips';
import CheckboxesGroup from 'components/CheckboxesGroup/CheckboxesGroup';
import RadioButtonsGroup from 'components/RadioButtonsGroup/RadioButtonsGroup';

const FieldDivider = styled.div`
  height: 0;
  border: 1px dashed #cacaca;
`;

const FieldLabel = styled(Text)`
  margin-bottom: 10px;
`;

const propTypes = {
  data: PropTypes.object,
};
const defaultProps = {
  data: undefined,
};

const options1 = [
  {
    label: 'No',
    value: 'option1',
  },
  {
    label: 'Yes',
    value: 'option2',
  },
];

const options2 = [
  {
    label: 'No',
    value: 'option1',
  },
  {
    label: 'Yes',
    value: 'option2',
  },
];

const options3 = [
  {
    label: 'No',
    value: 'option1',
  },
  {
    label: 'Yes',
    value: 'option2',
  },
  {
    label: 'Dont know',
    value: 'option3',
  },
];

const DataMapperModule = props => {
  return (
    <React.Fragment>
      <Box margin="none">
        <Stepper />
      </Box>

      <Box width="xlarge" margin="none">
        <Box margin="none">
          <FieldLabel>Title data set*</FieldLabel>
          <ZimmermanTextField />
        </Box>
        {/* <FieldDivider /> */}
        <Box margin="none">
          <FieldLabel>Description*</FieldLabel>
          <ZimmermanTextField />
        </Box>
        {/* <FieldDivider /> */}
        <Box margin="none">
          <FieldLabel>Tags*</FieldLabel>
          <Box direction="row">
            <ChipsArray />
          </Box>
        </Box>
        <FieldDivider />
        <Box margin="none" width="small">
          <FieldLabel>Select data source*</FieldLabel>
          <ZoomSelect />
        </Box>
        <FieldDivider />
        <Box margin="none">
          <FieldLabel>Share data set?</FieldLabel>
          <Box>
            <RadioButtonsGroup />
          </Box>
        </Box>
        <FieldDivider />
        <Box margin="none">
          <FieldLabel>Is this a servey data set?</FieldLabel>
          <Box>
            {/*<RadioButtonGroup direction="column" />*/}
            <RadioButtonsGroup />
          </Box>
        </Box>
        <FieldDivider />
        <Box margin="none">
          <FieldLabel>
            1. Have you tested the tool in a pilot or with a test group before
            conducting it?
          </FieldLabel>
          <Box direction="row">
            {/*<RadioButtonGroup direction="column" />*/}
            <RadioButtonsGroup />
          </Box>
        </Box>
        <FieldDivider />
        <Box margin="none">
          <FieldLabel>
            2. Have you tested the tool in a pilot or with a test group before
            conducting it?
          </FieldLabel>
          <Box direction="row">
            {/*<RadioButtonGroup direction="row" options={options3} />*/}
            <RadioButtonsGroup />
          </Box>
        </Box>
        <FieldDivider />
        <Box margin="none">
          <FieldLabel>
            2.1 - Staff was trained on how to ask the senstive information to
            avoid influencing the respondent’s anwers?
          </FieldLabel>
          <CheckboxesGroup />
          <FieldLabel>If other, explain</FieldLabel>
          <ZimmermanTextField />
        </Box>

        <Box margin="none">
          <FieldLabel>
            2.2 - It was possible for respondents to not answer certain
            questions if they found them to personal/senstive?
          </FieldLabel>
        </Box>
        <FieldDivider />
        <Box margin="none">
          <FieldLabel>3. How did you select respondents?</FieldLabel>
          {/*<RadioButtonGroup direction="row" options={options3} />*/}
          <RadioButtonsGroup />
        </Box>
        <FieldDivider />
        <Box margin="none">
          <FieldLabel>
            4. How many respondents were interviewed/participated?
          </FieldLabel>
        </Box>
        <FieldDivider />
        <Box margin="none">
          <FieldLabel>
            5. Did you clean/edit the data before uploading it?
          </FieldLabel>
          {/*<RadioButtonGroup direction="row" options={options3} />*/}
          <RadioButtonsGroup />
        </Box>
        <FieldDivider />
        <Box margin="none">
          <FieldLabel>
            5.1 Which data cleaning techniques did you use?
          </FieldLabel>
          <CheckboxesGroup />
          <FieldLabel>If other, explain</FieldLabel>
          <ZimmermanTextField />
        </Box>
      </Box>
    </React.Fragment>
  );
};

DataMapperModule.propTypes = propTypes;
DataMapperModule.defaultProps = defaultProps;

export default DataMapperModule;
