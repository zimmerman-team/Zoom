const axios = require('axios');
const emailUtils = require('./email');
const User = require('../models/User');

module.exports = {
  getAccessToken: apiType => {
    return axios
      .post(`${process.env.REACT_APP_AUTH_DOMAIN}/oauth/token`, {
        client_id: process.env.REACT_APP_AE_API_CLIENT_ID,
        client_secret: process.env.REACT_APP_AE_API_CLIENT_SECRET,
        audience:
          apiType === 'management'
            ? `${process.env.REACT_APP_AUTH_DOMAIN}/api/v2/`
            : 'urn:auth0-authz-api',
        grant_type: 'client_credentials'
      })
      .then(response => {
        return `${response.data.token_type} ${response.data.access_token}`;
      })
      .catch(error => console.log(error));
  },
  getUser: authId => {
    return User.findOne({ authId })
      .then(acc => {
        if (!acc) return 'no user';
        return acc;
      })
      .catch(error => error);
  },
  addUserToGroup: (userId, groupId) => {
    module.exports.getAccessToken('auth_ext').then(token => {
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
          return 'success';
        })
        .catch(error => {
          return 'failure';
        });
    });
  },
  assignRoleToUser: (userId, roleId) => {
    module.exports.getAccessToken('auth_ext').then(token => {
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
          return 'success';
        })
        .catch(error => {
          console.log('error', error);

          return 'failure';
        });
    });
  },
  // getUserProperRoles: () => {
  //   module.exports.getAccessToken('auth_ext').then(token => {
  //     axios
  //       .get(`${process.env.REACT_APP_AE_API_URL}/users/`, new Array(roleId), {
  //         headers: {
  //           Authorization: token
  //         }
  //       })
  //       .then(response => {
  //         return 'success';
  //       })
  //       .catch(error => {
  //         console.log('error', error);
  //
  //         return 'failure';
  //       });
  //   });
  // },
  removeRoleFromUser: (userId, roleId) => {
    module.exports.getAccessToken('auth_ext', true).then(token => {
      axios
        .delete(`${process.env.REACT_APP_AE_API_URL}/users/${userId}/roles`, {
          headers: {
            Authorization: token
          },
          data: new Array(roleId)
        })
        .then(response => {
          return 'success';
        })
        .catch(error => {
          console.log('error', error.response.data);

          return 'failure';
        });
    });
  },
  sendWelcomeEmail: (userId, name, surname, email) => {
    module.exports
      .getAccessToken('management')
      .then(token => {
        const redirectUrl = `${
          process.env.REACT_APP_PROJECT_URL.includes('localhost')
            ? process.env.REACT_APP_EXPRESS_BACKEND_BASE_URL
            : process.env.REACT_APP_PROJECT_URL
        }/api/redirectToHome`;
        axios
          .post(
            `${process.env.REACT_APP_AUTH_DOMAIN}/api/v2/tickets/password-change`,
            {
              user_id: userId,
              result_url: redirectUrl
            },
            {
              headers: {
                Authorization: token
              }
            }
          )
          .then(response => {
            return emailUtils.sendMail(
              name,
              surname,
              email,
              response.data.ticket
            );
          })
          .catch(error => {
            return error.response.data.message;
          });
      })
      .catch(error => {
        return error.response.data.message;
      });
  }
};
