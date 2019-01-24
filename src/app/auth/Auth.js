import axios from 'axios';
import auth0 from 'auth0-js';

class Auth {
  constructor() {
    this.auth0 = new auth0.WebAuth({
      domain: 'zimmermanzimmerman.eu.auth0.com',
      audience: 'https://zimmermanzimmerman.eu.auth0.com/userinfo',
      clientID: process.env.REACT_APP_CLIENT_ID,
      redirectUri: `${process.env.REACT_APP_PROJECT_URL}/callback`,
      responseType: 'token id_token',
      scope: 'openid profile',
    });

    this.addUser = this.addUser.bind(this);
    this.getProfile = this.getProfile.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
    this.getUserGroup = this.getUserGroup.bind(this);
    this.signIn = this.signIn.bind(this);
    this.signOut = this.signOut.bind(this);
  }

  getProfile() {
    return this.profile;
  }

  getIdToken() {
    return this.idToken;
  }

  getUserGroup(that = null) {
    if (this.profile) {
      axios
        .post('https://zimmermanzimmerman.eu.auth0.com/oauth/token', {
          client_id: process.env.REACT_APP_AE_API_CLIENT_ID,
          client_secret: process.env.REACT_APP_AE_API_CLIENT_SECRET,
          audience: 'urn:auth0-authz-api',
          grant_type: 'client_credentials',
        })
        .then(response => {
          axios
            .get(`${process.env.AE_API_URL}/users/${this.profile.sub}/groups`, {
              headers: {
                Authorization: `${response.data.token_type} ${
                  response.data.access_token
                }`,
              },
            })
            .then(response2 => {
              localStorage.setItem('userGroup', response2.data[0].name);
              if (that) {
                that.setState({
                  group: response2.data[0].name,
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
  }

  handleAuthentication() {
    return new Promise((resolve, reject) => {
      this.auth0.parseHash((err, authResult) => {
        if (err) return reject(err);
        if (!authResult || !authResult.idToken) {
          return reject(err);
        }
        this.setSession(authResult);
        resolve();
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
    // this.getUserGroup();
  }

  signOut() {
    // localStorage.removeItem('userGroup');
    localStorage.removeItem('auth_access_token');
    localStorage.removeItem('auth_id_token');
    localStorage.removeItem('auth_expires_at');
    this.auth0.logout({
      returnTo: process.env.REACT_APP_PROJECT_URL,
      clientID: process.env.REACT_APP_CLIENT_ID,
    });
  }

  isAuthenticated() {
    const expiresAt = JSON.parse(localStorage.getItem('auth_expires_at'));
    return new Date().getTime() < expiresAt;
  }

  signIn(username, password, reduxAction) {
    this.auth0.login(
      {
        realm: 'Username-Password-Authentication',
        email: username,
        password,
      },
      err => reduxAction(err),
    );
  }

  addUser(name, surname, email, parent) {
    const _this = this;
    axios
      .post('https://zimmermanzimmerman.eu.auth0.com/oauth/token', {
        client_id: process.env.REACT_APP_AE_API_CLIENT_ID,
        client_secret: process.env.REACT_APP_AE_API_CLIENT_SECRET,
        audience: 'https://zimmermanzimmerman.eu.auth0.com/api/v2/',
        grant_type: 'client_credentials',
      })
      .then(res1 => {
        axios
          .post(
            'https://zimmermanzimmerman.eu.auth0.com/api/v2/users',
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
            },
            {
              headers: {
                Authorization: `${res1.data.token_type} ${
                  res1.data.access_token
                }`,
              },
            },
          )
          .then(res2 => {
            if (res2.status === 201) {
              _this.forgetPassword(email, null);
              parent.setState({
                success: true,
                errorMessage: null,
                email: '',
                firstName: '',
                lastName: '',
              });
            } else {
              parent.setState({
                success: false,
                errorMessage: res2.data.statusText,
              });
            }
          })
          .catch(error => {
            parent.setState({
              success: false,
              errorMessage: error.response.data.message,
            });
          });
      })
      .catch(error => {
        parent.setState({
          success: false,
          errorMessage: error.response.data.message,
        });
      });
  }

  silentAuth() {
    return new Promise((resolve, reject) => {
      this.auth0.checkSession({}, (err, authResult) => {
        // if (err) return reject(err);
        if (!err) this.setSession(authResult);
        resolve();
      });
    });
  }

  forgetPassword(email, reduxAction) {
    this.auth0.changePassword(
      {
        email,
        connection: 'Username-Password-Authentication',
      },
      err => {
        console.log(err);
        reduxAction && reduxAction();
      },
    );
  }
}

const auth0Client = new Auth();

export default auth0Client;
