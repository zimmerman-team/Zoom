import React from 'react';
import PropTypes from 'prop-types';
import {
  CheckBoxStyle,
  ComponentBase,
  EmptyInput
} from 'app/components/CustomCheckBox/CustomCheckBox.styles';

/*TODO: rename this component to something better*/
const propTypes = {
  onChange: PropTypes.func,
  checked: PropTypes.bool
};

const defaultProps = {
  onChange: undefined,
  checked: undefined
};

class CustomCheckBox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      checked: false
    };
  }

  handleChange() {
    this.setState(
      { checked: !this.state.checked },
      () => this.props.onChange && this.props.onChange(this.state.checked)
    );
  }

  render() {
    return (
      <ComponentBase>
        <EmptyInput
          type="checkbox"
          checked={
            this.props.checked === undefined
              ? this.state.checked
              : this.props.checked
          }
          onChange={() => {
            return '';
          }}
        />
        <CheckBoxStyle onClick={() => this.handleChange()} />
      </ComponentBase>
    );
  }
}

CustomCheckBox.propTypes = propTypes;
CustomCheckBox.defaultProps = defaultProps;

export default CustomCheckBox;
