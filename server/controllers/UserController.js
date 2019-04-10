/* general */
const general = require('./generalResponse');

const User = require('../models/User');

const UserApi = {
  getUser: (req, res) => {
    const { authId } = req.query;

    return User.findOne({ authId })
      .then(acc => {
        if (!acc) general.handleError(res, 'User not found', 404);
        else res.json(acc);
      })
      .catch(error => general.handleError(res, error));
  },

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
  updateProfile: (user, newProfile, res) => {
    // TODO: should be adjusted without the promises, or maybe with promises if
    // TODO: it works and makes sense
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
        general.handleError(res, error);
      });
  },

  // this one will be used to add in a user to this db of ours
  // after an admin creates one, or a user that is not in the db
  // signs in with auth0
  // these two options should be controlled by the frontend
  // as its hard to differentiate using this backend
  // and auth0 for user management n stuff
  addNewUser: (req, res) => {
    const user = req.body;

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
      .then(acc => res.json(acc))
      .catch(error => {
        general.handleError(res, error);
      });
  },

  // so this will be used to update some of the user fields
  // like email or username which comes strictly from auth0
  // so basically if those fields have been changed
  updateUser: (req, res) => {
    const user = req.body;

    User.findOne({ authId: user.authId }, (err, userFound) => {
      if (!userFound) {
        general.handleError(res, 'user not found', 404);
      } else {
        if (err) general.handleError(res, err);

        if (userFound.username !== user.username && user.username)
          userFound.username = user.username;
        if (userFound.email !== user.email && user.email)
          userFound.email = user.email;
        if (userFound.firstName !== user.firstName && user.firstName)
          userFound.firstName = user.firstName;
        if (userFound.lastName !== user.lastName && user.lastName)
          userFound.lastName = user.lastName;
        if (userFound.team !== user.team && user.team)
          userFound.team = user.team;

        userFound.save(error => {
          if (err) general.handleError(res, error);

          res.json({ message: 'auth0 changes applied' });
        });
      }
    });
  },

  // updateUser by Admin, basically used to update role
  // and team
  updateUserByAdmin: (req, res) => {
    const { user, updateUser } = req.body;

    // so first we find the admin user
    User.findOne({ authId: user.authId }, (adminErr, adminUser) => {
      if (adminErr) return general.handleError(res, adminErr);
      if (!adminUser) return general.handleError(res, 'User not found', 404);

      if (adminUser.role === 'Administrator') {
        User.findOne({ authId: updateUser.authId }, (userErr, userFound) => {
          if (userErr) return general.handleError(res, userErr);

          if (updateUser.role && userFound.role !== updateUser.role)
            userFound.role = updateUser.role;
          if (updateUser.team && userFound.team !== updateUser.team)
            userFound.team = updateUser.team;

          return userFound.save(saveError => {
            if (saveError) general.handleError(res, saveError);

            return res.json({ message: 'user updated' });
          });
        });
      }
      return general.handleError(res, 'unauthorized', 401);
    });
  },

  // this will basically update an array of users
  // by their newly created team
  updateUsersTeam: (req, res) => {
    const { user, updateUsers, team } = req.body;

    // so first we find the admin user
    User.findOne({ authId: user.authId }, (adminErr, adminUser) => {
      if (adminErr) return general.handleError(res, adminErr);
      if (!adminUser) return general.handleError(res, 'User not found', 404);

      if (adminUser.role === 'Administrator') {
        // and then to each user we add the specified team

        updateUsers.forEach(updatU => {
          User.findOne({ authId: updatU.authId }, (userErr, userFound) => {
            if (userErr) return general.handleError(res, userErr);

            // now if user is found we save the team
            // but its not a problem if the user is not found
            // because if the user is not found most likely they have not
            // activated their account via email confirmation
            // and their team and roles will be added, once they activate their
            // email and login
            if (userFound) {
              userFound.team = team;

              return userFound.save(saveError => {
                if (saveError) general.handleError(res, saveError);
              });
            }
          });
        });

        return res.json({ message: 'user teams updated' });
      }
      return general.handleError(res, 'unauthorized', 401);
    });
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

  deleteUser: (req, res) => {
    const { delId } = req.query;
    // TODO: should be adjusted without the promises, or maybe with promises if
    // TODO: it works and makes sense
    User.deleteOne({ authId: delId }, error => {
      if (error) general.handleError(res, error);

      return res.json({ message: 'user deleted' });
    });
  }
};

module.exports = UserApi;
