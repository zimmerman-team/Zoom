/* base */
import React from 'react';
import {
  DescriptionParagraph,
  DescriptionParagraphBold
} from 'components/sort/Paragraphs';
import { AboutTitle, RedLink, Text } from 'modules/about/About.styles';
import BarChartVertical from 'components/charts/barcharts/vertical/BarChartVertical';
import { IATIDetailBarChartMockData } from '__mocks__/barChartVerticalMock';
import ModuleContainer from 'modules/common/modulecontainer/ModuleContainer';

const propTypes = {};
const defaultProps = {};

const About = () => {
  return (
    <ModuleContainer title="About zoom">
      <AboutTitle data-cy="about-heading">About zoom</AboutTitle>
      <DescriptionParagraphBold data-cy="about-paragraph">
        The major aim of ZOOM is to develop and implement an open data platform
        enabling Aids Fonds to conduct data informed decision making and
        strategic dialogue. ZOOM will allow its users to bring together data
        from various sources for analysis and visualisation.
      </DescriptionParagraphBold>
      <Text data-cy="about-paragraph">
        The increased availability of data provides new opportunities to support
        sustainable development. Through combining and analysing different data
        sources new insights and knowledge could potentially be gained. In 2016,
        Aids Fonds published project information according to the IATI standard.
        Moreover, it has recently commenced and continued several international
        programmes. Throughout these programmes, it has set out to explore how
        to make use of the availability of data to improve its information
        position in combating the Aids epidemic.
      </Text>
      <BarChartVertical
        data={IATIDetailBarChartMockData}
        enableLabels
        disabledLegend
        keys={['Budget', 'Spent']}
      />
      <Text data-cy="about-paragraph">
        For this, Leiden University and Zimmerman & Zimmerman in close
        cooperation with Aidsfonds have developed and implementated ZOOM in
        order to support Aids Fonds and its partners in realising this ambition.
        In addition, the consortium will support Aids Fonds in the sustainable
        embedding of the platform and data driven working within the
        organisation.
      </Text>
      <DescriptionParagraph>
        You can find the data guidelines for Zoom in this document
      </DescriptionParagraph>
      <DescriptionParagraph>
        <RedLink
          data-cy="about-link-to-web"
          target="_blank"
          rel="noopener noreferrer"
          href={`${
            process.env.REACT_APP_GRAPHQL_HOST
          }/static/Data guidelines_final.pdf`}
        >
          Data guidelines_final.pdf
        </RedLink>
      </DescriptionParagraph>
    </ModuleContainer>
  );
};

About.propTypes = propTypes;
About.defaultProps = defaultProps;

export default About;
