/* base */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import useCookie from '@devhammed/use-cookie';

import {
  ComponentBase,
  CookieButton,
  CookieInfoLink,
  CookieMessage,
  Spacer
} from 'components/CookieNotice/CookieNotice.style';
import ErrorBoundaryFallback from 'components/ErrorBoundaryFallback/ErrorBoundaryFallback';
import { ErrorBoundary } from 'react-error-boundary';

const propTypes = {
  cookieText: PropTypes.string,
  cookieButtonText: PropTypes.string,
  cookieLinkText: PropTypes.string
};
const defaultProps = {
  cookieText:
    'aidsfonds.org uses cookies to offer the best website experience possible and to anonymously analyze website behaviour. More information. ',
  cookieButtonText: 'accepteren',
  cookieLinkText: 'More information'
};

function CookieNotice(props) {
  /* this hook is for setting the cookie */
  const [cookie, setCookie] = useCookie('cookieNotice', 'true');
  /* this hook is for visually hiding the component */
  const [visible, setVisibility] = useState(cookie);
  return (
    /* if visible is false, hide */
    visible &&
    /* if cookie is false, also hide */
    (cookie && (
      <ErrorBoundary FallbackComponent={ErrorBoundaryFallback}>
        <ComponentBase>
          <CookieMessage>
            {props.cookieText}
            <CookieInfoLink to="/cookies">
              {props.cookieLinkText}
            </CookieInfoLink>
          </CookieMessage>
          <Spacer />
          <CookieButton
            data-cy="cookie-notice"
            onClick={() => {
              setCookie('false');
              setVisibility(!visible);
            }}
          >
            {props.cookieButtonText}
          </CookieButton>
        </ComponentBase>
      </ErrorBoundary>
    ))
  );
}

CookieNotice.propTypes = propTypes;
CookieNotice.defaultProps = defaultProps;

export default CookieNotice;
