import axios from 'axios';
import auth0 from 'auth0-js';
import postmark from 'postmark';
import { nodeBackendGetRequest } from 'services/index';

class Auth {
  constructor() {
    this.auth0 = new auth0.WebAuth({
      domain: process.env.REACT_APP_AUTH_CUSTOM_DOMAIN,
      audience: `${process.env.REACT_APP_AUTH_DOMAIN}/userinfo`,
      clientID: process.env.REACT_APP_CLIENT_ID,
      redirectUri: `${process.env.REACT_APP_PROJECT_URL}/callback`,
      responseType: 'token id_token',
      scope: 'openid profile'
    });

    this.addUser = this.addUser.bind(this);
    this.getProfile = this.getProfile.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
    this.getUserGroup = this.getUserGroup.bind(this);
    this.signIn = this.signIn.bind(this);
    this.signOut = this.signOut.bind(this);
  }

  /* Current user actions */

  signIn(username, password, reduxAction) {
    this.auth0.login(
      {
        realm: 'Username-Password-Authentication',
        email: username,
        password
      },
      err => reduxAction(err)
    );
  }

  handleAuthentication() {
    return new Promise((resolve, reject) => {
      this.auth0.parseHash((err, authResult) => {
        if (err) return reject(err);
        if (!authResult || !authResult.idToken) {
          return reject(err);
        }
        this.setSession(authResult);
        resolve(authResult);
      });
    });
  }

  setSession(authResult, step) {
    this.idToken = authResult.idToken;
    this.profile = authResult.idTokenPayload;
    // set the time that the id token will expire at
    this.expiresAt = authResult.expiresIn * 1000 + new Date().getTime();
    localStorage.setItem('auth_access_token', authResult.accessToken);
    localStorage.setItem('auth_id_token', authResult.idToken);
    localStorage.setItem('auth_expires_at', this.expiresAt);
    this.getUserRole();
    this.getUserGroup();
  }

  signOut() {
    // localStorage.removeItem('userGroup');
    localStorage.removeItem('auth_access_token');
    localStorage.removeItem('auth_id_token');
    localStorage.removeItem('auth_expires_at');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userGroup');
    this.auth0.logout({
      returnTo: process.env.REACT_APP_PROJECT_URL,
      clientID: process.env.REACT_APP_CLIENT_ID
    });
  }

  isAuthenticated() {
    const expiresAt = JSON.parse(localStorage.getItem('auth_expires_at'));
    return new Date().getTime() < expiresAt;
  }

  isAdministrator() {
    const userRole = localStorage.getItem('userRole');
    return userRole === 'Administrator';
  }

  silentAuth() {
    return new Promise((resolve, reject) => {
      this.auth0.checkSession({}, (err, authResult) => {
        // if (err) return reject(err);
        if (!err) {
          this.setSession(authResult);
          resolve(authResult);
        }
      });
    });
  }

  forgetPassword(email, reduxAction) {
    this.auth0.changePassword(
      {
        email,
        connection: 'Username-Password-Authentication'
      },
      err => {
        // console.log(err);
        reduxAction && reduxAction();
      }
    );
  }

  getProfile() {
    return this.profile;
  }

  getIdToken() {
    return this.idToken;
  }

  getUserGroup(that = null) {
    if (this.profile) {
      return new Promise((resolve, reject) => {
        axios
          .post(`${process.env.REACT_APP_AUTH_DOMAIN}/oauth/token`, {
            client_id: process.env.REACT_APP_AE_API_CLIENT_ID,
            client_secret: process.env.REACT_APP_AE_API_CLIENT_SECRET,
            audience: 'urn:auth0-authz-api',
            grant_type: 'client_credentials'
          })
          .then(response => {
            axios
              .get(
                `${process.env.REACT_APP_AE_API_URL}/users/${
                  this.profile.sub
                }/groups`,
                {
                  headers: {
                    Authorization: `${response.data.token_type} ${
                      response.data.access_token
                    }`
                  }
                }
              )
              .then(response2 => {
                localStorage.setItem('userGroup', response2.data[0].name);
                if (that) {
                  that.setState({
                    group: response2.data[0].name
                  });
                }

                resolve(response2.data[0].name);
              })
              .catch(error => {
                reject(error);
              });
          })
          .catch(error => {
            reject(error);
          });
      });
    }
  }

