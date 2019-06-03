import React from 'react';
import {
  Container,
  Rect,
  Row,
  Title,
  ToolTipText,
  ToolTipValue
} from 'components/charts/TooltipContent.styles';

const TooltipContent = ({
  aggrType,
  xKey,
  index,
  color,
  valueLabel,
  value,
  format
}) => {
  let nrFormat = ' ';

  if (format === 'percentage') nrFormat = ' %';
  else if (format !== 'number' && format) {
    nrFormat = ' '.concat(format);
  }

  const capitalType = aggrType
    ? aggrType.charAt(0).toUpperCase() + aggrType.slice(1)
    : 'Geo';

  return (
    <Container>
      {xKey && (
        <Title>
          {capitalType}: <b>{xKey}</b>
        </Title>
      )}
      <Row key={index}>
        <Rect theme={{ color }} />
        <ToolTipText>
          {valueLabel}:{' '}
          <ToolTipValue>
            {value}
            {nrFormat}
          </ToolTipValue>
        </ToolTipText>
      </Row>
    </Container>
  );
};

export default TooltipContent;
