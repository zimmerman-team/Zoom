import React from 'react';
import PropTypes from 'prop-types';
/* components */
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from 'components/sort/TextField';
import ZoomButton from 'components/ZoomButton/ZoomButton';
/* styles */
import { ButtonContainer, ButtonsContainer } from './SimpleEditDialog.style';

const propTypes = {
  defaultText: PropTypes.string,
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  handleSave: PropTypes.func,
  extraValues: PropTypes.shape({})
};

const defaultProps = {
  defaultText: '',
  open: false,
  handleClose: undefined,
  handleSave: undefined,
  extraValues: {}
};

class SimpleEditDialog extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      text: ''
    };

    this.handleSave = this.handleSave.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.defaultText !== this.props.defaultText) {
      this.setState({ text: this.props.defaultText });
    }
  }

  handleSave() {
    this.props.handleSave(this.state.text, this.props.extraValues);
    this.props.handleClose();
  }

  render() {
    return (
      <Dialog open={this.props.open} onClose={this.props.handleClose}>
        <DialogContent>
          <TextField
            placeholder={undefined}
            label="Enter a new value"
            InputLabelProps={{
              shrink: true
            }}
            value={this.state.text}
            onChange={e => this.setState({ text: e.target.value })}
          />
          <ButtonsContainer>
            <ButtonContainer>
              <ZoomButton plain onClick={() => this.handleSave()}>
                Save
              </ZoomButton>
            </ButtonContainer>
            <ButtonContainer>
              <ZoomButton plain onClick={this.props.handleClose}>
                Cancel
              </ZoomButton>
            </ButtonContainer>
          </ButtonsContainer>
        </DialogContent>
      </Dialog>
    );
  }
}

SimpleEditDialog.propTypes = propTypes;
SimpleEditDialog.defaultProps = defaultProps;

export default SimpleEditDialog;
