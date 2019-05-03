/* base */
import React from 'react';
import {
  Container,
  Row,
  Title,
  Rect,
  ToolTipValue,
  ToolTipText
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
              {p.name}: <ToolTipValue>{p.value}</ToolTipValue>
            </ToolTipText>
          </Row>
        ))}
      </Container>
    );
  }
  return null;
};

export default TooltipContent;