  getUserRole() {
    if (this.profile) {
      return new Promise((resolve, reject) => {
        axios
          .post(`${process.env.REACT_APP_AUTH_DOMAIN}/oauth/token`, {
            client_id: process.env.REACT_APP_AE_API_CLIENT_ID,
            client_secret: process.env.REACT_APP_AE_API_CLIENT_SECRET,
            audience: 'urn:auth0-authz-api',
            grant_type: 'client_credentials'
          })
          .then(response => {
            axios
              .get(
                `${process.env.REACT_APP_AE_API_URL}/users/${
                  this.profile.sub
                }/roles`,
                {
                  headers: {
                    Authorization: `${response.data.token_type} ${
                      response.data.access_token
                    }`
                  }
                }
              )
              .then(response2 => {
                localStorage.setItem('userRole', response2.data[0].name);
                resolve(response2.data[0].name);
              })
              .catch(error => {
                reject(error);
              });
          })
          .catch(error => {
            reject(error);
          });
      });
    }
  }

  /* User management actions */

  getAllUsers(stateAction = null, page = 0, sort, search) {
    axios
      .post(`${process.env.REACT_APP_AUTH_DOMAIN}/oauth/token`, {
        client_id: process.env.REACT_APP_AE_API_CLIENT_ID,
        client_secret: process.env.REACT_APP_AE_API_CLIENT_SECRET,
        audience: `${process.env.REACT_APP_AUTH_DOMAIN}/api/v2/`,
        grant_type: 'client_credentials'
      })
      .then(response => {
        axios
          .get(
            `${
              process.env.REACT_APP_AUTH_DOMAIN
            }/api/v2/users?include_totals=true&per_page=10&page=${page}&sort=${sort}&q=identities.connection:"Username-Password-Authentication"${search}&search_engine=v3`,
            {
              headers: {
                Authorization: `${response.data.token_type} ${
                  response.data.access_token
                }`
              }
            }
          )
          .then(response2 => {
            if (stateAction) {
              stateAction(response2.data);
            }
          })
          .catch(error => {
            console.error(error);
          });
      })
      .catch(error => {
        console.error(error);
      });
  }

  getUserGroups(that = null, stateVar = 'userGroups') {
    axios
      .post(`${process.env.REACT_APP_AUTH_DOMAIN}/oauth/token`, {
        client_id: process.env.REACT_APP_AE_API_CLIENT_ID,
        client_secret: process.env.REACT_APP_AE_API_CLIENT_SECRET,
        audience: 'urn:auth0-authz-api',
        grant_type: 'client_credentials'
      })
      .then(response => {
        axios
          .get(`${process.env.REACT_APP_AE_API_URL}/groups`, {
            headers: {
              Authorization: `${response.data.token_type} ${
                response.data.access_token
              }`
            }
          })
          .then(response2 => {
            // console.log(response2);
            if (that) {
              that.setState({
                [stateVar]: response2.data.groups.map(g => {
                  return {
                    ...g,
                    label: g.name,
                    value: g._id
                  };
                })
              });
            }
          })
          .catch(error => {
            console.error(error);
          });
      })
      .catch(error => {
        console.error(error);
      });
  }

  getUserRoles(that = null) {
    axios
      .post(`${process.env.REACT_APP_AUTH_DOMAIN}/oauth/token`, {
        client_id: process.env.REACT_APP_AE_API_CLIENT_ID,
        client_secret: process.env.REACT_APP_AE_API_CLIENT_SECRET,
        audience: 'urn:auth0-authz-api',
        grant_type: 'client_credentials'
      })
      .then(response => {
        axios
          .get(`${process.env.REACT_APP_AE_API_URL}/roles`, {
            headers: {
              Authorization: `${response.data.token_type} ${
                response.data.access_token
              }`
            }
          })
          .then(response2 => {
            // console.log(response2);
            if (that) {
              that.setState({
                userRoles: response2.data.roles.map(g => {
                  return {
                    ...g,
                    label: g.name,
                    value: g._id
                  };
                })
              });
            }
          })
          .catch(error => {
            console.error(error);
          });
      })
      .catch(error => {
        console.error(error);
      });
  }

