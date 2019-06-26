/* consts */
import chartTypes from '__consts__/ChartConst';
import { colorSet } from '__consts__/PaneConst';
import { aggrOptions } from '__consts__/GraphStructOptionConsts';

/* utils */
import get from 'lodash/get';
import find from 'lodash/find';
import sortBy from 'lodash/sortBy';
import filter from 'lodash/filter';
import groupBy from 'lodash/groupBy';
import findIndex from 'lodash/findIndex';

/* styles */
import theme from 'theme/Theme';
import { formatMoney } from 'app/utils/genericUtils';

// these are aggregation keys associated with graphql returned variables
// 'geolocationTag' & 'date' are the graphql variables
export const aggrKeys = {
  [aggrOptions[0].value]: 'geolocationTag',
  [aggrOptions[1].value]: 'date'
};

// Updates layer percentiles depending on the value
// and updates the unique value amount that will be used
// to determine the amount of color stops
export function updatePercentiles(featureCollection) {
  let { features } = featureCollection;

  let uniqCount = 0;

  if (features.length > 0) {
    // so first we sort the values from lowest to highest
    features = sortBy(features, ['properties.value']);

    // so we'll start with the first lowest value
    let currentValue = features[0].properties.value;
    // and then we give percentile values to features
    features.forEach(f => {
      if (currentValue !== f.properties.value) {
        uniqCount += 1;
        currentValue = f.properties.value;
      }
      f.properties.percentile = uniqCount;
    });
  }

  featureCollection.uniqCount = uniqCount;
}

export function formatCountryLayerData(
  indicators,
  indName,
  selectedSubInd,
  subIndAggr,
  isIATI,
  countriesPolygons
) {
  const countryLayers = {
    type: 'FeatureCollection',
    features: []
  };

  if (indName === 'activity status') {
    const groupedCountries = groupBy(indicators, 'recipient_country.code');
    Object.keys(groupedCountries).forEach(key => {
      const countryArr = groupedCountries[key];
      const tooltipLabels = [];
      let value = 0;
      let tmpVal = 0;
      selectedSubInd.forEach(ssi => {
        switch (ssi) {
          case 'Pipeline/identification':
            tmpVal = find(
              countryArr,
              ca => ca.activity_status.name === 'Pipeline/identification'
            );
            if (tmpVal) {
              value += tmpVal.activity_count;
              tooltipLabels.push({
                subIndName: selectedSubInd,
                format: 'activities',
                label: `${indName} - Pipeline/identification`,
                value: tmpVal.activity_count
              });
            }
            break;
          case 'Implementation':
            tmpVal = find(
              countryArr,
              ca => ca.activity_status.name === 'Implementation'
            );
            if (tmpVal) {
              value += tmpVal.activity_count;
              tooltipLabels.push({
                subIndName: selectedSubInd,
                format: 'activities',
                label: `${indName} - Implementation`,
                value: tmpVal.activity_count
              });
            }
            break;
          case 'Completion':
            tmpVal = find(
              countryArr,
              ca => ca.activity_status.name === 'Completion'
            );
            if (tmpVal) {
              value += tmpVal.activity_count;
              tooltipLabels.push({
                subIndName: selectedSubInd,
                format: 'activities',
                label: `${indName} - Completion`,
                value: tmpVal.activity_count
              });
            }
            break;
          case 'Post-completion':
            tmpVal = find(
              countryArr,
              ca => ca.activity_status.name === 'Post-completion'
            );
            if (tmpVal) {
              value += tmpVal.activity_count;
              tooltipLabels.push({
                subIndName: selectedSubInd,
                format: 'activities',
                label: `${indName} - Post-completion`,
                value: tmpVal.activity_count
              });
            }
            break;
          case 'Cancelled':
            tmpVal = find(
              countryArr,
              ca => ca.activity_status.name === 'Cancelled'
            );
            if (tmpVal) {
              value += tmpVal.activity_count;
              tooltipLabels.push({
                subIndName: selectedSubInd,
                format: 'activities',
                label: `${indName} - Cancelled`,
                value: tmpVal.activity_count
              });
            }
            break;
          case 'Suspended':
            tmpVal = find(
              countryArr,
              ca => ca.activity_status.name === 'Suspended'
            );
            if (tmpVal) {
              value += tmpVal.activity_count;
              tooltipLabels.push({
                subIndName: selectedSubInd,
                format: 'activities',
                label: `${indName} - Suspended`,
                value: tmpVal.activity_count
              });
            }
            break;
        }
      });

      const countryPolyInstance = find(countriesPolygons.edges, cp => {
        return (
          cp.node.iso2 === countryArr[0].recipient_country.code.toLowerCase()
        );
      });
      countryLayers.features.push({
        geometry: JSON.parse(JSON.parse(countryPolyInstance.node.polygons)),
        properties: {
          tooltipLabels: !subIndAggr
            ? tooltipLabels
            : [
                {
                  subIndName: selectedSubInd,
                  format: 'activities',
                  label: `${indName} - ${selectedSubInd.join(',')}`,
                  value: value
                }
              ],
          indName,
          name: countryArr[0].recipient_country.name,
          iso2: countryArr[0].recipient_country.code.toLowerCase(),
          geolocationType: 'country',
          value: value,
          format: '',
          percentile: 0
        }
      });
    });
  } else if (indName === 'sector') {
    const groupedCountries = groupBy(indicators, 'recipient_country.code');
    Object.keys(groupedCountries).forEach(key => {
      const countryArr = groupedCountries[key];
      const tooltipLabels = [];
      let value = 0;
      let tmpVal = 0;
      selectedSubInd.forEach(ssi => {
        switch (ssi) {
          case 'Reproductive health care':
            tmpVal = find(
              countryArr,
              ca => ca.sector.name === 'Reproductive health care'
            );
            if (tmpVal) {
              value += tmpVal.activity_count;
              tooltipLabels.push({
                subIndName: selectedSubInd,
                format: 'activities',
                label: `${indName} - Reproductive health care`,
                value: tmpVal.activity_count
              });
            }
            break;
          case 'STD control including HIV/AIDS':
            tmpVal = find(
              countryArr,
              ca => ca.sector.name === 'STD control including HIV/AIDS'
            );
            if (tmpVal) {
              value += tmpVal.activity_count;
              tooltipLabels.push({
                subIndName: selectedSubInd,
                format: 'activities',
                label: `${indName} - STD control including HIV/AIDS`,
                value: tmpVal.activity_count
              });
            }
            break;
          case 'Human rights':
            tmpVal = find(countryArr, ca => ca.sector.name === 'Human rights');
            if (tmpVal) {
              value += tmpVal.activity_count;
              tooltipLabels.push({
                subIndName: selectedSubInd,
                format: 'activities',
                label: `${indName} - Human rights`,
                value: tmpVal.activity_count
              });
            }
            break;
          case 'Social mitigation of HIV/AIDS':
            tmpVal = find(
              countryArr,
              ca => ca.sector.name === 'Social mitigation of HIV/AIDS'
            );
            if (tmpVal) {
              value += tmpVal.activity_count;
              tooltipLabels.push({
                subIndName: selectedSubInd,
                format: 'activities',
                label: `${indName} - Social mitigation of HIV/AIDS`,
                value: tmpVal.activity_count
              });
            }
            break;
        }
      });

      const countryPolyInstance = find(countriesPolygons.edges, cp => {
        return (
          cp.node.iso2 === countryArr[0].recipient_country.code.toLowerCase()
        );
      });
      countryLayers.features.push({
        geometry: JSON.parse(JSON.parse(countryPolyInstance.node.polygons)),
        properties: {
          tooltipLabels: !subIndAggr
            ? tooltipLabels
            : [
                {
                  subIndName: selectedSubInd,
                  format: 'activities',
                  label: `${indName} - ${selectedSubInd.join(',')}`,
                  value: value
                }
              ],
          indName,
          name: countryArr[0].recipient_country.name,
          iso2: countryArr[0].recipient_country.code.toLowerCase(),
          geolocationType: 'country',
          value: value,
          format: '',
          percentile: 0
        }
      });
    });
  } else {
    indicators.forEach(indicator => {
      if (!isIATI) {
        const existLayerIndex = findIndex(countryLayers.features, feat => {
          return indicator.geolocationTag === feat.properties.name;
        });

        // so here we check if we already added a country to the countries layers
        // and if it has been added we just add the indicators value instead of pushing
        // another country
        // this needs to be done when using several data points with the same country
        // example: data points with different years, will have same countries
        // JSON.parse('{ "name":"John", "age":30, "city":"New York"}')
        if (existLayerIndex === -1) {
          countryLayers.features.push({
            // we need to do a double parse here, cause we retrieve a json
            // which is i dunno a double string or sth :D
            geometry: JSON.parse(JSON.parse(indicator.geolocationPolygons)),
            properties: {
              tooltipLabels: [
                {
                  subIndName: indicator.filterName,
                  format: indicator.valueFormatType,
                  label: subIndAggr
                    ? `${indName} - ${selectedSubInd.join(', ')}`
                    : `${indName} - ${indicator.filterName}`,
                  value: Math.round(indicator.value)
                }
              ],
              indName,
              name: indicator.geolocationTag,
              iso2: indicator.geolocationIso2,
              geolocationType: indicator.geolocationType,
              // we round it to two decimals
              value: Math.round(indicator.value),
              format: indicator.valueFormatType,
              percentile: 0
            }
          });
        } else {
          const changeFeat = countryLayers.features[existLayerIndex];
          changeFeat.properties.value += Math.round(indicator.value);

          if (subIndAggr) {
            // cause if its being aggregated, we will only have one
            // tooltip label item, which will show the summed up value
            changeFeat.properties.tooltipLabels[0].value += Math.round(
              indicator.value
            );
          } else {
            const labelInd = findIndex(changeFeat.properties.tooltipLabels, [
              'subIndName',
              indicator.filterName
            ]);

            // so if the sub indicators value exists, we will add up the value in the tool tip for that
            // sub indicator
            if (labelInd !== -1) {
              changeFeat.properties.tooltipLabels[labelInd].value += Math.round(
                indicator.value
              );
            } else {
              // otherwise we just push in a new filter value
              changeFeat.properties.tooltipLabels.push({
                subIndName: indicator.filterName,
                format: indicator.valueFormatType,
                label: `${indName} - ${indicator.filterName}`,
                value: Math.round(indicator.value)
              });
            }
          }
        }
      } else {
        let value = 0;
        const tooltipLabels = [];
        if (indName === 'transactions') {
          selectedSubInd.forEach(ssi => {
            switch (ssi) {
              case 'Incoming Funds':
                if (indicator.incoming_fund) {
                  value += indicator.incoming_fund;
                  tooltipLabels.push({
                    subIndName: selectedSubInd,
                    format: 'EUR',
                    label: `${indName} - Incoming Funds`,
                    value: indicator.incoming_fund
                  });
                }
                break;
              case 'Outgoing Commitment':
                if (indicator.commitment) {
                  value += indicator.commitment;
                  tooltipLabels.push({
                    subIndName: selectedSubInd,
                    format: 'EUR',
                    label: `${indName} - Incoming Funds`,
                    value: indicator.commitment
                  });
                }
                break;
              case 'Disbursement':
                if (indicator.disbursement) {
                  value += indicator.disbursement;
                  tooltipLabels.push({
                    subIndName: selectedSubInd,
                    format: 'EUR',
                    label: `${indName} - Disbursement`,
                    value: indicator.disbursement
                  });
                }
                break;
              case 'Expenditure':
                if (indicator.expenditure) {
                  value += indicator.expenditure;
                  tooltipLabels.push({
                    subIndName: selectedSubInd,
                    format: 'EUR',
                    label: `${indName} - Expenditure`,
                    value: indicator.expenditure
                  });
                }
                break;
              case 'Incoming Commitment':
                if (indicator.incoming_commitment) {
                  value += indicator.incoming_commitment;
                  tooltipLabels.push({
                    subIndName: selectedSubInd,
                    format: 'EUR',
                    label: `${indName} - Incoming Commitment`,
                    value: indicator.incoming_commitment
                  });
                }
                break;
            }
          });
        }
        const countryPolyInstance = find(countriesPolygons.edges, cp => {
          return (
            cp.node.iso2 === indicator.recipient_country.code.toLowerCase()
          );
        });
        countryLayers.features.push({
          geometry: JSON.parse(JSON.parse(countryPolyInstance.node.polygons)),
          properties: {
            tooltipLabels: !subIndAggr
              ? tooltipLabels
              : [
                  {
                    subIndName: selectedSubInd,
                    format: 'EUR',
                    label: `${indName} - ${selectedSubInd.join(',')}`,
                    value: value
                  }
                ],
            indName,
            name: indicator.recipient_country.name,
            iso2: indicator.recipient_country.code.toLowerCase(),
            geolocationType: 'country',
            value: value,
            format: '',
            percentile: 0
          }
        });
      }
    });
  }

  // And we add min and max values to be used for legends and what not
  countryLayers.minValue = Math.round(
    Math.min.apply(
      Math,
      countryLayers.features.map(feature => {
        return feature.properties.value;
      })
    )
  );

  countryLayers.maxValue = Math.round(
    Math.max.apply(
      Math,
      countryLayers.features.map(feature => {
        return feature.properties.value;
      })
    )
  );

  return countryLayers;
}

