/* base */
import React from 'react';
import { Container, Row, Title, Rect } from './TooltipContent.styles';

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
            {p.dataKey}: <b>{p.value}</b>
          </Row>
        ))}
      </Container>
    );
  }
  return null;
};

export default TooltipContent;
