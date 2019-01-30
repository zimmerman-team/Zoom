/* base */
import React from 'react';
import PropTypes from 'prop-types';
import { Box } from 'grommet';
import styled from 'styled-components';
import { ZoomButton, zoomGreySix } from 'components/theme/ThemeSheet';
import StepItem from 'components/stepper/StepItem';

const ComponentBase = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  max-width: 1024px;
  flex-direction: column;
`;

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
  onlyButtons: PropTypes.bool,
};
const defaultProps = {
  data: undefined,
  onlyButtons: false,
};

class Stepper extends React.Component {
  render() {
    const nextEnabled = this.props.step !== 6;
    const prevEnabled = this.props.step !== 1;

    return (
      <ComponentBase>
        {!this.props.onlyButtons && (
          <Box direction="row" width="100%">
            {/*TODO: implement conditional logic that sets state accordingly to control the stepper and the content that is linked to specific steps*/}
            {steps.map(step => (
              /*TODO: set "isFirst" and "isLast" depending on if object is first or last in the array of objects */
              <StepItem
                key={step.id}
                stepNumber={step.id}
                isActive={this.props.step === step.id}
                isDone={step.id < this.props.step}
                stepLabel={step.label}
                isFirst={step.isFirst}
                isLast={step.isLast}
              />
            ))}
          </Box>
        )}

        {/*TODO: refactor "ZoomButton" to be a proper component*/}
        {/*TODO: add click event handlers*/}
        <Box direction="row">
          <Box margin="small">
            <ZoomButton
              style={{ backgroundColor: !prevEnabled ? zoomGreySix : '' }}
              onClick={prevEnabled ? this.props.prevStep : undefined}
            >
              back
            </ZoomButton>
          </Box>
          <Box margin="small">
            <ZoomButton
              style={{ backgroundColor: !nextEnabled ? zoomGreySix : '' }}
              onClick={nextEnabled ? this.props.nextStep : undefined}
            >
              next
            </ZoomButton>
          </Box>
        </Box>
      </ComponentBase>
    );
  }
}

Stepper.propTypes = propTypes;
Stepper.defaultProps = defaultProps;

export default Stepper;