export function formatCountryCenterData(
  indicators,
  indName,
  selectedSubInd,
  subIndAggr,
  isIATI
) {
  const countryCenteredData = [];

  if (indName === 'activity status') {
    const groupedCountries = groupBy(indicators, 'recipient_country.code');
    Object.keys(groupedCountries).forEach(key => {
      const countryArr = groupedCountries[key];
      const tooltipLabels = [];
      let value = 0;
      let tmpVal = 0;
      selectedSubInd.forEach(ssi => {
        switch (ssi) {
          case 'Pipeline/identification':
            tmpVal = find(
              countryArr,
              ca => ca.activity_status.name === 'Pipeline/identification'
            );
            if (tmpVal) {
              value += tmpVal.activity_count;
              tooltipLabels.push({
                subIndName: selectedSubInd,
                format: 'activities',
                label: `${indName} - Pipeline/identification`,
                value: tmpVal.activity_count
              });
            }
            break;
          case 'Implementation':
            tmpVal = find(
              countryArr,
              ca => ca.activity_status.name === 'Implementation'
            );
            if (tmpVal) {
              value += tmpVal.activity_count;
              tooltipLabels.push({
                subIndName: selectedSubInd,
                format: 'activities',
                label: `${indName} - Implementation`,
                value: tmpVal.activity_count
              });
            }
            break;
          case 'Completion':
            tmpVal = find(
              countryArr,
              ca => ca.activity_status.name === 'Completion'
            );
            if (tmpVal) {
              value += tmpVal.activity_count;
              tooltipLabels.push({
                subIndName: selectedSubInd,
                format: 'activities',
                label: `${indName} - Completion`,
                value: tmpVal.activity_count
              });
            }
            break;
          case 'Post-completion':
            tmpVal = find(
              countryArr,
              ca => ca.activity_status.name === 'Post-completion'
            );
            if (tmpVal) {
              value += tmpVal.activity_count;
              tooltipLabels.push({
                subIndName: selectedSubInd,
                format: 'activities',
                label: `${indName} - Post-completion`,
                value: tmpVal.activity_count
              });
            }
            break;
          case 'Cancelled':
            tmpVal = find(
              countryArr,
              ca => ca.activity_status.name === 'Cancelled'
            );
            if (tmpVal) {
              value += tmpVal.activity_count;
              tooltipLabels.push({
                subIndName: selectedSubInd,
                format: 'activities',
                label: `${indName} - Cancelled`,
                value: tmpVal.activity_count
              });
            }
            break;
          case 'Suspended':
            tmpVal = find(
              countryArr,
              ca => ca.activity_status.name === 'Suspended'
            );
            if (tmpVal) {
              value += tmpVal.activity_count;
              tooltipLabels.push({
                subIndName: selectedSubInd,
                format: 'activities',
                label: `${indName} - Suspended`,
                value: tmpVal.activity_count
              });
            }
            break;
        }
      });
      countryCenteredData.push({
        tooltipLabels: !subIndAggr
          ? tooltipLabels
          : [
              {
                subIndName: selectedSubInd,
                format: 'activities',
                label: `${indName} - ${selectedSubInd.join(',')}`,
                value: value
              }
            ],
        indName,
        value: value,
        name: countryArr[0].recipient_country.name,
        geolocationIso2: countryArr[0].recipient_country.code.toLowerCase(),
        geolocationType: 'country',
        longitude: countryArr[0].recipient_country.location.coordinates[0],
        latitude: countryArr[0].recipient_country.location.coordinates[1],
        maxValue: 0,
        minValue: 0
      });
    });
  } else if (indName === 'sector') {
    const groupedCountries = groupBy(indicators, 'recipient_country.code');
    Object.keys(groupedCountries).forEach(key => {
      const countryArr = groupedCountries[key];
      const tooltipLabels = [];
      let value = 0;
      let tmpVal = 0;
      selectedSubInd.forEach(ssi => {
        switch (ssi) {
          case 'Reproductive health care':
            tmpVal = find(
              countryArr,
              ca => ca.sector.name === 'Reproductive health care'
            );
            if (tmpVal) {
              value += tmpVal.activity_count;
              tooltipLabels.push({
                subIndName: selectedSubInd,
                format: 'activities',
                label: `${indName} - Reproductive health care`,
                value: tmpVal.activity_count
              });
            }
            break;
          case 'STD control including HIV/AIDS':
            tmpVal = find(
              countryArr,
              ca => ca.sector.name === 'STD control including HIV/AIDS'
            );
            if (tmpVal) {
              value += tmpVal.activity_count;
              tooltipLabels.push({
                subIndName: selectedSubInd,
                format: 'activities',
                label: `${indName} - STD control including HIV/AIDS`,
                value: tmpVal.activity_count
              });
            }
            break;
          case 'Human rights':
            tmpVal = find(countryArr, ca => ca.sector.name === 'Human rights');
            if (tmpVal) {
              value += tmpVal.activity_count;
              tooltipLabels.push({
                subIndName: selectedSubInd,
                format: 'activities',
                label: `${indName} - Human rights`,
                value: tmpVal.activity_count
              });
            }
            break;
          case 'Social mitigation of HIV/AIDS':
            tmpVal = find(
              countryArr,
              ca => ca.sector.name === 'Social mitigation of HIV/AIDS'
            );
            if (tmpVal) {
              value += tmpVal.activity_count;
              tooltipLabels.push({
                subIndName: selectedSubInd,
                format: 'activities',
                label: `${indName} - Social mitigation of HIV/AIDS`,
                value: tmpVal.activity_count
              });
            }
            break;
        }
      });
      countryCenteredData.push({
        tooltipLabels: !subIndAggr
          ? tooltipLabels
          : [
              {
                subIndName: selectedSubInd,
                format: 'activities',
                label: `${indName} - ${selectedSubInd.join(',')}`,
                value: value
              }
            ],
        indName,
        value: value,
        name: countryArr[0].recipient_country.name,
        geolocationIso2: countryArr[0].recipient_country.code.toLowerCase(),
        geolocationType: 'country',
        longitude: countryArr[0].recipient_country.location.coordinates[0],
        latitude: countryArr[0].recipient_country.location.coordinates[1],
        maxValue: 0,
        minValue: 0
      });
    });
  } else {
    indicators.forEach(indicator => {
      if (!isIATI) {
        const existCountryIndex = findIndex(countryCenteredData, [
          'name',
          indicator.geolocationTag
        ]);

        if (indicator.geolocationCenterLongLat) {
          // so here we check if we already added a country to the countries layers
          // and if it has been added we just add the indicators value instead of pushing
          // another country
          // this needs to be done when using several data points with the same country
          // example: data points with different years, will have same countries
          if (existCountryIndex === -1) {
            // we need to do a double parse here, cause we retrieve a json
            // which is i dunno a double string or sth :D
            const coord = JSON.parse(
              JSON.parse(indicator.geolocationCenterLongLat)
            ).coordinates;
            countryCenteredData.push({
              tooltipLabels: [
                {
                  subIndName: indicator.filterName,
                  format: indicator.valueFormatType,
                  label: subIndAggr
                    ? `${indName} - ${selectedSubInd.join(', ')}`
                    : `${indName} - ${indicator.filterName}`,
                  value: Math.round(indicator.value)
                }
              ],
              indName,
              value: Math.round(indicator.value),
              geolocationIso2: indicator.geolocationIso2,
              geolocationType: indicator.geolocationType,
              maxValue: 0,
              minValue: 0,
              longitude: coord[0],
              latitude: coord[1],
              name: indicator.geolocationTag
            });
          } else {
            countryCenteredData[existCountryIndex].value =
              countryCenteredData[existCountryIndex].value +
              Math.round(indicator.value);

            if (subIndAggr) {
              // cause if its being aggregated, we will only have one
              // tooltip label item, which will show the summed up value
              countryCenteredData[
                existCountryIndex
              ].tooltipLabels[0].value += Math.round(indicator.value);
            } else {
              const labelInd = findIndex(
                countryCenteredData[existCountryIndex].tooltipLabels,
                ['subIndName', indicator.filterName]
              );

              // so if the sub indicators value exists, we will add up the value in the tool tip for that
              // sub indicator
              if (labelInd !== -1) {
                countryCenteredData[existCountryIndex].tooltipLabels[
                  labelInd
                ].value += Math.round(indicator.value);
              } else {
                // otherwise we just push in a new filter value
                countryCenteredData[existCountryIndex].tooltipLabels.push({
                  subIndName: indicator.filterName,
                  format: indicator.valueFormatType,
                  label: `${indName} - ${indicator.filterName}`,
                  value: Math.round(indicator.value)
                });
              }
            }
          }
        }
      } else {
        let value = 0;
        const tooltipLabels = [];
        if (indName === 'transactions') {
          selectedSubInd.forEach(ssi => {
            switch (ssi) {
              case 'Incoming Funds':
                if (indicator.incoming_fund) {
                  value += indicator.incoming_fund;
                  tooltipLabels.push({
                    subIndName: selectedSubInd,
                    format: 'EUR',
                    label: `${indName} - Incoming Funds`,
                    value: indicator.incoming_fund
                  });
                }
                break;
              case 'Outgoing Commitment':
                if (indicator.commitment) {
                  value += indicator.commitment;
                  tooltipLabels.push({
                    subIndName: selectedSubInd,
                    format: 'EUR',
                    label: `${indName} - Outgoing Commitment`,
                    value: indicator.commitment
                  });
                }
                break;
              case 'Disbursement':
                if (indicator.disbursement) {
                  value += indicator.disbursement;
                  tooltipLabels.push({
                    subIndName: selectedSubInd,
                    format: 'EUR',
                    label: `${indName} - Disbursement`,
                    value: indicator.disbursement
                  });
                }
                break;
              case 'Expenditure':
                if (indicator.expenditure) {
                  value += indicator.expenditure;
                  tooltipLabels.push({
                    subIndName: selectedSubInd,
                    format: 'EUR',
                    label: `${indName} - Expenditure`,
                    value: indicator.expenditure
                  });
                }
                break;
              case 'Incoming Commitment':
                if (indicator.incoming_commitment) {
                  value += indicator.incoming_commitment;
                  tooltipLabels.push({
                    subIndName: selectedSubInd,
                    format: 'EUR',
                    label: `${indName} - Incoming Commitment`,
                    value: indicator.incoming_commitment
                  });
                }
                break;
            }
          });
        }
        countryCenteredData.push({
          tooltipLabels: !subIndAggr
            ? tooltipLabels
            : [
                {
                  subIndName: selectedSubInd,
                  format: 'EUR',
                  label: `${indName} - ${selectedSubInd.join(',')}`,
                  value: value
                }
              ],
          indName,
          value: value,
          name: indicator.recipient_country.name,
          geolocationIso2: indicator.recipient_country.code.toLowerCase(),
          geolocationType: 'country',
          longitude: indicator.recipient_country.location.coordinates[0],
          latitude: indicator.recipient_country.location.coordinates[1],
          maxValue: 0,
          minValue: 0
        });
      }
    });
  }

  const maxValue = Math.max.apply(
    Math,
    countryCenteredData.map(indicator => {
      return indicator.value;
    })
  );
  const minValue = Math.min.apply(
    Math,
    countryCenteredData.map(indicator => {
      return indicator.value;
    })
  );

  countryCenteredData.forEach(indicator => {
    indicator.maxValue = Math.round(maxValue);
    indicator.minValue = Math.round(minValue);
  });

  return countryCenteredData;
}

