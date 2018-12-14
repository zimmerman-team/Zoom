import React from 'react';
import { shallow } from 'enzyme';

// Components
import BaseDialog from 'components/dialog/BaseDialog/BaseDialog';
import {
  ZoomButton,
  DialogHeading,
  SimpleText,
} from 'components/theme/ThemeSheet';

const wrapper = shallow(<BaseDialog />);

describe('<BaseDialog />', () => {
  it('renders one <DialogHeading/> component', () => {
    expect(wrapper.find(DialogHeading)).toHaveLength(1);
  });

  it('renders one <Basictext/> component', () => {
    expect(wrapper.find(SimpleText)).toHaveLength(1);
  });

  it('renders one <ZoomButton/> component', () => {
    expect(wrapper.find(ZoomButton)).toHaveLength(1);
  });
});
