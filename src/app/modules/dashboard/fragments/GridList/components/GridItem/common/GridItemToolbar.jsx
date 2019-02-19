/* base */
import React from 'react';
import styled from 'styled-components';
import Theme from 'theme/Theme';

/* components...*/
import SvgIconEdit from '../../../../../../../assets/icons/IconEdit';
import SvgIconList from '../../../../../../../assets/icons/IconList';
import SvgIconDelete from '../../../../../../../assets/icons/IconDelete';
import SvgIconDuplicate from '../../../../../../../assets/icons/IconDuplicate';

const ComponentBase = styled.div`
display: flex;
flex-direction: column;
align-items: flex-end;
margin-bottom: 10px;

//All children
> * {
margin-bottom: 10px;
&:hover{
cursor: pointer;
}

&:hover path{
fill: ${Theme.color.aidsFondsBlue} !important;
}
}
`;

const propTypes = {};
const defaultProps = {};

const GridItemToolbar = props => {
  return (
    <ComponentBase>
      <SvgIconEdit/>
      <SvgIconList/>
      <SvgIconDuplicate/>
      <SvgIconDelete/>
    </ComponentBase>
    );
};
GridItemToolbar.propTypes = propTypes;
GridItemToolbar.defaultProps = defaultProps;
export default GridItemToolbar;
