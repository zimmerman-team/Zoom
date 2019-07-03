/* base */
import React from 'react';
import { DescriptionParagraph } from 'components/sort/Paragraphs';
import {
  AboutTitle,
  RedLink,
  Text,
  PaddedParagraph
} from 'modules/about/About.styles';
import ModuleContainer from 'modules/common/modulecontainer/ModuleContainer';

const propTypes = {};
const defaultProps = {};

const About = () => {
  return (
    <ModuleContainer title="About zoom">
      <AboutTitle data-cy="about-heading">About zoom</AboutTitle>
      <PaddedParagraph data-cy="about-paragraph">
        Zoom makes data easy to use and understand. We use data visualizations
        to give the numbers meaning
      </PaddedParagraph>
      <Text data-cy="about-paragraph">
        Zoom is an open data platform that enables the collection and analysis
        of relevant information and the visualisation of the outcomes. Users of
        the platform remain owner of their data. Zoom does not contain any
        personal identifiable information.
      </Text>
      <Text data-cy="about-paragraph">
        The increased availability of data provides new opportunities to support
        sustainable development. In 2016, Aidsfonds started to explore how to
        make use of the availability of data to improve its information position
        in combating the Aids epidemic. In close cooperation with Leiden
        University and Zimmerman & Zimmerman, Zoom is developed in order to
        support Aidsfonds and its partners in realising this ambition.
      </Text>
      <Text data-cy="about-paragraph">
        Data guidelines are developed to support a correct interpretation of
        data analyses and encourage responsible data use. In addition, the
        consortium will support Aidsfonds in the sustainable embedding of the
        platform and data informed working within the organisation.
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
