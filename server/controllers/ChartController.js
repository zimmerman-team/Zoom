const fs = require('fs');

const { promises: fsPromises } = require('fs');
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
const chartUtils = require('../utils/chart');
const userUtils = require('../utils/user');
const findIndex = require('lodash/findIndex');
const isEqual = require('lodash/isEqual');
const tippecanoe = require('tippecanoe');

const Chart = require('../models/Chart');
const User = require('../models/User');

// TODO: Add this somewhere else, like in a util function
// this will basically check the
// db for already existing 'name' field
// for the provided model
// and will generate an incremented one
// NOTE: Be careful with this - this is a recursive promise functionz
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
  // gets one user chart
  get: (req, res) => {
    const { chartId, authId, type } = req.query;

    userUtils.findOneUser(authId, res).then(author => {
      if (author) {
        const query = { _id: chartId, author, archived: false, type };
        chartUtils.getOneChart(query, res);
      }
    });
  },

  // gets one public chart
  getOnePublic: (req, res) => {
    const { chartId, type } = req.query;

    const query = { _id: chartId, _public: true, archived: false, type };
    chartUtils.getOneChart(query, res);
  },

  // this basically gets all public charts
  getPublic: (req, res) => {
    const { sortBy, pageSize, page, searchTitle } = req.query;

    const query = {
      _public: true,
      archived: false,
      name: { $regex: searchTitle, $options: 'i' }
    };

    chartUtils.getManyCharts(query, sortBy, pageSize, page, res);
  },

  rewriteGeojsonToTiles: async (req, res) => {
    Chart.find(
      {
        type: ['geomap', 'focusKE', 'focusNL']
      },
      async (error, charts) => {
        if (error) {
          res.json(error);
        } else {
          const promises = charts.map(async chart => {
            if (
              chart.indicatorItems &&
              chart.indicatorItems[0] &&
              chart.indicatorItems[0].indicator &&
              chart.dataFileUrl
            ) {
              const file = await fsPromises
                .readFile(chart.dataFileUrl, 'utf8')
                .catch(err => {
                  // console.log('error: ', err);
                });

              if (file && file[0]) {
                const jsonFile = JSON.parse(file);
                const layerInd = findIndex(jsonFile, ['geoIndex', 0]);

                if (layerInd !== -1 && !jsonFile[layerInd].tileName) {
                  let filePath = jsonFile[layerInd].url;

                  const tileUrl = filePath.replace(
                    'savedGeoJsons',
                    'savedTiles'
                  );

                  if (filePath.indexOf('/api') !== -1) {
                    filePath = filePath.substring(4);
                  }

                  const tileName = filePath.substring(
                    filePath.indexOf('savedGeoJsons/') + 14,
                    filePath.indexOf('.json')
                  );

                  const fullPath = path.join(serverPath, filePath);

                  const fullTilePath = fullPath.replace(
                    'savedGeoJsons',
                    'savedTiles'
                  );

                  const jsonData = JSON.parse(fs.readFileSync(fullPath));

                  jsonData.features = jsonData.features.map(feature => {
                    return {
                      ...feature,
                      type: 'Feature'
                    };
                  });

                  fs.writeFileSync(fullPath, JSON.stringify(jsonData));

                  tippecanoe(
                    [fullPath],
                    {
                      zg: false,
                      readParallel: true,
                      layer: tileName,
                      output: fullTilePath,
                      maximumZoom: 10
                    },
                    { echo: true }
                  );

                  fs.unlinkSync(fullPath);

                  jsonFile[layerInd] = {
                    ...jsonFile[layerInd],
                    tileName,
                    zoom: 10,
                    url: tileUrl
                  };

                  fs.writeFileSync(chart.dataFileUrl, JSON.stringify(jsonFile));
                }
              }
              return file;
            } else {
              return null;
            }
          });

          await Promise.all(promises);

          res.json({ msg: 'success!' });
        }
      }
    );
  },

  // gets all user charts and team charts or archived charts of the user
  getAll: (req, res) => {
    const { authId, sortBy, searchTitle, archived, page, pageSize } = req.query;

    userUtils.findOneUser(authId, res).then(author => {
      if (author) {
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

        chartUtils.getManyCharts(query, sortBy, pageSize, page, res);
      }
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

    userUtils.findOneUser(authId, res).then(author => {
      if (author) {
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
                    chartUtils.writeTiles(chartz, type, data).then(tileData => {
                      if (tileData && tileData.layerIndex !== -1) {
                        data[tileData.layerIndex].url = tileData.newUrl;
                      }

                      chartUtils.writeDataFileUrl(chartz, data, res);
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
                  .writeTiles(chart, type, data, true)
                  .then(tileData => {
                    if (tileData && tileData.layerIndex !== -1) {
                      data[tileData.layerIndex].url = tileData.newUrl;
                    }

                    chart.name = uniqueName;
                    chart.author = author;

                    chart.description = description;

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

                    chartUtils.writeDataFileUrl(chart, data, res);
                  });
              })
              .catch(promiseErr2 => {
                general.handleError(res, promiseErr2);
              });
          } else {
            general.handleError(res, 'Unauthorized', 401);
          }
        });
      }
    });
  },

  duplicateById: (req, res) => {
    const { authId, chartId } = req.body;

    userUtils.findOneUser(authId, res).then(author => {
      if (author) {
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
                    // so if its a geochart, we want to rename its tile
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
                          // a tile file created for it
                          // we want to save this tile in a different folder
                          // and give it a suffix with the charts id
                          if (layerIndex !== -1) {
                            //set a reference to the new file name
                            const newFileName = `${chartz.id}geo_json.json`;

                            const pathToOldFile = data[layerIndex].url.replace(
                              'api/',
                              ''
                            );

                            const pathToNewFile = '/static/savedTiles/'.concat(
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

                            chartUtils.writeDataFileUrl(chartz, data, res);
                          } else {
                            // so if this geo chart data did NOT contain
                            // layers, hence did NOT contain a tile file
                            // we don't need to edit the data itself
                            // so we just copy the dataFileUrl
                            const duplicateFileUrl = `${dataPath}chartData${chartz.id}.txt`;
                            fs.createReadStream(chart.dataFileUrl).pipe(
                              fs.createWriteStream(duplicateFileUrl)
                            );

                            chartUtils.saveDataFileUrl(
                              chartz,
                              duplicateFileUrl,
                              res
                            );
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

                    chartUtils.saveDataFileUrl(chartz, duplicateFileUrl, res);
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

  // archives the chart
  delete: (req, res) => {
    const { authId, chartId } = req.body;

    userUtils.findOneUser(authId, res).then(author => {
      if (author) {
        Chart.findOne({ author, archived: false, _id: chartId }).exec(
          (chartError, chart) => {
            if (chartError) {
              general.handleError(res, chartError);
            } else {
              chart.archived = true;

              chart.save(err => {
                if (err) {
                  general.handleError(res, err);
                } else {
                  res.json({ message: 'chart archived', id: chart._id });
                }
              });
            }
          }
        );
      }
    });
  },

  // deletes all of users archived charts
  emptyTrash: (req, res) => {
    const { authId } = req.query;

    userUtils.findOneUser(authId, res).then(author => {
      if (author) {
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
                      const fullTilePath = path.join(
                        serverPath,
                        data[layerIndex].url.replace('api/', '')
                      );
                      // we check if the geojson file actually exists and then delete it
                      if (fullTilePath && fs.existsSync(fullTilePath)) {
                        fs.unlink(fullTilePath, () =>
                          console.log('Tile File Removed')
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
  }
};

module.exports = ChartController;
