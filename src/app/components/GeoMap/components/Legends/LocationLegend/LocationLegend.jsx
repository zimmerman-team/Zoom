import React from 'react';

import Dotdotdot from 'react-dotdotdot';

import {
  LocationLegendItem,
  LocationName,
  LocItemContainer,
  LocationLegendLabel,
  ScgIconContainer
} from './LocationLegend.style';

import SvgIconLocation from 'assets/icons/geomap/SvgIconLocation';

const locationLegend = (locationItems, index) => (
  <LocationLegendItem key={`legend-${index}`}>
    <LocationLegendLabel>Points of interests</LocationLegendLabel>
    {locationItems.map(item => (
      <LocItemContainer>
        <ScgIconContainer>
          <SvgIconLocation color={item.color} />
        </ScgIconContainer>
        <Dotdotdot clamp={4}>
          <LocationName>{item.name}</LocationName>
        </Dotdotdot>
      </LocItemContainer>
    ))}
  </LocationLegendItem>
);

export default locationLegend;
