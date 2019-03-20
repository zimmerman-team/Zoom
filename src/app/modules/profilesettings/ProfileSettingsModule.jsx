/* base */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import theme from 'theme/Theme';

/* Component */
import {
  ModuleContainer,
  PageHeading,
  HeaderIcon,
  HeaderGreeting
} from 'modules/dashboard/DashboardModule.styles';
import SvgIconUser from 'assets/icons/IconUser';
import TextField from 'components/sort/TextField';
import ButtonContainer from './fragments/ButtonContainer';

const ComponentBase = styled.div``;

const propTypes = {
  data: PropTypes.array
};
const defaultProps = {
  data: []
};
const ProfileSettingsModule = props => {
  return (
    <ModuleContainer>
      {/*todo: use appropriate component from the dashboard when merged with dev.*/}
      <PageHeading>Edit your profile</PageHeading>
      <HeaderIcon>
        <SvgIconUser />
      </HeaderIcon>
      <HeaderGreeting>Edit profile picture</HeaderGreeting>

      <form>
        <TextField />
        <TextField />
        <TextField />
        <TextField />
        <TextField />
        <TextField type="password" />
        <TextField type="password" />

        <ButtonContainer />
      </form>
    </ModuleContainer>
  );
};

ProfileSettingsModule.propTypes = propTypes;
ProfileSettingsModule.defaultProps = defaultProps;
export default ProfileSettingsModule;
