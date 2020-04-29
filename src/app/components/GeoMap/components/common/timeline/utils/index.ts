// @ts-nocheck

import * as moment from 'moment';
import { TimelineYearItem } from 'app/components/timeline/common/TimelineYearItem';

const addYears = (date, years = 1) => {
  const result = new Date(date);
  result.setFullYear(result.getFullYear() + years);

  console.log('addyears', result);
  return result;
};

export const dateRange = (start, end, range = []) => {
  if (start > end) return range;
  const next = addYears(start, 1);
  return dateRange(next, end, [...range, start]);
};

export const YEARS = () => {
  const years = [];
  const dateStart = moment();
  const dateEnd = moment().add(50, 'y');
  while (dateEnd.diff(dateStart, 'years') >= 0) {
    years.push(dateStart.format('YYYY'));
    dateStart.add(1, 'year');
  }
  return years;
};
