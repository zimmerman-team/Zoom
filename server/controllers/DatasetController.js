/* utils */
const utils = require('../utils/general');

/* general */
const general = require('./generalResponse');

const Dataset = require('../models/Dataset');
const User = require('../models/User');

const consts = require('../config/consts');

const roles = consts.roles;

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

  // basically gets the dataset IDs of the user mapped out datasets
  // and of the datasets that have been shared with this users team
  // it also returns the datasetIds which are available to the
  // public, to everybody.
  getDatasetIds: (req, res) => {
    const { authId } = req.query;

    User.findOne({ authId }, (error, author) => {
      if (error) {
        general.handleError(res, error);
      } else if (!author) {
        general.handleError(res, 'User not found', 404);
      } else {
        Dataset.find(
          {
            $or: [
              {
                author
              },
              {
                teams: { $elemMatch: { $in: author.teams } }
              },
              {
                public: 'a'
              }
            ]
          },
          'datasetId',
          (setErrors, dataSets) => {
            if (setErrors) {
              general.handleError(res, setErrors);
            } else {
              res.json(dataSets);
            }
          }
        );
      }
    });
  },

  // TODO: this is not being used, maybe remove it?
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
        if (
          acc.role === roles.admin ||
          acc.role === roles.superAdm ||
          acc.role === roles.mod
        ) {
          const dataset = new Dataset({
            datasetId: data.datasetId,
            author: acc,
            name: data.name,
            teams: data.teams,
            dataSource: data.dataSource,
            public: data.public
          });

          dataset.save(err => {
            if (err) {
              console.log('err', error);
              general.handleError(res, err);
            } else {
              res.json({ message: 'dataset saved' });
            }
          });
        } else {
          general.handleError(res, 'Unauthorized');
        }
      }
    });
  },

  // so this updates the dataset
  updateDataset: (req, res) => {
    const data = req.body;

    User.findOne({ authId: data.authId }, (error, author) => {
      if (error) general.handleError(res, error);
      else if (!author) general.handleError(res, 'User not found', 404);
      else if (
        author.role === roles.admin ||
        author.role === roles.superAdm ||
        author.role === roles.mod
      ) {
        Dataset.findOne(
          { author, datasetId: data.datasetId },
          (setError, dataset) => {
            if (setError) general.handleError(res, setError);
            else {
              if (data.name) dataset.name = data.name;

              if (data.teams) dataset.teams = data.teams;

              if (data.dataSource) dataset.dataSource = data.dataSource;

              if (data.public !== undefined) dataset.public = data.public;
            }

            dataset.save(err => {
              if (err) general.handleError(res, err);
              else res.json({ message: 'dataset saved' });
            });
          }
        );
      } else {
        general.handleError(res, 'Unauthorized', 401);
      }
    });
  },

  deleteDataset: (req, res) => {
    const { authId, datasetId } = req.query;

    User.findOne({ authId }, (error, author) => {
      if (error) general.handleError(res, error);
      else if (!author) general.handleError(res, 'User not found', 404);
      else if (author.role === 'Super admin' || author.role === 'Administrator')
        Dataset.deleteOne({ author, datasetId }, datasetErr => {
          if (datasetErr) general.handleError(res, datasetErr);
          else res.json({ message: 'dataset deleted' });
        });
      else general.handleError(res, 'Unauthorized', 401);
    });
  }
};

module.exports = DatasetApi;