// formats the param for the datapoints aggregations
// according to the single selected countries
// and according to the countries of selected regions
// no duplicate countries should be in this param
export function formatCountryParam(countryCodes, regionCountryCodes) {
  let jointCountries = [];
  jointCountries = jointCountries.concat(countryCodes);

  regionCountryCodes.forEach(region => {
    if (region !== 'select all') {
      region.forEach(countryCode => {
        if (jointCountries.indexOf(countryCode.iso2) === -1) {
          jointCountries.push(countryCode.iso2);
        }
      });
    }
  });

  return jointCountries;
}

export function formatLongLatData(
  indicators,
  indName,
  selectedSubInd,
  subIndAggr
) {
  const longLatData = [];

  indicators.forEach(indicator => {
    if (indicator.geolocationTag.indexOf(',') !== -1) {
      const existPointIndex = findIndex(longLatData, [
        'name',
        indicator.geolocationTag
      ]);

      if (existPointIndex === -1) {
        let long = indicator.geolocationTag.substring(
          0,
          indicator.geolocationTag.indexOf(',')
        );
        long = parseFloat(long);

        let lat = indicator.geolocationTag.substring(
          indicator.geolocationTag.indexOf(',') + 1
        );
        lat = parseFloat(lat);

        if (!isNaN(lat) && !isNaN(long)) {
          longLatData.push({
            tooltipLabels: [
              {
                subIndName: indicator.filterName,
                format: indicator.valueFormatType,
                label: subIndAggr
                  ? `${indName} - ${selectedSubInd.join(', ')}`
                  : `${indName} - ${indicator.filterName}`,
                value: Math.round(indicator.value)
              }
            ],
            indName,
            longitude: long,
            latitude: lat,
            name: indicator.comment || indicator.geolocationTag,
            value: Math.round(indicator.value)
          });
        }
      } else {
        longLatData[existPointIndex].value += Math.round(indicator.value);
        if (subIndAggr) {
          // cause if its being aggregated, we will only have one
          // tooltip label item, which will show the summed up value
          longLatData[existPointIndex].tooltipLabels[0].value += Math.round(
            indicator.value
          );
        } else {
          const labelInd = findIndex(
            longLatData[existPointIndex].tooltipLabels,
            ['subIndName', indicator.filterName]
          );

          // so if the sub indicators value exists, we will add up the value in the tool tip for that
          // sub indicator
          if (labelInd !== -1) {
            longLatData[existPointIndex].tooltipLabels[
              labelInd
            ].value += Math.round(indicator.value);
          } else {
            // otherwise we just push in a new filter value
            longLatData[existPointIndex].tooltipLabels.push({
              subIndName: indicator.filterName,
              format: indicator.valueFormatType,
              label: `${indName} - ${indicator.filterName}`,
              value: Math.round(indicator.value)
            });
          }
        }
      }
    }
  });

  return longLatData;
}

// removes the ID variable from region array, because for some reason
// mongoose generates and returns ids for objects stored in a model...
export function removeIds(regionArray) {
  return regionArray.map(countryArray => {
    return countryArray.map(country => {
      return { iso2: country.iso2 };
    });
  });
}

function ordinal_suffix_of(i) {
  const j = i % 10;
  const k = i % 100;
  if (j === 1 && k !== 11) {
    return `${i}st`;
  }
  if (j === 2 && k !== 12) {
    return `${i}nd`;
  }
  if (j === 3 && k !== 13) {
    return `${i}rd`;
  }
  return `${i}th`;
}

// formats date according to design
export function formatDate(created) {
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];

  const date = new Date(created);
  return `Published on ${monthNames[date.getMonth()]} ${ordinal_suffix_of(
    date.getDate()
  )} ${date.getFullYear()}`;
}

export function formatGeoData(indAggregations, countriesPolygons) {
  let longLatData = [];
  let countryLayerData = {};
  const geomapData = [];
  let countryCircleData = [];
  let colorInd = 0;
  const colors = theme.color.locationColorSet;

  indAggregations.forEach((aggregation, index) => {
    if (aggregation.data && aggregation.data[0]) {
      const indName = aggregation.isIATI
        ? aggregation.indName
        : aggregation.data[0].indicatorName;

      // so the first data item is layer legend
      if (index === 0) {
        // so for the first indicator aggregation on the geomap
        // we form the layers
        countryLayerData = formatCountryLayerData(
          aggregation.data,
          indName,
          aggregation.selectedSubInd,
          aggregation.subIndAggr,
          aggregation.isIATI,
          countriesPolygons
        );

        // and we push them into the indicatorData array for the geomap
        if (countryLayerData.features && countryLayerData.features.length > 0) {
          updatePercentiles(countryLayerData);

          geomapData.push({
            type: 'layer',
            data: countryLayerData,
            legendName: ` ${indName} - ${aggregation.selectedSubInd.join(', ')}`
          });
        }
      } else if (index === 1) {
        // the second is circle legend
        // and for the second indicator aggregation on the geomap
        // we format the center data
        countryCircleData = formatCountryCenterData(
          aggregation.data,
          indName,
          aggregation.selectedSubInd,
          aggregation.subIndAggr,
          aggregation.isIATI
        );

        // and we push in the circle data for the indicatorData array for the geomap
        if (countryCircleData.length > 0) {
          geomapData.push({
            type: 'circle',
            data: countryCircleData,
            legendName: ` ${indName} - ${aggregation.selectedSubInd.join(', ')}`
          });
        }
      } else {
        // all others are long/lat indicators
        longLatData = formatLongLatData(
          aggregation.data,
          indName,
          aggregation.selectedSubInd,
          aggregation.subIndAggr
        );

        // and we push them into the indicatorData array for the geomap
        if (longLatData.length > 0) {
          geomapData.push({
            type: 'location',
            color: colors[colorInd],
            data: longLatData,
            legendName: `${indName} - ${aggregation.selectedSubInd.join(', ')}`
          });

          if (colorInd + 1 < colors.length) {
            colorInd += 1;
          } else {
            colorInd = 0;
          }
        }
      }
    }
  });

  return geomapData;
}