  addUserToGroup(user_id, group_id, parent) {
    axios
      .post(`${process.env.REACT_APP_AUTH_DOMAIN}/oauth/token`, {
        client_id: process.env.REACT_APP_AE_API_CLIENT_ID,
        client_secret: process.env.REACT_APP_AE_API_CLIENT_SECRET,
        audience: 'urn:auth0-authz-api',
        grant_type: 'client_credentials'
      })
      .then(response => {
        axios
          .patch(
            `${process.env.REACT_APP_AE_API_URL}/users/${user_id}/groups`,
            new Array(group_id),
            {
              headers: {
                Authorization: `${response.data.token_type} ${
                  response.data.access_token
                }`
              }
            }
          )
          .then(response2 => {
            // console.log(response2);
          })
          .catch(error => {
            console.error(error);
            parent.setState({
              secondaryInfoMessage:
                'Something went wrong with assigning role or organisation. Please try again later.'
            });
          });
      })
      .catch(error => {
        console.error(error);
        parent.setState({
          secondaryInfoMessage:
            'Something went wrong with assigning role or organisation. Please try again later.'
        });
      });
  }

  assignRoleToUser(user_id, role_id) {
    axios
      .post(`${process.env.REACT_APP_AUTH_DOMAIN}/oauth/token`, {
        client_id: process.env.REACT_APP_AE_API_CLIENT_ID,
        client_secret: process.env.REACT_APP_AE_API_CLIENT_SECRET,
        audience: 'urn:auth0-authz-api',
        grant_type: 'client_credentials'
      })
      .then(response => {
        axios
          .patch(
            `${process.env.REACT_APP_AE_API_URL}/users/${user_id}/roles`,
            new Array(role_id),
            {
              headers: {
                Authorization: `${response.data.token_type} ${
                  response.data.access_token
                }`
              }
            }
          )
          .then(response2 => {
            // console.log(response2);
          })
          .catch(error => {
            console.error(error);
            parent.setState({
              secondaryInfoMessage:
                'Something went wrong with assigning role or organisation. Please try again later.'
            });
          });
      })
      .catch(error => {
        console.error(error);
        parent.setState({
          secondaryInfoMessage:
            'Something went wrong with assigning role or organisation. Please try again later.'
        });
      });
  }

