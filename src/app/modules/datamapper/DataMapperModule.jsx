/* base */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Stepper from 'components/stepper/Stepper';

import CustomRadioButton from 'components/RadioButton/CustomRadioButton';
import {
  RadioButton,
  Box,
  Grommet,
  TextArea,
  TextInput,
  Text,
  CheckBox,
} from 'grommet';
import SearchSelect from 'components/SearchSelect/SearchSelect';
import ZimmermanButton from 'components/ZimmermanButton/ZimmermanButton';
import ZimmermanTextField from 'components/sort/ZimmermanTextField';
import ZoomSelect from 'components/Select/ZoomSelect';

const FieldDivider = styled.div`
  height: 0;
  border: 1px dashed #cacaca;
`;

const propTypes = {
  data: PropTypes.object,
};
const defaultProps = {
  data: undefined,
};

const DataMapperModule = props => {
  return (
    <React.Fragment>
      <Box>
        <Stepper />
      </Box>

      <Box width="xlarge">
        <Box margin="small">
          <Text>Title data set*</Text>
          <ZimmermanTextField />
        </Box>
        <FieldDivider />
        <Box margin="small">
          <Text>Description*</Text>
        </Box>
        <FieldDivider />
        <Box margin="small">
          <Text>Tags*</Text>
        </Box>
        <FieldDivider />
        <Box margin="small">
          <Text>Select data source*</Text>
          <SearchSelect />
          {/*<ZoomSelect />*/}
        </Box>
        <FieldDivider />
        <Box margin="small">
          <Text>Share data set?</Text>
          <CustomRadioButton />
        </Box>
        <FieldDivider />
        <Box margin="small">
          <Text>Is this a servey data set?</Text>
        </Box>
        <FieldDivider />
        <Box margin="small">
          <Text>
            1. Have you tested the tool in a pilot or with a test group before
            conducting it?
          </Text>
        </Box>
        <FieldDivider />
        <Box margin="small">
          <Text>
            2. Have you tested the tool in a pilot or with a test group before
            conducting it?
          </Text>
        </Box>
        <FieldDivider />
        <Box margin="small">
          <Text>
            2.1 - Staff was trained on how to ask the senstive information to
            avoid influencing the respondent’s anwers?
          </Text>
        </Box>
        <FieldDivider />
        <Box margin="small">
          <Text>
            2.2 - It was possible for respondents to not answer certain
            questions if they found them to personal/senstive?
          </Text>
        </Box>
        <FieldDivider />
        <Box margin="small">
          <Text>3. How did you select respondents?</Text>
        </Box>
        <FieldDivider />
        <Box margin="small">
          <Text>4. How many respondents were interviewed/participated?</Text>
        </Box>
        <FieldDivider />
        <Box margin="small">
          <Text>5. Did you clean/edit the data before uploading it?</Text>
        </Box>
        <FieldDivider />
        <Box margin="small">
          <Text>5.1 Which data cleaning techniques did you use?</Text>
        </Box>
        <FieldDivider />
        <Box>{/*checkbox*/}</Box>
        <FieldDivider />
        <Box>{/*dividers*/}</Box>
        <FieldDivider />
        <Box>{/*labels*/}</Box>
      </Box>
    </React.Fragment>
  );
};

DataMapperModule.propTypes = propTypes;
DataMapperModule.defaultProps = defaultProps;

export default DataMapperModule;
