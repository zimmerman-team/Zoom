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
  }

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
};

module.exports = UserApi;