  addUser(name, surname, email, group_id, role_id, parent) {
    const _this = this;
    axios
      .post(`${process.env.REACT_APP_AUTH_DOMAIN}/oauth/token`, {
        client_id: process.env.REACT_APP_AE_API_CLIENT_ID,
        client_secret: process.env.REACT_APP_AE_API_CLIENT_SECRET,
        audience: `${process.env.REACT_APP_AUTH_DOMAIN}/api/v2/`,
        grant_type: 'client_credentials'
      })
      .then(res1 => {
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
              connection: 'Username-Password-Authentication'
            },
            {
              headers: {
                Authorization: `${res1.data.token_type} ${
                  res1.data.access_token
                }`
              }
            }
          )
          .then(res2 => {
            if (res2.status === 201) {
              _this.sendWelcomeEmail(res2.data.user_id, name, surname, email);
              parent.setState({
                success: true,
                errorMessage: null,
                email: '',
                firstName: '',
                lastName: '',
                userRole: { label: '', value: '', _id: '' },
                organisation: { label: '', value: '', _id: '' }
              });
              this.addUserToGroup(res2.data.user_id, group_id, parent);
              this.assignRoleToUser(res2.data.user_id, role_id, parent);
            } else {
              parent.setState({
                success: false,
                errorMessage: res2.data.statusText
              });
            }
          })
          .catch(error => {
            console.log(error);
            parent.setState({
              success: false,
              errorMessage: error.response.data.message
            });
          });
      })
      .catch(error => {
        parent.setState({
          success: false,
          errorMessage: error.response.data.message
        });
      });
  }

  addMultipleUsersToGroup(group_id, users, headers, parent) {
    return new Promise(resolve => {
      axios
        .patch(
          `${process.env.REACT_APP_AE_API_URL}/groups/${group_id}/members`,
          users,
          { headers }
        )
        .then(res2 => {
          if (res2.status === 204) {
            parent.setState({
              success: true,
              secondaryInfoMessage: null
            });

            resolve();
          } else {
            parent.setState({
              success: false,
              secondaryInfoMessage: res2.data.statusText
            });
          }
        })
        .catch(error => {
          console.log(error);
          parent.setState({
            success: false,
            secondaryInfoMessage: error.response.data.message
          });
        });
    });
  }

  addGroup(name, users, parent) {
    return new Promise(resolve => {
      let today = new Date();
      let dd = today.getDate() < 10 ? `0${today.getDate()}` : today.getDate();
      let mm =
        today.getMonth() + 1 < 10
          ? `0${today.getMonth() + 1}`
          : today.getMonth() + 1; //January is 0
      let yyyy = today.getFullYear();
      today = `${dd}/${mm}/${yyyy}`;
      axios
        .post(`${process.env.REACT_APP_AUTH_DOMAIN}/oauth/token`, {
          client_id: process.env.REACT_APP_AE_API_CLIENT_ID,
          client_secret: process.env.REACT_APP_AE_API_CLIENT_SECRET,
          audience: 'urn:auth0-authz-api',
          grant_type: 'client_credentials'
        })
        .then(res1 => {
          axios
            .post(
              `${process.env.REACT_APP_AE_API_URL}/groups`,
              { name, description: `${today},${this.profile.name}` },
              {
                headers: {
                  Authorization: `${res1.data.token_type} ${
                    res1.data.access_token
                  }`
                }
              }
            )
            .then(res2 => {
              if (res2.status === 200 || res2.status === 204) {
                parent.setState({
                  success: true,
                  errorMessage: null,
                  name: '',
                  users: []
                });
                this.addMultipleUsersToGroup(
                  res2.data._id,
                  users,
                  {
                    Authorization: `${res1.data.token_type} ${
                      res1.data.access_token
                    }`
                  },
                  parent
                ).then(() => resolve());
              } else {
                parent.setState({
                  success: false,
                  errorMessage: res2.data.statusText
                });
              }
            })
            .catch(error => {
              console.log(error);
              parent.setState({
                success: false,
                errorMessage: error.response.data.message
              });
            });
        })
        .catch(error => {
          parent.setState({
            success: false,
            errorMessage: error.response.data.message
          });
        });
    });
  }

  sendWelcomeEmail(userId, name, surname, email) {
    axios
      .post(`${process.env.REACT_APP_AUTH_DOMAIN}/oauth/token`, {
        client_id: process.env.REACT_APP_AE_API_CLIENT_ID,
        client_secret: process.env.REACT_APP_AE_API_CLIENT_SECRET,
        audience: `${process.env.REACT_APP_AUTH_DOMAIN}/api/v2/`,
        grant_type: 'client_credentials'
      })
      .then(res1 => {
        axios
          .post(
            `${
              process.env.REACT_APP_AUTH_DOMAIN
            }/api/v2/tickets/password-change`,
            {
              user_id: userId
            },
            {
              headers: {
                Authorization: `${res1.data.token_type} ${
                  res1.data.access_token
                }`
              }
            }
          )
          .then(res2 => {
            nodeBackendGetRequest({
              endpoint: 'sendEmail',
              values: {
                name,
                surname,
                email,
                link: res2.data.ticket
              }
            });
          })
          .catch(error => {
            console.log(error);
            parent.setState({
              success: false,
              errorMessage: error.response.data.message
            });
          });
      })
      .catch(error => {
        parent.setState({
          success: false,
          errorMessage: error.response.data.message
        });
      });
  }
}

const auth0Client = new Auth();

export default auth0Client;
