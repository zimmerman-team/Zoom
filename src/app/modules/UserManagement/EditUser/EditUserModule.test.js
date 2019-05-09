import React from 'react';
import { shallow } from 'enzyme';
import EditUserModule from 'modules/UserManagement/EditUser/EditUserModule';
// Components
import {
  EditUserForm,
  DropDownContainer,
  DropDownLabel,
  SubmitButton
} from 'modules/UserManagement/EditUser/EditUserModule.styles';
import ModuleFragment from 'components/Layout/ModuleFragment/ModuleFragment';
import InputField from 'components/InputField/InputField';
import FormSelect from 'components/FormSelect/FormSelect';
import { Box } from 'grommet/components/Box';

const wrapper = shallow(<EditUserModule />);

describe('<EditUser />', () => {
  it('renders one <ModuleFragment/> component', () => {
    expect(wrapper.find(ModuleFragment)).toHaveLength(1);
  });
  it('renders one <EditUserForm/> component', () => {
    expect(wrapper.find(EditUserForm)).toHaveLength(1);
  });
  it('renders three <InputField/> components', () => {
    expect(wrapper.find(InputField)).toHaveLength(3);
  });
  it('renders one <Box/> component', () => {
    expect(wrapper.find(Box)).toHaveLength(1);
  });
  it('renders two <DropDown/> components', () => {
    expect(wrapper.find(DropDownContainer)).toHaveLength(2);
  });
  it('renders two <DropDownLabel/> components', () => {
    expect(wrapper.find(DropDownLabel)).toHaveLength(2);
  });
  it('renders two <FormSelect/> components', () => {
    expect(wrapper.find(FormSelect)).toHaveLength(2);
  });
  it('renders one <SubmitButton/> component', () => {
    expect(wrapper.find(SubmitButton)).toHaveLength(1);
  });
});
