/* base */
import React from 'react';
import ModuleContainer from 'modules/common/modulecontainer/ModuleContainer';

/* styles */
import { AboutTitle, Text } from 'modules/about/About.styles';
import {
  ContactSection,
  ParagraphHeader
} from 'modules/CookieModule/CookieModule.style';

/**
 * todo: Please write a short component description of what this component does
 * @param {Object} customProperty - please describe component property
 */

const propTypes = {};
const defaultProps = {};

const CookieModule = props => {
  return (
    <ModuleContainer title="Cookies">
      <AboutTitle data-cy="cookie-heading">Cookie policy</AboutTitle>
      {/*<DescriptionParagraphBold data-cy="cookie-paragraph">*/}
      {/*Op aidsfonds.nl en steun.aidsfonds.nl worden cookies gebruikt door*/}
      {/*Aidsfonds (“wij”). Een cookie is een klein tekstbestand dat op je*/}
      {/*computer wordt opgeslagen wanneer je deze website bezoekt. In deze*/}
      {/*cookie policy kun je lezen welke cookies wij gebruiken en hoe je zelf*/}
      {/*cookies kunt uitschakelen.*/}
      {/*</DescriptionParagraphBold>*/}

      <Text data-cy="cookie-paragraph">
        <p>
          Aidsfonds (”we") uses cookies on the aidsfonds.org website. A cookie
          is a small text file that is placed on your computer when you visit
          this website. This cookies policy text tells you which cookies we use
          and how you can disable them yourself.
        </p>
      </Text>

      <Text data-cy="cookie-paragraph">
        <strong>Which cookies does Aidsfonds use?</strong>
        <p>
          <ParagraphHeader>Functional cookies</ParagraphHeader>
          These are cookies needed for the site to work properly for the
          visitor. They make it possible, for example, to select a language and
          to log in.
        </p>

        <p>
          <ParagraphHeader>Analytical cookies</ParagraphHeader>
          These are cookies that we use to assess the effectiveness of the
          website and to make any necessary changes to it. For example, these
          cookies keep track of which pages are visited most frequently, the
          average length of a visit to a page, and which browsers visitors use
          to surf to our site. For this purpose, we use Matomo (previously known
          as Piwik){' '}
          <a
            href="https://matomo.org/"
            rel="noopener noreferrer"
            target="_blank"
          >
            (https://matomo.org/)
          </a>
          . The information that Piwik collects is stored on our own server and
          is only accessible to or by order from Aidsfonds.
        </p>

        <p>
          <ParagraphHeader>Advertising cookies</ParagraphHeader>
          This website does not use any advertising cookies.
        </p>

        <p>
          <ParagraphHeader>Disabling cookies</ParagraphHeader>
          If Aidsfonds is legally obliged to request your permission before
          placing and reading cookies, then we only do so if you indicate that
          you wish us to do so. You can withdraw your permission at any time by
          removing the cookies via your browser.
        </p>
        <p>
          By adjusting the settings of your browser, you can choose to refuse
          cookies, delete them, or receive a message when a cookie is placed. In
          most browsers, you can find out how to do that by clicking on "help"
          on the menu bar. If you refuse cookies completely, then the website
          may no longer function properly.
        </p>

        <p>
          <ParagraphHeader>Amendments</ParagraphHeader>
          We may amend this cookies policy and we recommend that you consult
          this page from time to time so as to stay aware of how we use cookies.
          This cookies policy was most recently updated on 23 April 2019.
        </p>

        <p>
          <ParagraphHeader>Questions, feedback, and complaints</ParagraphHeader>
          We welcome any remarks or queries that you may have regarding this
          cookies policy. If you have any questions, please call us on +31 (0)20
          626 2669 (working days from 9 a.m. to 5 p.m.). You can also e-mail us
          at{' '}
          <a href="mailto:postmaster@aidsfonds.nl">postmaster@aidsfonds.nl</a>
        </p>
        <p>
          Aidsfonds also has a complaints procedure. Any complaints should be
          submitted to our complaints coordinator:
        </p>
        <ContactSection>
          <div>Martin van Oostrom</div>
          <div>
            <a href="mailto:mvanoostrom@aidsfonds.nl">
              mvanoostrom@aidsfonds.nl
            </a>
          </div>
          <div>+31 (0)20 851 1758</div>
        </ContactSection>
        <p>
          Aidsfonds is a Dutch foundation [stichting]. Our registered address is
          Condensatorweg 54,1014 AX Amsterdam, The Netherlands. We are
          registered with the Chamber of Commerce under number 41207989.
        </p>
      </Text>
    </ModuleContainer>
  );
};

CookieModule.propTypes = propTypes;
CookieModule.defaultProps = defaultProps;

export default CookieModule;
