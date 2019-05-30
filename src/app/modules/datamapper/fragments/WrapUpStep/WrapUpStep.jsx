/* base */
import React from 'react';
import PropTypes from 'prop-types';
/* styles */
import {
  ErrorContainer,
  ErrorItem,
  ErrorTitle,
  ModuleContainer
} from './WrapUpStep.styles';
import { SectionHeading } from 'components/sort/Headings';
/* components */
import ProgressIcon from 'components/ProgressIcon/ProgressIcon';

const propTypes = {
  loading: PropTypes.bool
};
const defaultProps = {
  loading: false
};

const WrapUpStep = props => (
  <ModuleContainer>
    {props.loading ? (
      <ProgressIcon />
    ) : props.errors && props.errors.length > 0 ? (
      <ErrorContainer>
        <ErrorTitle>
          Some error occured while mapping, please correct your mapping or your
          file, errors listed below:
        </ErrorTitle>
        <ul>
          {props.errors.map(error => {
            return (
              <ErrorItem>{error.map(content => content.message)}</ErrorItem>
            );
          })}
        </ul>
      </ErrorContainer>
    ) : (
      <SectionHeading>
        Your data set is being mapped, you will be notified by email when your
        mapping is finished(Currently only - devops-zz@zimmermanzimmerman.nl get
        this notification)
      </SectionHeading>
    )}
  </ModuleContainer>
);

WrapUpStep.propTypes = propTypes;
WrapUpStep.defaultProps = defaultProps;

export default WrapUpStep;
