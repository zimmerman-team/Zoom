import get from 'lodash/get';
import find from 'lodash/find';
import sumBy from 'lodash/sumBy';
import DateTime from 'luxon/src/datetime';
import { chartColorTwo, chartColorThree } from 'components/theme/ThemeSheet';

function convertISOToDate(date) {
  return date
    ? DateTime.fromISO(date).toFormat('dd LLL yyyy')
    : 'Data not available';
}

export default function formatActivityData(data) {
  if (!data) return undefined;
  return {
    timeline: [
      {
        id: 1,
        label: 'Start date planned:',
        info: convertISOToDate(
          get(
            find(data.activity_dates, d => {
              return d.type.code === '1';
            }),
            'iso_date',
            null,
          ),
        ),
      },
      {
        id: 2,
        label: 'Start date actual:',
        info: convertISOToDate(
          get(
            find(data.activity_dates, d => {
              return d.type.code === '2';
            }),
            'iso_date',
            null,
          ),
        ),
      },
      {
        id: 3,
        label: 'End date planned:',
        info: convertISOToDate(
          get(
            find(data.activity_dates, d => {
              return d.type.code === '3';
            }),
            'iso_date',
            null,
          ),
        ),
      },
      {
        id: 4,
        label: 'End date actual:',
        info: convertISOToDate(
          get(
            find(data.activity_dates, d => {
              return d.type.code === '4';
            }),
            'iso_date',
            null,
          ),
        ),
      },
    ],
    title: get(data.title, 'narratives[0].text', '-'),
    detail: [
      {
        label: 'Last project update:',
        info: convertISOToDate(get(data, 'last_updated_datetime', null)),
      },
      {
        label: 'Status:',
        info: get(data, 'activity_status.name', '-'),
      },
      {
        label: 'Beneficiary country:',
        info: `
          ${get(data, 'recipient_countries[0].country.name', '')}
          ${' '}
          ${
            get(data, 'recipient_countries.length', 0) > 1
              ? `${data.recipient_countries.length - 1}+ more`
              : ''
          }
        `,
        moreData:
          get(data, 'recipient_countries.length', 0) > 1
            ? get(data, 'recipient_countries', []).map(country => {
                return country.country.name;
              })
            : undefined,
      },
      {
        label: 'Data source:',
        info: 'IATI Registry',
      },
      {
        label: 'Reported by:',
        info: 'Aidsfonds',
      },
      {
        label: 'IATI identifier:',
        info: get(data, 'iati_identifier', '-'),
      },
    ],
    budgets: data.budgets.map(b => {
      return {
        year: b.period_end.substr(0, 4),
        Budget: b.value.value,
        BudgetColor: chartColorTwo,
        Spent: data.aggregations.activity_children.expenditure_value,
        SpentColor: chartColorThree,
      };
    }),
    totalBudget: sumBy(data.budgets, 'value.value'),
    sectors: {
      name: 'root',
      color: '#5886E8',
      children: data.sectors.map(sector => {
        return {
          name: sector.sector.name,
          color: '#F7F8FA',
          loc: sector.percentage,
        };
      }),
    },
  };
}