// may not be keys, but is formed in a similar way as keys would,
// so yeah mainly used for line generation according to the selected indicators
// and 'selectedInd' is passed in as a string array of currently selected indicators
export function formatChartLegends(
  selectedInds,
  colors = colorSet[0].colors,
  currKeys
) {
  const chartKeys = [];
  const indNames = [];

  let colorInd = 0;
  selectedInds.forEach((indItem, index) => {
    let curKeyInd = -1;
    let orientation = 'left';

    if (currKeys.length > 0) {
      curKeyInd = findIndex(currKeys, ['indIndex', index]);
    }

    if (curKeyInd !== -1) {
      orientation = currKeys[curKeyInd].orientation;
    }
    // this if is here so we dont push 'undefined' as a key
    if (indItem && indItem.indName && indItem.subInd.length > 0) {
      let indName = indItem.indName;

      if (indNames.indexOf(indName) !== -1) {
        indName = indItem.indName.concat(` (${index})`);
      }

      indNames.push(indName);

      if (indItem.subIndAggr) {
        chartKeys.push({
          label: `${indName} - ${indItem.subInd.join(', ')}`,
          name: indName,
          color: colors[colorInd],
          dataSource: indItem.dataSource,
          indIndex: index,
          indIndexedName: indName,
          orientation
        });

        if (colorInd + 1 < colors.length) {
          colorInd += 1;
        } else {
          colorInd = 0;
        }
      } else {
        indItem.subInd.forEach(selSubInd => {
          const key = `${indName} - ${selSubInd}`;

          chartKeys.push({
            label: key,
            name: key,
            color: colors[colorInd],
            dataSource: indItem.dataSource,
            indIndex: index,
            indIndexedName: indName,
            orientation
          });

          if (colorInd + 1 < colors.length) {
            colorInd += 1;
          } else {
            colorInd = 0;
          }
        });
      }
    } else {
      chartKeys.push({
        label: undefined,
        name: undefined,
        indIndex: index,
        color: '',
        orientation
      });
    }
  });

  return chartKeys;
}

// *this is also formating the linechart by geolocation
// Note so the aggregate value was used to aggregate by Year or Geolocation
// it would be wats shown on the x Axis of the linechart
// and the subIndAggr will be used to aggregate or disaggregate by the
// indicators selected Sub indicators
export function formatLineData(
  indSelectedIndex,
  currChartKeys,
  currIndKeys,
  currData,
  indicators,
  aggregate,
  selectedYears
) {
  let indicatorData = [];

  // so this variable will help us form keys
  // for the line chart
  let indicatorNames = [];

  if (indSelectedIndex !== -1) {
    indicatorData = [...currData];
    indicatorNames = [...currIndKeys];

    // so basically if an indicator or data associated
    // with ONLY that indicator
    // has been changed we remove the current data of this
    // indicator cause we have recalled all of it and need to
    // replace it
    let keysToRemove = filter(currChartKeys, ['indIndex', indSelectedIndex]);

    if (keysToRemove.length > 0) {
      keysToRemove.forEach(keyItem => {
        indicatorData.forEach(item => {
          if (item[keyItem.name]) {
            // and then we just delete it
            delete item[keyItem.name];
            delete item[`${keyItem.name}Format`];
          }
        });

        const remIndKeyIndex = indicatorNames.indexOf(keyItem.indIndexedName);

        if (remIndKeyIndex !== -1) {
          // and also we remove the indicator key item
          indicatorNames.splice(remIndKeyIndex, 1);
        }
      });
    }
  }

  const aggrKey = aggrKeys[aggregate];

  indicators.forEach((indicator, index) => {
    if (indicator.data.length > 0) {
      if (!indicator.isIATI) {
        const existInd = indicatorNames.indexOf(
          indicator.data[0].indicatorName
        );

        let indName = indicator.data[0].indicatorName;

        // so we need this logic for when a person would
        // plot two indicators with the same name
        // as the id needs to be unique, we just add
        // the index as a suffix
        if (existInd !== -1) indName = indName.concat(` (${index})`);

        indicatorNames.push(indName);

        indicator.data.forEach(indItem => {
          // yeah and cause we might receive data with the same geolocation name
          // we add in the values for that geolocation so it wouldn't be repeated over and over
          const existItemInd = findIndex(indicatorData, existing => {
            return indItem[aggrKey] === existing[aggrKey];
          });

          let aggrValue = indItem.date;

          if (aggrKey === 'geolocationTag') {
            aggrValue =
              indItem.geolocationIso2 && indItem.geolocationIso2.length > 0
                ? indItem.geolocationIso2
                : indItem.geolocationTag;
          }

          const itemId = indicator.subIndAggr
            ? indName
            : `${indName} - ${indItem.filterName}`;

          if (existItemInd === -1) {
            indicatorData.push({
              [aggrKey]: indItem[aggrKey],
              [aggregate]: aggrValue,
              [itemId]: Math.round(indItem.value),
              [`${itemId}Format`]: indItem.valueFormatType
            });
          } else if (indicatorData[existItemInd][itemId] !== undefined) {
            indicatorData[existItemInd][itemId] += Math.round(indItem.value);
          } else {
            indicatorData[existItemInd][itemId] = Math.round(indItem.value);
            indicatorData[existItemInd][`${itemId}Format`] =
              indItem.valueFormatType;
          }
        });
      } else if (indicator.indName === 'activity status') {
        const iatiAggrKey = 'date';
        const existInd = indicatorNames.indexOf(indicator.indName);
        let indName = indicator.indName;
        if (existInd !== -1) indName = indName.concat(` (${index})`);
        indicatorNames.push(indName);
        const groupedYears = groupBy(indicator.data, 'transaction_date_year');
        Object.keys(groupedYears).forEach(key => {
          const skip =
            aggregate === 'year' ? !selectedYears.includes(key) : false;
          if (!skip) {
            const yearArr = groupedYears[key];
            let value = 0;
            let tmpVal = null;
            indicator.selectedSubInd.forEach(ssi => {
              value = 0;
              tmpVal = null;
              switch (ssi) {
                case 'Pipeline/identification':
                  tmpVal = find(
                    yearArr,
                    ca => ca.activity_status.name === 'Pipeline/identification'
                  );
                  if (tmpVal) {
                    value += tmpVal.activity_count;
                  }
                  break;
                case 'Implementation':
                  tmpVal = find(
                    yearArr,
                    ca => ca.activity_status.name === 'Implementation'
                  );
                  if (tmpVal) {
                    value += tmpVal.activity_count;
                  }
                  break;
                case 'Completion':
                  tmpVal = find(
                    yearArr,
                    ca => ca.activity_status.name === 'Completion'
                  );
                  if (tmpVal) {
                    value += tmpVal.activity_count;
                  }
                  break;
                case 'Post-completion':
                  tmpVal = find(
                    yearArr,
                    ca => ca.activity_status.name === 'Post-completion'
                  );
                  if (tmpVal) {
                    value += tmpVal.activity_count;
                  }
                  break;
                case 'Cancelled':
                  tmpVal = find(
                    yearArr,
                    ca => ca.activity_status.name === 'Cancelled'
                  );
                  if (tmpVal) {
                    value += tmpVal.activity_count;
                  }
                  break;
                case 'Suspended':
                  tmpVal = find(
                    yearArr,
                    ca => ca.activity_status.name === 'Suspended'
                  );
                  if (tmpVal) {
                    value += tmpVal.activity_count;
                  }
                  break;
              }
              const existItemInd = findIndex(indicatorData, existing => {
                return key === existing[iatiAggrKey];
              });
              const aggrValue = key;
              const itemId = indicator.subIndAggr
                ? indName
                : `${indName} - ${ssi}`;
              if (existItemInd === -1) {
                if (value > 0) {
                  indicatorData.push({
                    [iatiAggrKey]: key,
                    [aggregate]: aggrValue,
                    [itemId]: value,
                    [`${itemId}Format`]: 'activities'
                  });
                }
              } else if (indicatorData[existItemInd][itemId] !== undefined) {
                indicatorData[existItemInd][itemId] += value;
              } else if (value > 0) {
                indicatorData[existItemInd][itemId] = value;
                indicatorData[existItemInd][`${itemId}Format`] = 'activities';
              }
            });
          }
        });
      } else if (indicator.indName === 'sector') {
        const iatiAggrKey = 'date';
        const existInd = indicatorNames.indexOf(indicator.indName);
        let indName = indicator.indName;
        if (existInd !== -1) indName = indName.concat(` (${index})`);
        indicatorNames.push(indName);
        const groupedYears = groupBy(indicator.data, 'transaction_date_year');
        Object.keys(groupedYears).forEach(key => {
          const skip =
            aggregate === 'year' ? !selectedYears.includes(key) : false;
          if (!skip) {
            const yearArr = groupedYears[key];
            let value = 0;
            let tmpVal = null;
            indicator.selectedSubInd.forEach(ssi => {
              value = 0;
              tmpVal = null;
              switch (ssi) {
                case 'Reproductive health care':
                  tmpVal = find(
                    yearArr,
                    ca => ca.sector.name === 'Reproductive health care'
                  );
                  if (tmpVal) {
                    value += tmpVal.activity_count;
                  }
                  break;
                case 'STD control including HIV/AIDS':
                  tmpVal = find(
                    yearArr,
                    ca => ca.sector.name === 'STD control including HIV/AIDS'
                  );
                  if (tmpVal) {
                    value += tmpVal.activity_count;
                  }
                  break;
                case 'Human rights':
                  tmpVal = find(
                    yearArr,
                    ca => ca.sector.name === 'Human rights'
                  );
                  if (tmpVal) {
                    value += tmpVal.activity_count;
                  }
                  break;
                case 'Social mitigation of HIV/AIDS':
                  tmpVal = find(
                    yearArr,
                    ca => ca.sector.name === 'Social mitigation of HIV/AIDS'
                  );
                  if (tmpVal) {
                    value += tmpVal.activity_count;
                  }
                  break;
              }
              const existItemInd = findIndex(indicatorData, existing => {
                return key === existing[iatiAggrKey];
              });
              const aggrValue = key;
              const itemId = indicator.subIndAggr
                ? indName
                : `${indName} - ${ssi}`;
              if (existItemInd === -1) {
                if (value > 0) {
                  indicatorData.push({
                    [iatiAggrKey]: key,
                    [aggregate]: aggrValue,
                    [itemId]: value,
                    [`${itemId}Format`]: 'activities'
                  });
                }
              } else if (indicatorData[existItemInd][itemId] !== undefined) {
                indicatorData[existItemInd][itemId] += value;
              } else if (value > 0) {
                indicatorData[existItemInd][itemId] = value;
                indicatorData[existItemInd][`${itemId}Format`] = 'activities';
              }
            });
          }
        });
      } else {
        const iatiAggrKey = 'date';
        const existInd = indicatorNames.indexOf(indicator.indName);

        let indName = indicator.indName;

        if (existInd !== -1) indName = indName.concat(` (${index})`);

        indicatorNames.push(indName);

        indicator.data.forEach(indItem => {
          const skip =
            aggregate === 'year'
              ? !selectedYears.includes(
                  indItem.transaction_date_year.toString()
                )
              : false;
          if (!skip) {
            indicator.selectedSubInd.forEach(si => {
              const existItemInd = findIndex(indicatorData, existing => {
                return (
                  indItem.transaction_date_year.toString() ===
                  existing[iatiAggrKey].toString()
                );
              });

              const aggrValue = indItem.transaction_date_year;

              const itemId = indicator.subIndAggr
                ? indName
                : `${indName} - ${si}`;
              let value = 0;

              switch (si) {
                case 'Incoming Funds':
                  value += indItem.incoming_fund;
                  break;
                case 'Outgoing Commitment':
                  value += indItem.commitment;
                  break;
                case 'Disbursement':
                  value += indItem.disbursement;
                  break;
                case 'Expenditure':
                  value += indItem.expenditure;
                  break;
                case 'Incoming Commitment':
                  value += indItem.incoming_commitment;
                  break;
              }

              if (existItemInd === -1) {
                if (value > 0) {
                  indicatorData.push({
                    [iatiAggrKey]: indItem.transaction_date_year.toString(),
                    [aggregate]: aggrValue.toString(),
                    [itemId]: value,
                    [`${itemId}Format`]: 'EUR'
                  });
                }
              } else if (indicatorData[existItemInd][itemId] !== undefined) {
                indicatorData[existItemInd][itemId] += value;
              } else if (value > 0) {
                indicatorData[existItemInd][itemId] = value;
                indicatorData[existItemInd][`${itemId}Format`] = 'EUR';
              }
            });
          }
        });
      }
    }
  });

  // so yeah because of optimisation we want to sort this data
  // on the frontend
  // eventuallyy this whole data will be coming from the backend
  // so no need to worry

  return {
    data: sortBy(indicatorData, [aggregate]),
    indKeys: indicatorNames
  };
}

