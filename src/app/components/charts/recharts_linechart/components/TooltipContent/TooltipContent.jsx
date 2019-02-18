/* base */
import React from 'react';
import { Container, Row, Title, Rect } from './TooltipContent.styles';

const TooltipContent = ({ active, payload, label }) => {
  if (active) {
    return (
      <Container>
        <Title>
          Year: <b>{label}</b>
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
