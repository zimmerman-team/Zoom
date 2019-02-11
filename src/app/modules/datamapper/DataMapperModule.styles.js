import styled from 'styled-components';
import theme from 'theme/Theme';

export const ModuleContainer = styled.div`
  min-height: 96vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ModuleHeader = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  background-color: ${theme.color.zoomGreyZero};
  padding-top: 10px;
  padding-bottom: 20px;
`;
export const ModuleContent = styled.div`
  width: 1024px;
`;
export const ModuleFooter = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  background-color: ${theme.color.zoomGreyZero};
  justify-content: center;
  margin-top: auto;
  padding-top: 20px;
  padding-bottom: 12px;
`;
