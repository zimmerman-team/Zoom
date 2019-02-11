/* base */
import React from 'react';
import {
  DescriptionParagraph,
  DescriptionParagraphBold,
} from 'components/sort/Paragraphs';
import {
  AboutTitle,
  ModuleContainer,
  RedLink,
  Text,
} from 'modules/about/About.styles';
import BarChartVertical from 'components/charts/barcharts/vertical/BarChartVertical';
import { IATIDetailBarChartMockData } from '__mocks__/barChartVerticalMock';

const propTypes = {};
const defaultProps = {};

const About = props => {
  return (
    <ModuleContainer>
      <AboutTitle>About zoom</AboutTitle>
      <DescriptionParagraphBold>
        The major aim of ZOOM is to develop and implement an open data platform
        enabling Aids Fonds to conduct data informed decision making and
        strategic dialogue. ZOOM will allow its users to bring together data
        from various sources for analysis and visualisation.
      </DescriptionParagraphBold>
      <Text>
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
      <Text>
        For this, Leiden University and Zimmerman & Zimmerman in close
        cooperation with Aidsfonds have developed and implementated ZOOM in
        order to support Aids Fonds and its partners in realising this ambition.
        In addition, the consortium will support Aids Fonds in the sustainable
        embedding of the platform and data driven working within the
        organisation.
      </Text>
      <DescriptionParagraph>Check the new website</DescriptionParagraph>
      <DescriptionParagraph>
        <RedLink
          target="_blank"
          rel="noopener noreferrer"
          href="https://aidsfonds.nl/"
        >
          https://aidsfonds.nl/
        </RedLink>
      </DescriptionParagraph>
    </ModuleContainer>
  );
};

About.propTypes = propTypes;
About.defaultProps = defaultProps;

export default About;
