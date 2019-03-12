/* base */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import theme from 'theme/Theme';
import ContextHeader from 'components/chartcontext/common/ContextHeader';

/**
 * todo: Please write a short component description of what this component does
 * @param {Object} customProperty - please describe component property
 */

const ComponentBase = styled.div``;

const Title = styled.h3`
  font-family: ${theme.font.zoomFontFamOne};
  font-size: 40px;
  line-height: 1;
  //outline: 1px solid green;
  margin: 0;
  margin-bottom: 5px;
`;
const Details = styled.span`
  line-height: 1;
  font-size: 14px;
  font-family: ${theme.font.zoomFontFamTwo};
`;

const ContextBody = styled.p`
  font-size: 14px;
  color: black;
  max-width: 550px;
  font-family: ${theme.font.zoomFontFamOne};
`;

const propTypes = {};
const defaultProps = {};

const ContextPreview = props => {
  return (
    <ComponentBase>
      <ContextHeader />
      <ContextBody>
        Integer posuere erat a ante venenatis dapibus posuere velit aliquet.
        Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
        Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.
      </ContextBody>
    </ComponentBase>
  );
};

ContextPreview.propTypes = propTypes;
ContextPreview.defaultProps = defaultProps;

export default ContextPreview;
