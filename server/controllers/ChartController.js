/* consts */
const config = require('../config/config');

/* general */
const general = require('./generalResponse');

/* utils */
const utils = require('../utils/general');

const Chart = require('../models/Chart');
const User = require('../models/User');

// TODO: Add this somewhere else, like in a util function
// this will basically check the
// db for already existing 'name' field
// for the provided model
// and will generate an incremented one
// NOTE: Be careful with this - this is a recursive promise function
// memory leaks might happen if misused
// NOTE: This should work only with the non archived models
// IMPORTANT: the model needs to have a name field and an archived field
function genUniqueName(model, name, orgName = undefined, incr = 1) {
  return new Promise((resolve, reject) => {
    // so we use this if mainly for when a chart is edited
    // if the same model name has been passed
    // to this as the original models name(orgName)
    // then we skip the incrementing cause nothing was changed
    // and resolve it right away
    // Sure it makes more sense to not even call this function
    // if that would be the case, but there's
    // less code if we do this approach
    if (orgName === name) {
      resolve(name);
    } else {
      model.findOne({ name, archived: false }, (duplError, duplModel) => {
        if (duplModel) {
          // this is the actual incrementing part
          let generatedName = '';

          if (incr === 1) generatedName = name.concat(` ${incr}`);
          else {
            generatedName = name
              .substring(0, name.lastIndexOf(' '))
              .concat(` ${incr}`);
          }

          // read whats above the if to understand why we pass undefined here
          genUniqueName(model, generatedName, undefined, incr + 1)
            .then(resName => resolve(resName))
            .catch(error => {
              reject(error);
            });
        } else if (duplError) {
          reject(duplError);
        } else {
          resolve(name);
        }
      });
    }
  });
}

