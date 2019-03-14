/* general */
const general = require('./generalResponse');

const Dataset = require('../models/Dataset');
const User = require('../models/User');

const DatasetApi = {
  // gets data set, if its the owners data set
  getDataset: function(author, datasetId, res) {
    // TODO: should be adjusted without the promises, or maybe with promises if
    // TODO: it works and makes sense
    return Dataset.findOne({ author, datasetId })
      .then(set => res(null, set))
      .catch(error => {
        general.handleError(res, error);
      });
  },

  // gets all datasets of the owner
  getOwnerDatasets: function(author, res) {
    // TODO: should be adjusted without the promises, or maybe with promises if
    // TODO: it works and makes sense
    return Dataset.find({ author })
      .then(set => res(null, set))
      .catch(error => {
        general.handleError(res, error);
      });
    7;
  },

  // so this updates the team related to the dataset
  // currently only the owner can do this
  updateTeam: function(author, datasetId, team, res) {
    // TODO: should be adjusted without the promises, or maybe with promises if
    // TODO: it works and makes sense
    return Dataset.findOneAndUpdate(
      { author, datasetId },
      {
        $set: { team }
      },
      { new: true }
    )
      .then(set => res(null, set))
      .catch(error => {
        general.handleError(res, error);
      });
  },

  // so this updates the public of the dataset
  // currently only the owner can do this
  updatePublic: function(author, datasetId, pub, res) {
    // TODO: should be adjusted without the promises, or maybe with promises if
    // TODO: it works and makes sense
    return Dataset.findOneAndUpdate(
      { author, datasetId },
      {
        $set: { public: pub }
      },
      { new: true }
    )
      .then(set => res(null, set))
      .catch(error => {
        general.handleError(res, error);
      });
  },

  // so this adds the dataset
  addNewDataset: (req, res) => {
    const { user, dataset } = req.body;

    return User.findOne({ authId: user.authId })
      .then(acc => {
        if (!acc) general.handleError(res, 'User not found', 404);
        else {
          if (acc.role === 'Administrator') {
            return Dataset.create(
              {
                datasetId: dataset.datasetId,
                author: acc,
                name: dataset.name,
                team: dataset.team,
                public: dataset.public
              },
              { new: true }
            )
              .then(set => res.json(set))
              .catch(error => {
                general.handleError(res, error);
              });
          }
          return general.handleError(res, 'Unauthorized');
        }
      })
      .catch(error => general.handleError(res, error));
  },

  deleteDataset: function(author, datasetId, res) {
    // TODO: should be adjusted without the promises, or maybe with promises if
    // TODO: it works and makes sense
    if (author.role === 'admin')
      Dataset.deleteOne({ author, datasetId }, error => {
        general.handleError(res, error);
      });
    else
      general.handleError(res, {
        name: 'no permission',
        error: 'unauthorized'
      });
  }
};

module.exports = DatasetApi;
