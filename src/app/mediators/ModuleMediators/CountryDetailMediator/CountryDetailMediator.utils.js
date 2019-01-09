import React from 'react';
import get from 'lodash/get';
import find from 'lodash/find';

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
