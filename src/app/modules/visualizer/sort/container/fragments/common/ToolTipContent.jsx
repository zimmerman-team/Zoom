import React from 'react';
import {
  Container,
  Rect,
  Row,
  Title,
  ToolTipText,
  ToolTipValue
} from 'app/components/charts/TooltipContent.styles';

/* utils */
import { truncateText } from 'app/utils/genericUtils';

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

  const capitalXKey = xKey ? xKey.charAt(0).toUpperCase() + xKey.slice(1) : '';

  return (
    <Container>
      {capitalXKey && (
        <Title>
          <b>{capitalXKey}</b>
        </Title>
      )}
      <Row key={index}>
        <Rect theme={{ color }} />
        <ToolTipText>
          {truncateText(valueLabel)} :{' '}
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
