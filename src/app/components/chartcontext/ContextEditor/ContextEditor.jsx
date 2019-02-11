/* base */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import theme from 'theme/Theme';
import TextEditor from 'components/editors/TextEditor/TextEditor';

/**
 * todo: Please write a short component description of what this component does
 * @param {Object} customProperty - please describe component property
 */

const ComponentBase = styled.div`
  width: 1024px;
  height: 798px;
  outline: 1px solid red;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

/*todo: create re-usable Box component*/
const Box = styled.div`
  display: flex;
`;

const ContextHeader = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 20px;
  padding-bottom: 20px;
`;
const ContextBody = styled.section``;
const ContextFooter = styled.section``;

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

const propTypes = {
  title: PropTypes.string,
  author: PropTypes.string,
  publishDate: PropTypes.string,
};
const defaultProps = {
  title: 'Untitled chart 01',
  author: 'Jane Doe',
  publishDate: 'January 12th 2019',
};

const ContextEditor = props => {
  return (
    <ComponentBase>
      <ContextHeader>
        <Title>{props.title}</Title>
        {/*TODO: interpret iso date with luxon*/}
        <Details>Lorem ipsum dolor simet | Published on 1999</Details>
      </ContextHeader>
      <ContextBody>
        <TextEditor />
      </ContextBody>
    </ComponentBase>
  );
};

ContextEditor.propTypes = propTypes;
ContextEditor.defaultProps = defaultProps;

export default ContextEditor;
