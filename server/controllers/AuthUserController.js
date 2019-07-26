/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */
const axios = require('axios');
const authUtils = require('../utils/auth');
const userUtils = require('../utils/user');
const general = require('./generalResponse');
const User = require('../models/User');
const Dataset = require('../models/Dataset');

const get = require('lodash/get');
const some = require('lodash/some');
const find = require('lodash/find');
const filter = require('lodash/filter');
const isEqual = require('lodash/isEqual');

const consts = require('../config/consts');

const roles = consts.roles;

const AuthUserController = {
  getAllUsers: (req, res) => {
    const { userId } = req.query;
    authUtils.getUser(userId).then(currentUser => {
      authUtils.getAccessToken('management').then(token1 => {
        authUtils.getAccessToken('auth_ext').then(token2 => {
          axios
            .all([
              axios.get(
                `${process.env.REACT_APP_AUTH_DOMAIN}/api/v2/users?include_totals=true&q=identities.connection:"Username-Password-Authentication"`,
                {
                  headers: {
                    Authorization: token1
                  }
                }
              ),
              axios.get(`${process.env.REACT_APP_AE_API_URL}/groups`, {
                headers: {
                  Authorization: token2
                }
              })
            ])
            .then(response => {
              let result = response[0].data.users;
              const groups = response[1].data.groups;
              if (currentUser.role === roles.admin) {
                result = filter(response[0].data.users, d => {
                  let pass = false;
                  const dUserGroups = filter(groups, gr =>
                    some(gr.members, member => member === currentUser.authId)
                  );
                  for (let c1 = 0; c1 < dUserGroups.length; c1++) {
                    for (
                      let c2 = 0;
                      c2 < dUserGroups[c1].members.length;
                      c2++
                    ) {
                      if (
                        dUserGroups[c1].members[c2] === d.user_id &&
                        get(d, 'app_metadata.authorization.roles[0]', '') !==
                          roles.superAdm
                      ) {
                        pass = true;
                        break;
                      }
                      if (pass) break;
                    }
                  }

                  return pass;
                });
                if (result.length === 0) {
                  const currentUserEmail = currentUser.email;
                  const currentUserAuth0 = find(response[0].data.users, {
                    email: currentUserEmail
                  });
                  result = [currentUserAuth0];
                }
              }
              if (
                currentUser.role === roles.regular ||
                currentUser.role === roles.mod
              ) {
                const currentUserEmail = currentUser.email;
                const currentUserAuth0 = find(response[0].data.users, {
                  email: currentUserEmail
                });
                result = [currentUserAuth0];
              }

              userUtils.updateUsersResults(result).then(() => {
                return res.json(result);
              });
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
              `${error.response.data.statusCode}: ${error.response.data.message}`
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
      adminId,
      email,
      name,
      surname,
      groupId,
      roleId,
      groupName,
      roleName
    } = req.body;

    User.findOne({ authId: adminId }, (admError, admin) => {
      if (admError) {
        general.handleError(res, admError);
      } else if (!admin) {
        general.handleError(res, 'User not found', 404);
      } else if (admin.role === roles.admin || roles.superAdm) {
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
      } else {
        general.handleError(res, 'Unauthorized', 401);
      }
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
                adminUser.role === roles.admin ||
                adminUser.role === roles.superAdm ||
                userId === delId
              ) {
                // okay so here we find the user to be deleted
                User.findOne({ authId: delId }, (delUsErr, delUser) => {
                  if (delUsErr) {
                    general.handleError(res, delUsErr);
                  } else {
                    // and then we find the datasets that should be deleted
                    // so that we could pass their ids to the frontend
                    // so that frontend could delete it from DUCT
                    // cause i aint setting up graphql with zoomBackend
                    // #Morty
                    Dataset.find(
                      {
                        author: delUser
                      },
                      (findSetErr, setData) => {
                        if (findSetErr) {
                          console.log('findSetErr', findSetErr);
                          general.handleError(res, findSetErr);
                        } else {
                          // and then we delete the users mapped out datasets
                          // and then we delete the user themselves
                          Dataset.deleteMany(
                            {
                              author: delUser
                            },
                            setDelErr => {
                              if (setDelErr) {
                                console.log('setDelErr', setDelErr);
                                general.handleError(res, setDelErr);
                              } else {
                                // and then we delete the user themselves
                                User.deleteOne({ authId: delId }, error => {
                                  if (error) {
                                    general.handleError(res, error);
                                  } else {
                                    res.json({
                                      message: 'user deleted',
                                      setData
                                    });
                                  }
                                });
                              }
                            }
                          );
                        }
                      }
                    );
                  }
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
    const {
      adminId,
      userId,
      email,
      name,
      surname,
      roleId,
      roleLabel,
      prevRoleId
    } = req.body;
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
          User.findOne({ authId: adminId }, (adminErr, adminUser) => {
            if (adminErr) {
              general.handleError(res, adminErr);
            } else if (!adminUser) {
              general.handleError(res, 'Admin user not found', 404);
            } else if (
              adminUser.role === roles.admin ||
              adminUser.role === roles.superAdm ||
              userId === adminId
            ) {
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

                    if (userFound.role !== roleLabel && roleLabel) {
                      userFound.role = roleLabel;
                      // so we assign a new role to the user
                      authUtils.assignRoleToUser(userFound.authId, roleId);
                      // and then delete the previous role
                      // cause auth0 don't have an edit option...
                      authUtils.removeRoleFromUser(
                        userFound.authId,
                        prevRoleId
                      );
                    }

                    userFound.save(error => {
                      if (error) {
                        console.log('error', error);
                      }
                    });

                    return res.json('success');
                  }
                  return res.json('success');
                });
              }
              return res
                .status(response.data.statusCode)
                .send(response.data.message);
            } else {
              general.handleError(res, 'Unauthorized', 401);
            }
          });
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
