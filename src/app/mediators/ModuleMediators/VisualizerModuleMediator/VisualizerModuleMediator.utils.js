import findIndex from 'lodash/findIndex';
import { scaleQuantile } from 'd3-scale';
import { range } from 'd3-array';
/* consts */
import chartTypes from '__consts__/ChartConst';
import { colorSet } from '__consts__/PaneConst';
import { aggrOptions } from '__consts__/GraphStructOptionConsts';
import { geoTypes } from '__consts__/GeolocationConst';

/* utils */
import sortBy from 'lodash/sortBy';

// these are aggregation keys associated with graphql returned variables
// 'geolocationTag' & 'date' are the graphql variables
export const aggrKeys = {
  [aggrOptions[0].value]: 'geolocationTag',
  [aggrOptions[1].value]: 'date'
};

// Updates layer percentiles depending on the value
export function updatePercentiles(featureCollection, accessor) {
  const { features } = featureCollection;
  const scale = scaleQuantile()
    .domain(features.map(accessor))
    .range(range(9));
  features.forEach(f => {
    const value = accessor(f);
    f.properties.value = value;
    f.properties.percentile = scale(value);
  });
}

export function formatCountryLayerData(
  indicators,
  indName,
  selectedSubInd,
  subIndAggr
) {
  const countryLayers = {
    type: 'FeatureCollection',
    features: []
  };

  indicators.forEach(indicator => {
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
  });

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
  subIndAggr
) {
  const countryCenteredData = [];

  indicators.forEach(indicator => {
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
        const coord = JSON.parse(JSON.parse(indicator.geolocationCenterLongLat))
          .coordinates;
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
  });

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

export function formatGeoData(indAggregations) {
  let longLatData = [];
  let countryLayerData = {};
  const geomapData = [];
  let countryCircleData = [];

  indAggregations.forEach((aggregation, index) => {
    if (aggregation.data && aggregation.data[0]) {
      const indName = aggregation.data[0].indicatorName;

      // so we check here if the retrieved data is long lat
      // and then format it differently
      // TODO: make this work differently, this is currently i quick and dirty fix
      if (
        aggregation.data[0] &&
        aggregation.data[0].geolocationType &&
        aggregation.data[0].geolocationType === geoTypes.pointBased
      ) {
        // so if the tag contains some numbers divided by a comma
        // that means that its a long/lat aggregation
        // and it then overrides the other legend types on the geomap
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
            data: longLatData,
            legendName: `POI: ${indName} - ${aggregation.selectedSubInd.join(
              ', '
            )}`
          });
        }
      } else if (index === 0) {
        // so for the first indicator aggregation on the geomap
        // we form the layers
        countryLayerData = formatCountryLayerData(
          aggregation.data,
          indName,
          aggregation.selectedSubInd,
          aggregation.subIndAggr
        );

        // and we push them into the indicatorData array for the geomap
        if (countryLayerData.features && countryLayerData.features.length > 0) {
          updatePercentiles(countryLayerData, f => f.properties.value);

          geomapData.push({
            type: 'layer',
            data: countryLayerData,
            legendName: ` ${indName} - ${aggregation.selectedSubInd.join(', ')}`
          });
        }
      } else if (index === 1) {
        // and for the second indicator aggregation on the geomap
        // we format the center data
        countryCircleData = formatCountryCenterData(
          aggregation.data,
          indName,
          aggregation.selectedSubInd,
          aggregation.subIndAggr
        );

        // and we push in the circle data for the indicatorData array for the geomap
        if (countryCircleData.length > 0) {
          geomapData.push({
            type: 'circle',
            data: countryCircleData,
            legendName: ` ${indName} - ${aggregation.selectedSubInd.join(', ')}`
          });
        }
      }
      // else {
      //   // here we'll format mainly the long/lat data
      //   // when this functionality for the geomap will
      //   // be addressed
      // }
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
          indIndex: index,
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
            indIndex: index,
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
export function formatLineData(indicators, aggregate) {
  const aggrKey = aggrKeys[aggregate];

  const indicatorData = [];
  const indicatorNames = [];

  indicators.forEach((indicator, index) => {
    if (indicator.data.length > 0) {
      const existInd = indicatorNames.indexOf(indicator.data[0].indicatorName);

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
    }
  });

  return indicatorData;
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
          key: indName,
          indName,
          label: `${indName} - ${indItem.subInd.join(', ')}`,
          color: colors[colorInd]
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
            indName: key,
            label: key,
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

export function formatBarData(
  indicators,
  aggregate,
  rankBy,
  horizontal,
  colors = colorSet[0].colors
) {
  const barChartData = [];
  const barChartKeys = [];

  const aggrKey = aggrKeys[aggregate];

  let colorInd = 0;
  indicators.forEach((indicator, index) => {
    if (indicator.data.length > 0) {
      const existInd = barChartKeys.indexOf(indicator.data[0].indicatorName);
      let indName = indicator.data[0].indicatorName;

      // so we need this logic for when a person would
      // plot two indicators with the same name
      // as the id needs to be unique, we just add
      // the index as a suffix
      if (existInd !== -1) indName = indName.concat(` (${index})`);

      barChartKeys.push(indName);

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

  return sortedData;
}

export function formatTableData(indicators) {
  const tableChartColumns = [];
  tableChartColumns.push(
    { name: `Geolocation` },
    { name: 'Date' },
    { name: `Measure Value` },
    { name: 'Indicator' },
    { name: 'Unit of measure' },
    { name: 'ISO2 codes' }
  );
  const tableChartData = [];

  indicators.forEach(indicator => {
    if (indicator.data.length > 0) {
      indicator.data.forEach(indItem => {
        tableChartData.push([
          //Geolocation
          indItem.geolocationTag === null || indItem.geolocationTag.length <= 0
            ? 'N/A'
            : indItem.geolocationTag,

          //Date
          indItem.date === null || indItem.date.length <= 0
            ? 'N/A'
            : indItem.date,

          //Measure Value
          indItem.value === null ? 'N/A' : Math.round(indItem.value),

          //Indicator
          indItem.indicatorName,

          //Unit of measure
          indItem.valueFormatType,

          //ISO2 codes
          indItem.geolocationIso2 === null ||
          indItem.geolocationIso2.length <= 0
            ? 'N/A'
            : indItem.geolocationIso2.toUpperCase()
        ]);
      });
    }
  });
  return {
    title: '',
    columns: tableChartColumns,
    rows: tableChartData
  };
}

export function formatDonutData(indicators) {
  const chartData = [];
  const donutChartLabels = [];

  indicators.forEach((indicator, indIndex) => {
    if (indicator.data[0]) {
      let indName = indicator.data[0].indicatorName;
      const existInd = donutChartLabels.indexOf(indName);

      // so we need this logic for when a person would
      // plot two indicators with the same name
      // as the id needs to be unique, we just add
      // the index as a suffix
      if (existInd !== -1) indName = indName.concat(` (${indIndex})`);

      donutChartLabels.push(indName);

      indicator.data.forEach(indItem => {
        let itemId = `${indName} - ${indItem.filterName}`;
        let label = itemId;

        if (indicator.subIndAggr) {
          itemId = indName;
          label = `${indName} - ${indicator.selectedSubInd.join(', ')}`;
        }

        const chartItemInd = findIndex(chartData, ['id', itemId]);

        if (chartItemInd === -1) {
          chartData.push({
            id: itemId,
            label,
            value: Math.round(indItem.value),
            format: indItem.valueFormatType
          });
        } else chartData[chartItemInd].value += Math.round(indItem.value);
      });
    }
  });

  return chartData;
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
