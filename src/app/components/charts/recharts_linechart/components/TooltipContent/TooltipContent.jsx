/* base */
import React from 'react';
import {
  Container,
  Rect,
  Row,
  Title,
  ToolTipText,
  ToolTipValue
} from 'components/charts/TooltipContent.styles';

const TooltipContent = ({ active, payload, label, xAxisKey }) => {
  if (active && payload) {
    const xAxisLabel = xAxisKey.charAt(0).toUpperCase() + xAxisKey.slice(1);

    return (
      <Container>
        <Title>
          {xAxisLabel}: <b>{label}</b>
        </Title>
        {payload.map(p => (
          <Row key={p.dataKey}>
            <Rect theme={{ color: p.stroke }} />
            <ToolTipText>
              {p.name}:{' '}
              <ToolTipValue>
                {p.value.toLocaleString(undefined, {
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 2
                })}
              </ToolTipValue>
            </ToolTipText>
          </Row>
        ))}
      </Container>
    );
  }
  return null;
};

export default TooltipContent;
