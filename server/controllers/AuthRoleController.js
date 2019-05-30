const axios = require('axios');
const authUtils = require('../utils/auth');

const filter = require('lodash/filter');

const AuthRoleController = {
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
          return res.json(res2.data[0].name);
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
            return res.json(
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
          return res.json('success');
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

module.exports = AuthRoleController;
