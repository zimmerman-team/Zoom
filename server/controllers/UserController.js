/* general */
const User = require('../models/User');

/* utils */
const isEqual = require('lodash/isEqual');
const general = require('./generalResponse');
const userUtils = require('../utils/user');

/* consts */
const consts = require('../config/consts');
const roles = consts.roles;

const UserApi = {
  getUser: (req, res) => {
    const { authId } = req.query;

    userUtils.findOneUser(authId, res).then(acc => {
      if (acc) {
        res.json(acc);
      }
    });
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

    return User.create({
      username: user.username,
      email: user.email,
      authId: user.authId,
      role: user.role,
      avatar: user.avatar,
      firstName: user.firstName,
      lastName: user.lastName,
      teams: user.teams
    })
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

    userUtils.findOneUser(user.authId, res).then(userFound => {
      if (userFound) {
        if (userFound.username !== user.username && user.username)
          userFound.username = user.username;
        if (userFound.email !== user.email && user.email)
          userFound.email = user.email;
        if (userFound.firstName !== user.firstName && user.firstName)
          userFound.firstName = user.firstName;
        if (userFound.lastName !== user.lastName && user.lastName)
          userFound.lastName = user.lastName;
        if (userFound.role !== user.role && user.role) {
          userFound.role = user.role;
        }
        if (!isEqual(userFound.teams, user.teams) && user.teams) {
          userFound.teams = user.teams;
        }

        userFound.save(error => {
          if (error) {
            general.handleError(res, error);
          } else {
            res.json({ message: 'auth0 changes applied' });
          }
        });
      }
    });
  },

  // updateUser by Admin, basically used to update role
  // and team
  // TODO: change way of saving teams
  updateUserByAdmin: (req, res) => {
    const { user, updateUser } = req.body;

    userUtils
      .findOneUser(user.authId, res, [roles.admin, roles.superAdm])
      .then(adminUser => {
        if (adminUser) {
          userUtils.findOneUser(updateUser.authId, res).then(userFound => {
            if (userFound) {
              if (updateUser.role && userFound.role !== updateUser.role)
                userFound.role = updateUser.role;

              if (
                !isEqual(userFound.teams, updateUser.teams) &&
                updateUser.teams
              ) {
                userFound.teams = updateUser.teams;
              }

              return userFound.save(saveError => {
                if (saveError) general.handleError(res, saveError);

                return res.json({ message: 'user updated' });
              });
            }
          });
        }
      });
  },

  // this will basically update an array of users
  // by their newly created team
  updateUsersTeam: (req, res) => {
    const { user, updateUsers, team } = req.body;

    userUtils
      .findOneUser(user.authId, res, [roles.admin, roles.superAdm])
      .then(adminUser => {
        if (adminUser) {
          updateUsers.forEach(updatU => {
            User.findOneAndUpdate(
              { authId: updatU.authId },
              { $push: { teams: team } },
              (err, node) => {
                if (err) console.log(err);
              }
            );
          });

          return res.json({ message: 'user teams updated' });
        }
      });
  },

  updateTeamAndUsersOfIt: (req, res) => {
    const { user, team, usersToAdd, usersToDelete } = req.body;

    userUtils
      .findOneUser(user.authId, res, [roles.admin, roles.superAdm])
      .then(adminUser => {
        if (adminUser) {
          // Remove team from selected users
          if (usersToDelete.length > 0) {
            usersToDelete.forEach(user => {
              User.findOneAndUpdate(
                { authId: user.authId },
                { $pull: { teams: team.oldName } },
                (err, node) => {
                  if (err) console.log(err);
                }
              );
            });
          }
          // Add team to selected users
          if (usersToAdd.length > 0) {
            usersToAdd.forEach(user => {
              User.findOneAndUpdate(
                { authId: user.authId },
                { $push: { teams: team.newName } },
                (err, node) => {
                  if (err) console.log(err);
                }
              );
            });
          }

          // Rename team and update it in all users that are in it
          if (team.oldName !== team.newName) {
            User.updateMany(
              { teams: { $eq: team.oldName } },
              { $set: { 'teams.$[element]': team.newName } },
              {
                upsert: false,
                arrayFilters: [{ element: { $eq: team.oldName } }]
              },
              (err, node) => {
                if (err) console.log(err);
              }
            );
          }

          return res.json({ message: 'users & team updated' });
        }
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
    const { delId, authId } = req.query;

    userUtils
      .findOneUser(authId, res, [roles.admin, roles.superAdm])
      .then(adminUser => {
        if (adminUser) {
          User.deleteOne({ authId: delId }, error => {
            if (error) general.handleError(res, error);
            else res.json({ message: 'user deleted' });
          });
        }
      });
  },

  deleteTeam: (req, res) => {
    const { name } = req.body;

    User.updateMany(
      { teams: { $eq: name } },
      { $pull: { teams: name } },
      (err, node) => {
        if (err) return general.handleError(res, err);
      }
    );
    return res.json({ message: 'users & team updated' });
  }
};

module.exports = UserApi;
