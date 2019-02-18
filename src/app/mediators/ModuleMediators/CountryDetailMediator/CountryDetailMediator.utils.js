import get from 'lodash/get';
import map from 'lodash/map';
import find from 'lodash/find';
import findIndex from 'lodash/findIndex';
import sortBy from 'lodash/sortBy';
import filter from 'lodash/filter';
import theme from 'theme/Theme';
import { split } from 'sentence-splitter';

/*
  Formats project data so it would be acceptable
  for the project list component
*/
export function formatProjectData(activities) {
  const projectData = [];

  activities.forEach(activity => {
    const sectors = [];

    activity.sectors.forEach(sector => {
      sectors.push({
        name: get(sector, 'sector.name', 'No sector name')
      });
    });

    let startDate = find(activity.activity_dates, date => {
      return date.type.name === 'Planned start';
    });

    let endDate = find(activity.activity_dates, date => {
      return date.type.name === 'Planned End';
    });

    if (!startDate && !endDate) {
      startDate = find(activity.activity_dates, date => {
        return date.type.name === 'Actual start';
      });
      endDate = find(activity.activity_dates, date => {
        return date.type.name === 'Actual end';
      });
    }

    startDate = get(startDate, 'iso_date', 'No planned start date');

    endDate = get(endDate, 'iso_date', 'No planned end date');

    projectData.push({
      id: activity.id,
      sectors,
      title: get(activity, 'title.narratives[0].text', 'No project title'),
      startDate,
      endDate,
      organisation: get(
        activity,
        'reporting_organisation.narratives[0].text',
        'No reporting organisation title'
      ),
      budget: `${get(
        activity,
        'aggregations.activity.budget_currency',
        ''
      )} ${get(
        activity,
        'aggregations.activity.budget_value',
        'Not Specified'
      )}`
    });
  });

  return projectData;
}

/*
  Calculates the total count of projects retrieved
  and total commitment of them
*/
export function getProjectCountNCommitment(activities) {
  let commitment = 0;
  activities.forEach(activity => {
    commitment += get(activity, 'aggregations.activity.commitment_value', 0);
  });
  return {
    count: activities.length,
    commitment: `${get(
      activities,
      '[0].aggregations.activity.commitment_currency',
      ''
    )} ${commitment}`
  };
}

/*
  Splits wikipedia country information text into 2 excerpts/paragraphs
*/
export function formatWikiExcerpts(excerpts) {
  let excerptSentences = split(
    get(excerpts, 'data.query.pages[0].extract', '')
  );
  excerptSentences = map(
    filter(excerptSentences, sentence => {
      return sentence.type !== 'WhiteSpace';
    }),
    sentence => {
      return sentence.raw;
    }
  );
  const excerpt0 = excerptSentences.slice(0, 2).join(' ');
  const excerpt1 = excerptSentences.slice(2).join(' ');
  return [excerpt0, excerpt1];
}

// This basically formats the data for the bar charts shown
// in country info
export function formatBarChartInfoIndicators(
  countryData,
  globalData,
  indicatorNames,
  countryName
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
        CountryColor: theme.color.chartColorTwo
        // Global: globalIndValue,
        // GlobalColor: theme.color.chartColorThree
      });
    }
  });

  return barChartData;
}

// formats linechart data from indicators
export function formatLineChartData(indicatorData) {
  const lineChartData = [];
  const colorArray = [
    'hsl(172, 70%, 50%)',
    'hsl(91, 70%, 50%)',
    'hsl(313, 70%, 50%)',
    'hsl(221, 70%, 50%)',
    'hsl(48, 70%, 50%)'
  ];

  let colorInd = 0;
  indicatorData.forEach(item => {
    const chartItemInd = findIndex(lineChartData, ['id', item.indicatorName]);
    if (chartItemInd !== -1) {
      const itemData = lineChartData[chartItemInd].data;
      itemData.push({
        x: item.date,
        y: item.value
      });
      lineChartData[chartItemInd].data = itemData;
    } else {
      lineChartData.push({
        id: item.indicatorName,
        color:
          colorInd >= colorArray.length
            ? colorArray[colorArray.length - 1]
            : colorArray[colorInd],
        data: [
          {
            x: item.date,
            y: item.value
          }
        ]
      });
      colorInd += 1;
    }
  });

  // so the item with the biggest data value needs to be first
  // as that is how line chart that we use works
  // cause if the item with the biggest value will not be the first one
  // most of its data will not be shown
  let max = 0;
  let maxInd = 0;
  lineChartData.forEach((item, index) => {
    if (item.data.length > max) {
      max = item.data.length;
      maxInd = index;
    }
  });

  if (lineChartData.length > 0) {
    const bigLineitem = lineChartData[maxInd];
    lineChartData.splice(maxInd, 1);
    lineChartData.unshift(bigLineitem);
  }

  return lineChartData;
}

export function titleCase(str) {
  const splitStr = str.toLowerCase().split(' ');
  for (let i = 0; i < splitStr.length; i++) {
    splitStr[i] =
      splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
  }
  return splitStr.join(' ');
}
