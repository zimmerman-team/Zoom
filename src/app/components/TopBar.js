import React from 'react';
import PropTypes from 'prop-types';
import { Grommet, RoutedButton } from 'grommet';
import { Add, Attachment } from 'grommet-icons';

const customTheme = {
  global: {
    font: {
      family: 'Roboto',
    },
  },
  button: {
    border: {
      radius: 0,
      color: '#2196f3',
    },
    padding: {
      vertical: '5px',
      horizontal: '20px',
    },
    primary: {
      color: '#2196f3',
    },
    extend: (props) => {
      let extraStyles = '';
      if (props.primary) {
        extraStyles = `
          text-transform: uppercase;
        `;
      }
      return `
        color: #2196f3;
        font-size: 16px;
        font-weight: 400;
        
        ${extraStyles}
      `;
    },
  },
};

const TopBar = () => (
  <header>
    <Grommet theme={customTheme}>
      <RoutedButton label="home" margin="small" icon={<Add />} path="/" />
      <RoutedButton label="about" margin="small" icon={<Attachment />} path="/about" />
    </Grommet>
  </header>
);

TopBar.propTypes = {
  empty: PropTypes.object,
};

export default TopBar;
