/* base */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Theme from 'theme/Theme';

/* components...*/
import GridItemText from './common/GridItemText';
import GridItemToolbar from './common/GridItemToolbar';

const Container = styled.div`
//todo: dynamisch aan de hand van grid maken..
display: flex;
flex-direction: row;
justify-content: space-between;
width: 312px;
height: 168px;
padding: 15px;
background-color: ${Theme.color.zoomGreyZero};
box-shadow: 0 2px 4px 2px rgba(157, 157, 157, 0.5);
`;

const GridItemHeading = styled.div`
font-family: ${Theme.font.zoomFontFamTwo};
font-size: 18px;
color: ${Theme.color.aidsFondsRed};
margin-bottom: 10px;
`;

const Box = styled.div`

`;

const propTypes = {};
const defaultProps = {};

const GridItem = props => {
  const [isSelected, setIsSelected] = React.useState(false);

  function handleMouserEnter() {
    setIsSelected(!isSelected);
  }

  return (
    <Container onMouseEnter={handleMouserEnter} onMouseLeave={handleMouserEnter}>
      <Box>
      <GridItemHeading>People Living with HIV</GridItemHeading>
      <GridItemText label="Author" value="Jane Doe"/>
      <GridItemText label="Publication date" value="01-01-2019"/>
      <GridItemText label="Updated" value="n/a"/>
      <GridItemText label="Shared" value="Team Jane Doe, Public"/>
      <GridItemText label="Type of chart" value="Line chart"/>
      <GridItemText label="Data sources" value="UN AIDS"/>
      </Box>
      {isSelected ? <GridItemToolbar/> : null }
    </Container>);
};

GridItem.propTypes = propTypes;
GridItem.defaultProps = defaultProps;
export default GridItem;
