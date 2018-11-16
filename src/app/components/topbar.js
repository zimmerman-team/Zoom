import React from 'react';
import PropTypes from 'prop-types';
import {Button, Grommet, RoutedButton} from "grommet";

import {Router, Route, Link, Switch, NotFound} from 'fusion-plugin-react-router';
import {Add, Attachment} from "grommet-icons";

const customTheme = {
    global: {
        font: {
            family: "Roboto"
        }
    },
    button: {
        border: {
            radius: 0,
            color: "#2196f3"
        },
        padding: {
            vertical: "5px",
            horizontal: "20px"
        },
        primary: {
            color: "#2196f3"
        },
        extend: props => {
            let extraStyles = "";
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
        }
    }
};

function ButtonAppBar(props) {

  return (
    <header>
        <Grommet theme={customTheme} >
            <RoutedButton label={'home'} margin={'small'} icon={<Add/>} path={'/'}/>
            <RoutedButton label={'about'} margin={'small'} icon={<Attachment/>} path={'/about'}/>
        </Grommet>
    </header>
  );
}

ButtonAppBar.propTypes = {
  empty: PropTypes.object,
};

export default ButtonAppBar;
