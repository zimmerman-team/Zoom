/* base */
import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import theme from "app/theme/Theme";
import EditableTitle from "app/components/chartcontext/common/EditableTitle";
import "styled-components/macro";
/* components */

/**
 * todo: Please write a short component description of what this component does
 * @param {Object} customProperty - please describe component property
 */

const ComponentBase = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding-top: 20px;
  padding-bottom: 20px;
`;

const Title = styled.h3`
  color: ${theme.color.zoomBlack};
  font-family: ${theme.font.zoomFontFamOne};
  margin: 0;
  margin-bottom: 5px;
  font-size: 56px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: center;
`;

export const Details = styled.p`
  color: ${theme.color.zoomBlack};
  font-family: ${theme.font.zoomFontFamTwo};
  font-size: 16px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.25;
  letter-spacing: normal;
  text-align: center;
  margin: 0;
`;

export const DetailsSecondary = styled.p`
  color: ${theme.color.zoomBlack};
  font-family: ${theme.font.zoomFontFamTwo};
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  line-height: 1.43;
  text-align: center;
  font-size: 14px;
  font-weight: 400;
  margin: 0;
`;

const propTypes = {
  title: PropTypes.string,
  authorName: PropTypes.string,
  createdDate: PropTypes.string,
  saveTitle: PropTypes.func,
  edit: PropTypes.bool,
  noBottom: PropTypes.bool
};
const defaultProps = {
  title: "Untitled chart 01",
  edit: false,
  saveTitle: undefined,
  authorName: "Jane Doe",
  createdDate: "January 12th 2019",
  noBottom: false
};
const ContextHeader = props => {
  return (
    <ComponentBase
      css={`
        && {
          padding-top: 10px;
          padding-bottom: ${props.noBottom ? "0" : "35px"};
        }
      `}
      // style={{ paddingBottom: props.noBottom ? "0" : "" }}
    >
      {props.edit ? (
        <EditableTitle
          defaultValue={props.title}
          onChange={e => props.saveTitle(e.target.value)}
        />
      ) : (
        <Title>{props.title}</Title>
      )}
    </ComponentBase>
  );
};

ContextHeader.propTypes = propTypes;
ContextHeader.defaultProps = defaultProps;

export default ContextHeader;
