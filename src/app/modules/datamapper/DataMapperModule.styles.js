import styled from 'styled-components';
import theme from 'theme/Theme';

export const ModuleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: 96vh;
`;

export const ModuleHeader = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  padding-top: 50px;
  padding-bottom: 20px;
  background-color: ${theme.color.zoomGreyZero};
`;

export const ModuleContent = styled.div`
  width: 100%;
`;

export const ModuleFooter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: auto;
  padding-top: 20px;
  padding-bottom: 12px;
  background-color: ${theme.color.zoomGreyZero};
`;
