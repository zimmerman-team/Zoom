import User from '../models/User';

/* general */
import { handleError } from './generalResponse';

const UserApi = {
  // updateUI: function (user, uiState, res) {
  //   return User
  //     .findOneAndUpdate({ _id: user._id }, { $set: { uiState: uiState } }, { new: true })
  //     .then(acc => res(null, acc))
  //     .catch((error) => {
  //       console.error(error.stack);
  //       res(error)
  //     })
  // },

  // so this one will be used for a user themselves to update
  // their profile stuffs
  updateProfile: function(user, newProfile, res) {
    return User.findOneAndUpdate(
      { authId: user.authId },
      {
        $set: {
          firstName: newProfile.firstName,
          lastName: newProfile.lastName,
          avatar: newProfile.lastName
        }
      },
      { new: true }
    )
      .then(acc => res(null, acc))
      .catch(error => {
        handleError(res, error);
      });
  },

  // this one will be used to add in a user to this db of ours
  // after an admin creates one, or a user that is not in the db
  // signs in with auth0
  // these two options should be controlled by the frontend
  // as its hard to differentiate using this backend
  // and auth0 for user management n stuff
  addNewUser: function(user, res) {
    return User.create(
      {
        username: user.username,
        email: user.email,
        authId: user.authId,
        role: user.role,
        avatar: user.avatar,
        firstName: user.firstName,
        lastName: user.lastName,
        team: user.team
      },
      { new: true }
    )
      .then(acc => res(null, acc))
      .catch(error => {
        handleError(res, error);
      });
  },

  // so this will be used to update some of the user fields
  // like email or username which comes strictly from auth0
  // so basically if those fields have been changed
  updateUser: function(user, res) {
    User.findOne({ authId: user.authId }, function(err, userFound) {
      if (err) return handleError(err);

      if (userFound.username !== user.username)
        userFound.username = user.username;
      if (userFound.email !== user.email) userFound.email = user.email;

      userFound.save(function(error) {
        if (err) {
          handleError(res, error);
        }
      });
    });
  },

  // updateUser by Admin, basically used to update role
  // and team
  updateUserByAdmin: function(user, updateUser, res) {
    if (user.role === 'admin') {
      User.findOne({ authId: updateUser.authId }, function(err, userFound) {
        if (err) return handleError(err);

        if (updateUser.role && userFound.role !== updateUser.role)
          userFound.role = updateUser.role;
        if (updateUser.team && userFound.team !== updateUser.team)
          userFound.team = updateUser.team;

        userFound.save(function(error) {
          if (err) {
            handleError(res, error);
          }
        });
      });
    } else {
      handleError(res, {
        name: 'no permission',
        error: 'unauthorized'
      });
    }
  },

  // getAllUser: function(user, res) {
  //   return User.find(
  //     {},
  //     { _id: 1, email: 1, username: 1, firstName: 1, lastName: 1, role: 1 }
  //   )
  //     .then(acc => res(null, acc))
  //     .catch(error => {
  //       console.log(error.stack);
  //       res(error);
  //     });
  // },

  deleteUser: function(user, delId, res) {
    if (user.role === 'admin')
      User.deleteOne({ authId: delId }, error => {
        handleError(res, error);
      });
    else
      handleError(res, {
        name: 'no permission',
        error: 'unauthorized'
      });
  }
};

module.exports = UserApi;
