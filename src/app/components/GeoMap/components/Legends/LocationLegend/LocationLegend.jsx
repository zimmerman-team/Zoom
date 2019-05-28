import React from 'react';
import { LegendLabel } from 'components/GeoMap/components/Legends/Legend.styles';
import {
  LocationLegendItem,
  LocationName,
  LocItemContainer
} from './LocationLegend.style';
import FlagIcon from 'assets/icons/geomap/FlagIcon';

const locationLegend = (locationItems, index) => (
  <LocationLegendItem key={`legend-${index}`}>
    <LegendLabel>Location legend</LegendLabel>
    {locationItems.map(item => (
      <LocItemContainer>
        <FlagIcon fill={item.color} />
        <LocationName>{item.name}</LocationName>
      </LocItemContainer>
    ))}
  </LocationLegendItem>
);

export default locationLegend;
