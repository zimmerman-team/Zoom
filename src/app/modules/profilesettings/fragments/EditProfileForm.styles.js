import theme from 'app/theme/Theme';
import styled from 'styled-components';
import TextField from '../../../components/sort/TextField';

export const ComponentBase = styled.div`
  width: 1024px;
`;

export const Textfield = styled(TextField)`
  && input {
    color: ${theme.color.aidsFondsBlue};
  }

  &:not(:first-child) {
    margin-top: 16px;
  }
`;
