/* base */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import InputBase from '@material-ui/core/InputBase';
import theme from 'theme/Theme';

const propTypes = {
  saveText: PropTypes.func,
  defaultVal: PropTypes.string
};

const defaultProps = {};

const DescriptionEditor = styled(props => (
  <InputBase
    multiline
    placeholder="[ Insert description here ]"
    rows={3}
    rowsMax={3}
    type="text"
    value={props.defaultVal}
    onChange={e => props.saveText(e.target.value)}
    {...props}
  />
))`
  && {
    font-family: ${theme.font.zoomFontFamOne};
    font-size: 14px;
    width: 100%;
    border-top: 2px solid black;
    padding: 15px;
    margin-bottom: 20px;

    textarea {
      &::placeholder {
        color: black;
        opacity: 1;
        font-size: 14px;
      }
    }
  }
`;

DescriptionEditor.propTypes = propTypes;
DescriptionEditor.defaultProps = defaultProps;

export default DescriptionEditor;
