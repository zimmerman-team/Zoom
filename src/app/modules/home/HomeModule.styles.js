import styled from 'styled-components';
import { Box } from 'grommet/components/Box';

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

export const ModuleContainer = styled(Box)`
  height: calc(100vh - 40px);
  width: ${props => props.width};
  align-items: center;
`;
