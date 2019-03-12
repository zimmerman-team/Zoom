/* general */
const general = require('./generalResponse');

const Dataset = require('../models/Dataset');

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
  addNewDataset: function(author, dataset, res) {
    // TODO: should be adjusted without the promises, or maybe with promises if
    // TODO: it works and makes sense
    if (author.role === 'admin')
      return Dataset.create(
        {
          datasetId: dataset.datasetId,
          author,
          name: dataset.name,
          team: dataset.team,
          public: dataset.public
        },
        { new: true }
      )
        .then(set => res(null, set))
        .catch(error => {
          general.handleError(res, error);
        });

    general.handleError(res, {
      name: 'no permission',
      error: 'unauthorized'
    });
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
