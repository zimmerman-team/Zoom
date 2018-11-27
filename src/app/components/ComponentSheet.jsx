/* base */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';



const ComponentBase = styled.div`

`;

const propTypes = {
    data: PropTypes.object,
};
const defaultProps = {
    data: undefined,
};

const ComponentSheet = props => {
    return (
        <React.Fragment>

        </React.Fragment>);
};

ComponentSheet.propTypes = propTypes;
ComponentSheet.defaultProps = defaultProps;

export default ComponentSheet;
