/* base */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { SectionHeading as _SectionHeading, SubHeading as _SubHeading} from 'components/sort/Headings';
import { PageIntroInitial as _PageIntroInitial, BaseParagraph as _BaseParagraph} from 'components/sort/Paragraphs';
import Theme from 'theme/Theme';
import { GeoMap } from '../../components/GeoMap/GeoMap';


/**
 * todo: Please write a short component description of what this component does
 * @param {Object} customProperty - please describe component property
 */
const ComponentBase = styled.div`


`;

const SectionHeading = styled(_SectionHeading)`
margin-bottom: 8px;
`;
const SubHeading = styled(_SubHeading)`
margin-bottom: 29px;
`;

const PageIntroInitial = styled(_PageIntroInitial)`
width: 543px;
font-size: 14px;
color: ${Theme.color.zoomBlack};
margin: 0 auto;
margin-bottom: 20px;
line-height: 21px;
`;

const BaseParagraph = styled(_BaseParagraph)`
font-size: 14px;
width: 543px;
margin: 0 auto;
line-height: 21px;
color: ${Theme.color.zoomBlack};
margin-top: 20px;
`;

const propTypes = {
  data: PropTypes.array,
};
const defaultProps = {
  data: [],
};
const PublicChartViewModule = props => {
  return (
    <ComponentBase>
      <SectionHeading>Untitled chart 01</SectionHeading>
      <SubHeading>By Jane Doe | Published on January 12th 2019</SubHeading>
      <PageIntroInitial>Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. </PageIntroInitial>
      {/*<GeoMap/>*/}
      <BaseParagraph>Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Maecenas faucibus mollis interdum. Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
        Sed posuere consectetur est at lobortis. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui. Nulla vitae elit libero, a pharetra augue.

        Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nullam quis risus eget urna mollis ornare vel eu leo. Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Maecenas sed diam eget risus varius blandit sit amet non magna.
      </BaseParagraph>

    </ComponentBase>);
};
PublicChartViewModule.propTypes = propTypes;
PublicChartViewModule.defaultProps = defaultProps;
export default PublicChartViewModule;
