import styled from 'styled-components';

export const ControlPanelContainer = styled.div`
  position: fixed;
  right: 10px;
  top: 50px;
  display: flex;
  flex-direction: column;
  background: #fff;
  border-radius: 5px;
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.2),
    0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 2px 1px -1px rgba(0, 0, 0, 0.12);
  padding: 20px 10px 0 10px;
`;

export const PanelDuo = styled.div`
  display: flex;
  margin-bottom: 20px;
`;

export const DropDownContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 5px;
  margin-right: 5px;
`;
