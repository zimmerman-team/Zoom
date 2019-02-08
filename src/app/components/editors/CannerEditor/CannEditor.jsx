/* base */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Value } from 'slate';
import CannerEditor from 'canner-slate-editor';
import initialValue from './common/initialValue';
import theme from 'theme/Theme';

/**
 * todo: Please write a short component description of what this component does
 * @param {Object} customProperty - please describe component property
 */

const ComponentBase = styled.div``;

const propTypes = {
  data: PropTypes.array,
};
const defaultProps = {
  data: [],
};

class CannEditor extends React.Component {
  state = {
    value: initialValue,
  };

  render() {
    const { value } = this.state;
    const onChange = ({ value }) => this.setState({ value });

    return (
      <div style={{ margin: '20px' }}>
        <CannerEditor
          value={value}
          onChange={onChange}
          serviceConfig={{
            name: 'image',
            accept: 'image/*',
            action: 'https://api.imgur.com/3/image',
            headers: {
              Authorization: 'Client-ID a214c4836559c77',
              'X-Requested-With': null,
            },
          }}
          galleryConfig={null}
        />
      </div>
    );
  }
}

CannEditor.propTypes = propTypes;
CannEditor.defaultProps = defaultProps;

export default CannEditor;
