import React from 'react';
import PropTypes from 'prop-types';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import Checkbox from 'components/Checkbox/CheckBox';
import FormLabel from 'components/RadioButtonGroup/FormLabel';
import NoSsr from '@material-ui/core/NoSsr';
import styled from 'styled-components';
import find from 'lodash/find';

const ZimmermanFormGroup = styled(FormGroup)`
  && {
    margin: 0;
    height: 70px;
    display: flex;
  }
`;

const propTypes = {
  options: PropTypes.array,
  direction: PropTypes.string
};
const defaultProps = {
  options: [
    {
      label: 'Lorem ipsum dolor',
      value: 'option1'
    },
    {
      label: 'Lorem ipsum dolor',
      value: 'option2'
    },
    {
      label: 'Lorem ipsum dolor',
      value: 'option3'
    },
    {
      label: 'Lorem ipsum dolor',
      value: 'option4'
    },
    {
      label: 'Lorem ipsum dolor',
      value: 'option5'
    },
    {
      label: 'Lorem ipsum dolor',
      value: 'option6'
    }
  ],
  direction: 'row'
};

class CheckboxesGroup extends React.Component {
  state = {
    option1: true,
    option2: false,
    option3: false,
    option4: false,
    option5: false,
    option6: false
  };

  handleChange = name => event => {
    this.props.onChange && this.props.onChange(name);
    this.setState({ [name]: event.target.checked });
  };

  isChecked(value) {
    // so we do this nonsense cause checked property excepts a boolean value
    return !!find(this.props.values, ['label', value]);
  }

  render() {
    return (
      <NoSsr>
        <FormControl component="fieldset">
          <ZimmermanFormGroup>
            {this.props.options.map(option => (
              <FormLabel
                key={option.value}
                control={
                  <Checkbox
                    checked={this.isChecked(option.value)}
                    onChange={this.handleChange(option.value)}
                    value={option.value}
                  />
                }
                label={option.label}
              />
            ))}
          </ZimmermanFormGroup>
        </FormControl>
      </NoSsr>
    );
  }
}

CheckboxesGroup.propTypes = propTypes;
CheckboxesGroup.defaultProps = defaultProps;

export default CheckboxesGroup;
