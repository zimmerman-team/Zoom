import React from 'react';
import PropTypes from 'prop-types';
import Fade from '@material-ui/core/Fade';
import { ZimmermanSnackbar, Message } from './Snackbar.style';

const propTypes = {
  message: PropTypes.string.isRequired,
  autoHideDuration: PropTypes.number
};

const defaultProps = {
  autoHideDuration: 6000
};

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
      message={<Message>{props.message}</Message>}
      TransitionComponent={Fade}
    />
  );
}

SimpleSnackbar.propTypes = propTypes;
SimpleSnackbar.defaultProps = defaultProps;
export default SimpleSnackbar;
