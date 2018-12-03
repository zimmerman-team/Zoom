import React from 'react';
import { shallow } from 'enzyme';

// Components
import Dialog from './Dialog';
import { ZoomButton, DialogHeading, Basictext } from '../../theme/ThemeSheet';

const wrapper = shallow(<Dialog />);

describe('<Dialog />', () => {
  it('renders one <DialogHeading/> component', () => {
    expect(wrapper.find(DialogHeading)).toHaveLength(1);
  });

  it('renders one <Basictext/> component', () => {
    expect(wrapper.find(Basictext)).toHaveLength(1);
  });

  it('renders one <ZoomButton/> component', () => {
    expect(wrapper.find(ZoomButton)).toHaveLength(1);
  });
});
