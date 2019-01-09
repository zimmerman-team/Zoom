/* base */
import React from 'react';
import connect from 'react-redux/es/connect/connect';
import get from 'lodash/get';
import map from 'lodash/map';
import filter from 'lodash/filter';
import { split } from 'sentence-splitter';
import CountryDetailModule from 'modules/countrydetail/CountryDetailModule';
import * as actions from 'services/actions/index';

class CountryDetailMediator extends React.Component {
  componentDidMount() {
    if (this.props.dispatch) {
      this.props.dispatch(actions.countryExcerptRequest({
        origin: '*',
        action: 'query',
        prop: 'extracts',
        exsentences: 5,
        exlimit: 1,
        exintro: 1,
        explaintext: 1,
        exsectionformat: 'raw',
        formatversion: 2,
        titles: 'Kenya'
      }));
    }
  }

  render() {
    let excerptSentences = split(get(this.props, 'excerpts.data.query.pages[0].extract', ''));
    excerptSentences = map(filter(excerptSentences, sentence => {
      return sentence.type !== "WhiteSpace";
    }), sentence => {
      return sentence.raw;
    });
    const excerpt0 = excerptSentences.slice(0, 2).join(" ");
    const excerpt1 = excerptSentences.slice(2).join(" ");
    return <CountryDetailModule excerpts={[excerpt0, excerpt1]} />;
  }
}

const mapStateToProps = state => {
  return {
    excerpts: state.countryExcerpt,
  };
};

export default connect(mapStateToProps)(CountryDetailMediator);
