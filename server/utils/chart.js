const Chart = require('../models/Chart');
const fs = require('fs');
const path = require('path');
const https = require('https');

/* utils */
const findIndex = require('lodash/findIndex');
const general = require('../controllers/generalResponse');
const utils = require('../utils/general');

/* consts */
const serverPath = __dirname.substring(0, __dirname.indexOf('utils') - 1);
const consts = require('../config/consts');
const chartTypes = consts.chartTypes;
const dataPath = serverPath.concat('/data/');

// just an outer function from the module exports
// cause we want to use this same one in two different module exports
function saveDataFileReuse(chartz, fileUrl, res) {
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

module.exports = {
  writeGeoJson: (chartz, type, data, update = false) => {
    return new Promise(resolve => {
      if (
        type === chartTypes.geoMap ||
        type === chartTypes.focusKE ||
        type === chartTypes.focusNL
      ) {
        const layerIndex = findIndex(data, ['type', 'layer']);

        // so basically here when a geochart is being saveda
        // AND if it has layer data, which means that there's
        // a geojson file created for it
        // we want to save this geojson in a different folder
        // and give it a suffix with the charts id
        // and we'll only rename it if it has changed
        if (layerIndex !== -1) {
          //set a reference to the new file name
          const newFileName = `${chartz.id}geo_json.json`;

          const pathToOldFile = data[layerIndex].url.replace('api/', '');

          const pathToNewFile = 'static/savedGeoJsons/'.concat(newFileName);

          const fullOldPath = path.join(serverPath, pathToOldFile);

          const fullNewPath = path.join(serverPath, pathToNewFile);

          if (fullOldPath.indexOf('savedGeoJsons') !== -1) {
            if (!update) {
              // so if the old path contains 'savedGeoJsons'
              // in its path name, most likely a creation of a duplicate
              // chart is happening in its edit state withouth having
              // any data changes, thus we will copy the geojson in this
              // case cause we want the original to still be there
              // OR if geojson files are
              // actually served from a remote server where we've allowed
              // CORS for static files
              fs.createReadStream(fullOldPath).pipe(
                fs.createWriteStream(fullNewPath)
              );
              const newUrl = '/api/'.concat(pathToNewFile);

              resolve({ layerIndex, newUrl });
            } else {
              resolve(null);
            }
          } else if (
            process.env.REACT_APP_BACKEND_HOST.indexOf('localhost') === -1
          ) {
            const urlGeoJson = data[layerIndex].url;

            const file = fs.createWriteStream(fullNewPath, {
              flags: 'w'
            });

            https.get(urlGeoJson, fileRes => {
              fileRes
                .on('data', fileData => {
                  file.write(fileData);
                })
                .on('end', () => {
                  file.end();

                  const newUrl = '/api/'.concat(pathToNewFile);

                  resolve({ layerIndex, newUrl });
                });
            });
          } else {
            // otherwise DUCT has been run locally and geojson file
            // has already been saved in zoomBackend, so we just need
            // to move it(rename it)
            fs.rename(fullOldPath, fullNewPath, renameError => {
              if (renameError) {
                console.log('ERROR MOVING/RENAMING FILE', renameError);
              } else {
                // console.log('Successfully renamed - AKA moved!');
                const newUrl = '/api/'.concat(pathToNewFile);

                resolve({ layerIndex, newUrl });
              }
            });
          }
        } else {
          resolve(null);
        }
      } else {
        resolve(null);
      }
    });
  },

  // so this helper function basically gets one chart
  // according to the passed in query
  // and it mainly handles all errors that
  // may occur with getting this chart
  // and populates the response with the authors data
  // and also handles some file reading from
  // the charts data file
  // it also sends out a response
  getOneChart: (query, res) => {
    Chart.findOne(query)
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

  // so this basically gets and returns
  // many charts,
  // makes appropriate error responses
  // and general responses just depending on the query
  // it also deals with pagination and sorting and etc.
  getManyCharts: (query, sortBy, pageSize, page, res) => {
    Chart.countDocuments(query, (countError, count) => {
      if (countError) {
        general.handleError(res, countError);
      } else {
        const sort = utils.getDashboardSortBy(sortBy);
        const pSize = parseInt(pageSize, 10);
        const p = parseInt(page, 10);
        Chart.find(
          query,
          'created last_updated teams type indicatorItems _id name _public'
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
  },
  // a helper function to save charts data files url
  // to the chart
  saveDataFileUrl: (chartz, fileUrl, res) => {
    saveDataFileReuse(chartz, fileUrl, res);
  },
  // a helper function to write and save a charts
  // data file url and send a response
  writeDataFileUrl: (chartz, data, res) => {
    const fileUrl = `${dataPath}chartData${chartz.id}.txt`;
    fs.writeFile(fileUrl, JSON.stringify(data), fileError => {
      if (fileError) {
        console.log('fileError', fileError);
        general.handleError(res, fileError);
      } else {
        saveDataFileReuse(chartz, fileUrl, res);
      }
    });
  }
};
