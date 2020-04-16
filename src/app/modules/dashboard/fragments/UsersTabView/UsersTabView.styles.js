import Theme from 'app/theme/Theme';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const ViewContainer = styled.div`
  width: 100%;
`;

export const ControlsRow = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-bottom: 20px;
  justify-content: space-between;
`;

export const AddUserLink = styled(Link)`
  font-size: 19px;
  font-weight: 700;
  text-decoration: none;
  color: ${Theme.color.aidsFondsRed};
  font-family: ${Theme.font.zoomFontFamOne};

  &:hover {
    text-decoration: underline;
  }
`;
