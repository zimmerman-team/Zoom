import PropTypes from 'prop-types';

export const WikiAPIExcerptPropType = PropTypes.shape({
  values: PropTypes.shape({
    origin: PropTypes.string,
    action: PropTypes.string,
    prop: PropTypes.string,
    exsentences: PropTypes.number,
    exintro: PropTypes.number,
    explaintext: PropTypes.number,
    exsectionformat: PropTypes.string,
    formatversion: PropTypes.number,
    titles: PropTypes.string,
    format: PropTypes.string,
  }),
  request: PropTypes.bool,
  success: PropTypes.bool,
  data: PropTypes.shape({
    batchcomplete: PropTypes.bool,
    query: PropTypes.shape({
      pages: PropTypes.arrayOf(PropTypes.shape({
        pageid: PropTypes.number,
        ns: PropTypes.number,
        title: PropTypes.string,
        extract: PropTypes.string
      }))
    })
  }),
  error: PropTypes.shape({
    status: PropTypes.string,
    statusText: PropTypes.string,
    result: PropTypes.object,
  })
});

export const countryActivitiesPropType = PropTypes.shape({
  values: PropTypes.shape({
    recipient_country: PropTypes.string,
    page: PropTypes.number,
    page_size: PropTypes.number,
    fields: PropTypes.string,
  }),
  request: PropTypes.bool,
  success: PropTypes.bool,
  data: PropTypes.shape({
    count: PropTypes.number,
    next: PropTypes.string,
    previous: PropTypes.string,
    results: PropTypes.array,
  }),
  error: PropTypes.shape({
    status: PropTypes.string,
    statusText: PropTypes.string,
    result: PropTypes.object,
  })
});

export const BarChartDataPropTypes = PropTypes.arrayOf(
  PropTypes.shape({
    Global: PropTypes.number,
    GlobalColor: PropTypes.string,
    Kenya: PropTypes.number,
    KenyaColor: PropTypes.string,
    country: PropTypes.string,
  })
);

export const LineChartDataPropTypes = PropTypes.arrayOf(
  PropTypes.shape({
    color: PropTypes.string,
    data: PropTypes.PropTypes.arrayOf(PropTypes.shape({
      x: PropTypes.string,
      y: PropTypes.number,
    })),
    id: PropTypes.string,
  })
);

export const PieChartDataPropTypes = PropTypes.arrayOf(
  PropTypes.shape({
    color: PropTypes.string,
    id: PropTypes.string,
    label: PropTypes.string,
    value: PropTypes.number,
  })
);

export const TreeMapDataPropTypes = PropTypes.shape({
  children: PropTypes.arrayOf(PropTypes.shape({
    color: PropTypes.string,
    loc: PropTypes.number,
    name: PropTypes.string
  })),
  color: PropTypes.string,
  name: PropTypes.string,
});

export const TreeMapHtmlNodePropTypes = PropTypes.shape({
  color: PropTypes.string,
  data: PropTypes.object,
  depth: PropTypes.number,
  height: PropTypes.number,
  id: PropTypes.string,
  label: PropTypes.string,
  nodeHeight: PropTypes.number,
  parent: PropTypes.object,
  path: PropTypes.string,
  width: PropTypes.number,
  value: PropTypes.number,
  x: PropTypes.number,
  x0: PropTypes.number,
  x1: PropTypes.number,
  y: PropTypes.number,
  y0: PropTypes.number,
  y1: PropTypes.number,
});

export const TreeMapHtmlNodeStylePropTypes = PropTypes.shape({
  borderColor: PropTypes.string,
  borderWidth: PropTypes.number,
  color: PropTypes.string,
  height: PropTypes.number,
  labelTextColor: PropTypes.string,
  orientLabel: PropTypes.bool,
  width: PropTypes.number,
  x: PropTypes.number,
  y: PropTypes.number,
});

export const ProjectListDataPropTypes = PropTypes.arrayOf(PropTypes.shape({
  budget: PropTypes.number,
  endDat: PropTypes.string,
  organisation: PropTypes.string,
  sectors: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
  })),
  startDate: PropTypes.string,
  title: PropTypes.string,
}));

export const CountryDetailModuleExcerptPropTypes = PropTypes.arrayOf(
  PropTypes.string
);
