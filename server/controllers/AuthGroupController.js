/* eslint-disable no-plusplus */
const axios = require('axios');
const authUtils = require('../utils/auth');
const general = require('./generalResponse');
const User = require('../models/User');
const get = require('lodash/get');
const find = require('lodash/find');
const filter = require('lodash/filter');

const AuthGroupController = {
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
          console.log(
            `${error.response.data.statusCode}: ${error.response.data.message}`
          );
          return res
            .status(error.response.data.statusCode)
            .send(error.response.data.message);
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
                  if (currentUser.teams[b] === g.name) {
                    pass = true;
                    break;
                  }
                }
                return pass;
              });
            }
            User.find({})
              .lean()
              .exec((err, users) => {
                return res.json(
                  result.map(g => {
                    const creator = find(users, {
                      authId: get(g, 'description', ',').split(',')[1]
                    });
                    return {
                      ...g,
                      label: g.name,
                      value: g._id,
                      date: get(g, 'description', ',').split(',')[0],
                      createdBy: `${get(creator, 'firstName', '')} ${get(
                        creator,
                        'lastName',
                        ''
                      )}`
                    };
                  })
                );
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
          return res.json({
            name: response[0].data.name,
            description: response[0].data.description,
            users: response[1].data.users.map(u => u.user_id)
          });
        })
        .catch(error => {
          console.log(error);
          return res.status(error.status).send(error);
        });
    });
  },

  addGroup: (req, res) => {
    const { userId, name, usersToAdd } = req.body;
    let today = new Date();
    const dd = today.getDate() < 10 ? `0${today.getDate()}` : today.getDate();
    const mm =
      today.getMonth() + 1 < 10
        ? `0${today.getMonth() + 1}`
        : today.getMonth() + 1; // January is 0
    const yyyy = today.getFullYear();
    today = `${dd}/${mm}/${yyyy}`;

    authUtils.getUser(userId).then(currentUser => {
      authUtils.getAccessToken('auth_ext').then(token => {
        axios
          .post(
            `${process.env.REACT_APP_AE_API_URL}/groups`,
            { name, description: `${today},${currentUser.authId}` },
            {
              headers: {
                Authorization: token
              }
            }
          )
          .then(response => {
            if (response.status === 200 || response.status === 204) {
              if (usersToAdd.length > 0) {
                return axios
                  .patch(
                    `${process.env.REACT_APP_AE_API_URL}/groups/${
                      response.data._id
                    }/members`,
                    usersToAdd,
                    {
                      headers: {
                        Authorization: token
                      }
                    }
                  )
                  .then(response1 => {
                    if (response1.status === 204) {
                      usersToAdd.forEach(updatU => {
                        User.findOneAndUpdate(
                          { authId: updatU },
                          { $push: { teams: name } },
                          (err, node) => {
                            if (err) console.log(err);
                          }
                        );
                      });
                      return res.json('success');
                    }
                    return res
                      .status(response1.status)
                      .send(response1.data.statusText);
                  });
              }
              return res.json('success');
            }
            return res.status(response.status).send(response.data.statusText);
          })
          .catch(error => {
            return res
              .status(error.response.data.statusCode)
              .send(error.response.data.message);
          });
      });
    });
  },

  editGroup: (req, res) => {
    const {
      groupId,
      name,
      description,
      usersToRemove,
      usersToAdd,
      user,
      team
    } = req.body;
    authUtils.getAccessToken('auth_ext').then(token => {
      const requests = [
        axios.put(
          `${process.env.REACT_APP_AE_API_URL}/groups/${groupId}`,
          { name, description },
          {
            headers: {
              Authorization: token
            }
          }
        )
      ];
      if (usersToRemove.length > 0) {
        requests.push(
          axios.delete(
            `${process.env.REACT_APP_AE_API_URL}/groups/${groupId}/members`,
            {
              data: usersToRemove,
              headers: {
                Authorization: token
              }
            }
          )
        );
      }
      if (usersToAdd.length > 0) {
        requests.push(
          axios.patch(
            `${process.env.REACT_APP_AE_API_URL}/groups/${groupId}/members`,
            usersToAdd,
            {
              headers: {
                Authorization: token
              }
            }
          )
        );
      }
      axios
        .all(requests)
        .then(response => {
          if (
            get(response, '[0].status', 200) === 200 &&
            get(response, '[1].status', 204) === 204 &&
            get(response, '[2].status', 204) === 204
          ) {
            return User.findOne(
              { authId: user.authId },
              (adminErr, adminUser) => {
                if (adminErr) {
                  return general.handleError(res, adminErr);
                }
                if (!adminUser) {
                  return general.handleError(res, 'User not found', 404);
                }
                if (
                  adminUser.role === 'Administrator' ||
                  adminUser.role === 'Super admin'
                ) {
                  // Remove team from selected users
                  if (usersToRemove.length > 0) {
                    usersToRemove.forEach(u => {
                      User.findOneAndUpdate(
                        { authId: u.authId },
                        { $pull: { teams: team.oldName } },
                        (err, node) => {
                          if (err) console.log(err);
                        }
                      );
                    });
                  }
                  // Add team to selected users
                  if (usersToAdd.length > 0) {
                    usersToAdd.forEach(u => {
                      User.findOneAndUpdate(
                        { authId: u.authId },
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
                  return res.json('success');
                }
                return general.handleError(res, 'unauthorized', 401);
              }
            );
          }
          return res
            .status(response[0].status)
            .send(response[0].data.statusText);
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

  deleteGroup: (req, res) => {
    const { delId, name } = req.query;
    authUtils.getAccessToken('auth_ext').then(token => {
      axios
        .delete(`${process.env.REACT_APP_AE_API_URL}/groups/${delId}`, {
          headers: {
            Authorization: token
          }
        })
        .then(response => {
          if (response.status === 204) {
            User.updateMany(
              { teams: { $eq: name } },
              { $pull: { teams: name } },
              (err, node) => {
                if (err) console.log(err);
              }
            );
            return res.json('success');
          }
          return res.status(response.status).send(response.data.statusText);
        })
        .catch(error => {
          // console.log(error.response);
          return res
            .status(error.response.data.statusCode)
            .send(error.response.data.message);
        });
    });
  }
};

module.exports = AuthGroupController;