// so this function basically formats the
// keys for certain types of charts(like bar chart)
// according to the selected indicator
// array passed into it
// *this is also formating the barchart by geolocation
export function formatBarChartKeys(selectedInd, colors = colorSet[0].colors) {
  const chartKeys = [];
  const indNames = [];

  let colorInd = 0;

  selectedInd.forEach((indItem, index) => {
    // this if is here so we dont push 'undefined' as a key
    if (indItem && indItem.indName) {
      let indName = indItem.indName;

      if (indNames.indexOf(indName) !== -1) {
        indName = indItem.indName.concat(` (${index})`);
      }

      indNames.push(indName);

      if (indItem.subIndAggr) {
        chartKeys.push({
          indIndexedName: indName,
          key: indName,
          dataSource: indItem.dataSource,
          indName,
          label: `${indName} - ${indItem.subInd.join(', ')}`,
          color: colors[colorInd],
          // this will be used for data manipulation
          // to optimise indicator data refetching
          indIndex: index
        });

        if (colorInd + 1 < colors.length) {
          colorInd += 1;
        } else {
          colorInd = 0;
        }
      } else {
        indItem.subInd.forEach(subIndName => {
          const key = `${indName} - ${subIndName}`;

          chartKeys.push({
            key,
            dataSource: indItem.dataSource,
            indName: key,
            indIndexedName: indName,
            label: key,
            color: colors[colorInd],
            // this will be used for data manipulation
            // to optimise indicator data refetching
            indIndex: index
          });

          if (colorInd + 1 < colors.length) {
            colorInd += 1;
          } else {
            colorInd = 0;
          }
        });
      }
    }
  });

  return chartKeys;
}

