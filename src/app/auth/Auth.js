import axios from 'axios';
import auth0 from 'auth0-js';
import get from 'lodash/get';
import find from 'lodash/find';
import filter from 'lodash/filter';
import { nodeBackendGetRequest } from 'services/index';

class Auth {
  constructor() {
    this.auth0 = new auth0.WebAuth({
      domain: process.env.REACT_APP_AUTH_CUSTOM_DOMAIN,
      audience: `${process.env.REACT_APP_AUTH_DOMAIN}/userinfo`,
      clientID: process.env.REACT_APP_CLIENT_ID,
      redirectUri: `${process.env.REACT_APP_PROJECT_URL}/callback`,
      responseType: 'token id_token',
      scope:
        'openid profile email user_metadata read:current_user update:current_user_metadata read:users_app_metadata update:users_app_metadata read:groups update:groups'
    });

    this.addUser = this.addUser.bind(this);
    this.getProfile = this.getProfile.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.getUserGroup = this.getUserGroup.bind(this);
    this.signIn = this.signIn.bind(this);
    this.signOut = this.signOut.bind(this);
    this.getUserRole = this.getUserRole.bind(this);
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
  }

  getUserGroupNode() {
    if (this.profile && this.idToken) {
      axios
        .get(`/api/getUserGroup/?userId=${this.profile.sub}`, {
          headers: { Authorization: `Bearer ${this.idToken}` }
        })
        .then(res => console.log(res))
        .catch(err => console.log(err));
    }
  }

  getUserRoleNode() {
    if (this.profile && this.idToken) {
      axios
        .get(`/api/getUserRole/?userId=${this.profile.sub}`, {
          headers: { Authorization: `Bearer ${this.idToken}` }
        })
        .then(res => console.log(res))
        .catch(err => console.log(err));
    }
  }

  getAllUsersNode() {
    if (this.profile && this.idToken) {
      axios
        .get(`/api/getAllUsers/?userId=${this.profile.sub}`, {
          headers: { Authorization: `Bearer ${this.idToken}` }
        })
        .then(res => console.log(res))
        .catch(err => console.log(err));
    }
  }

  getUserGroupsNode() {
    if (this.profile && this.idToken) {
      axios
        .get(`/api/getUserGroups/?userId=${this.profile.sub}`, {
          headers: { Authorization: `Bearer ${this.idToken}` }
        })
        .then(res => console.log(res))
        .catch(err => console.log(err));
    }
  }

  getUserRolesNode() {
    if (this.profile && this.idToken) {
      axios
        .get(`/api/getUserRoles/?userId=${this.profile.sub}`, {
          headers: { Authorization: `Bearer ${this.idToken}` }
        })
        .then(res => console.log(res))
        .catch(err => console.log(err));
    }
  }

  getGroupNode() {
    if (this.profile && this.idToken) {
      axios
        .get(`/api/getGroup/?groupId=a47623a9-bac0-435a-bc65-ca8192951c20`, {
          headers: { Authorization: `Bearer ${this.idToken}` }
        })
        .then(res => console.log(res))
        .catch(err => console.log(err));
    }
  }

  getUserNode() {
    if (this.profile && this.idToken) {
      axios
        .get(`/api/getUserFromAuth/?userId=${this.profile.sub}`, {
          headers: { Authorization: `Bearer ${this.idToken}` }
        })
        .then(res => console.log(res))
        .catch(err => console.log(err));
    }
  }

