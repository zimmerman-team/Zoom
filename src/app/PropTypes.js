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
  })
});

export const x = 0;
