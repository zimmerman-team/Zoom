/* base */
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

const TooltipContent = ({ active, payload, label }) => {
  if (active && payload) {
    return (
      <Container>
        <Title>
          <b>{label}</b>
        </Title>
        {payload.map(p => {
          let nrFormat = ' ';

          if (p.payload[`${p.dataKey}Format`] === 'percentage') nrFormat = ' %';
          else if (
            p.payload[`${p.dataKey}Format`] !== 'number' &&
            p.payload[`${p.dataKey}Format`]
          ) {
            nrFormat = ' '.concat(p.payload[`${p.dataKey}Format`]);
          }

          return (
            <Row key={p.dataKey}>
              <Rect theme={{ color: p.stroke }} />
              <ToolTipText>
                {truncateText(p.name)} :{' '}
                <ToolTipValue>
                  {p.value.toLocaleString(undefined, {
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 2
                  })}
                  {nrFormat}
                </ToolTipValue>
              </ToolTipText>
            </Row>
          );
        })}
      </Container>
    );
  }
  return null;
};

export default TooltipContent;
