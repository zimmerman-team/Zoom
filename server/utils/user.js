const User = require('../models/User');

module.exports = {
  updateUsersResults: usrResults => {
    return new Promise(resolve => {
      // so here we want to synchronize zoom backend users
      // with auth0, mainly the need for synchronisation arose
      // when i figured out(#Morty) that when you update the role
      // of a user in extention of auth0 it doesnt update in
      // auth0 itself, cause auth0 is stupid
      // so we gonna sync the users with our zoomBackend
      // always, and when we need to return roles of users
      // we will return from zoomBackend and NOT auth0
      // cause auth0 is drunk
      usrResults.forEach((user, index) => {
        // so here we'll try to find currently loaded users from auth0
        // in our zoomBackend and if we dont find them, we add them === ezi
        User.findOne({ authId: user.user_id }, (userError, userFound) => {
          // so here if the user is NOT found we create them
          if (!userFound && user.app_metadata && user.user_metadata) {
            User.create({
              username: user.nickname,
              email: user.email,
              authId: user.user_id,
              role: user.app_metadata.authorization.roles[0],
              avatar: user.picture,
              firstName: user.user_metadata.firstName,
              lastName: user.user_metadata.lastName,
              teams: user.app_metadata.authorization.groups
            });
          } else if (userFound && user.app_metadata) {
            // and if the user IS found
            // we adjust the users roles in the results
            // to be that of zoomBackend
            user.app_metadata.authorization.roles[0] = userFound.role;
          }

          if (index === usrResults.length - 1) {
            resolve();
          }
        });
      });
    });
  }
};
