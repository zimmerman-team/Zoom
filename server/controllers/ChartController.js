/* consts */
const config = require('../config/config');

/* general */
const general = require('./generalResponse');

const Chart = require('../models/Chart');
const User = require('../models/User');

const ChartController = {
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

  // gets one user chart
  get: (req, res) => {
    const { chartId, authId } = req.query;

    User.findOne({ authId }).exec((userError, author) => {
      if (userError) general.handleError(res, userError);
      else if (!author) general.handleError(res, 'User not found', 404);
      else
        Chart.findOne({ _id: chartId, author })
          .populate('author')
          .exec((chartError, chart) => {
            if (chartError) general.handleError(res, chartError);
            res.json(chart);
          });
    });
  },

  // this basically validates the user and gets all public charts
  getPublic: function(req, res) {
    const { authId } = req.query;
    User.findOne({ authId }).exec(userError => {
      if (userError) general.handleError(res, userError);
      else
        Chart.findOne({ _public: true }, 'name', (chartError, chart) => {
          if (chartError) general.handleError(res, chartError);
          res.json(chart);
        });
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

  // gets all user charts
  getAll: (req, res) => {
    const { authId, sortBy } = req.query;
    User.findOne({ authId }).exec((userError, author) => {
      if (userError) general.handleError(res, userError);
      else if (!author) general.handleError(res, 'User not found', 404);
      else {
        const sort = sortBy || { name: 1 };

        Chart.find(
          { author, archived: false },
          'created last_updated team _public type dataSources _id name archived'
        )
          .sort({ name: 1 })
          .populate('author', 'username')
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
      indicatorItems,
      selectedSources,
      yearRange,
      selectedYear,
      dataSources,
      selectedCountryVal,
      selectedRegionVal
    } = req.body;

    User.findOne({ authId }, (error, author) => {
      if (error) general.handleError(res, error);
      else if (!author) general.handleError(res, 'User not found', 404);
      else {
        Chart.findOne({ _id: chartId }, (chartError, chart) => {
          if (!chart) {
            const chartz = new Chart({
              name,
              author,
              dataSources,
              description,

              // so the type of chart
              type,

              /* indicators/ sub-indicators of chart */
              indicatorItems,

              selectedSources,
              yearRange,

              selectedYear,
              selectedCountryVal,
              selectedRegionVal
            });

            chartz.save(err => {
              if (err) general.handleError(res, err);

              res.json({ message: 'chart created', id: chartz._id });
            });
          } else {
            chart.name = name;
            chart.author = author;

            chart.description = description;
            chart.dataSources = dataSources;

            // so the type of chart
            chart.type = type;

            /* indicators/ sub-indicators of chart */
            chart.indicatorItems = indicatorItems;

            chart.selectedSources = selectedSources;
            chart.yearRange = yearRange;

            chart.selectedYear = selectedYear;
            chart.selectedCountryVal = selectedCountryVal;
            chart.selectedRegionVal = selectedRegionVal;

            chart.save(err => {
              if (err) general.handleError(res, err);

              res.json({ message: 'chart updated', id: chart._id });
            });
          }
        });
      }
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
