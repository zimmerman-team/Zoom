import React from "react";
import Switch from "@material-ui/core/Switch";
import "styled-components/macro";
import { blue, yellow, grey } from "@material-ui/core/colors";
import { withStyles, Theme, createStyles } from "@material-ui/core/styles";

// interface LegendSwitchParams {}

const PurpleSwitch = withStyles({
  switchBase: {
    // padding: 1,
    "&$checked": {
      // transform: "translateX(16px)",
      color: "#ffffff",
      "& + $track": {
        backgroundColor: "#1f8efa",
        opacity: 1,
        // border: "none"
      },
    },
    "&$focusVisible $thumb": {
      color: "#1f8efa",
      // border: "6px solid #fff"
    },
  },
  checked: {},
  track: {},
})(Switch);

interface LegendSwitchParams {
  enabled: boolean;
  onChange: Function;
}

export const LegendSwitch = (props: LegendSwitchParams) => {
  const [state, setState] = React.useState({
    checkedA: props.enabled,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.onChange(event.target.checked);
  };

  React.useEffect(() => setState({ ...state, checkedA: props.enabled }), [
    props.enabled,
  ]);

  return (
    <>
      <PurpleSwitch
        checked={state.checkedA}
        onChange={handleChange}
        name="checkedA"
        inputProps={{ "aria-label": "secondary checkbox" }}
      />
    </>
  );
};