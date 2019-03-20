/* base */
import React from 'react';
import PropTypes from 'prop-types';
import ReactHtmlParser from 'react-html-parser';
import styled from 'styled-components';
import theme from 'theme/Theme';
import ContextHeader from 'components/chartcontext/common/ContextHeader';
import 'react-quill/dist/quill.snow.css'; // ES

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
  max-width: 550px;
  margin: 0;
`;

const propTypes = {
  desc: PropTypes.string
};
const defaultProps = {
  desc: ''
};

const ContextPreview = props => {
  return (
    <ComponentBase>
      <ContextHeader noBottom />
      <ContextBody>
        <div className="ql-editor">{ReactHtmlParser(props.desc)}</div>
      </ContextBody>
    </ComponentBase>
  );
};

ContextPreview.propTypes = propTypes;
ContextPreview.defaultProps = defaultProps;

export default ContextPreview;