export function formatBarData(
  indSelectedIndex,
  currChartKeys,
  currIndKeys,
  currData,
  indicators,
  aggregate,
  rankBy,
  horizontal,
  colors = colorSet[0].colors,
  selectedYears
) {
  let barChartData = [];

  // so this variable will help us form keys
  // for the bar chart
  let barIndKeys = [];

  if (indSelectedIndex !== -1) {
    barChartData = [...currData];
    barIndKeys = [...currIndKeys];

    // so basically if an indicator or data associated
    // with ONLY that indicator
    // has been changed we remove the current data of this
    // indicator cause we have recalled all of it and need to
    // replace it
    let keysToRemove = filter(currChartKeys, ['indIndex', indSelectedIndex]);

    if (keysToRemove.length > 0) {
      keysToRemove.forEach(keyItem => {
        barChartData.forEach(item => {
          if (item[keyItem.key]) {
            // so if the key exists we first substract its
            // value from the 'allValSum' item so that
            // bar sorting would still work properly
            item.allValSum -= item[keyItem.key];
            // and then we just delete it
            delete item[keyItem.key];
          }
        });

        const remIndKeyIndex = barIndKeys.indexOf(keyItem.indIndexedName);

        if (remIndKeyIndex !== -1) {
          // and also we remove the indicator key item
          barIndKeys.splice(remIndKeyIndex, 1);
        }
      });
    }
  }

  const aggrKey = aggrKeys[aggregate];
  const iatiAggrKey =
    aggregate === 'geo' ? 'recipient_country.code' : 'transaction_date_year';

  let colorInd = 0;
  indicators.forEach((indicator, index) => {
    if (indicator.data.length > 0) {
      if (!indicator.isIATI) {
        const existInd = barIndKeys.indexOf(indicator.data[0].indicatorName);
        let indName = indicator.data[0].indicatorName;

        // so we need this logic for when a person would
        // plot two indicators with the same name
        // as the id needs to be unique, we just add
        // the index as a suffix
        if (existInd !== -1) indName = indName.concat(` (${index})`);

        barIndKeys.push(indName);

        indicator.data.forEach(indItem => {
          // yeah and cause we might receive data with the same geolocation name
          // we add in the values for that geolocation so it wouldn't be repeated over and over
          const existItemInd = findIndex(barChartData, existing => {
            return indItem[aggrKey] === existing[aggrKey];
          });

          let aggrValue = indItem.date;

          if (aggrKey === 'geolocationTag') {
            aggrValue =
              indItem.geolocationIso2 && indItem.geolocationIso2.length > 0
                ? indItem.geolocationIso2.toUpperCase()
                : indItem.geolocationTag;
          }

          let itemId = `${indName} - ${indItem.filterName}`;
          let label = itemId;

          if (indicator.subIndAggr) {
            itemId = indName;
            label = `${itemId} - ${indicator.selectedSubInd.join(', ')}`;
          }

          if (existItemInd === -1) {
            barChartData.push({
              // so this variable will basically be used for sorting
              // by biggest or lowest value, of joined bars
              allValSum: Math.round(indItem.value),
              [`${itemId}Label`]: label,

              [aggrKey]: indItem[aggrKey],
              [aggregate]: aggrValue,

              [itemId]: Math.round(indItem.value),
              [`${itemId}Color`]: colors[colorInd],
              [`${itemId}Format`]: indItem.valueFormatType
            });
          } else if (barChartData[existItemInd][itemId] !== undefined) {
            barChartData[existItemInd].allValSum += Math.round(indItem.value);
            barChartData[existItemInd][itemId] += Math.round(indItem.value);
          } else {
            barChartData[existItemInd].allValSum += Math.round(indItem.value);
            barChartData[existItemInd][itemId] = Math.round(indItem.value);
            barChartData[existItemInd][`${itemId}Color`] = colors[colorInd];
            barChartData[existItemInd][`${itemId}Label`] = label;
            barChartData[existItemInd][`${itemId}Format`] =
              indItem.valueFormatType;
          }
        });

        if (colorInd + 1 < colors.length) colorInd += 1;
      } else if (indicator.indName === 'activity status') {
        const existInd = barIndKeys.indexOf(indicator.indName);
        let indName = indicator.indName;
        if (existInd !== -1) indName = indName.concat(` (${index})`);
        barIndKeys.push(indName);
        const groupedYears = groupBy(indicator.data, iatiAggrKey);
        Object.keys(groupedYears).forEach(key => {
          const skip =
            aggregate === 'year' ? !selectedYears.includes(key) : false;
          if (!skip) {
            const yearArr = groupedYears[key];
            let value = 0;
            let tmpVal = null;
            indicator.selectedSubInd.forEach(ssi => {
              value = 0;
              tmpVal = null;
              switch (ssi) {
                case 'Pipeline/identification':
                  tmpVal = find(
                    yearArr,
                    ca => ca.activity_status.name === 'Pipeline/identification'
                  );
                  if (tmpVal) {
                    value += tmpVal.activity_count;
                  }
                  break;
                case 'Implementation':
                  tmpVal = find(
                    yearArr,
                    ca => ca.activity_status.name === 'Implementation'
                  );
                  if (tmpVal) {
                    value += tmpVal.activity_count;
                  }
                  break;
                case 'Completion':
                  tmpVal = find(
                    yearArr,
                    ca => ca.activity_status.name === 'Completion'
                  );
                  if (tmpVal) {
                    value += tmpVal.activity_count;
                  }
                  break;
                case 'Post-completion':
                  tmpVal = find(
                    yearArr,
                    ca => ca.activity_status.name === 'Post-completion'
                  );
                  if (tmpVal) {
                    value += tmpVal.activity_count;
                  }
                  break;
                case 'Cancelled':
                  tmpVal = find(
                    yearArr,
                    ca => ca.activity_status.name === 'Cancelled'
                  );
                  if (tmpVal) {
                    value += tmpVal.activity_count;
                  }
                  break;
                case 'Suspended':
                  tmpVal = find(
                    yearArr,
                    ca => ca.activity_status.name === 'Suspended'
                  );
                  if (tmpVal) {
                    value += tmpVal.activity_count;
                  }
                  break;
              }
              const existItemInd = findIndex(barChartData, existing => {
                return key === existing[aggrKey];
              });
              const aggrValue = key;
              let itemId = `${indName} - ${ssi}`;
              let label = itemId;
              if (indicator.subIndAggr) {
                itemId = indName;
                label = `${itemId} - ${indicator.selectedSubInd.join(', ')}`;
              }
              if (existItemInd === -1) {
                if (value > 0) {
                  barChartData.push({
                    allValSum: value,
                    [`${itemId}Label`]: label,
                    [`${itemId}Color`]: colors[colorInd],
                    [aggrKey]: key,
                    [aggregate]: aggrValue,
                    [itemId]: value,
                    [`${itemId}Format`]: 'activities'
                  });
                }
              } else if (barChartData[existItemInd][itemId] !== undefined) {
                barChartData[existItemInd][itemId] += value;
                barChartData[existItemInd].allValSum += value;
              } else if (value > 0) {
                barChartData[existItemInd].allValSum += value;
                barChartData[existItemInd][`${itemId}Color`] = colors[colorInd];
                barChartData[existItemInd][`${itemId}Label`] = itemId;
                barChartData[existItemInd][itemId] = value;
                barChartData[existItemInd][`${itemId}Format`] = 'activities';
              }
            });
            if (colorInd + 1 < colors.length) colorInd += 1;
          }
        });
      } else if (indicator.indName === 'sector') {
        const existInd = barIndKeys.indexOf(indicator.indName);
        let indName = indicator.indName;
        if (existInd !== -1) indName = indName.concat(` (${index})`);
        barIndKeys.push(indName);
        const groupedYears = groupBy(indicator.data, iatiAggrKey);
        Object.keys(groupedYears).forEach(key => {
          const skip =
            aggregate === 'year' ? !selectedYears.includes(key) : false;
          if (!skip) {
            const yearArr = groupedYears[key];
            let value = 0;
            let tmpVal = null;
            indicator.selectedSubInd.forEach(ssi => {
              value = 0;
              tmpVal = null;
              switch (ssi) {
                case 'Reproductive health care':
                  tmpVal = find(
                    yearArr,
                    ca => ca.sector.name === 'Reproductive health care'
                  );
                  if (tmpVal) {
                    value += tmpVal.activity_count;
                  }
                  break;
                case 'STD control including HIV/AIDS':
                  tmpVal = find(
                    yearArr,
                    ca => ca.sector.name === 'STD control including HIV/AIDS'
                  );
                  if (tmpVal) {
                    value += tmpVal.activity_count;
                  }
                  break;
                case 'Human rights':
                  tmpVal = find(
                    yearArr,
                    ca => ca.sector.name === 'Human rights'
                  );
                  if (tmpVal) {
                    value += tmpVal.activity_count;
                  }
                  break;
                case 'Social mitigation of HIV/AIDS':
                  tmpVal = find(
                    yearArr,
                    ca => ca.sector.name === 'Social mitigation of HIV/AIDS'
                  );
                  if (tmpVal) {
                    value += tmpVal.activity_count;
                  }
                  break;
              }
              const existItemInd = findIndex(barChartData, existing => {
                return key === existing[aggrKey];
              });
              const aggrValue = key;
              let itemId = `${indName} - ${ssi}`;
              let label = itemId;
              if (indicator.subIndAggr) {
                itemId = indName;
                label = `${itemId} - ${indicator.selectedSubInd.join(', ')}`;
              }
              if (existItemInd === -1) {
                if (value > 0) {
                  barChartData.push({
                    allValSum: value,
                    [`${itemId}Label`]: label,
                    [`${itemId}Color`]: colors[colorInd],
                    [aggrKey]: key,
                    [aggregate]: aggrValue,
                    [itemId]: value,
                    [`${itemId}Format`]: 'activities'
                  });
                }
              } else if (barChartData[existItemInd][itemId] !== undefined) {
                barChartData[existItemInd][itemId] += value;
                barChartData[existItemInd].allValSum += value;
              } else if (value > 0) {
                barChartData[existItemInd].allValSum += value;
                barChartData[existItemInd][`${itemId}Color`] = colors[colorInd];
                barChartData[existItemInd][`${itemId}Label`] = itemId;
                barChartData[existItemInd][itemId] = value;
                barChartData[existItemInd][`${itemId}Format`] = 'activities';
              }
            });
            if (colorInd + 1 < colors.length) colorInd += 1;
          }
        });
      } else {
        const existInd = barIndKeys.indexOf(indicator.indName);

        let indName = indicator.indName;

        if (existInd !== -1) indName = indName.concat(` (${index})`);

        barIndKeys.push(indName);

        indicator.data.forEach(indItem => {
          const skip =
            aggregate === 'year'
              ? !selectedYears.includes(
                  indItem.transaction_date_year.toString()
                )
              : false;
          if (!skip) {
            indicator.selectedSubInd.forEach(si => {
              const existItemInd = findIndex(barChartData, existing => {
                return (
                  get(indItem, iatiAggrKey).toString() ===
                  existing[aggrKey].toString()
                );
              });

              const aggrValue = get(indItem, iatiAggrKey);

              let itemId = `${indName} - ${si}`;
              let label = itemId;
              if (indicator.subIndAggr) {
                itemId = indName;
                label = `${itemId} - ${indicator.selectedSubInd.join(', ')}`;
              }
              let value = 0;

              switch (si) {
                case 'Incoming Funds':
                  value += indItem.incoming_fund;
                  break;
                case 'Outgoing Commitment':
                  value += indItem.commitment;
                  break;
                case 'Disbursement':
                  value += indItem.disbursement;
                  break;
                case 'Expenditure':
                  value += indItem.expenditure;
                  break;
                case 'Incoming Commitment':
                  value += indItem.incoming_commitment;
                  break;
              }

              if (existItemInd === -1) {
                if (value > 0) {
                  barChartData.push({
                    allValSum: value,
                    [`${itemId}Label`]: label,
                    [`${itemId}Color`]: colors[colorInd],
                    [aggrKey]: aggrValue.toString(),
                    [aggregate]: aggrValue.toString(),
                    [itemId]: value,
                    [`${itemId}Format`]: 'EUR'
                  });
                }
              } else if (barChartData[existItemInd][itemId] !== undefined) {
                barChartData[existItemInd][itemId] += value;
                barChartData[existItemInd].allValSum += value;
              } else if (value > 0) {
                barChartData[existItemInd][itemId] = value;
                barChartData[existItemInd][`${itemId}Format`] = 'EUR';
                barChartData[existItemInd].allValSum += value;
                barChartData[existItemInd][`${itemId}Color`] = colors[colorInd];
                barChartData[existItemInd][`${itemId}Label`] = itemId;
              }
            });
            if (colorInd + 1 < colors.length) colorInd += 1;
          }
        });
      }
    }
  });

  let sortedData = [];

  if ((rankBy === 'high' && horizontal) || (rankBy === 'low' && !horizontal)) {
    sortedData = sortBy(barChartData, ['allValSum']);
  } else if (
    (rankBy === 'high' && !horizontal) ||
    (rankBy === 'low' && horizontal)
  ) {
    sortedData = sortBy(barChartData, ['allValSum']).reverse();
  }

  return {
    data: sortedData,
    indKeys: barIndKeys
  };
}

