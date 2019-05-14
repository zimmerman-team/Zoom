/* base */
import React from 'react';
import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';
import styled from 'styled-components';
import TextEditor from 'components/editors/TextEditor/TextEditor';
import DescriptionEditor from 'components/chartcontext/common/DescriptionEditor';
import ContextHeader from 'components/chartcontext/common/ContextHeader';
/* actions */
import * as actions from 'services/actions/general';

/**
 * todo: Please write a short component description of what this component does
 * @param {Object} customProperty - please describe component property
 */

const ComponentBase = styled.div`
  width: 1024px;
  height: calc(100vh - 80px);
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  box-shadow: 0 5px 7px rgba(0, 0, 0, 0.5);

  position: absolute;
  right: 0;
  top: 40px;
  z-index: 3;
`;

const ContextBody = styled.section`
  width: 650px;
`;

const propTypes = {
  authorName: PropTypes.string
};
const defaultProps = {
  authorName: 'empty'
};

class ContextEditor extends React.Component {
  shouldComponentUpdate() {
    // NOTE: Right now we use this, so that the component wouldn't update everytime the
    // chartData prop changes(for performance and cause this update messes up the text editor)
    // so yeah, right now this component is not needed to update at all
    // if you need this component to rerender, pls add in some logic with state/prop changes
    // and return true, upon those changes
    return false;
  }

  render() {
    return (
      <ComponentBase>
        <ContextHeader
          createdDate={this.props.chartData.createdDate}
          authorName={this.props.chartData.authorName}
          title={this.props.chartData.name}
          saveTitle={name =>
            this.props.dispatch(actions.storeChartDataRequest({ name }))
          }
          edit
        />
        <ContextBody>
          <DescriptionEditor
            defaultVal={this.props.chartData.descIntro}
            saveText={descIntro =>
              this.props.dispatch(actions.storeChartDataRequest({ descIntro }))
            }
          />
          <TextEditor
            saveDesc={desc =>
              this.props.dispatch(actions.storeChartDataRequest({ desc }))
            }
            defaultVal={this.props.chartData.desc}
          />
        </ContextBody>
      </ComponentBase>
    );
  }
}

ContextEditor.propTypes = propTypes;
ContextEditor.defaultProps = defaultProps;

const mapStateToProps = state => {
  return {
    chartData: state.chartData.chartData
  };
};

export default connect(mapStateToProps)(ContextEditor);
