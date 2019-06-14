/* base */
import React from 'react';
import ModuleContainer from 'modules/common/modulecontainer/ModuleContainer';
import { AboutTitle, Text } from 'modules/about/About.styles';
import { DescriptionParagraphBold } from 'components/sort/Paragraphs';

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
          <div>
            <u>Functional cookies</u>
          </div>
          These are cookies needed for the site to work properly for the
          visitor. They make it possible, for example, to select a language and
          to log in.
        </p>

        <p>
          <div>
            <u>Analytical cookies</u>
          </div>
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
          <div>
            <u>Advertising cookies</u>
          </div>
          This website does not use any advertising cookies.
        </p>

        <p>
          <div>
            <u>Disabling cookies</u>
          </div>
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
          <div>
            <u>Amendments</u>
          </div>
          We may amend this cookies policy and we recommend that you consult
          this page from time to time so as to stay aware of how we use cookies.
          This cookies policy was most recently updated on 23 April 2019.
        </p>

        <p>
          <div>
            <u>Questions, feedback, and complaints</u>
          </div>
          We welcome any remarks or queries that you may have regarding this
          cookies policy. If you have any questions, please call us on +31 (0)20
          626 2669 (working days from 9 a.m. to 5 p.m.). You can also e-mail us
          at{' '}
          <a href="mailto:postmaster@aidsfonds.nl">postmaster@aidsfonds.nl</a>
        </p>
        <p>
          Aidsfonds also has a complaints procedure. Any complaints should be
          submitted to our complaints coordinator:
          <div>Martin van Oostrom</div>
          <div>
            <a href="mailto:mvanoostrom@aidsfonds.nl">
              mvanoostrom@aidsfonds.nl
            </a>
          </div>
          <div>+31 (0)20 851 1758</div>
        </p>
        <p>
          Aidsfonds is a Dutch foundation [stichting]. Our registered address is
          Keizersgracht 392, NL-1016 GB Amsterdam, The Netherlands. We are
          registered with the Chamber of Commerce under number 41207989.
        </p>
      </Text>

      <AboutTitle data-cy="privacy-heading">Privacy Statement</AboutTitle>
      <Text data-cy="privacy-paragraph">
        <p>
          Aidsfonds (“we”) finds it very important to protect your personal
          data. We process your data with the greatest possible care and only in
          accordance with the privacy legislation. This privacy statement tells
          you how we process your personal data.
        </p>
      </Text>
      <Text data-cy="privacy-paragraph">
        <p>
          <div>
            <u>Personal data</u>
          </div>
          The following personal data may be processed when you use our
          websites:
          <ul>
            <li>
              Your e-mail address, but only if you have provided it yourself.
            </li>
          </ul>
        </p>
        <p>
          We will only use the above personal data – i.e. your e-mail address –
          to inform you about our work.
        </p>

        <p>
          <div>
            <u>Legal basis</u>
          </div>
          We only process your personal data if there is a legal basis for doing
          so. The relevant legal bases are:
          <ul>
            <li>
              Processing is necessary to promote our legitimate interests. Our
              legitimate interests include being able to achieve the above
              purpose(s);
            </li>
            <li>
              Processing is necessary in order to perform an agreement to which
              you are a party.
            </li>
          </ul>
        </p>

        <p>
          <div>
            <u>Recipients</u>
          </div>
          We may share your personal data with the following parties:
          <ul>
            <li>
              Internal: our employees, but only if they require the data in
              order to carry out their duties;
            </li>
            <li>
              Third parties: data processors, such as parties that host and
              support our websites and ensure that they function properly.
            </li>
          </ul>
        </p>
        <p>
          We do not pass on your personal data for commercial purposes and we do
          not transfer it to countries outside the European Economic Area (EEA).
          Third parties that process your personal data on our behalf always do
          so exclusively on our instructions. They are obliged to keep your
          personal data confidential and to delete it after use.
        </p>

        <p>
          <div>
            <u>Security</u>
          </div>
          We implement appropriate technical and organisational measures to
          protect your personal data. We conclude agreements with service
          providers that process personal data on our behalf in which we oblige
          them to also implement these measures.
        </p>

        <p>
          <div>
            <u>Retention period</u>
          </div>
          We do not retain your personal data any longer than necessary for the
          purpose of processing.
        </p>

        <p>
          <div>
            <u>Right of access, correction, and objection</u>
          </div>
          You can ask to access your data at any time or have it corrected. If
          you object to the processing of your personal data or if you no longer
          wish to receive information from Aidsfonds, please contact us using
          the contact details given below.
        </p>
        <p>
          If you are not satisfied with the way we process your personal data,
          you can submit a complaint to our complaints coordinator (see below)
          and/or to the Dutch Data Protection Authority [Autoriteit
          Persoonsgegevens].
        </p>

        <p>
          <div>
            <u>Cookies</u>
          </div>
          Our websites use cookies to collect data about your visit to our
          website. A cookie is a small text file that is placed on your computer
          when you visit this website.
        </p>
        <p>
          You can read more about the cookies that we use and how you can
          disable them yourself in our cookies policy.
        </p>

        <p>
          <div>
            <u>Amendments</u>
          </div>
          We may amend this privacy policy and we recommend that you consult
          this page from time to time so as to stay aware of how we process your
          personal data. This privacy statement was most recently updated on 23
          April 2019.
        </p>

        <p>
          <div>
            <u>Questions, feedback, and complaints</u>
          </div>
          We welcome any remarks or queries that you may have regarding this
          privacy statement. You can phone us at +31(0)20 626 2669 or e-mail us
          at{' '}
          <a href="mailto:postmaster@aidsfonds.nl">postmaster@aidsfonds.nl</a>
        </p>
        <p>
          We also have a complaints procedure. Any complaints should be
          submitted to our complaints coordinator:
        </p>
        <p>
          <div>Martin van Oostrom</div>
          <div>
            <a href="mailto:mvanoostrom@aidsfonds.nl">
              mvanoostrom@aidsfonds.nl
            </a>
          </div>
          <div>+31 (0)20 851 1758</div>
        </p>
        <p>
          Aidsfonds is a trademark of Stichting Aidsfonds – Soa Aids Nederland.
          Our registered address is Keizersgracht 392, NL-1016 GB Amsterdam, The
          Netherlands. We are registered with the Chamber of Commerce under
          number 41207989.
        </p>
      </Text>
    </ModuleContainer>
  );
};

CookieModule.propTypes = propTypes;
CookieModule.defaultProps = defaultProps;

export default CookieModule;
