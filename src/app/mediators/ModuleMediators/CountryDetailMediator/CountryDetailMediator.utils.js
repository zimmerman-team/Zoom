import get from 'lodash/get';
import map from 'lodash/map';
import find from 'lodash/find';
import filter from 'lodash/filter';
import { split } from 'sentence-splitter';

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

export function formatWikiExcerpts(excerpts) {
  let excerptSentences = split(get(excerpts, 'data.query.pages[0].extract', ''));
  excerptSentences = map(filter(excerptSentences, sentence => {
    return sentence.type !== "WhiteSpace";
  }), sentence => {
    return sentence.raw;
  });
  const excerpt0 = excerptSentences.slice(0, 2).join(" ");
  const excerpt1 = excerptSentences.slice(2).join(" ");
  return [excerpt0, excerpt1];
}