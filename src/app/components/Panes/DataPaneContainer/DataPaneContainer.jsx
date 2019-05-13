/* base */
import React from 'react';
import styled from 'styled-components';

const DataPaneContainer = styled(props => (
  <div style={{ display: props.display }} {...props}>
    {props.children}
  </div>
))`
  && {
    width: 320px;
    padding-top: 40px;
    position: fixed;
    right: 0;
    top: 0;
    z-index: 9;
    display: flex;
    flex-direction: column;
    background: #fff;
    height: 100vh;
    border-radius: 0;
    box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.2),
      0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 2px 1px -1px rgba(0, 0, 0, 0.12);
  }
`;

export default DataPaneContainer;
