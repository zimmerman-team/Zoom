/* utils */
const utils = require('../utils/general');
const userUtils = require('../utils/user');

/* general */
const general = require('./generalResponse');

const Dataset = require('../models/Dataset');

const consts = require('../config/consts');

const roles = consts.roles;

const DatasetApi = {
  // gets all datasets of the owner
  getOwnerDatasets: (req, res) => {
    const { authId, sortBy, searchTitle, pageSize, page } = req.query;

    userUtils.findOneUser(authId, res).then(author => {
      if (author) {
        const query = { author, name: { $regex: searchTitle, $options: 'i' } };

        Dataset.countDocuments(query, (countError, count) => {
          if (countError) {
            general.handleError(res, countError);
          } else {
            const sort = utils.getDashboardSortBy(sortBy);
            const pSize = parseInt(pageSize, 10);
            const p = parseInt(page, 10);

            Dataset.find(query)
              .limit(pSize)
              .skip(p * pSize)
              .collation({ locale: 'en' })
              .sort(sort)
              .exec((datasetError, datasets) => {
                if (datasetError) {
                  general.handleError(res, datasetError);
                } else {
                  res.json({
                    count,
                    datasets
                  });
                }
              });
          }
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

    userUtils.findOneUser(authId, res).then(author => {
      if (author) {
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

    userUtils
      .findOneUser(data.authId, res, [roles.admin, roles.mod, roles.superAdm])
      .then(acc => {
        if (acc) {
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
              console.log('err', err);
              general.handleError(res, err);
            } else {
              res.json({ message: 'dataset saved' });
            }
          });
        }
      });
  },

  // so this updates the dataset
  updateDataset: (req, res) => {
    const data = req.body;

    userUtils
      .findOneUser(data.authId, res, [roles.admin, roles.mod, roles.superAdm])
      .then(author => {
        if (author) {
          Dataset.findOne(
            { author, datasetId: data.datasetId },
            (setError, dataset) => {
              if (setError) {
                general.handleError(res, setError);
              } else {
                if (data.name) dataset.name = data.name;

                if (data.teams) dataset.teams = data.teams;

                if (data.dataSource) dataset.dataSource = data.dataSource;

                if (data.public !== undefined) dataset.public = data.public;
              }

              dataset.save(err => {
                if (err) {
                  general.handleError(res, err);
                } else {
                  res.json({ message: 'dataset saved' });
                }
              });
            }
          );
        }
      });
  },

  deleteDataset: (req, res) => {
    const { authId, datasetId } = req.query;

    userUtils.findOneUser(authId, res).then(author => {
      if (author) {
        Dataset.deleteOne({ author, datasetId }, datasetErr => {
          if (datasetErr) {
            general.handleError(res, datasetErr);
          } else {
            res.json({ message: 'dataset deleted' });
          }
        });
      }
    });
  }
};

module.exports = DatasetApi;
