import React from 'react';
import { shallow } from 'enzyme';
import InputField from 'components/InputField/InputField';

// Components
import { FormField, TextInput } from 'grommet';

const wrapper = shallow(<InputField />);

describe('<AddUserModule />', () => {
  it('renders one <FormField/> component', () => {
    expect(wrapper.find(FormField)).toHaveLength(1);
  });
  it('renders one <TextInput/> component', () => {
    expect(wrapper.find(TextInput)).toHaveLength(1);
  });
});
