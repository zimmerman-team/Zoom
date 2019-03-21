/* base */
import React from 'react';

/* Component */
import { ModuleContainer } from 'modules/dashboard/DashboardModule.styles';
import DashboardHeader from '../dashboard/fragments/DashboardHeader/DashboardHeader';
import EditProfileForm from './fragments/EditProfileForm';

const ProfileSettingsModule = () => {
  return (
    <ModuleContainer>
      <DashboardHeader
        userName=""
        title="Edit your profile"
        message="Edit profile picture"
      />
      <EditProfileForm />
    </ModuleContainer>
  );
};

export default ProfileSettingsModule;
