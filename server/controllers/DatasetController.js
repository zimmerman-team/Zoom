/* utils */
const utils = require('../utils/general');

/* general */
const general = require('./generalResponse');

const Dataset = require('../models/Dataset');
const User = require('../models/User');

const DatasetApi = {
  // gets data set, if its the owners data set
  getDataset: (req, res) => {
    const { authId, datasetId } = req.query;

    User.findOne({ authId }, (error, author) => {
      if (error) general.handleError(res, error);
      else if (!author) general.handleError(res, 'User not found', 404);
      else {
        Dataset.findOne({ author, datasetId }).exec((setError, dataset) => {
          if (setError) general.handleError(res, setError);
          else res.json(dataset);
        });
      }
    });
  },

  // gets all datasets of the owner
  getOwnerDatasets: (req, res) => {
    const { authId, sortBy, searchTitle } = req.query;

    User.findOne({ authId }, (error, author) => {
      if (error) general.handleError(res, error);
      else if (!author) general.handleError(res, 'User not found', 404);
      else {
        const sort = utils.getDashboardSortBy(sortBy);

        Dataset.find({ author, name: { $regex: searchTitle, $options: 'i' } })
          .collation({ locale: 'en' })
          .sort(sort)
          .exec((setError, dataset) => {
            if (setError) general.handleError(res, setError);
            else res.json(dataset);
          });
      }
    });
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
    const data = req.body;

    User.findOne({ authId: data.authId }, (error, acc) => {
      if (error) general.handleError(res, error);
      else if (!acc) general.handleError(res, 'User not found', 404);
      else {
        if (acc.role === 'Administrator') {
          const dataset = new Dataset({
            datasetId: data.datasetId,
            author: acc,
            name: data.name,
            team: data.team,
            dataSource: data.dataSource,
            public: data.public
          });

          dataset.save(err => {
            if (err) general.handleError(res, err);

            res.json({ message: 'dataset saved' });
          });
        } else {
          general.handleError(res, 'Unauthorized');
        }
      }
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
