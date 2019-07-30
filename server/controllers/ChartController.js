const fs = require('fs');
const path = require('path');
const https = require('https');

const serverPath = __dirname.substring(0, __dirname.indexOf('controllers') - 1);

const dataPath = serverPath.concat('/data/');

/* consts */
const consts = require('../config/consts');

const chartTypes = consts.chartTypes;

/* general */
const general = require('./generalResponse');

/* utils */
const utils = require('../utils/general');
const chartUtils = require('../utils/chart');
const findIndex = require('lodash/findIndex');
const isEqual = require('lodash/isEqual');

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
    res.send(__dirname);
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

  // gets one user chart
  get: (req, res) => {
    const { chartId, authId, type } = req.query;

    User.findOne({ authId }).exec((userError, author) => {
      if (userError) {
        general.handleError(res, userError);
      } else if (!author) {
        general.handleError(res, 'User not found', 404);
      } else {
        Chart.findOne({ _id: chartId, author, archived: false, type })
          .populate('author')
          .exec((chartError, chart) => {
            if (chartError) {
              general.handleError(res, chartError);
            } else if (!chart) {
              general.handleError(res, 'chart not found', 404);
            } else if (chart.dataFileUrl) {
              fs.readFile(chart.dataFileUrl, 'utf8', (dataErr, data) => {
                if (dataErr) {
                  general.handleError(res, dataErr);
                } else {
                  res.send({
                    chart,
                    data: JSON.parse(data)
                  });
                }
              });
            } else {
              res.send({
                chart
              });
            }
          });
      }
    });
  },

  // gets one public chart
  getOnePublic: (req, res) => {
    const { chartId, type } = req.query;

    Chart.findOne({ _id: chartId, _public: true, archived: false, type })
      .populate('author')
      .exec((chartError, chart) => {
        if (chartError) {
          general.handleError(res, chartError);
        } else if (!chart) {
          general.handleError(res, 'chart not found', 404);
        } else if (chart.dataFileUrl) {
          fs.readFile(chart.dataFileUrl, 'utf8', (dataErr, data) => {
            if (dataErr) {
              general.handleError(res, dataErr);
            } else {
              res.send({
                chart,
                data: JSON.parse(data)
              });
            }
          });
        } else {
          res.send({
            chart
          });
        }
      });
  },

  // this basically gets all public charts
  getPublic: (req, res) => {
    const { sortBy, pageSize, page, searchTitle } = req.query;

    Chart.countDocuments(
      {
        _public: true,
        archived: false,
        name: { $regex: searchTitle, $options: 'i' }
      },
      (countError, count) => {
        if (countError) {
          general.handleError(res, countError);
        } else {
          const sort = utils.getDashboardSortBy(sortBy);
          const pSize = parseInt(pageSize, 10);
          const p = parseInt(page, 10);
          Chart.find(
            {
              _public: true,
              archived: false,
              name: { $regex: searchTitle, $options: 'i' }
            },
            'created last_updated teams type indicatorItems _id name _public'
          )
            .limit(pSize)
            .skip(p * pSize)
            .collation({ locale: 'en' })
            .sort(sort)
            .populate('author', 'username authId firstName lastName')
            .exec((chartError, charts) => {
              if (chartError) general.handleError(res, chartError);
              res.json({
                count,
                charts
              });
            });
        }
      }
    );
  },

  // gets all user charts and team charts or archived charts of the user
  getAll: (req, res) => {
    const { authId, sortBy, searchTitle, archived, page, pageSize } = req.query;
    User.findOne({ authId }).exec((userError, author) => {
      if (userError) general.handleError(res, userError);
      else if (!author) general.handleError(res, 'User not found', 404);
      else {
        const sort = utils.getDashboardSortBy(sortBy);

        const pSize = parseInt(pageSize, 10);
        const p = parseInt(page, 10);

        const query = archived
          ? {
              author,
              archived: true,
              name: { $regex: searchTitle, $options: 'i' }
            }
          : {
              $or: [
                {
                  author,
                  archived: false,
                  name: { $regex: searchTitle, $options: 'i' }
                },
                {
                  teams: { $elemMatch: { $in: author.teams } },
                  archived: false,
                  name: { $regex: searchTitle, $options: 'i' }
                }
              ]
            };

        Chart.countDocuments(query, (countError, count) => {
          if (countError) {
            general.handleError(res, countError);
          } else {
            Chart.find(
              query,
              'created last_updated teams _public type indicatorItems _id name archived'
            )
              .limit(pSize)
              .skip(p * pSize)
              .collation({ locale: 'en' })
              .sort(sort)
              .populate('author', 'username authId firstName lastName')
              .exec((chartError, charts) => {
                if (chartError) {
                  general.handleError(res, chartError);
                } else {
                  res.json({
                    count,
                    charts
                  });
                }
              });
          }
        });
      }
    });
  },

  // This guys is not used, TODO: remove it most likely
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
      chartKeys,
      indKeys,
      indicatorItems,
      selectedSources,
      yearRange,
      selectedYear,
      selectedYears,
      _public,
      data,
      teams,
      specOptions,
      selectedCountryVal,
      selectedRegionCodes,
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
                  description,
                  _public,
                  teams,
                  descIntro,

                  // so the type of chart
                  type,

                  chartKeys,
                  indKeys,
                  /* indicators/ sub-indicators of chart */
                  indicatorItems,

                  selectedSources,
                  yearRange,

                  selectedYear,
                  selectedYears,
                  selectedCountryVal,
                  selectedRegionVal,
                  selectedRegionCodes,
                  specOptions
                });

                chartz.save(err => {
                  if (err) {
                    console.log('saving this biggo gives error', err);
                    general.handleError(res, err);
                  } else {
                    chartUtils
                      .writeGeoJson(chartz, type, data)
                      .then(geoJsonData => {
                        if (geoJsonData && geoJsonData.layerIndex !== -1) {
                          data[geoJsonData.layerIndex].url = geoJsonData.newUrl;
                        }

                        const fileUrl = `${dataPath}chartData${chartz.id}.txt`;
                        fs.writeFile(
                          fileUrl,
                          JSON.stringify(data),
                          fileError => {
                            if (fileError) {
                              console.log('fileError', fileError);
                              general.handleError(res, fileError);
                            } else {
                              chartz.dataFileUrl = fileUrl;
                              chartz.save(urlSavErr => {
                                if (urlSavErr) {
                                  general.handleError(res, urlSavErr);
                                } else {
                                  res.json({
                                    message: 'chart created',
                                    id: chartz._id,
                                    name: chartz.name,
                                    chartType: type
                                  });
                                }
                              });
                            }
                          }
                        );
                      });
                  }
                });
              })
              .catch(promiseErr => {
                general.handleError(res, promiseErr);
              });
          } else if (author.equals(chart.author)) {
            genUniqueName(Chart, name, chart.name)
              .then(uniqueName => {
                chartUtils
                  .writeGeoJson(chart, type, data, true)
                  .then(geoJsonData => {
                    if (geoJsonData && geoJsonData.layerIndex !== -1) {
                      data[geoJsonData.layerIndex].url = geoJsonData.newUrl;
                    }

                    const fileUrl = `${dataPath}chartData${chart.id}.txt`;
                    fs.writeFile(fileUrl, JSON.stringify(data), fileError => {
                      if (fileError) {
                        general.handleError(res, fileError);
                      } else {
                        chart.name = uniqueName;
                        chart.author = author;

                        chart.description = description;

                        chart.dataFileUrl = fileUrl;
                        chart.descIntro = descIntro;

                        // so the type of chart
                        chart.type = type;
                        chart._public = _public;
                        chart.teams = teams;

                        chart.chartKeys = chartKeys;
                        chart.indKeys = indKeys;

                        /* indicators/ sub-indicators of chart */
                        chart.indicatorItems = indicatorItems;

                        chart.selectedSources = selectedSources;
                        chart.yearRange = yearRange;

                        chart.selectedYear = selectedYear;
                        chart.selectedYears = selectedYears;
                        chart.selectedCountryVal = selectedCountryVal;
                        chart.selectedRegionVal = selectedRegionVal;
                        chart.selectedRegionCodes = selectedRegionCodes;
                        chart.specOptions = specOptions;

                        chart.save(err2 => {
                          if (err2) general.handleError(res, err2);
                          else
                            res.json({
                              message: 'chart updated',
                              id: chart._id,
                              name: chart.name,
                              chartType: chart.type
                            });
                        });
                      }
                    });
                  });
              })
              .catch(promiseErr2 => {
                general.handleError(res, promiseErr2);
              });
          } else general.handleError(res, 'Unauthorized', 401);
        });
      }
    });
  },

  duplicateById: (req, res) => {
    const { authId, chartId } = req.body;

    User.findOne({ authId }, (error, author) => {
      if (error) {
        general.handleError(res, error);
      } else if (!author) {
        general.handleError(res, 'User not found', 404);
      } else {
        Chart.findOne({ _id: chartId }, (chartError, chart) => {
          if (chartError) {
            general.handleError(res, chartError);
          } else if (!chart) {
            general.handleError(res, 'Chart not found', 404);
          } else {
            genUniqueName(Chart, chart.name)
              .then(uniqueName => {
                // so we'll imply this logic now
                // for the team just in case
                // someone from another team would be able to duplicate
                // this chart
                const teams = isEqual(author.teams, chart.teams)
                  ? chart.teams
                  : [];

                const chartz = new Chart({
                  name: uniqueName,
                  author,
                  description: chart.description,
                  _public: chart._public,
                  teams,
                  data: chart.data,
                  descIntro: chart.descIntro,

                  // so the type of chart
                  type: chart.type,

                  chartKeys: chart.chartKeys,
                  indKeys: chart.indKeys,
                  /* indicators/ sub-indicators of chart */
                  indicatorItems: chart.indicatorItems,

                  selectedSources: chart.selectedSources,
                  yearRange: chart.yearRange,

                  selectedYear: chart.selectedYear,
                  selectedYears: chart.selectedYears,
                  selectedCountryVal: chart.selectedCountryVal,
                  selectedRegionVal: chart.selectedRegionVal,
                  selectedRegionCodes: chart.selectedRegionCodes,
                  specOptions: chart.specOptions
                });

                chartz.save(err => {
                  if (err) {
                    console.log('saving this biggo gives error', err);
                    general.handleError(res, err);
                  } else if (
                    chartz.type === chartTypes.geoMap ||
                    chartz.type === chartTypes.focusKE ||
                    chartz.type === chartTypes.focusNL
                  ) {
                    // so if its a geochart, we want to rename its geojson
                    // file as well, IF! it has one. So
                    // after getting the original charts data we get the datas
                    // file url and get the actual data in it
                    fs.readFile(
                      chart.dataFileUrl,
                      'utf8',
                      (dataErr, jsonData) => {
                        if (dataErr) {
                          general.handleError(res, dataErr);
                        } else {
                          const data = JSON.parse(jsonData);

                          const layerIndex = findIndex(data, ['type', 'layer']);

                          // so basically here when a geochart is being saved
                          // AND if it has layer data, which means that there's
                          // a geojson file created for it
                          // we want to save this geojson in a different folder
                          // and give it a suffix with the charts id
                          if (layerIndex !== -1) {
                            //set a reference to the new file name
                            const newFileName = `${chartz.id}geo_json.json`;

                            const pathToOldFile = data[layerIndex].url.replace(
                              'api/',
                              ''
                            );

                            const pathToNewFile = '/static/savedGeoJsons/'.concat(
                              newFileName
                            );

                            const fullOldPath = path.join(
                              serverPath,
                              pathToOldFile
                            );

                            const fullNewPath = path.join(
                              serverPath,
                              pathToNewFile
                            );

                            // AAAND we copy it with the new ID
                            fs.createReadStream(fullOldPath).pipe(
                              fs.createWriteStream(fullNewPath)
                            );

                            data[layerIndex].url = '/api/'.concat(
                              pathToNewFile
                            );

                            const fileUrl = `${dataPath}chartData${chartz.id}.txt`;
                            fs.writeFile(
                              fileUrl,
                              JSON.stringify(data),
                              fileError => {
                                if (fileError) {
                                  console.log('fileError', fileError);
                                  general.handleError(res, fileError);
                                } else {
                                  chartz.dataFileUrl = fileUrl;
                                  chartz.save(urlSavErr => {
                                    if (urlSavErr) {
                                      general.handleError(res, urlSavErr);
                                    } else {
                                      res.json({
                                        message: 'chart created',
                                        id: chartz._id,
                                        name: chartz.name,
                                        chartType: chartz.type
                                      });
                                    }
                                  });
                                }
                              }
                            );
                          } else {
                            // so if this geo chart data did NOT contain
                            // layers, hence did NOT contain a geojson file
                            // we don't need to edit the data itself
                            // so we just copy the dataFileUrl
                            const duplicateFileUrl = `${dataPath}chartData${chartz.id}.txt`;
                            fs.createReadStream(chart.dataFileUrl).pipe(
                              fs.createWriteStream(duplicateFileUrl)
                            );

                            chartz.dataFileUrl = duplicateFileUrl;

                            chartz.save(urlSavErr => {
                              if (urlSavErr) {
                                general.handleError(res, urlSavErr);
                              } else {
                                res.json({
                                  message: 'chart created',
                                  id: chartz._id,
                                  name: chartz.name,
                                  chartType: chartz.type
                                });
                              }
                            });
                          }
                        }
                      }
                    );
                  } else {
                    // so if its any other chart we just need to copy
                    // that charts data file give it this duplicates id
                    // and update the duplicate with its own new
                    // data files url
                    const duplicateFileUrl = `${dataPath}chartData${chartz.id}.txt`;
                    fs.createReadStream(chart.dataFileUrl).pipe(
                      fs.createWriteStream(duplicateFileUrl)
                    );

                    chartz.dataFileUrl = duplicateFileUrl;

                    chartz.save(urlSavErr => {
                      if (urlSavErr) {
                        general.handleError(res, urlSavErr);
                      } else {
                        res.json({
                          message: 'chart created',
                          id: chartz._id,
                          name: chartz.name,
                          chartType: chartz.type
                        });
                      }
                    });
                  }
                });
              })
              .catch(promiseErr => {
                general.handleError(res, promiseErr);
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

  // deletes all of users archived charts
  emptyTrash: (req, res) => {
    const { authId } = req.query;

    User.findOne({ authId }).exec((userError, author) => {
      if (userError) {
        general.handleError(res, userError);
      } else if (!author) {
        general.handleError(res, 'User not found', 404);
      } else {
        Chart.find({ author, archived: true }).exec((chartError, charts) => {
          if (chartError) {
            general.handleError(res, chartError);
          } else if (charts) {
            // so here we'll want to delete all of the chart associated files
            // and only then will we want to delete the charts themselves
            charts.forEach(chart => {
              if (
                (chart.type === chartTypes.geoMap ||
                  chart.type === chartTypes.focusKE ||
                  chart.type === chartTypes.focusNL) &&
                chart.dataFileUrl &&
                fs.existsSync(chart.dataFileUrl)
              ) {
                // and if its a geochart we first need to remove their geojson file
                // if they have one and only then do we remove the
                // dataFile itself
                fs.readFile(chart.dataFileUrl, 'utf8', (dataErr, jsonData) => {
                  if (dataErr) {
                    general.handleError(res, dataErr);
                  } else {
                    const data = JSON.parse(jsonData);

                    const layerIndex = findIndex(data, ['type', 'layer']);

                    // so if we find the layer data
                    if (layerIndex !== -1) {
                      const fullGeoJsonPath = path.join(
                        serverPath,
                        data[layerIndex].url.replace('api/', '')
                      );
                      // we check if the geojson file actually exists and then delete it
                      if (fullGeoJsonPath && fs.existsSync(fullGeoJsonPath)) {
                        fs.unlink(fullGeoJsonPath, () =>
                          console.log('GeoJson File Removed')
                        );
                      }
                    }

                    // and one way or another
                    // we delete the dataFileUrl
                    if (chart.dataFileUrl && fs.existsSync(chart.dataFileUrl)) {
                      fs.unlink(chart.dataFileUrl, () =>
                        console.log('Data File Removed')
                      );
                    }
                  }
                });
              } else if (
                chart.dataFileUrl &&
                fs.existsSync(chart.dataFileUrl)
              ) {
                // so if its NOT a goe chart
                // we just want to remove the charts dataFileUrl
                fs.unlink(chart.dataFileUrl, () =>
                  console.log('Data File Removed')
                );
              }
            });
            // AAAND finally after deleting all of them files we can actually
            // delete the collections from the database
            Chart.deleteMany({ author, archived: true }).exec(delError => {
              if (delError) {
                general.handleError(res, delError);
              } else {
                res.json({ message: 'chart trash emptied!' });
              }
            });
          } else {
            general.handleError(res, 'No charts found', 404);
          }
        });
      }
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
