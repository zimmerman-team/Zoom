/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */
const axios = require('axios');
const authUtils = require('../utils/auth');
const general = require('./generalResponse');
const User = require('../models/User');

const get = require('lodash/get');
const find = require('lodash/find');
const filter = require('lodash/filter');
const isEqual = require('lodash/isEqual');

const AuthUserController = {
  getAllUsers: (req, res) => {
    const { userId } = req.query;
    authUtils.getUser(userId).then(currentUser => {
      authUtils.getAccessToken('management').then(token => {
        axios
          .get(
            `${
              process.env.REACT_APP_AUTH_DOMAIN
            }/api/v2/users?include_totals=true&q=identities.connection:"Username-Password-Authentication"`,
            {
              headers: {
                Authorization: token
              }
            }
          )
          .then(res2 => {
            let result = res2.data.users;
            if (currentUser.role === 'Administrator') {
              result = filter(res2.data.users, d => {
                let pass = false;
                const dUserGroups = get(
                  d,
                  'app_metadata.authorization.groups',
                  []
                );
                for (let a = 0; a < dUserGroups.length; a++) {
                  for (
                    let b = 0;
                    b < get(currentUser.teams, 'length', 0);
                    b++
                  ) {
                    if (
                      currentUser.teams[b] === dUserGroups[a] &&
                      get(d, 'app_metadata.authorization.roles[0]', '') !==
                        'Super admin'
                    ) {
                      pass = true;
                      break;
                    }
                  }
                  if (pass) break;
                }
                return pass;
              });
            }
            if (currentUser.role === 'Regular user') {
              const currentUserEmail = currentUser.email;
              const currentUserAuth0 = find(res2.data.users, {
                email: currentUserEmail
              });
              result = [currentUserAuth0];
            }
            return res.json(result);
          })
          .catch(error => {
            console.log(
              `${error.response.data.statusCode}: ${
                error.response.data.message
              }`
            );
            return res
              .status(error.response.data.statusCode)
              .send(error.response.data.message);
          });
      });
    });
  },

  getUser: (req, res) => {
    const { userId } = req.query;
    authUtils.getAccessToken('management').then(token1 => {
      authUtils.getAccessToken('auth_ext').then(token2 => {
        axios
          .all([
            axios.get(
              `${process.env.REACT_APP_AUTH_DOMAIN}/api/v2/users/${userId}`,
              {
                headers: {
                  Authorization: token1
                }
              }
            ),
            axios.get(
              `${process.env.REACT_APP_AE_API_URL}/users/${userId}/groups`,
              {
                headers: {
                  Authorization: token2
                }
              }
            ),
            axios.get(
              `${process.env.REACT_APP_AE_API_URL}/users/${userId}/roles`,
              {
                headers: {
                  Authorization: token2
                }
              }
            )
          ])
          .then(response => {
            const userData = response[0].data;
            const groups = response[1].data.map(g => g.name);
            const role = response[2].data[0].name;
            User.findOne({ authId: userData.user_id }, (err, userFound) => {
              if (!userFound) {
                User.create({
                  username: userData.nickname,
                  email: userData.email,
                  authId: userData.user_id,
                  role: role,
                  avatar: userData.picture,
                  firstName: userData.user_metadata.firstName,
                  lastName: userData.user_metadata.lastName,
                  teams: groups
                })
                  .then(acc => {
                    return res.json({
                      _id: acc._id,
                      authId: response[0].data.user_id,
                      email: response[0].data.email,
                      firstName: get(
                        response[0].data,
                        'user_metadata.firstName',
                        ''
                      ),
                      lastName: get(
                        response[0].data,
                        'user_metadata.lastName',
                        ''
                      ),
                      groups: response[1].data,
                      role: response[2].data[0].name,
                      username: response[0].data.nickname
                    });
                  })
                  .catch(error => {
                    console.log(error);
                  });
              } else {
                if (
                  userFound.username !== userData.nickname &&
                  userData.nickname
                )
                  userFound.username = userData.nickname;
                if (userFound.email !== userData.email && userData.email) {
                  userFound.email = userData.email;
                }
                if (
                  userFound.firstName !== userData.user_metadata.firstName &&
                  userData.user_metadata.firstName
                ) {
                  userFound.firstName = userData.user_metadata.firstName;
                }
                if (
                  userFound.lastName !== userData.user_metadata.lastName &&
                  userData.user_metadata.lastName
                ) {
                  userFound.lastName = userData.user_metadata.lastName;
                }
                if (userFound.role !== role && role) {
                  userFound.role = role;
                }
                if (!isEqual(userFound.teams, groups) && groups) {
                  userFound.teams = groups;
                }

                userFound.save(error => {
                  if (error) console.log(error);
                });

                return res.json({
                  _id: userFound._id,
                  authId: response[0].data.user_id,
                  email: response[0].data.email,
                  firstName: get(
                    response[0].data,
                    'user_metadata.firstName',
                    ''
                  ),
                  lastName: get(response[0].data, 'user_metadata.lastName', ''),
                  groups: response[1].data,
                  role: response[2].data[0].name,
                  username: response[0].data.nickname
                });
              }
            });
          })
          .catch(error => {
            console.log(
              `${error.response.data.statusCode}: ${
                error.response.data.message
              }`
            );
            return res
              .status(error.response.data.statusCode)
              .send(error.response.data.message);
          });
      });
    });
  },

  addUser: (req, res) => {
    const {
      email,
      name,
      surname,
      groupId,
      roleId,
      groupName,
      roleName
    } = req.body;
    authUtils.getAccessToken('management').then(token => {
      axios
        .post(
          `${process.env.REACT_APP_AUTH_DOMAIN}/api/v2/users`,
          {
            email,
            blocked: false,
            email_verified: false,
            verify_email: true,
            password: 'wPsRZT?&&H%p2sj3',
            given_name: name,
            family_name: surname,
            name: `${name} ${surname}`,
            nickname: name,
            connection: 'Username-Password-Authentication',
            user_metadata: {
              firstName: name,
              lastName: surname
            },
            app_metadata: {
              authorization: {
                groups: [groupName],
                roles: [roleName]
              }
            }
          },
          {
            headers: {
              Authorization: token
            }
          }
        )
        .then(response => {
          if (response.status === 201) {
            authUtils.sendWelcomeEmail(
              response.data.user_id,
              name,
              surname,
              email
            );
            authUtils.addUserToGroup(response.data.user_id, groupId);
            authUtils.assignRoleToUser(response.data.user_id, roleId);
            return res.json('success');
          }
          return res
            .status(response.data.statusCode)
            .send(response.data.message);
        })
        .catch(error => {
          console.log(
            `${error.response.data.statusCode}: ${error.response.data.message}`
          );
          return res
            .status(error.response.data.statusCode)
            .send(error.response.data.message);
        });
    });
  },

  deleteUser: (req, res) => {
    const { userId, delId } = req.query;
    authUtils.getAccessToken('management').then(token => {
      axios
        .delete(`${process.env.REACT_APP_AUTH_DOMAIN}/api/v2/users/${delId}`, {
          headers: {
            Authorization: token
          }
        })
        .then(response => {
          if (response.status === 204) {
            return User.findOne({ authId: userId }, (adminErr, adminUser) => {
              if (adminErr) general.handleError(res, adminErr);
              else if (!adminUser) {
                general.handleError(res, 'Admin user not found', 404);
              } else if (
                adminUser.role === 'Administrator' ||
                adminUser.role === 'Super admin'
              ) {
                User.deleteOne({ authId: delId }, error => {
                  if (error) general.handleError(res, error);
                  else res.json({ message: 'user deleted' });
                });
              } else {
                general.handleError(res, 'Unauthorized', 401);
              }
            });
          }
          return res
            .status(response.data.statusCode)
            .send(response.data.message);
        })
        .catch(error => {
          console.log(
            `${error.response.data.statusCode}: ${error.response.data.message}`
          );
          return res
            .status(error.response.data.statusCode)
            .send(error.response.data.message);
        });
    });
  },

  editUser: (req, res) => {
    const { userId, email, name, surname } = req.body;
    authUtils.getAccessToken('management').then(token => {
      axios
        .patch(
          `${process.env.REACT_APP_AUTH_DOMAIN}/api/v2/users/${userId}`,
          {
            email,
            user_metadata: {
              firstName: name,
              lastName: surname
            },
            connection: 'Username-Password-Authentication'
          },
          {
            headers: {
              Authorization: token
            }
          }
        )
        .then(response => {
          if (response.status === 200 || response.status === 201) {
            return User.findOne({ authId: userId }, (err, userFound) => {
              if (userFound) {
                if (err) general.handleError(res, err);
                if (userFound.email !== email && email) {
                  userFound.email = email;
                }
                if (userFound.firstName !== name && name) {
                  userFound.firstName = name;
                }
                if (userFound.lastName !== surname && surname) {
                  userFound.lastName = surname;
                }
                userFound.save(error => {});
                return res.json('success');
              }
              return res.json('success');
            });
          }
          return res
            .status(response.data.statusCode)
            .send(response.data.message);
        })
        .catch(error => {
          console.log(
            `${error.response.data.statusCode}: ${error.response.data.message}`
          );
          return res
            .status(error.response.data.statusCode)
            .send(error.response.data.message);
        });
    });
  }
};

module.exports = AuthUserController;
