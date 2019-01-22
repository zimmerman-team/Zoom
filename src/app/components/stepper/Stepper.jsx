/* base */
import React from 'react';
import PropTypes from 'prop-types';
import { Box } from 'grommet';
import { ZoomButton } from 'components/theme/ThemeSheet';
import StepItem from 'components/stepper/StepItem';

/*TODO: discuss object structure*/
/*TODO: document component*/
const steps = [
  {
    id: 1,
    label: 'Meta Data',
    isActive: true,
    isDone: true,
    isFirst: true,
  },
  {
    id: 2,
    label: 'Upload CSV Data',
    isActive: true,
  },
  {
    id: 3,
    label: 'Overview',
  },
  {
    id: 4,
    label: 'Correct errors',
  },
  {
    id: 5,
    label: 'Manual mapping',
  },
  {
    id: 6,
    label: 'Done',
    isLast: true,
  },
];

const propTypes = {
  data: PropTypes.object,
};
const defaultProps = {
  data: undefined,
};

class Stepper extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Box align="center">
          <Box direction="row" margin="medium">
            {/*TODO: implement conditional logic that sets state accordingly to control the stepper and the content that is linked to specific steps*/}
            {steps.map(step => (
              /*TODO: set "isFirst" and "isLast" depending on if object is first or last in the array of objects */
              <StepItem
                key={step.id}
                stepNumber={step.id}
                isActive={step.isActive}
                isDone={step.isDone}
                stepLabel={step.label}
                isFirst={step.isFirst}
                isLast={step.isLast}
              />
            ))}
          </Box>

          {/*TODO: refactor "ZoomButton" to be a proper component*/}
          {/*TODO: add click event handlers*/}
          <Box direction="row">
            <Box margin="small">
              <ZoomButton>back</ZoomButton>
            </Box>
            <Box margin="small">
              <ZoomButton>next</ZoomButton>
            </Box>
          </Box>
        </Box>
      </React.Fragment>
    );
  }
}

Stepper.propTypes = propTypes;
Stepper.defaultProps = defaultProps;

export default Stepper;
