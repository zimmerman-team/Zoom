import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import theme from 'theme/Theme';

const propTypes = {
  message: PropTypes.string.isRequired,
  autoHideDuration: PropTypes.number
};

const defaultProps = {
  autoHideDuration: 1000000
};

const ZimmermanSnackbar = styled(Snackbar)`
  top: 6px !important;
  height: 60px;
  border-radius: 5px;
  background-color: ${theme.color.snackbar};
  div {
    min-width: 0;
    border-radius: 5px;
    background-color: ${theme.color.snackbar};
    margin: 0 auto;
  }
  > div {
    padding: 0 15px;
    height: 60px;
  }
`;

const Message = styled.span`
  color: ${theme.color.zoomBlack};
  font-family: ${theme.font.zoomFontFamTwo};
  font-size: ${theme.font.body2};
  font-weight: 300;
  line-height: 1;
`;

function SimpleSnackbar(props) {
  return (
    <ZimmermanSnackbar
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center'
      }}
      open={props.open}
      onClose={props.onClose}
      autoHideDuration={props.autoHideDuration}
      message={<Message id="message-id">{props.message}</Message>}
    />
  );
}

SimpleSnackbar.propTypes = propTypes;
SimpleSnackbar.defaultProps = defaultProps;
export default SimpleSnackbar;
