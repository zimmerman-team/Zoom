import React from 'react';
import PropTypes from 'prop-types';
import {EmptyInput, ComponentBase, CheckBoxStyle} from 'components/CustomCheckBox/CustomCheckBox.styles';

const propTypes = {
  onChange: PropTypes.func,
};

const defaultProps = {
  onChange: undefined,
};

class CustomCheckBox extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      checked: false,
    };
  }

  handleChange(){
    this.props.onChange && this.props.onChange();
    this.setState({ checked: !this.state.checked });
  }


  render(){
    return(
      <ComponentBase>
        <EmptyInput type='checkbox' checked={this.state.checked} onChange={() => {return ''}} />
        <CheckBoxStyle onClick={() => this.handleChange()} />
      </ComponentBase>
    );
  }
}

CustomCheckBox.propTypes = propTypes;
CustomCheckBox.defaultProps = defaultProps;

export default CustomCheckBox;
