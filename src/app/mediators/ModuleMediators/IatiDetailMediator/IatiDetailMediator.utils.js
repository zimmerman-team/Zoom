import get from 'lodash/get';
import find from 'lodash/find';
import DateTime from 'luxon/src/datetime';

function convertISOToDate(date) {
  return date ? DateTime.fromISO(date).toFormat('dd LLL yyyy') : 'Data not available';
}

export default function formatActivityData(data) {
  return {
    timeline: [
      {
        label: 'Start date planned:',
        info: convertISOToDate(
          get(find(data.activity_dates, d => {
            return d.type.code === '1'; 
          }), 'iso_date', null)
        ),
      },
      {
        label: 'Start date actual:',
        info: convertISOToDate(
          get(find(data.activity_dates, d => {
            return d.type.code === '2'; 
          }), 'iso_date', null)
        ),
      },
      {
        label: 'End date planned:',
        info: convertISOToDate(
          get(find(data.activity_dates, d => {
            return d.type.code === '3'; 
          }), 'iso_date', null)
        ),
      },
      {
        label: 'Start date actual:',
        info: convertISOToDate(
          get(find(data.activity_dates, d => {
            return d.type.code === '4'; 
          }), 'iso_date', null)
        ),
      },
    ],
    title: get(data.title, 'narratives[0].text', '-'),
    detail: [
      {
        label: 'Last project update:',
        info: convertISOToDate(
          get(data, 'last_updated_datetime', null),
        )
      },
      {
        label: 'Status:',
        info: get(data, 'activity_status.name', '-'),
      },
      {
        label: 'Beneficiary country:',
        info: get(data, 'recipient_countries', []).map(rc => {
          return rc.country.name;
        }).join(', '),
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
    budgets: [],
    sectors: {
      name: 'root',
      color: '#5886E8',
      children: data.sectors.map(sector => {
        return {
          name: sector.sector.name,
          color: '#F7F8FA',
          loc: sector.percentage,
        };
      })
    }
  };
}