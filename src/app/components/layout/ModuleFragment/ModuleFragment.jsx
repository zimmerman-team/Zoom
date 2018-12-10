/* base */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Box } from 'grommet/es6';
import {
  fragmentContentWidth,
  FragmentParagraph,
  SectionHeading,
} from 'app/components/theme/ThemeSheet';

const FragmentContainer = styled(Box)`
  width: 100%;
  align-items: center;
  justify-content: center;
  padding: 40px;
`;

const FragmentContent = styled(Box)`
  width: 100%;
  max-width: ${fragmentContentWidth};
  justify-content: center;
  align-items: center;
`;

const FragmentHeader = styled(SectionHeading)`
  margin-top: 0;
  margin-bottom: 0;
`;
const FragmentDescription = styled(FragmentParagraph)`
  max-width: 900px;
  align-self: flex-start;
`;
const FragmentVisualisation = styled(Box)`
  align-items: center;
  justify-content: center;
  width: 100%;
`;
const propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  id: PropTypes.string,
  node: PropTypes.any,
};
const defaultProps = {
  title: undefined,
  description: undefined,
  id: undefined,
  node: undefined,
};

class ModuleFragment extends React.Component {
  render() {
    return (
      <FragmentContainer>
        <FragmentContent>
          <FragmentHeader>{this.props.title}</FragmentHeader>
          <FragmentDescription>{this.props.description}</FragmentDescription>
          <FragmentVisualisation>{this.props.children}</FragmentVisualisation>
        </FragmentContent>
      </FragmentContainer>
    );
  }
}

ModuleFragment.propTypes = propTypes;
ModuleFragment.defaultProps = defaultProps;

export default ModuleFragment;
