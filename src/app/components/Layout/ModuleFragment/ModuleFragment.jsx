/* base */
import React from 'react';
import PropTypes from 'prop-types';
import {
  FragmentContainer,
  FragmentContent,
  FragmentDescription,
  FragmentHeader,
  FragmentVisualisation
} from 'components/sort/Fragments';
import { FragmentInfo, FragmentInfoButton } from './ModuleFragment.style';

const propTypes = {
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  description: PropTypes.string,
  background: PropTypes.string,
  fragmentInfo: PropTypes.string,
  children: PropTypes.any,
  showInfoButton: PropTypes.bool
};
const defaultProps = {
  fragmentInfo: 'Lorem ipsum dolor simet empty module description.',
  showInfoButton: false
};

class ModuleFragment extends React.Component {
  state = {
    showFragmentInfo: false
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
              data-cy="tooltip-fragment-info"
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