export function formatTableData(indicators) {
  // const tableChartColumns = [];
  // tableChartColumns.push(
  //   { name: `Geolocation` },
  //   { name: 'Date' },
  //   {
  //     name: `Measure Value`,
  //     options: {
  //       customBodyRender: (value, tableMeta) => {
  //         if (tableMeta.rowData[3] === 'transactions')
  //           return formatMoney(value);
  //         return value;
  //       }
  //     }
  //   },
  //   { name: 'Indicator' },
  //   { name: 'Sub-Indicator' },
  //   { name: 'Unit of measure' },
  //   { name: 'ISO2 codes' }
  // );
  const tableChartColumns = [
    {
      name: 'geolocationTag',
      label: 'Geolocation'
    },
    {
      name: 'date',
      label: 'Date'
    },
    {
      name: 'geolocationIso2',
      label: 'ISO2 codes'
    }
  ];

  const tableChartData = [];

  indicators.forEach(indicator => {
    if (indicator.data.length > 0) {
      if (!indicator.isIATI) {
        indicator.data.forEach(indItem => {
          const indCol = `${indItem.indicatorName}_${indItem.filterName}`;

          const indValCol = `${indCol}_value`;
          const indFormatCol = `${indCol}_format`;

          const valIndex = findIndex(tableChartColumns, ['name', indValCol]);
          const formatIndex = findIndex(tableChartColumns, [
            'name',
            indFormatCol
          ]);

          // so if indicator format column does not exist we push it
          // in to the start of the columns
          if (formatIndex === -1) {
            tableChartColumns.unshift({
              name: indFormatCol,
              label:
                indFormatCol.charAt(0).toUpperCase() + indFormatCol.slice(1)
            });
          }

          // and if indicator value column does not exist we push it
          // in to the start of the columns
          if (valIndex === -1) {
            tableChartColumns.unshift({
              name: indValCol,
              label: indValCol.charAt(0).toUpperCase() + indValCol.slice(1),
              indName: indItem.indicatorName,
              subIndName: indItem.filterName
            });
          }

          const geoIndex = findIndex(tableChartData, item => {
            return (
              item.geolocationIso2.toUpperCase() ===
                indItem.geolocationIso2.toUpperCase() &&
              parseInt(item.date, 10) === parseInt(indItem.date, 10)
            );
          });

          if (geoIndex === -1) {
            tableChartData.push({
              [indValCol]:
                indItem.value === null ? 'N/A' : Math.round(indItem.value),
              [indFormatCol]: indItem.valueFormatType,

              geolocationTag:
                indItem.geolocationTag === null ||
                indItem.geolocationTag.length <= 0
                  ? 'N/A'
                  : indItem.geolocationTag.slice(0, 1).toUpperCase() +
                    indItem.geolocationTag.slice(1),

              //Date
              date:
                indItem.date === null || indItem.date.length <= 0
                  ? 'N/A'
                  : indItem.date,

              geolocationIso2:
                indItem.geolocationIso2 === null ||
                indItem.geolocationIso2.length <= 0
                  ? 'N/A'
                  : indItem.geolocationIso2.toUpperCase()
            });
          } else {
            tableChartData[geoIndex][indValCol] =
              indItem.value === null ? 'N/A' : Math.round(indItem.value);
            tableChartData[geoIndex][indFormatCol] = indItem.valueFormatType;
          }
        });
      } else if (indicator.indName === 'activity status') {
        const groupedCountries = groupBy(
          indicator.data,
          'recipient_country.name'
        );
        const groupedCountriesYears = groupBy(
          groupedCountries,
          'transaction_date_year'
        );
        groupedCountriesYears[undefined].forEach(array => {
          array.forEach(key => {
            const indItem = key;
            const indicatorName = indicator.indName;
            const subIndicatorName = indItem.activity_status.name;
            const indCol = `${indicatorName}_${subIndicatorName}`;

            const indValCol = `${indCol}_value`;
            const indFormatCol = `${indCol}_format`;

            const valIndex = findIndex(tableChartColumns, ['name', indValCol]);
            const formatIndex = findIndex(tableChartColumns, [
              'name',
              indFormatCol
            ]);

            // so if indicator format column does not exist we push it
            // in to the start of the columns
            if (formatIndex === -1) {
              tableChartColumns.unshift({
                name: indFormatCol,
                label:
                  indFormatCol.charAt(0).toUpperCase() + indFormatCol.slice(1)
              });
            }

            // and if indicator value column does not exist we push it
            // in to the start of the columns
            if (valIndex === -1) {
              tableChartColumns.unshift({
                name: indValCol,
                label: indValCol.charAt(0).toUpperCase() + indValCol.slice(1),
                indName: indicatorName,
                subIndName: subIndicatorName
              });
            }

            const geoIndex = findIndex(tableChartData, item => {
              return (
                item.geolocationIso2.toUpperCase() ===
                  indItem.recipient_country.code &&
                parseInt(item.date, 10) === indItem.transaction_date_year
              );
            });

            if (geoIndex === -1) {
              tableChartData.push({
                [indValCol]:
                  indItem.activity_count === null
                    ? 'N/A'
                    : indItem.activity_count,
                [indFormatCol]: 'nr of activities',

                geolocationTag:
                  indItem.recipient_country.name === null
                    ? 'N/A'
                    : indItem.recipient_country.name,

                //Date
                date:
                  indItem.transaction_date_year === null
                    ? 'N/A'
                    : indItem.transaction_date_year,

                geolocationIso2:
                  indItem.recipient_country.code === null
                    ? 'N/A'
                    : indItem.recipient_country.code
              });
            } else {
              tableChartData[geoIndex][indValCol] =
                indItem.activity_count === null
                  ? 'N/A'
                  : indItem.activity_count;
              tableChartData[geoIndex][indFormatCol] = 'nr of activities';
            }
          });
        });
      } else if (indicator.indName === 'sector') {
        const groupedCountries = groupBy(
          indicator.data,
          'recipient_country.name'
        );
        const groupedCountriesYears = groupBy(
          groupedCountries,
          'transaction_date_year'
        );
        groupedCountriesYears[undefined].forEach(array => {
          array.forEach(key => {
            const indItem = key;
            const indicatorName = indicator.indName;
            const subIndicatorName = indItem.sector.name;
            const indCol = `${indicatorName}_${subIndicatorName}`;

            const indValCol = `${indCol}_value`;
            const indFormatCol = `${indCol}_format`;

            const valIndex = findIndex(tableChartColumns, ['name', indValCol]);
            const formatIndex = findIndex(tableChartColumns, [
              'name',
              indFormatCol
            ]);

            // so if indicator format column does not exist we push it
            // in to the start of the columns
            if (formatIndex === -1) {
              tableChartColumns.unshift({
                name: indFormatCol,
                label:
                  indFormatCol.charAt(0).toUpperCase() + indFormatCol.slice(1)
              });
            }

            // and if indicator value column does not exist we push it
            // in to the start of the columns
            if (valIndex === -1) {
              tableChartColumns.unshift({
                name: indValCol,
                label: indValCol.charAt(0).toUpperCase() + indValCol.slice(1),
                indName: indicatorName,
                subIndName: subIndicatorName
              });
            }

            const geoIndex = findIndex(tableChartData, item => {
              return (
                item.geolocationIso2.toUpperCase() ===
                  indItem.recipient_country.code &&
                parseInt(item.date, 10) === indItem.transaction_date_year
              );
            });

            if (geoIndex === -1) {
              tableChartData.push({
                [indValCol]:
                  indItem.activity_count === null
                    ? 'N/A'
                    : indItem.activity_count,
                [indFormatCol]: 'nr of activities',

                geolocationTag:
                  indItem.recipient_country.name === null
                    ? 'N/A'
                    : indItem.recipient_country.name,

                //Date
                date:
                  indItem.transaction_date_year === null
                    ? 'N/A'
                    : indItem.transaction_date_year,

                geolocationIso2:
                  indItem.recipient_country.code === null
                    ? 'N/A'
                    : indItem.recipient_country.code
              });
            } else {
              tableChartData[geoIndex][indValCol] =
                indItem.activity_count === null
                  ? 'N/A'
                  : indItem.activity_count;
              tableChartData[geoIndex][indFormatCol] = 'nr of activities';
            }
          });
        });
      } else {
        const groupedCountries = groupBy(
          indicator.data,
          'recipient_country.name'
        );
        const groupedCountriesYears = groupBy(
          groupedCountries,
          'transaction_date_year'
        );
        groupedCountriesYears[undefined].forEach(array => {
          indicator.selectedSubInd.forEach(si => {
            array.forEach(key => {
              const indItem = key;
              const indicatorName = indicator.indName;
              const subIndicatorName = si;
              const indCol = `${indicatorName}_${subIndicatorName}`;

              const indValCol = `${indCol}_value`;
              const indFormatCol = `${indCol}_format`;

              const valIndex = findIndex(tableChartColumns, [
                'name',
                indValCol
              ]);
              const formatIndex = findIndex(tableChartColumns, [
                'name',
                indFormatCol
              ]);

              // so if indicator format column does not exist we push it
              // in to the start of the columns
              if (formatIndex === -1) {
                tableChartColumns.unshift({
                  name: indFormatCol,
                  label:
                    indFormatCol.charAt(0).toUpperCase() + indFormatCol.slice(1)
                });
              }

              // and if indicator value column does not exist we push it
              // in to the start of the columns
              if (valIndex === -1) {
                tableChartColumns.unshift({
                  name: indValCol,
                  label: indValCol.charAt(0).toUpperCase() + indValCol.slice(1),
                  indName: indicatorName,
                  subIndName: subIndicatorName,
                  options: {
                    customBodyRender: value => formatMoney(value)
                  }
                });
              }

              const geoIndex = findIndex(tableChartData, item => {
                return (
                  item.geolocationIso2.toUpperCase() ===
                    indItem.recipient_country.code &&
                  parseInt(item.date, 10) === indItem.transaction_date_year
                );
              });

              let value = 0;
              switch (si) {
                case 'Incoming Funds':
                  value += indItem.incoming_fund;
                  break;
                case 'Outgoing Commitment':
                  value += indItem.commitment;
                  break;
                case 'Disbursement':
                  value = indItem.disbursement;
                  break;
                case 'Expenditure':
                  value = indItem.expenditure;
                  break;
                case 'Incoming Commitment':
                  value = indItem.incoming_commitment;
                  break;
              }

              if (geoIndex === -1) {
                tableChartData.push({
                  [indValCol]: value,
                  [indFormatCol]: 'EUR',

                  geolocationTag:
                    indItem.recipient_country.name === null
                      ? 'N/A'
                      : indItem.recipient_country.name,

                  //Date
                  date:
                    indItem.transaction_date_year === null
                      ? 'N/A'
                      : indItem.transaction_date_year,

                  geolocationIso2:
                    indItem.recipient_country.code === null
                      ? 'N/A'
                      : indItem.recipient_country.code
                });
              } else {
                tableChartData[geoIndex][indValCol] = value;
                tableChartData[geoIndex][indFormatCol] = 'EUR';
              }
            });
          });
        });
      }
    }
  });

  return {
    title: '',
    columns: tableChartColumns,
    rows: tableChartData
  };
}

