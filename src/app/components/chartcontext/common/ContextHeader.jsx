/* base */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import theme from 'theme/Theme';

/**
 * todo: Please write a short component description of what this component does
 * @param {Object} customProperty - please describe component property
 */

const ComponentBase = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 20px;
  padding-bottom: 20px;
`;

const Title = styled.h3`
  color: ${theme.color.zoomBlack};
  letter-spacing: 0;
  font-family: ${theme.font.zoomFontFamOne};
  font-size: 32px;
  font-weight: 400;
  line-height: 1;
  margin: 0;
  margin-bottom: 5px;
`;
const Details = styled.span`
  line-height: 1;
  font-size: 11px;
  color: ${theme.color.zoomBlack};
  font-family: ${theme.font.zoomFontFamTwo};
`;

const propTypes = {
  title: PropTypes.string,
  author: PropTypes.string,
  authorName: PropTypes.string,
  publishDate: PropTypes.string,
  createdDate: PropTypes.string,
  noBottom: PropTypes.bool
};
const defaultProps = {
  title: 'Untitled chart 01',
  author: 'Jane Doe',
  publishDate: 'January 12th 2019',
  createdDate: 'January 12th 2019'
};
const ContextHeader = props => {
  return (
    <ComponentBase style={{ paddingBottom: props.noBottom ? '0' : '' }}>
      <Title>{props.title}</Title>
      <Details>
        By {props.authorName} {props.createdDate && `| ${props.createdDate}`}
      </Details>
    </ComponentBase>
  );
};

ContextHeader.propTypes = propTypes;
ContextHeader.defaultProps = defaultProps;

export default ContextHeader;
