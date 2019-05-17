const axios = require('axios');
const authUtils = require('../utils/auth');
const general = require('./generalResponse');

const get = require('lodash/get');
const find = require('lodash/find');
const filter = require('lodash/filter');

const AuthAPI = {
  getUserGroup: (req, res) => {
    const { userId } = req.query;
    authUtils.getAccessToken('auth_ext').then(res1 => {
      axios
        .get(`${process.env.REACT_APP_AE_API_URL}/users/${userId}/groups`, {
          headers: {
            Authorization: res1
          }
        })
        .then(res2 => {
          res.json(res2.data);
        })
        .catch(error => {
          res.json(error);
        });
    });
  },

  getUserRole: (req, res) => {
    const { userId } = req.query;
    authUtils.getAccessToken('auth_ext').then(res1 => {
      axios
        .get(`${process.env.REACT_APP_AE_API_URL}/users/${userId}/roles`, {
          headers: {
            Authorization: res1
          }
        })
        .then(res2 => {
          res.json(res2.data[0].name);
        })
        .catch(error => {
          res.json(error);
        });
    });
  },

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
                  for (let b = 0; b < get(currentUser, 'length', 0); b++) {
                    if (currentUser[b].name === dUserGroups[a]) {
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
            console.error(error);
          });
      });
    });
  },

  getUserGroups: (req, res) => {
    const { userId } = req.query;
    authUtils.getUser(userId).then(currentUser => {
      authUtils.getAccessToken('auth_ext').then(token => {
        axios
          .get(`${process.env.REACT_APP_AE_API_URL}/groups`, {
            headers: {
              Authorization: token
            }
          })
          .then(response => {
            let result = response.data.groups;
            if (currentUser.role !== 'Super admin') {
              result = filter(response.data.groups, g => {
                let pass = false;

                for (let b = 0; b < get(currentUser.teams, 'length', 0); b++) {
                  if (currentUser.teams[b].name === g.name) {
                    pass = true;
                    break;
                  }
                }
                return pass;
              });
            }
            res.json(
              result.map(g => {
                return {
                  ...g,
                  label: g.name,
                  value: g._id
                };
              })
            );
          })
          .catch(error => {
            res.json(error);
          });
      });
    });
  },

  getUserRoles: (req, res) => {
    const { userId } = req.query;
    authUtils.getUser(userId).then(currentUser => {
      authUtils.getAccessToken('auth_ext').then(token => {
        axios
          .get(`${process.env.REACT_APP_AE_API_URL}/roles`, {
            headers: {
              Authorization: token
            }
          })
          .then(response => {
            res.json(
              filter(response.data.roles, r => r.name !== 'Super admin').map(
                g => {
                  return {
                    ...g,
                    label: g.name,
                    value: g._id
                  };
                }
              )
            );
          })
          .catch(error => {
            res.json(error);
          });
      });
    });
  },

  addUserToGroup: (req, res) => {
    const { userId, groupId } = req.body;
    authUtils.getAccessToken('auth_ext').then(token => {
      axios
        .patch(
          `${process.env.REACT_APP_AE_API_URL}/users/${userId}/groups`,
          new Array(groupId),
          {
            headers: {
              Authorization: token
            }
          }
        )
        .then(response => {
          res.json('success');
        })
        .catch(error => {
          res.json(error);
        });
    });
  },

  assignRoleToUser: (req, res) => {
    const { userId, roleId } = req.body;
    authUtils.getAccessToken('auth_ext').then(token => {
      axios
        .patch(
          `${process.env.REACT_APP_AE_API_URL}/users/${userId}/roles`,
          new Array(roleId),
          {
            headers: {
              Authorization: token
            }
          }
        )
        .then(response => {
          res.json('success');
        })
        .catch(error => {
          res.json(error);
        });
    });
  },

  getGroup: (req, res) => {
    const { groupId } = req.query;
    authUtils.getAccessToken('auth_ext').then(token => {
      axios
        .all([
          axios.get(`${process.env.REACT_APP_AE_API_URL}/groups/${groupId}`, {
            headers: {
              Authorization: token
            }
          }),
          axios.get(
            `${process.env.REACT_APP_AE_API_URL}/groups/${groupId}/members`,
            {
              headers: {
                Authorization: token
              }
            }
          )
        ])
        .then(response => {
          res.json({
            name: response[0].data.name,
            description: response[0].data.description,
            users: response[1].data.users.map(u => u.user_id)
          });
        })
        .catch(error => {
          res.json(error);
        });
    });
  },

  editGroup: (req, res) => {
    const { groupId, name, description, usersToRemove, usersToAdd } = req.body;
    authUtils.getAccessToken('auth_ext').then(token => {
      axios
        .all([
          axios.put(
            `${process.env.REACT_APP_AE_API_URL}/groups/${groupId}`,
            { name, description },
            {
              headers: {
                Authorization: token
              }
            }
          ),
          axios.delete(
            `${process.env.REACT_APP_AE_API_URL}/groups/${groupId}/members`,
            {
              data: usersToRemove,
              headers: {
                Authorization: token
              }
            }
          ),
          axios.patch(
            `${process.env.REACT_APP_AE_API_URL}/groups/${groupId}/members`,
            usersToAdd,
            {
              headers: {
                Authorization: token
              }
            }
          )
        ])
        .then(response => {
          res.json('success');
        })
        .catch(error => {
          res.error(error.response.data.message);
        });
    });
  },

  getUser: (req, res) => {
    const { userId } = req.query;
    authUtils.getAccessToken('management').then(token => {
      axios
        .get(`${process.env.REACT_APP_AUTH_DOMAIN}/api/v2/users/${userId}`, {
          headers: {
            Authorization: token
          }
        })
        .then(response => {
          return res.json({
            email: response.data.email,
            firstName: get(response.data, 'user_metadata.firstName', ''),
            lastName: get(response.data, 'user_metadata.lastName', '')
          });
        })
        .catch(error => {
          res.error(error.response.data.message);
        });
    });
  },

  addUser: (req, res) => {
    const { email, name, surname, groupId, roleId } = req.body;
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
          return res.error(response.data.statusText);
        })
        .catch(error => {
          res.error(error.response.data.message);
        });
    });
  }
};

module.exports = AuthAPI;
