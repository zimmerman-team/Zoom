import React from 'react';

/* components */
import ModuleContainer from 'app/modules/common/modulecontainer/ModuleContainer';
import { Link } from 'react-router-dom';

/* styles */
import { AboutTitle, Text } from 'app/modules/about/About.styles';
import {
  ContactSection,
  ParagraphHeader
} from 'app/modules/CookieModule/CookieModule.style';

export const PrivacyModule = () => {
  return (
    <ModuleContainer title="Privacy Statement">
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
        <ContactSection>
          <ParagraphHeader>Personal data</ParagraphHeader>
          The following personal data may be processed when you use our
          websites:
          <ul>
            <li>
              Your e-mail address, but only if you have provided it yourself.
            </li>
            <li>username</li>
            <li>first name</li>
            <li>last name</li>
          </ul>
        </ContactSection>
        <p>
          We will only use the above personal data – i.e. your e-mail address –
          to inform you about our work.
        </p>

        <ContactSection>
          <ParagraphHeader>Legal basis</ParagraphHeader>
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
        </ContactSection>

        <ContactSection>
          <ParagraphHeader>Recipients</ParagraphHeader>
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
        </ContactSection>
        <p>
          We do not pass on your personal data for commercial purposes and we do
          not transfer it to countries outside the European Economic Area (EEA).
          Third parties that process your personal data on our behalf always do
          so exclusively on our instructions. They are obliged to keep your
          personal data confidential and to delete it after use.
        </p>

        <p>
          <ParagraphHeader>Security</ParagraphHeader>
          We implement appropriate technical and organisational measures to
          protect your personal data. We conclude agreements with service
          providers that process personal data on our behalf in which we oblige
          them to also implement these measures.
        </p>

        <p>
          <ParagraphHeader>Retention period</ParagraphHeader>
          We do not retain your personal data any longer than necessary for the
          purpose of processing.
        </p>

        <p>
          <ParagraphHeader>
            Right of access, correction, and objection
          </ParagraphHeader>
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
          <ParagraphHeader>Cookies</ParagraphHeader>
          Our websites use cookies to collect data about your visit to our
          website. A cookie is a small text file that is placed on your computer
          when you visit this website.
        </p>
        <p>
          You can read more about the cookies that we use and how you can
          disable them yourself in our <Link to="/cookies">cookies policy</Link>
          .
        </p>

        <p>
          <ParagraphHeader>Amendments</ParagraphHeader>
          We may amend this privacy policy and we recommend that you consult
          this page from time to time so as to stay aware of how we process your
          personal data. This privacy statement was most recently updated on 23
          April 2019.
        </p>

        <p>
          <ParagraphHeader>Questions, feedback, and complaints</ParagraphHeader>
          We welcome any remarks or queries that you may have regarding this
          privacy statement. You can phone us at +31(0)20 626 2669 or e-mail us
          at{' '}
          <a href="mailto:postmaster@aidsfonds.nl">postmaster@aidsfonds.nl</a>
        </p>
        <p>
          We also have a complaints procedure. Any complaints should be
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
          Aidsfonds is a trademark of Stichting Aidsfonds – Soa Aids Nederland.
          Our registered address is Condensatorweg 54,1014 AX Amsterdam, The
          Netherlands. We are registered with the Chamber of Commerce under
          number 41207989.
        </p>
      </Text>
    </ModuleContainer>
  );
};
