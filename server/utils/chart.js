const fs = require('fs');
const path = require('path');
const https = require('https');

/* utils */
const findIndex = require('lodash/findIndex');

/* consts */
const serverPath = __dirname.substring(0, __dirname.indexOf('utils') - 1);
const consts = require('../config/consts');
const chartTypes = consts.chartTypes;

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
  }
};
