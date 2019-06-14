import React from 'react';
import { shallow } from 'enzyme';
import CreateTeamModule from 'modules/UserManagement/CreateTeam/CreateTeamModule';
// Components
import {
  CreateTeamForm,
  SubmitButton,
  TableBox,
  TextField,
  UsersTable
} from 'modules/UserManagement/CreateTeam/CreateTeamModule.styles';
import { Text } from 'grommet/components/Text';
import Pagination from 'components/Pagination/Pagination';
import ModuleFragment from 'components/Layout/ModuleFragment/ModuleFragment';
import InputField from 'components/InputField/InputField';

const wrapper = shallow(<CreateTeamModule />);

describe('<CreateTeamModule />', () => {
  it('renders one <ModuleFragment/> component', () => {
    expect(wrapper.find(ModuleFragment)).toHaveLength(1);
  });
  it('renders one <CreateTeamForm/> component', () => {
    expect(wrapper.find(CreateTeamForm)).toHaveLength(1);
  });
  it('renders three <InputField/> components', () => {
    expect(wrapper.find(InputField)).toHaveLength(1);
  });
  it('renders one <Text/> component', () => {
    expect(wrapper.find(Text)).toHaveLength(1);
  });
  it('renders one <TextField/> components', () => {
    expect(wrapper.find(TextField)).toHaveLength(1);
  });
  it('renders one <TableBox/> components', () => {
    expect(wrapper.find(TableBox)).toHaveLength(1);
  });
  it('renders one <UsersTable/> components', () => {
    expect(wrapper.find(UsersTable)).toHaveLength(1);
  });
  it('renders one <Pagination/> component', () => {
    expect(wrapper.find(Pagination)).toHaveLength(1);
  });
  it('renders one <SubmitButton/> component', () => {
    expect(wrapper.find(SubmitButton)).toHaveLength(1);
  });
});