  signOut() {
    return new Promise((resolve, reject) => {
      localStorage.removeItem('auth_access_token');
      localStorage.removeItem('auth_id_token');
      localStorage.removeItem('auth_expires_at');
      this.auth0.logout({
        returnTo: process.env.REACT_APP_PROJECT_URL,
        clientID: process.env.REACT_APP_CLIENT_ID
      });

      resolve();
    });
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

  getUserGroup(that = null, profileRedux) {
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
              `${process.env.REACT_APP_AE_API_URL}/users/${get(
                this.profile,
                'sub',
                profileRedux.authId
              )}/groups`,
              {
                headers: {
                  Authorization: `${response.data.token_type} ${
                    response.data.access_token
                  }`
                }
              }
            )
            .then(response2 => {
              if (that) {
                that.setState({
                  group: response2.data
                });
              }
              resolve(response2.data);
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

  getUserRole(profileRedux) {
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
              `${process.env.REACT_APP_AE_API_URL}/users/${get(
                this.profile,
                'sub',
                profileRedux.authId
              )}/roles`,
              {
                headers: {
                  Authorization: `${response.data.token_type} ${
                    response.data.access_token
                  }`
                }
              }
            )
            .then(response2 => {
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

  /* User management actions */

  getAllUsers(stateAction = null, profileRedux) {
    return this.getUserRole(profileRedux).then(currentUserRole => {
      return this.getUserGroup(null, profileRedux).then(currentUserGroups => {
        return new Promise(resolve => {
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
                  }/api/v2/users?include_totals=true&q=identities.connection:"Username-Password-Authentication"`,
                  {
                    headers: {
                      Authorization: `${response.data.token_type} ${
                        response.data.access_token
                      }`
                    }
                  }
                )
                .then(response2 => {
                  let result = response2.data.users;
                  if (currentUserRole === 'Administrator') {
                    result = filter(response2.data.users, d => {
                      let pass = false;
                      const dUserGroups = get(
                        d,
                        'app_metadata.authorization.groups',
                        []
                      );
                      for (let a = 0; a < dUserGroups.length; a++) {
                        for (
                          let b = 0;
                          b < get(currentUserGroups, 'length', 0);
                          b++
                        ) {
                          if (currentUserGroups[b].name === dUserGroups[a]) {
                            pass = true;
                            break;
                          }
                        }
                        if (pass) break;
                      }
                      return pass;
                    });
                  }
                  if (currentUserRole === 'Regular user') {
                    const currentUserEmail = get(
                      this.getProfile(),
                      'email',
                      ''
                    );
                    const currentUser = find(response2.data.users, {
                      email: currentUserEmail
                    });
                    result = [currentUser];
                  }
                  if (stateAction) {
                    stateAction({ users: result });
                  }
                  resolve();
                })
                .catch(error => {
                  console.error(error);
                });
            })
            .catch(error => {
              console.error(error);
            });
        });
      });
    });
  }

  getUserGroups(that = null, stateVar = 'userGroups', profileRedux) {
    return this.getUserRole(profileRedux).then(currentUserRole => {
      return this.getUserGroup(null, profileRedux).then(currentUserGroups => {
        return new Promise(resolve => {
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
                  let result = response2.data.groups;
                  if (currentUserRole !== 'Super admin') {
                    result = filter(response2.data.groups, g => {
                      let pass = false;

                      for (
                        let b = 0;
                        b < get(currentUserGroups, 'length', 0);
                        b++
                      ) {
                        if (currentUserGroups[b].name === g.name) {
                          pass = true;
                          break;
                        }
                      }
                      return pass;
                    });
                  }
                  if (that) {
                    that.setState({
                      [stateVar]: result.map(g => {
                        return {
                          ...g,
                          label: g.name,
                          value: g._id
                        };
                      })
                    });
                  } else {
                    resolve(
                      result.map(g => {
                        return {
                          ...g,
                          label: g.name,
                          value: g._id
                        };
                      })
                    );
                  }
                })
                .catch(error => {
                  console.error(error);
                });
            })
            .catch(error => {
              console.error(error);
            });
        });
      });
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
                userRoles: filter(
                  response2.data.roles,
                  r => r.name !== 'Super admin'
                ).map(g => {
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

  getGroup(id, parent) {
    axios
      .post(`${process.env.REACT_APP_AUTH_DOMAIN}/oauth/token`, {
        client_id: process.env.REACT_APP_AE_API_CLIENT_ID,
        client_secret: process.env.REACT_APP_AE_API_CLIENT_SECRET,
        audience: 'urn:auth0-authz-api',
        grant_type: 'client_credentials'
      })
      .then(res1 => {
        axios
          .get(`${process.env.REACT_APP_AE_API_URL}/groups/${id}`, {
            headers: {
              Authorization: `${res1.data.token_type} ${res1.data.access_token}`
            }
          })
          .then(res2 => {
            if (res2.status === 200) {
              parent.setState({
                name: res2.data.name,
                oldTeamName: res2.data.name,
                description: res2.data.description
              });
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

  getGroupMembers(id, parent) {
    axios
      .post(`${process.env.REACT_APP_AUTH_DOMAIN}/oauth/token`, {
        client_id: process.env.REACT_APP_AE_API_CLIENT_ID,
        client_secret: process.env.REACT_APP_AE_API_CLIENT_SECRET,
        audience: 'urn:auth0-authz-api',
        grant_type: 'client_credentials'
      })
      .then(res1 => {
        axios
          .get(`${process.env.REACT_APP_AE_API_URL}/groups/${id}/members`, {
            headers: {
              Authorization: `${res1.data.token_type} ${res1.data.access_token}`
            }
          })
          .then(res2 => {
            if (res2.status === 200) {
              parent.setState({
                initialGroupUsers: res2.data.users,
                users: res2.data.users.map(u => u.user_id)
              });
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

  editGroup(id, name, description, usersToDelete, usersToAdd, parent) {
    return new Promise(resolve => {
      axios
        .post(`${process.env.REACT_APP_AUTH_DOMAIN}/oauth/token`, {
          client_id: process.env.REACT_APP_AE_API_CLIENT_ID,
          client_secret: process.env.REACT_APP_AE_API_CLIENT_SECRET,
          audience: 'urn:auth0-authz-api',
          grant_type: 'client_credentials'
        })
        .then(res1 => {
          axios
            .put(
              `${process.env.REACT_APP_AE_API_URL}/groups/${id}`,
              { name, description },
              {
                headers: {
                  Authorization: `${res1.data.token_type} ${
                    res1.data.access_token
                  }`
                }
              }
            )
            .then(res2 => {
              if (res2.status === 200) {
                if (usersToDelete.length > 0) {
                  this.deleteMultipleUsersFromGroup(
                    res2.data._id,
                    usersToDelete,
                    {
                      Authorization: `${res1.data.token_type} ${
                        res1.data.access_token
                      }`
                    },
                    parent
                  ).then(() => {
                    if (usersToAdd.length > 0) {
                      this.addMultipleUsersToGroup(
                        res2.data._id,
                        usersToAdd,
                        {
                          Authorization: `${res1.data.token_type} ${
                            res1.data.access_token
                          }`
                        },
                        parent
                      ).then(() => {
                        resolve();
                        parent.setState({
                          success: true,
                          errorMessage: null
                        });
                      });
                    } else {
                      resolve();
                      parent.setState({
                        success: true,
                        errorMessage: null
                      });
                    }
                  });
                } else if (usersToAdd.length > 0) {
                  this.addMultipleUsersToGroup(
                    res2.data._id,
                    usersToAdd,
                    {
                      Authorization: `${res1.data.token_type} ${
                        res1.data.access_token
                      }`
                    },
                    parent
                  ).then(() => {
                    resolve();
                    parent.setState({
                      success: true,
                      errorMessage: null
                    });
                  });
                } else {
                  resolve();
                  parent.setState({
                    success: true,
                    errorMessage: null
                  });
                }
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

  getUser(id, parent) {
    axios
      .post(`${process.env.REACT_APP_AUTH_DOMAIN}/oauth/token`, {
        client_id: process.env.REACT_APP_AE_API_CLIENT_ID,
        client_secret: process.env.REACT_APP_AE_API_CLIENT_SECRET,
        audience: `${process.env.REACT_APP_AUTH_DOMAIN}/api/v2/`,
        grant_type: 'client_credentials'
      })
      .then(res1 => {
        axios
          .get(`${process.env.REACT_APP_AUTH_DOMAIN}/api/v2/users/${id}`, {
            headers: {
              Authorization: `${res1.data.token_type} ${res1.data.access_token}`
            }
          })
          .then(res2 => {
            if (res2.status === 200) {
              parent.setState({
                email: res2.data.email,
                firstName: get(res2.data, 'user_metadata.firstName', ''),
                lastName: get(res2.data, 'user_metadata.lastName', ''),
                initialData: {
                  email: res2.data.email,
                  firstName: get(res2.data, 'user_metadata.firstName', ''),
                  lastName: get(res2.data, 'user_metadata.lastName', '')
                }
              });
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
              connection: 'Username-Password-Authentication',
              user_metadata: {
                firstName: name,
                lastName: surname
              }
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

  deleteUser(id, parent, reduxNodeAction) {
    axios
      .post(`${process.env.REACT_APP_AUTH_DOMAIN}/oauth/token`, {
        client_id: process.env.REACT_APP_AE_API_CLIENT_ID,
        client_secret: process.env.REACT_APP_AE_API_CLIENT_SECRET,
        audience: `${process.env.REACT_APP_AUTH_DOMAIN}/api/v2/`,
        grant_type: 'client_credentials'
      })
      .then(res1 => {
        axios
          .delete(`${process.env.REACT_APP_AUTH_DOMAIN}/api/v2/users/${id}`, {
            headers: {
              Authorization: `${res1.data.token_type} ${res1.data.access_token}`
            }
          })
          .then(res2 => {
            if (res2.status === 204) {
              reduxNodeAction();
              parent.setState({
                success: true,
                errorMessage: null
              });
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

  editUser(id, name, surname, email, parent, reduxNodeAction) {
    axios
      .post(`${process.env.REACT_APP_AUTH_DOMAIN}/oauth/token`, {
        client_id: process.env.REACT_APP_AE_API_CLIENT_ID,
        client_secret: process.env.REACT_APP_AE_API_CLIENT_SECRET,
        audience: `${process.env.REACT_APP_AUTH_DOMAIN}/api/v2/`,
        grant_type: 'client_credentials'
      })
      .then(res1 => {
        axios
          .patch(
            `${process.env.REACT_APP_AUTH_DOMAIN}/api/v2/users/${id}`,
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
                Authorization: `${res1.data.token_type} ${
                  res1.data.access_token
                }`
              }
            }
          )
          .then(res2 => {
            if (res2.status === 200) {
              reduxNodeAction();
              parent.setState({
                success: true,
                errorMessage: null
              });
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

  deleteMultipleUsersFromGroup(group_id, users, headers, parent) {
    return new Promise(resolve => {
      axios
        .delete(
          `${process.env.REACT_APP_AE_API_URL}/groups/${group_id}/members`,
          { data: users, headers }
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
          : today.getMonth() + 1; // January is 0
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
              { name, description: `${today},${this.profile.sub}` },
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
                if (users.length > 0) {
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
                  resolve();
                }
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

  deleteGroup(id, parent, reduxNodeAction) {
    axios
      .post(`${process.env.REACT_APP_AUTH_DOMAIN}/oauth/token`, {
        client_id: process.env.REACT_APP_AE_API_CLIENT_ID,
        client_secret: process.env.REACT_APP_AE_API_CLIENT_SECRET,
        audience: 'urn:auth0-authz-api',
        grant_type: 'client_credentials'
      })
      .then(res1 => {
        axios
          .delete(`${process.env.REACT_APP_AE_API_URL}/groups/${id}`, {
            headers: {
              Authorization: `${res1.data.token_type} ${res1.data.access_token}`
            }
          })
          .then(res2 => {
            if (res2.status === 204) {
              reduxNodeAction();
              parent.setState({
                success: true,
                errorMessage: null
              });
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

  sendWelcomeEmail(userId, name, surname, email) {
    axios
      .post(`${process.env.REACT_APP_AUTH_DOMAIN}/oauth/token`, {
        client_id: process.env.REACT_APP_AE_API_CLIENT_ID,
        client_secret: process.env.REACT_APP_AE_API_CLIENT_SECRET,
        audience: `${process.env.REACT_APP_AUTH_DOMAIN}/api/v2/`,
        grant_type: 'client_credentials'
      })
      .then(res1 => {
        const redirectUrl = `${
          process.env.REACT_APP_PROJECT_URL.includes('localhost')
            ? process.env.REACT_APP_EXPRESS_BACKEND_BASE_URL
            : process.env.REACT_APP_PROJECT_URL
        }/api/redirectToHome`;
        axios
          .post(
            `${
              process.env.REACT_APP_AUTH_DOMAIN
            }/api/v2/tickets/password-change`,
            {
              user_id: userId,
              result_url: redirectUrl
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