export function formatDonutData(
  prevChart,
  indSelectedIndex,
  currChartKeys,
  currIndKeys,
  currData,
  indicators,
  aggrCountry
) {
  let chartData = [];

  // so this variable will help us form keys
  // for the bar chart
  let donutChartLabels = [];

  if (indSelectedIndex !== -1) {
    donutChartLabels = [...currIndKeys];

    // so basically if an indicator or data associated
    // with ONLY that indicator
    // has been changed we remove the current data of this
    // indicator cause we have recalled all of it and need to
    // replace it
    const keysToRemove = filter(currChartKeys, ['indIndex', indSelectedIndex]);

    if (keysToRemove.length > 0) {
      currData.forEach(item => {
        let pushItem = true;

        for (let i = 0; i < keysToRemove.length; i += 1) {
          if (item.label === keysToRemove[i].name) {
            // so if the items key exist in the keysToremove
            // we want to NOT push the item in

            pushItem = false;
            break;
          }
        }

        if (pushItem) {
          chartData.push(item);
        }
      });

      keysToRemove.forEach(keyItem => {
        const remIndKeyIndex = donutChartLabels.indexOf(keyItem.indIndexedName);

        if (remIndKeyIndex !== -1) {
          // and also we remove the indicator key item
          donutChartLabels.splice(remIndKeyIndex, 1);
        }
      });
    } else {
      chartData = [...currData];
    }
  }

  indicators.forEach((indicator, indIndex) => {
    if (!indicator.isIATI) {
      if (indicator.data[0]) {
        let indName = indicator.data[0].indicatorName;
        const existInd = donutChartLabels.indexOf(indName);

        // so we need this logic for when a person would
        // plot two indicators with the same name
        // as the id needs to be unique, we just add
        // the index as a suffix
        if (existInd !== -1) indName = indName.concat(` (${indIndex})`);

        donutChartLabels.push(indName);

        indicator.data.forEach((indItem, itemIndex) => {
          let itemId = `${indName} - ${indItem.filterName}`;
          let label = itemId;

          if (indicator.subIndAggr) {
            itemId = indName;
            label = `${indName} - ${indicator.selectedSubInd.join(', ')}`;
          }

          const chartItemInd = findIndex(chartData, chartItem => {
            if (aggrCountry) {
              return chartItem.key === itemId;
            }

            return (
              chartItem.key === itemId &&
              chartItem.geolocationTag === indItem.geolocationTag
            );
          });

          if (chartItemInd === -1) {
            let geoName = null;

            if (!aggrCountry) {
              geoName = indItem.geolocationTag;
              geoName = geoName.charAt(0).toUpperCase() + geoName.slice(1);
            }

            chartData.push({
              geoName,
              geolocationTag: indItem.geolocationTag,
              id: `${itemId} ${itemIndex}`,
              key: `${itemId}`,
              label,
              value: Math.round(indItem.value),
              format: indItem.valueFormatType
            });
          } else {
            chartData[chartItemInd].value += Math.round(indItem.value);
          }
        });
      }
    } else if (indicator.indName === 'activity status') {
      const existInd = donutChartLabels.indexOf(indicator.indName);
      let indName = indicator.indName;
      if (existInd !== -1) indName = indName.concat(` (${indIndex})`);
      donutChartLabels.push(indName);
      const groupedCountries = groupBy(
        indicator.data,
        'recipient_country.code'
      );
      Object.keys(groupedCountries).forEach((key, index) => {
        const countryArr = groupedCountries[key];
        let value = 0;
        let tmpVal = null;
        indicator.selectedSubInd.forEach(ssi => {
          value = 0;
          tmpVal = null;
          switch (ssi) {
            case 'Pipeline/identification':
              tmpVal = find(
                countryArr,
                ca => ca.activity_status.name === 'Pipeline/identification'
              );
              if (tmpVal) {
                value += tmpVal.activity_count;
              }
              break;
            case 'Implementation':
              tmpVal = find(
                countryArr,
                ca => ca.activity_status.name === 'Implementation'
              );
              if (tmpVal) {
                value += tmpVal.activity_count;
              }
              break;
            case 'Completion':
              tmpVal = find(
                countryArr,
                ca => ca.activity_status.name === 'Completion'
              );
              if (tmpVal) {
                value += tmpVal.activity_count;
              }
              break;
            case 'Post-completion':
              tmpVal = find(
                countryArr,
                ca => ca.activity_status.name === 'Post-completion'
              );
              if (tmpVal) {
                value += tmpVal.activity_count;
              }
              break;
            case 'Cancelled':
              tmpVal = find(
                countryArr,
                ca => ca.activity_status.name === 'Cancelled'
              );
              if (tmpVal) {
                value += tmpVal.activity_count;
              }
              break;
            case 'Suspended':
              tmpVal = find(
                countryArr,
                ca => ca.activity_status.name === 'Suspended'
              );
              if (tmpVal) {
                value += tmpVal.activity_count;
              }
              break;
          }
          let itemId = `${indName} - ${ssi}`;
          let label = itemId;
          if (indicator.subIndAggr) {
            itemId = indName;
            label = `${indName} - ${indicator.selectedSubInd.join(', ')}`;
          }
          const chartItemInd = findIndex(chartData, chartItem => {
            if (aggrCountry) {
              return chartItem.key === itemId;
            }

            return (
              chartItem.key === itemId &&
              chartItem.geolocationTag === countryArr[0].recipient_country.name
            );
          });
          if (chartItemInd === -1) {
            if (value > 0) {
              chartData.push({
                geoName: aggrCountry
                  ? itemId
                  : countryArr[0].recipient_country.name,
                geolocationTag: countryArr[0].recipient_country.name,
                id: `${itemId} ${index}`,
                key: itemId,
                label,
                value: value,
                format: 'activities'
              });
            }
          } else {
            chartData[chartItemInd].value += value;
          }
        });
      });
    } else if (indicator.indName === 'sector') {
      const existInd = donutChartLabels.indexOf(indicator.indName);
      let indName = indicator.indName;
      if (existInd !== -1) indName = indName.concat(` (${indIndex})`);
      donutChartLabels.push(indName);
      const groupedCountries = groupBy(
        indicator.data,
        'recipient_country.code'
      );
      Object.keys(groupedCountries).forEach((key, index) => {
        const countryArr = groupedCountries[key];
        let value = 0;
        let tmpVal = null;
        indicator.selectedSubInd.forEach(ssi => {
          value = 0;
          tmpVal = null;
          switch (ssi) {
            case 'Reproductive health care':
              tmpVal = find(
                countryArr,
                ca => ca.sector.name === 'Reproductive health care'
              );
              if (tmpVal) {
                value += tmpVal.activity_count;
              }
              break;
            case 'STD control including HIV/AIDS':
              tmpVal = find(
                countryArr,
                ca => ca.sector.name === 'STD control including HIV/AIDS'
              );
              if (tmpVal) {
                value += tmpVal.activity_count;
              }
              break;
            case 'Human rights':
              tmpVal = find(
                countryArr,
                ca => ca.sector.name === 'Human rights'
              );
              if (tmpVal) {
                value += tmpVal.activity_count;
              }
              break;
            case 'Social mitigation of HIV/AIDS':
              tmpVal = find(
                countryArr,
                ca => ca.sector.name === 'Social mitigation of HIV/AIDS'
              );
              if (tmpVal) {
                value += tmpVal.activity_count;
              }
              break;
          }
          let itemId = `${indName} - ${ssi}`;
          let label = itemId;
          if (indicator.subIndAggr) {
            itemId = indName;
            label = `${indName} - ${indicator.selectedSubInd.join(', ')}`;
          }
          const chartItemInd = findIndex(chartData, chartItem => {
            if (aggrCountry) {
              return chartItem.key === itemId;
            }

            return (
              chartItem.key === itemId &&
              chartItem.geolocationTag === countryArr[0].recipient_country.name
            );
          });
          if (chartItemInd === -1) {
            if (value > 0) {
              chartData.push({
                geoName: aggrCountry
                  ? itemId
                  : countryArr[0].recipient_country.name,
                geolocationTag: countryArr[0].recipient_country.name,
                id: `${itemId} ${index}`,
                key: itemId,
                label,
                value: value,
                format: 'activities'
              });
            }
          } else {
            chartData[chartItemInd].value += value;
          }
        });
      });
    } else if (indicator.indName === 'transactions') {
      const existInd = donutChartLabels.indexOf(indicator.indName);

      let indName = indicator.indName;

      if (existInd !== -1) indName = indName.concat(` (${indIndex})`);

      donutChartLabels.push(indName);

      indicator.data.forEach((indItem, index) => {
        indicator.selectedSubInd.forEach(si => {
          let itemId = `${indName} - ${si}`;
          let label = itemId;
          if (indicator.subIndAggr) {
            itemId = indName;
            label = `${indName} - ${indicator.selectedSubInd.join(', ')}`;
          }
          let value = 0;
          switch (si) {
            case 'Incoming Funds':
              value += indItem.incoming_fund;
              break;
            case 'Outgoing Commitment':
              value += indItem.commitment;
              break;
            case 'Disbursement':
              value += indItem.disbursement;
              break;
            case 'Expenditure':
              value += indItem.expenditure;
              break;
            case 'Incoming Commitment':
              value += indItem.incoming_commitment;
              break;
          }

          const chartItemInd = findIndex(chartData, chartItem => {
            if (aggrCountry) {
              return chartItem.key === itemId;
            }

            return (
              chartItem.key === itemId &&
              chartItem.geolocationTag === indItem.recipient_country.name
            );
          });

          if (chartItemInd === -1) {
            if (value > 0) {
              chartData.push({
                geoName: aggrCountry ? itemId : indItem.recipient_country.name,
                geolocationTag: indItem.recipient_country.name,
                id: `${itemId} ${index}`,
                key: itemId,
                label,
                value: value,
                format: 'EUR'
              });
            }
          } else {
            chartData[chartItemInd].value += value;
          }
        });
      });
    }
  });

  return {
    data: chartData,
    indKeys: donutChartLabels
  };
}

// so here we gonna format the donut keys according to the
// selectedInds, and the selected Sub inds, as we want to split
// the pieces of the donut by the sub-indicator
export function formatDonutKeys(selectedInds, colors) {
  const chartKeys = [];
  const indNames = [];

  let colorInd = 0;
  selectedInds.forEach((indItem, index) => {
    // this if is here so we dont push 'undefined' as a key
    if (indItem && indItem.indName) {
      let name = indItem.indName;

      if (indNames.indexOf(name) !== -1) {
        name = indItem.indName.concat(` (${index})`);
      }

      indNames.push(name);

      if (indItem.subIndAggr) {
        const itemId = `${name} - ${indItem.subInd.join(', ')}`;

        chartKeys.push({
          label: itemId,
          name: itemId,
          indIndex: index,
          indIndexedName: name,
          dataSource: indItem.dataSource,
          color: colors[colorInd]
        });

        if (colorInd + 1 < colors.length) {
          colorInd += 1;
        } else {
          colorInd = 0;
        }
      } else {
        indItem.subInd.forEach(subInd => {
          const itemId = `${name} - ${subInd}`;

          chartKeys.push({
            label: itemId,
            name: itemId,
            indIndex: index,
            indIndexedName: name,
            dataSource: indItem.dataSource,
            color: colors[colorInd]
          });

          if (colorInd + 1 < colors.length) {
            colorInd += 1;
          } else {
            colorInd = 0;
          }
        });
      }
    }
  });

  return chartKeys;
}

export function getChartKeys(
  chartType,
  indicators,
  colors = colorSet[0].colors,
  currKeys
) {
  switch (chartType) {
    case chartTypes.lineChart:
      return formatChartLegends(indicators, colors, currKeys);
    case chartTypes.barChart:
      return formatBarChartKeys(indicators, colors);
    case chartTypes.donutChart:
      return formatDonutKeys(indicators, colors);
    default:
      return [];
  }
}
