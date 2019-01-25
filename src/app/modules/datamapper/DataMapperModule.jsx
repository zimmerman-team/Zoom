/* base */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Stepper from 'components/stepper/Stepper';

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
import RadioButtonGroup from 'components/RadioButtonGroup/RadioButtonGroup';
import {
  aidsFondsWhite,
  FragmentContainer,
  zoomFontFamTwo,
  zoomFontFamOne,
} from 'components/theme/ThemeSheet';

const ModuleContainer = styled(Box)`
  align-items: center;
  background-color: ${aidsFondsWhite};
`;

const FieldDivider = styled.div`
  height: 0;
  border: 1px dashed #cacaca;
`;

const FieldLabel = styled(Text)`
  color: #9b9b9b;
  margin-bottom: 10px;
  font-weight: 500;
  font-family: ${zoomFontFamOne};
`;

const FieldContainer = styled(Box)`
  margin-bottom: 20px;
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
    <ModuleContainer>
      <Box width="1024px">
        <Box>
          <Stepper />
        </Box>
        <FieldContainer>
          <FieldLabel>Title data set*</FieldLabel>
          <ZimmermanTextField />
        </FieldContainer>
        <FieldContainer>
          <FieldLabel>Description*</FieldLabel>
          {/*<ZimmermanTextField />*/}
        </FieldContainer>
        <FieldContainer>
          <FieldLabel>Tags*</FieldLabel>
          <Box direction="row">{/*<ChipsArray />*/}</Box>
        </FieldContainer>
        <FieldContainer>
          <FieldLabel>Select data source*</FieldLabel>
          {/*<ZoomSelect />*/}
        </FieldContainer>
        <FieldContainer>
          <FieldLabel>Share data set?</FieldLabel>
          <Box>
            <RadioButtonGroup direction="column" />
          </Box>
        </FieldContainer>
        <FieldContainer>
          <FieldLabel>Is this a servey data set?</FieldLabel>
          <Box>
            <RadioButtonGroup direction="column" />
          </Box>
        </FieldContainer>
        <FieldContainer>
          <FieldLabel>
            1. Have you tested the tool in a pilot or with a test group before
            conducting it?
          </FieldLabel>
          <Box direction="row">
            <RadioButtonGroup direction="row" />
          </Box>
        </FieldContainer>
        <FieldContainer>
          <FieldLabel>
            2. Have you tested the tool in a pilot or with a test group before
            conducting it?
          </FieldLabel>
          <Box direction="row">
            <RadioButtonGroup direction="row" />
          </Box>
        </FieldContainer>

        <FieldContainer>
          <FieldLabel>
            2.1 - Staff was trained on how to ask the senstive information to
            avoid influencing the respondent’s anwers?
          </FieldLabel>
          <CheckboxesGroup />
          <FieldLabel>If other, explain</FieldLabel>
          {/*<ZimmermanTextField />*/}
        </FieldContainer>
        <FieldContainer>
          <FieldLabel>
            2.2 - It was possible for respondents to not answer certain
            questions if they found them to personal/senstive?
          </FieldLabel>
        </FieldContainer>
        <FieldContainer>
          <FieldLabel>3. How did you select respondents?</FieldLabel>

          <RadioButtonGroup direction="row" />
        </FieldContainer>
        <FieldContainer>
          <FieldLabel>
            4. How many respondents were interviewed/participated?
          </FieldLabel>
        </FieldContainer>
        <FieldContainer>
          <FieldLabel>
            5. Did you clean/edit the data before uploading it?
          </FieldLabel>

          <RadioButtonGroup direction="row" />
        </FieldContainer>
        <FieldContainer>
          <FieldLabel>
            5.1 Which data cleaning techniques did you use?
          </FieldLabel>
          {/*<CheckboxesGroup />*/}
          <FieldLabel>If other, explain</FieldLabel>
          {/*<ZimmermanTextField />*/}
        </FieldContainer>
      </Box>
    </ModuleContainer>
  );
};

DataMapperModule.propTypes = propTypes;
DataMapperModule.defaultProps = defaultProps;

export default DataMapperModule;
