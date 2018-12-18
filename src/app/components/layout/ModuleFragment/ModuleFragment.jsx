/* base */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Box, Button, Grommet, Text, Heading, Grid } from 'grommet';

import {
  FragmentContainer,
  FragmentContent,
  zoomFontFamTwo,
} from 'components/theme/ThemeSheet';
import { FragmentHeader } from 'components/theme/ThemeSheet';
import countryDetailMockData from '__mocks__/countryDetailMock';
import { FragmentVisualisation } from 'components/theme/ThemeSheet';
import { aidsFondsRed } from 'components/theme/ThemeSheet';
import { aidsFondsWhite } from 'components/theme/ThemeSheet';
import { zoomFontFamOne } from 'components/theme/ThemeSheet';
import { FragmentDescription } from 'components/theme/ThemeSheet';

const FragmentInfoButton = styled.div`
  height: 20px;
  width: 20px;
  border-radius: 50%;
  background-color: ${aidsFondsRed};
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
  position: absolute;
  right: 0;
  top: 0;

  &:hover {
    background-color: darkgrey;
  }

  &:after {
    content: 'i';
    font-size: 13px;
    text-align: center;
    color: ${aidsFondsWhite};
    font-family: ${zoomFontFamOne};
    user-select: none;
  }
`;

const FragmentInfo = styled(Box)`
  position: absolute;
  top: 20px;
  right: 20px;
  width: 250px;
  background-color: white;
  padding: 20px;
  z-index: 2;
  border-radius: 2%;
  font-family: ${zoomFontFamTwo};
`;

const propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  background: PropTypes.string,
  fragmentInfo: PropTypes.string,
  children: PropTypes.any,
  showInfoButton: PropTypes.bool,
};
const defaultProps = {
  fragmentInfo: 'Lorem ipsum dolor simet empty module description.',
  showInfoButton: false,
};

class ModuleFragment extends React.Component {
  state = {
    showFragmentInfo: false,
  };

  handleMouseEnter() {
    this.setState({ showFragmentInfo: true });
  }

  handleMouseLeave() {
    this.setState({ showFragmentInfo: false });
  }

  render() {
    return (
      <FragmentContainer background={this.props.background}>
        <FragmentContent>
          {this.props.title && (
            <FragmentHeader>{this.props.title}</FragmentHeader>
          )}

          {this.props.description && (
            <FragmentDescription>{this.props.description}</FragmentDescription>
          )}

          {this.props.showInfoButton && (
            <FragmentInfoButton
              onMouseEnter={() => this.handleMouseEnter()}
              onMouseLeave={() => this.handleMouseLeave()}
            />
          )}

          {this.state.showFragmentInfo && (
            <FragmentInfo elevation="medium">
              {this.props.fragmentInfo}
            </FragmentInfo>
          )}

          <FragmentVisualisation>{this.props.children}</FragmentVisualisation>
        </FragmentContent>
      </FragmentContainer>
    );
  }
}

ModuleFragment.propTypes = propTypes;
ModuleFragment.defaultProps = defaultProps;

export default ModuleFragment;
