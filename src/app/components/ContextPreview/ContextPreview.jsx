/* base */
import React from "react";
import PropTypes from "prop-types";
import ReactHtmlParser from "react-html-parser";
import styled from "styled-components";
import "styled-components/macro";
import theme from "app/theme/Theme";
import ContextHeader, {
  DetailsSecondary,
} from "app/components/chartcontext/common/ContextHeader";
import "react-quill/dist/quill.snow.css"; // ES

import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import { Details } from "../chartcontext/common/ContextHeader";
import { NavLink } from "react-router-dom";

/**
 * todo: Please write a short component description of what this component does
 * @param {Object} customProperty - please describe component property
 */

const ContextIntro = styled.div`
  max-width: 550px;
  font-family: ${theme.font.zoomFontFamTwo};
  color: ${theme.color.zoomBlack};
  margin: 0 auto;
  margin-top: 15px;
  margin-bottom: 15px;
  font-size: 18px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.44;
  letter-spacing: normal;
  text-align: center;
`;

const ContextBody = styled.div`
  max-width: 870px;
  margin: 0;
`;

const ChartOverviewButton = () => {
  return (
    <NavLink
      css={`
        text-decoration: none;
      `}
      to="/public/chart-library"
    >
      <div
        css={`
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-top: 50px;
        `}
      >
        <div
          css={`
            color: #2e5bff;
            font-size: 16px;
            font-weight: bold;
            font-stretch: normal;
            font-style: normal;
            line-height: 1.25;
            letter-spacing: normal;
            text-align: center;
            margin-right: 5px;
          `}
        >
          More public charts
        </div>
        <ArrowForwardIcon
          css={`
            color: #2e5bff;
            fill: #2e5bff;
          `}
          fontSize="small"
        />
      </div>
    </NavLink>
  );
};
const propTypes = {
  desc: PropTypes.string,
  show: PropTypes.string,
};
const defaultProps = {
  desc: "",
};

const ContextPreview = (props) => {
  return (
    <div>
      {/* ------------------------------------ */}
      {/* link to chart overview */}
      {props.show === "descIntro" && <ChartOverviewButton />}

      {/* ------------------------------------ */}
      {/* contains title */}
      {props.show === "descIntro" && (
        <ContextHeader
          title={props.title}
          authorName={props.authorName}
          createdDate={props.createdDate}
          noBottom
        />
      )}

      {/* ------------------------------------ */}
      {/* contains intro text */}
      {props.show === "descIntro" && (
        <ContextIntro data-cy="context-preview-intro">
          {props.descIntro}
        </ContextIntro>
      )}

      {/* ------------------------------------ */}
      {/* contains detail text */}
      {props.show === "descIntro" && (
        <React.Fragment>
          <div
            css={`
              display: flex;
              justify-content: center;
              flex-direction: column;
              align-items: center;
              margin-top: 20px;
              margin-bottom: 20px;
            `}
          >
            <Details>By {props.authorName}</Details>
            <div
              css={`
                height: 15px;
              `}
            />
            <DetailsSecondary>Created: {props.createdDate}</DetailsSecondary>
          </div>
        </React.Fragment>
      )}

      {/* ------------------------------------ */}
      {/* contains full text */}
      {props.show === "descBody" && (
        <ContextBody>
          <div className="ql-editor" data-cy="context-preview-body">
            {ReactHtmlParser(props.desc)}
          </div>
        </ContextBody>
      )}
    </div>
  );
};

ContextPreview.propTypes = propTypes;
ContextPreview.defaultProps = defaultProps;

export default ContextPreview;
