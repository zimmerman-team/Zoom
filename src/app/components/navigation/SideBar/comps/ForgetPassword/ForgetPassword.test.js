import React from 'react';
import { shallow } from 'enzyme';
import { ForgetPassword } from 'components/navigation/SideBar/comps/ForgetPassword/ForgetPassword';

/* Components */
import {
  ForgotPassLink,
  TextField,
  FormButton,
} from 'components/navigation/SideBar/comps/LoginForm/LoginForm.styles';

const wrapper1 = shallow(<ForgetPassword view="login" />);
const wrapper2 = shallow(<ForgetPassword view="forget_password" />);

describe('<ForgetPassword />', () => {
  it('renders one <ForgotPassLink/> component', () => {
    expect(wrapper1.find(ForgotPassLink)).toHaveLength(1);
  });
  it('renders one <TextField/> component', () => {
    expect(wrapper2.find(TextField)).toHaveLength(1);
  });
  it('renders two <FormButton/> component', () => {
    expect(wrapper2.find(FormButton)).toHaveLength(2);
  });
});
