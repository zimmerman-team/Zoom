/* general */
const handleError = require('./generalResponse');

const Dataset = require('../models/Dataset');

const DatasetApi = {
  // gets data set, if its the owners data set
  getDataset: function(author, datasetId, res) {
    return Dataset.findOne({ author, datasetId })
      .then(set => res(null, set))
      .catch(error => {
        handleError(res, error);
      });
  },

  // gets all datasets of the owner
  getOwnerDatasets: function(author, res) {
    return Dataset.find({ author })
      .then(set => res(null, set))
      .catch(error => {
        handleError(res, error);
      });
    7;
  },

  // so this updates the team related to the dataset
  // currently only the owner can do this
  updateTeam: function(author, datasetId, team, res) {
    return Dataset.findOneAndUpdate(
      { author, datasetId },
      {
        $set: { team }
      },
      { new: true }
    )
      .then(set => res(null, set))
      .catch(error => {
        handleError(res, error);
      });
  },

  // so this updates the public of the dataset
  // currently only the owner can do this
  updatePublic: function(author, datasetId, pub, res) {
    return Dataset.findOneAndUpdate(
      { author, datasetId },
      {
        $set: { public: pub }
      },
      { new: true }
    )
      .then(set => res(null, set))
      .catch(error => {
        handleError(res, error);
      });
  },

  // so this adds the dataset
  addNewDataset: function(author, dataset, res) {
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
          handleError(res, error);
        });

    handleError(res, {
      name: 'no permission',
      error: 'unauthorized'
    });
  },

  deleteDataset: function(author, datasetId, res) {
    if (author.role === 'admin')
      Dataset.deleteOne({ author, datasetId }, error => {
        handleError(res, error);
      });
    else
      handleError(res, {
        name: 'no permission',
        error: 'unauthorized'
      });
  }
};

module.exports = DatasetApi;
