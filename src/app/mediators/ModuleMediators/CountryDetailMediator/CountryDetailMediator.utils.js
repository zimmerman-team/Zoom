import React from 'react';
import get from 'lodash/get';
import find from 'lodash/find';
import filter from 'lodash/filter';
import { chartColorThree, chartColorTwo } from 'components/theme/ThemeSheet';

//Formats project data so it would be acceptable for the project list
//component
export function formatProjectData(activities) {
  const projectData = [];

  activities.forEach(activity => {
    const sectors = [];

    activity.sectors.forEach(sector => {
      sectors.push({
        name: get(sector, 'sector.name', 'No sector name'),
      });
    });

    let startDate = find(activity.activity_dates, function(date) {
      return date.type.name === 'Planned start';
    });

    let endDate = find(activity.activity_dates, function(date) {
      return date.type.name === 'Planned End';
    });

    if (!startDate && !endDate) {
      startDate = find(activity.activity_dates, function(date) {
        return date.type.name === 'Actual start';
      });
      endDate = find(activity.activity_dates, function(date) {
        return date.type.name === 'Actual end';
      });
    }

    startDate = get(startDate, 'iso_date', 'No planned start date');

    endDate = get(endDate, 'iso_date', 'No planned end date');

    projectData.push({
      sectors,
      title: get(activity, 'title.narratives[0].text', 'No project title'),
      startDate,
      endDate,
      organisation: get(
        activity,
        'reporting_organisation.narratives[0].text',
        'No reporting organisation title',
      ),
      budget: get(
        activity,
        'aggregations.activity.budget_value',
        'Not Specified',
      ),
    });
  });

  return projectData;
}

// Formats an array with country indicator names
// which then is used to get the global data based on those indicators
// and which is used in formating the joint indicator data
// for the bar charts in country info
export function formatCountryIndNames(countryData) {
  const countryIndNames = [];

  countryData.forEach(item => {
    if (countryIndNames.indexOf(item.indicatorName) === -1) {
      countryIndNames.push(item.indicatorName);
    }
  });
  return countryIndNames;
}

// This basically formats the data for the bar charts shown
// in country info
export function formatCountryInfoIndicators(
  countryData,
  globalData,
  indicatorNames,
  countryName,
) {
  const barChartData = [];

  indicatorNames.forEach((name, index) => {
    if (index < 3) {
      const countryDataPoints = filter(countryData, ['indicatorName', name]);
      const globalDataPoints = filter(globalData, ['indicatorName', name]);

      let countryIndValue = 0;
      countryDataPoints.forEach(point => {
        countryIndValue += point.value;
      });

      let globalIndValue = 0;
      globalDataPoints.forEach(point => {
        globalIndValue += point.value;
      });

      barChartData.push({
        indicator: name,
        [countryName]: countryIndValue,
        CountryColor: chartColorTwo,
        Global: globalIndValue,
        GlobalColor: chartColorThree,
      });
    }
  });

  return barChartData;
}
