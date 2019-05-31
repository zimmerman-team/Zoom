import React from 'react';
import {
  LocationLegendItem,
  LocationName,
  LocItemContainer,
  LocationLegendLabel
} from './LocationLegend.style';
import SvgIconLocation from 'assets/icons/geomap/SvgIconLocation';

const locationLegend = (locationItems, index) => (
  <LocationLegendItem key={`legend-${index}`}>
    <LocationLegendLabel>Points of interests</LocationLegendLabel>
    {locationItems.map(item => (
      <LocItemContainer>
        <SvgIconLocation color={item.color} />
        <LocationName>{item.name}</LocationName>
      </LocItemContainer>
    ))}
  </LocationLegendItem>
);

export default locationLegend;
