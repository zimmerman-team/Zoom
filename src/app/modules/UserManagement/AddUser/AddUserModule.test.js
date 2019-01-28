import React from 'react';
import { shallow } from 'enzyme';
import AddUserModule from 'modules/UserManagement/AddUser/AddUserModule';

// Components
import {
  AddUserForm,
  DropDown,
  DropDownLabel,
  SubmitButton,
} from 'modules/UserManagement/AddUser/AddUserModule.styles';
import ModuleFragment from 'components/layout/ModuleFragment/ModuleFragment';
import InputField from 'components/InputField/InputField';
import ZoomSelect from 'components/Select/ZoomSelect';
import { Box } from 'grommet';

const wrapper = shallow(<AddUserModule />);

describe('<AddUserModule />', () => {
  it('renders one <ModuleFragment/> component', () => {
    expect(wrapper.find(ModuleFragment)).toHaveLength(1);
  });
  it('renders one <AddUserForm/> component', () => {
    expect(wrapper.find(AddUserForm)).toHaveLength(1);
  });
  it('renders three <InputField/> components', () => {
    expect(wrapper.find(InputField)).toHaveLength(3);
  });
  it('renders one <Box/> component', () => {
    expect(wrapper.find(Box)).toHaveLength(1);
  });
  it('renders two <DropDown/> components', () => {
    expect(wrapper.find(DropDown)).toHaveLength(2);
  });
  it('renders two <DropDownLabel/> components', () => {
    expect(wrapper.find(DropDownLabel)).toHaveLength(2);
  });
  it('renders two <ZoomSelect/> components', () => {
    expect(wrapper.find(ZoomSelect)).toHaveLength(2);
  });
  it('renders one <SubmitButton/> component', () => {
    expect(wrapper.find(SubmitButton)).toHaveLength(1);
  });
});
