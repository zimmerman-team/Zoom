/* base */
import React from 'react';
import {
  DescriptionParagraph,
  DescriptionParagraphBoldIt
} from 'components/sort/Paragraphs';
import {
  AboutTitle,
  RedLink,
  Text,
  Section,
  AboutLogo,
  LogoContainer
} from 'modules/about/About.styles';
import ModuleContainer from 'modules/common/modulecontainer/ModuleContainer';

/* images */
import aidsfondsLogo from 'assets/images/logo-aidsfonds.jpg';
import leidenLogo from 'assets/images/Logo_LUC_The_Hague.jpg';
import zzLogo from 'assets/images/ZZ logo.png';

const propTypes = {};
const defaultProps = {};

const About = () => {
  return (
    <ModuleContainer title="About zoom">
      <AboutTitle data-cy="about-heading">About zoom</AboutTitle>
      <Section>
        <DescriptionParagraphBoldIt data-cy="about-paragraph">
          Zoom makes data easy to use and understand. We use data visualizations
          to give the numbers meaning
        </DescriptionParagraphBoldIt>
      </Section>
      <Section>
        <Text data-cy="about-paragraph">
          Zoom is an open data platform that enables the collection and analysis
          of relevant information and the visualisation of the outcomes. Users
          of the platform remain owner of their data. Zoom does not contain any
          personal identifiable information.
        </Text>
      </Section>
      <Section>
        <Text data-cy="about-paragraph">
          The increased availability of data provides new opportunities to
          support sustainable development. In 2016, Aidsfonds started to explore
          how to make use of the availability of data to improve its information
          position in combating the Aids epidemic. In close cooperation with
          Leiden University and Zimmerman & Zimmerman, Zoom is developed in
          order to support Aidsfonds and its partners in realising this
          ambition.
        </Text>
      </Section>
      <Section>
        <Text data-cy="about-paragraph">
          Data guidelines are developed to support a correct interpretation of
          data analyses and encourage responsible data use. In addition, the
          consortium will support Aidsfonds in the sustainable embedding of the
          platform and data informed working within the organisation.
        </Text>
      </Section>
      <Section>
        <DescriptionParagraph>
          You can find the data guidelines for Zoom in this document
        </DescriptionParagraph>
        <DescriptionParagraph>
          <RedLink
            data-cy="about-link-to-guidelines"
            target="_blank"
            rel="noopener noreferrer"
            href={`${process.env.REACT_APP_GRAPHQL_HOST}/static/Data guidelines_final.pdf`}
          >
            Data guidelines_final.pdf
          </RedLink>
        </DescriptionParagraph>
      </Section>
      <Section>
        <DescriptionParagraph>
          You can find geolocations of ZOOM here:
        </DescriptionParagraph>
        <DescriptionParagraph>
          <RedLink
            data-cy="about-link-to-geolocations"
            target="_blank"
            rel="noopener noreferrer"
            href="https://docs.google.com/spreadsheets/d/1C6PEW5sex5JjPcxZ6YHUEYcX-XvpfEL5r9VJ1xhd6i4/edit?usp=sharing"
          >
            Geo locations for ZOOM
          </RedLink>
        </DescriptionParagraph>
      </Section>
      <DescriptionParagraph>
        You can find a manual of data mapping here:
      </DescriptionParagraph>
      <DescriptionParagraph>
        <RedLink
          data-cy="about-link-to-guide"
          target="_blank"
          rel="noopener noreferrer"
          href="https://docs.google.com/document/d/1Kr6eFIwPQQVXsD_LQoBWyDi4dtT-SmNbp4ou7p_TOZA/edit?usp=sharing"
        >
          Data mapping manual
        </RedLink>
      </DescriptionParagraph>
      <LogoContainer>
        <AboutLogo alt="aidsfonds" src={aidsfondsLogo} height="112px" />
        <AboutLogo alt="leiden" src={leidenLogo} height="73px" />
        <AboutLogo alt="zz" src={zzLogo} height="54px" />
      </LogoContainer>
    </ModuleContainer>
  );
};

About.propTypes = propTypes;
About.defaultProps = defaultProps;

export default About;
