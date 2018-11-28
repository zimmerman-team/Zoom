import React, { PureComponent } from 'react';

export default class IndicatorInfo extends PureComponent {
  render() {
    const { info } = this.props;
    const displayName = `County: ${info.County}, Organisation : ${
      info.Organisation
    }`;

    return (
      <div>
        <div>{displayName}</div>
      </div>
    );
  }
}
