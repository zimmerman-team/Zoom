/* base */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import theme from 'theme/Theme';
import TextEditor from 'components/editors/TextEditor/TextEditor';
import ContextHeader from 'components/chartcontext/common/ContextHeader';

/**
 * todo: Please write a short component description of what this component does
 * @param {Object} customProperty - please describe component property
 */

const ComponentBase = styled.div`
  width: 1024px;
  height: 798px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
`;

/*todo: create re-usable Box component*/
const Box = styled.div`
  display: flex;
`;

const ContextBody = styled.section``;
const ContextFooter = styled.section``;

const propTypes = {};
const defaultProps = {};

const ContextEditor = props => {
  return (
    <ComponentBase>
      <ContextHeader />
      <ContextBody>
        <TextEditor />
      </ContextBody>
    </ComponentBase>
  );
};

ContextEditor.propTypes = propTypes;
ContextEditor.defaultProps = defaultProps;

export default ContextEditor;