const ChartController = {
  test: (req, res) => {
    res.send('SUCCESS');
  },

  // use this only if you have an empty database
  // and need a chart in it
  seedChart: function seedEvents(req, res) {
    // oke so first we seed a random user
    const author = new User({
      username: 'bob',
      email: 'bob@mailinator.com',
      authId: '156',
      role: 'admin',
      avatar: 'bob',
      firstName: 'bob',
      lastName: 'bob',
      team: 'Bobs team'
    });

    author.save();

    // and then we seed the actual chart
    const chart = new Chart({
      /* meta data of chart */
      name: 'Bobs chart',
      author,

      description: 'Bobs description',

      // so the type of chart
      type: 'Bob',

      /* indicators/ sub-indicators of chart */
      indicatorItems: [
        {
          indicator: 'Bobs indicator',
          subIndicators: ['Bobs sub_indicators']
        }
      ],

      yearRange: '1990,1991',

      // with what team is this chart associated
      team: 'Bobs team'
    });

    chart.save();

    res.json(chart);
  },

  // gets one user or public chart
  get: (req, res) => {
    const { chartId, authId } = req.query;

    User.findOne({ authId }).exec((userError, author) => {
      if (userError) general.handleError(res, userError);
      else if (!author) general.handleError(res, 'User not found', 404);
      else
        Chart.findOne({
          $or: [
            { _id: chartId, author, archived: false },
            { _id: chartId, _public: true, archived: false }
          ]
        })
          .populate('author')
          .exec((chartError, chart) => {
            if (chartError) general.handleError(res, chartError);
            res.json(chart);
          });
    });
  },

  // this basically validates the user and gets all public charts
  getPublic: (req, res) => {
    const { authId, sortBy, pageSize, page, searchTitle } = req.query;
    User.findOne({ authId }).exec((userError, author) => {
      if (userError) general.handleError(res, userError);
      else if (!author) general.handleError(res, 'User not found', 404);
      else {
        Chart.countDocuments(
          {
            _public: true,
            archived: false,
            name: { $regex: searchTitle, $options: 'i' }
          },
          (countError, count) => {
            if (userError) general.handleError(res, countError);
            const sort = utils.getDashboardSortBy(sortBy);
            const pSize = parseInt(pageSize, 10);
            const p = parseInt(page, 10);
            Chart.find(
              {
                _public: true,
                archived: false,
                name: { $regex: searchTitle, $options: 'i' }
              },
              'created last_updated team type dataSources _id name _public'
            )
              .limit(pSize)
              .skip(p * pSize)
              .collation({ locale: 'en' })
              .sort(sort)
              .populate('author', 'username authId')
              .exec((chartError, charts) => {
                if (chartError) general.handleError(res, chartError);
                res.json({
                  count,
                  charts
                });
              });
          }
        );
      }
    });
  },

  // this basically validates the user and gets all public charts
  getOnePublic: function(req, res) {
    const { chartId, authId } = req.query;
    User.findOne({ authId }).exec(userError => {
      if (userError) general.handleError(res, userError);
      else
        Chart.findOne(
          { _id: chartId, _public: true },
          'name',
          (chartError, chart) => {
            if (chartError) general.handleError(res, chartError);
            res.json(chart);
          }
        );
    });
  },

  // gets all user charts and team charts
  getAll: (req, res) => {
    const { authId, sortBy, searchTitle } = req.query;
    User.findOne({ authId }).exec((userError, author) => {
      if (userError) general.handleError(res, userError);
      else if (!author) general.handleError(res, 'User not found', 404);
      else {
        const sort = utils.getDashboardSortBy(sortBy);

        Chart.find(
          {
            $or: [
              {
                author,
                archived: false,
                name: { $regex: searchTitle, $options: 'i' }
              },
              {
                team: author.team,
                archived: false,
                name: { $regex: searchTitle, $options: 'i' }
              }
            ]
          },
          'created last_updated team _public type dataSources _id name archived'
        )
          .collation({ locale: 'en' })
          .sort(sort)
          .populate('author', 'username authId firstName lastName')
          .exec((chartError, chart) => {
            if (chartError) general.handleError(res, chartError);
            res.json(chart);
          });
      }
    });
  },

  getTeamFeedCharts: function(req, res) {
    const { authId } = req.query;

    User.findOne({ authId }).exec((userError, author) => {
      if (userError) general.handleError(res, userError);
      else
        Chart.find(
          { author, team: author.team },
          'name',
          (chartError, chart) => {
            if (chartError) general.handleError(res, chartError);
            res.json(chart);
          }
        );
    });
  },

  updateCreate: (req, res) => {
    const {
      authId,
      chartId,
      name,
      description,
      type,
      descIntro,
      indicatorItems,
      selectedSources,
      yearRange,
      selectedYear,
      dataSources,
      _public,
      data,
      team,
      specOptions,
      selectedCountryVal,
      selectedRegionVal
    } = req.body;

    User.findOne({ authId }, (error, author) => {
      if (error) general.handleError(res, error);
      else if (!author) general.handleError(res, 'User not found', 404);
      else {
        Chart.findOne({ _id: chartId }, (chartError, chart) => {
          if (!chart) {
            genUniqueName(Chart, name)
              .then(uniqueName => {
                const chartz = new Chart({
                  name: uniqueName,
                  author,
                  dataSources,
                  description,
                  _public,
                  team,
                  data,
                  descIntro,

                  // so the type of chart
                  type,

                  /* indicators/ sub-indicators of chart */
                  indicatorItems,

                  selectedSources,
                  yearRange,

                  selectedYear,
                  selectedCountryVal,
                  selectedRegionVal,
                  specOptions
                });

                chartz.save(err => {
                  if (err) general.handleError(res, err);

                  res.json({
                    message: 'chart created',
                    id: chartz._id,
                    name: chartz.name,
                    chartType: type
                  });
                });
              })
              .catch(promiseErr => {
                general.handleError(res, promiseErr);
              });
          } else if (author.equals(chart.author)) {
            genUniqueName(Chart, name, chart.name)
              .then(uniqueName => {
                chart.name = uniqueName;
                chart.author = author;

                chart.description = description;
                chart.dataSources = dataSources;

                chart.data = data;
                chart.descIntro = descIntro;

                // so the type of chart
                chart.type = type;
                chart._public = _public;
                chart.team = team;

                /* indicators/ sub-indicators of chart */
                chart.indicatorItems = indicatorItems;

                chart.selectedSources = selectedSources;
                chart.yearRange = yearRange;

                chart.selectedYear = selectedYear;
                chart.selectedCountryVal = selectedCountryVal;
                chart.selectedRegionVal = selectedRegionVal;
                chart.specOptions = specOptions;

                chart.save(err => {
                  if (err) general.handleError(res, err);

                  res.json({
                    message: 'chart updated',
                    id: chart._id,
                    name: chart.name,
                    chartType: chart.type
                  });
                });
              })
              .catch(promiseErr => {
                general.handleError(res, promiseErr);
              });
          } else general.handleError(res, 'Unauthorized', 401);
        });
      }
    });
  },

  duplicateById: (req, res) => {
    const { authId, chartId } = req.body;

    User.findOne({ authId }, (error, author) => {
      if (error) general.handleError(res, error);
      else if (!author) general.handleError(res, 'User not found', 404);
      else
        Chart.findOne({ _id: chartId }, (chartError, chart) => {
          if (chartError) general.handleError(res, chartError);
          else if (!chart) general.handleError(res, 'Chart not found', 404);
          else
            genUniqueName(Chart, chart.name)
              .then(uniqueName => {
                // so we'll imply this logic now
                // for the team just in case
                // someone from another team would be able to duplicate
                // this chart
                const team = author.team === chart.team ? chart.team : '';

                const chartz = new Chart({
                  name: uniqueName,
                  author,
                  dataSources: chart.dataSources,
                  description: chart.description,
                  _public: chart._public,
                  team,
                  data: chart.data,
                  descIntro: chart.descIntro,

                  // so the type of chart
                  type: chart.type,

                  /* indicators/ sub-indicators of chart */
                  indicatorItems: chart.indicatorItems,

                  selectedSources: chart.selectedSources,
                  yearRange: chart.yearRange,

                  selectedYear: chart.selectedYear,
                  selectedCountryVal: chart.selectedCountryVal,
                  selectedRegionVal: chart.selectedRegionVal
                });

                chartz.save(err => {
                  if (err) general.handleError(res, err);

                  res.json({
                    message: 'chart created',
                    id: chartz._id,
                    name: chartz.name,
                    chartType: chartz.type
                  });
                });
              })
              .catch(promiseErr => {
                general.handleError(res, promiseErr);
              });
        });
    });
  },

  update: function(user, vizId, viz, res) {
    // TODO: should be adjusted without the promises, or maybe with promises if
    // TODO: it works and makes sense
    /*
     * Update a new Chart, without updating results
     */

    viz.last_updated = Date.now();

    return Chart.updateByUser(vizId, viz, user)
      .then(viz => res(null, viz))
      .catch(error => {
        general.handleError(res, error);
      });
  },

  // archives the chart
  delete: (req, res) => {
    const { authId, chartId } = req.body;

    User.findOne({ authId }).exec((userError, author) => {
      if (userError) general.handleError(res, userError);
      else if (!author) general.handleError(res, 'User not found', 404);
      else {
        Chart.findOne({ author, archived: false, _id: chartId }).exec(
          (chartError, chart) => {
            if (chartError) general.handleError(res, chartError);

            chart.archived = true;

            chart.save(err => {
              if (err) general.handleError(res, err);

              res.json({ message: 'chart archived', id: chart._id });
            });
          }
        );
      }
    });
  },

  emptyTrash: function(user, res) {
    // TODO: should be adjusted without the promises, or maybe with promises if
    // TODO: it works and makes sense
    /*
     * Delete all archived visualisations
     */

    return Chart.remove({
      author: user._id,
      archived: true
    })
      .then(viz => res(null))
      .catch(error => {
        general.handleError(res, error);
      });
  },

  updateAndRefresh: function(user, vizId, viz, res) {
    // TODO: should be adjusted without the promises, or maybe with promises if
    // TODO: it works and makes sense
    /*
     * Update a new Chart, updating results
     */

    // TODO: desc 2016-03-17

    viz.last_updated = Date.now();

    return (
      Chart.updateByUser(vizId, viz, user)
        // .then(viz => viz.refresh())
        .then(viz => viz.saveAndPopulate())
        .then(viz => res(null, viz))
        .catch(error => {
          general.handleError(res, error);
        })
    );
  }

  // addItem: function(user, vizId, item, res) {
  //   /*
  //    * Add a new Chart item
  //    */
  //   return (
  //     Chart.findOneByUser(vizId, user)
  //       .then(viz => viz.addItem(item))
  //       .then(viz => viz.saveAndPopulate())
  //       // response
  //       .then(viz => {
  //         return res(null, viz.items[viz.items.length - 1]);
  //       }) // TODO: make this more reliable - 2016-02-12
  //       .catch(error => {
  //         console.error(error.stack);
  //         res(error);
  //       })
  //   );
  // },

  // updateItem: function(user, vizId, item, itemId, res) {
  //   /*
  //    * Update a new Chart item
  //    * @TODO use direct mongo query
  //    */
  //   return Chart.findOneByUser(vizId, user)
  //     .then(viz => viz.removeItem(itemId))
  //     .then(viz => viz.addItem(item))
  //     .then(viz => viz.saveAndPopulate())
  //     .then(viz => {
  //       return res(null, viz.items[viz.items.length - 1]);
  //     }) // TODO: make this more reliable - 2016-02-12
  //     .catch(error => {
  //       console.error(error.stack);
  //       res(error);
  //     });
  // },

  // removeItem: function(user, vizId, itemId, res) {
  //   return (
  //     Chart.findOneByUser(vizId, user)
  //       .then(viz => viz.removeItem(itemId))
  //       .then(viz => {
  //         if (viz.items.length === 0) {
  //           viz.public = false;
  //         }
  //
  //         return viz.saveAndPopulate();
  //       })
  //       //response
  //       .then(viz => res(null, viz))
  //       .catch(error => {
  //         console.error(error.stack);
  //         res(error);
  //       })
  //   );
  // },

  // replaceItems: function(user, vizId, items, res) {
  //   return Chart.findOneByUser(vizId, user)
  //     .then(viz => {
  //       items.forEach(item => {
  //         viz.replaceItems(item);
  //       });
  //       return viz;
  //     })
  //     .then(viz => viz.save())
  //     .then(viz => res(null, viz.items[viz.items.length - 1]))
  //     .catch(error => {
  //       console.error(error.stack);
  //       res(error);
  //     });
  // },

  // replaceContext: function(user, vizId, contextId, context, res) {
  //   /*
  //    * Replace a single context variable
  //    */
  //
  //   Chart.findOneByUser(vizId, user)
  //     .then(viz => viz.replaceContext(contextId, context)) // add a context to the object
  //     .then(viz => viz.saveAndPopulate())
  //     .then(viz => viz.refresh()) // update results elements
  //     .then(viz => viz.saveAndPopulate())
  //     // response
  //     .then(viz =>
  //       res(null, {
  //         context: viz.context[viz.context.length - 1], // the context being added
  //         items: viz.items // the items with their changed results
  //       })
  //     )
  //     .catch(error => {
  //       console.error(error.stack);
  //       res(error);
  //     });
  // },

  // addContext: function(user, vizId, context, res) {
  //   /*
  //    * Add a single context variable
  //    */
  //
  //   Chart.findOneByUser(vizId, user)
  //     .then(viz => viz.addContext(context)) // add a context to the object
  //     .then(viz => viz.saveAndPopulate())
  //     .then(viz => viz.refresh()) // update results elements
  //     .then(viz => viz.saveAndPopulate())
  //     // response
  //     .then(viz =>
  //       res(null, {
  //         context: viz.context[viz.context.length - 1], // the context being added
  //         items: viz.items // the items with their changed results
  //       })
  //     )
  //     // .then(viz => res(null, viz))
  //     .catch(error => {
  //       console.error(error.stack);
  //       res(error);
  //     });
  // },

  // removeContext: function(user, vizId, contextId, res) {
  //   /*
  //    * Add a single context variable
  //    */
  //
  //   Chart.findOneByUser(vizId, user)
  //     .then(viz => viz.removeContext(contextId)) // add a context to the object
  //     .then(viz => viz.saveAndPopulate())
  //     .then(viz => viz.refresh()) // update results elements
  //     .then(viz => viz.saveAndPopulate())
  //     .then(viz =>
  //       res(null, {
  //         items: viz.items // the items with their changed results
  //       })
  //     )
  //     .then(viz => res(null, viz))
  //     .catch(error => {
  //       console.error(error.stack);
  //       res(error);
  //     });
  // },

  // fork: function(user, vizId, res) {
  //   Chart.countForUser(user)
  //     .then(count => {
  //       if (count >= config.MAX_CHARTS) {
  //         throw new Error(`Maximum number of Charts reached`);
  //       }
  //     })
  //     .then(() => Chart.findOneAndPopulate({ _id: vizId }))
  //     .then(viz => {
  //       if (!viz.public && !viz.author._id.equals(user._id)) {
  //         throw new Error(
  //           `Chart with id ${vizId} is not public and not authored by you`
  //         );
  //       }
  //
  //       viz.items =
  //         viz.items &&
  //         viz.items.map(item => {
  //           item._id = mongoose.Types.ObjectId();
  //           return item;
  //         });
  //
  //       viz.context =
  //         viz.context &&
  //         viz.context.map(context => {
  //           context._id = mongoose.Types.ObjectId();
  //           return context;
  //         });
  //
  //       viz._id = mongoose.Types.ObjectId();
  //       viz.created = null;
  //       viz.last_updated = null;
  //       viz.name = 'copy of ' + viz.name;
  //       viz.public = false;
  //       viz.author = user._id;
  //       viz.isNew = true;
  //       viz.isDuplicate = true;
  //       return viz.saveAndPopulate();
  //     })
  //     .then(viz => res(null, viz))
  //     .catch(general.handleError.bind(null, res));
  // },

  /*
   * Admin only
   */

  // adminToggleHide: function(user, vizId, res) {
  //   if (!user.canPlayRoleOf('admin')) {
  //     return general.handleError(res, new Error('Unauthorized'));
  //   }
  //
  //   return Chart.findOne({ _id: vizId })
  //     .then(viz => {
  //       viz.hiddenFromFeed = !viz.hiddenFromFeed;
  //       return viz.saveAndPopulate();
  //     })
  //     .then(viz => res(null, viz))
  //     .catch(general.handleError.bind(null, res));
  // }
};

module.exports = ChartController;
