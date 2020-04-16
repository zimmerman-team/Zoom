/* base */
/* third party */
import React from 'react';
import PropTypes from 'prop-types';
import { Box } from 'grommet/components/Box';
/* custom components */
import ZoomSelect from 'app/components/Select/ZoomSelect';
import CheckboxesGroup from 'app/components/CheckboxesGroup/CheckboxesGroup';
import RadioButtonGroup from 'app/components/RadioButtonGroup/RadioButtonGroup';
import TextField from 'app/components/sort/TextField';
import InputFieldLabel from 'app/components/InputFieldLabel/InputFieldLabel';
import InputFieldDivider from 'app/components/Dividers/InputFieldDivider';
import SimpleParagraphText from 'app/components/Texts/SimpleParagraphText/SimpleParagraphText';
/* style */
import { SectionHeading } from 'app/components/sort/Headings';
import {
  DataSourceTextCont,
  FieldContainer,
  ModuleContainer,
  OrLabel,
  SelectContainer,
  SelectSurround,
  TwoFieldContainer
} from './MetaData.style';
import theme from 'app/theme/Theme';
/* const data */
import { step1InitialData } from 'app/__consts__/DataMapperStepConsts';
import {
  checkBoxOptions2,
  checkBoxOptions3,
  checkBoxOptions51,
  dataSourceOptions,
  numberOptions,
  options2,
  nonSurveyChoice,
  accesibilityOptions
} from './MetaData.consts';

const propTypes = {
  /**
   Label for the button.
   */
  simpleChange: PropTypes.func,
  otherCheckBoxText: PropTypes.func,
  dropDownChange: PropTypes.func,
  otherDropdownText: PropTypes.func,
  data: PropTypes.shape({
    metaData: PropTypes.shape({
      title: PropTypes.string,
      desc: PropTypes.string,
      org: PropTypes.string,
      year: PropTypes.string,
      tags: PropTypes.arrayOf(PropTypes.string),
      dataSource: PropTypes.shape({
        key: PropTypes.string,
        label: PropTypes.string,
        value: PropTypes.string
      }),
      accessibility: PropTypes.string,
      surveyData: PropTypes.Boolean,
      q1: PropTypes.string,
      q2: PropTypes.arrayOf(
        PropTypes.shape({
          label: PropTypes.string,
          value: PropTypes.string
        })
      ),
      q21: PropTypes.string,
      q22: PropTypes.string,
      q3: PropTypes.arrayOf(
        PropTypes.shape({
          label: PropTypes.string,
          value: PropTypes.string
        })
      ),
      q4: PropTypes.shape({
        key: PropTypes.string,
        label: PropTypes.string,
        value: PropTypes.string
      }),
      q5: PropTypes.string,
      q51: PropTypes.arrayOf(
        PropTypes.shape({
          label: PropTypes.string,
          value: PropTypes.string
        })
      ),
      sourceText: PropTypes.string,
      q3Text: PropTypes.string,
      q4Text: PropTypes.string,
      q51Text: PropTypes.string,
      fileSources: PropTypes.arrayOf(
        PropTypes.shape({
          label: PropTypes.string,
          value: PropTypes.string
        })
      )
    }),
    environment: PropTypes.shape({})
  }),
  metaDataEmptyFields: PropTypes.arrayOf(PropTypes.string)
};
const defaultProps = {
  metaDataEmptyFields: [],
  data: step1InitialData,
  simpleChange: undefined,
  otherCheckBoxText: undefined,
  dropDownChange: undefined,
  otherDropdownText: undefined
};

class MetaData extends React.Component {
  // so we will control this components rendering
  // with this, because it really shouldn't
  // render when text fields are change
  // because the text fields are and should be uncontrolled
  // and when they change it shouldn't rerender
  // the whole component, cause it makes everything lag
  shouldComponentUpdate(nextProps) {
    // so we will list out the conditional logic
    // for when this component should NOT rerender
    if (
      (this.props.data.title !== nextProps.data.title &&
        nextProps.data.title !== undefined) ||
      (this.props.data.desc !== nextProps.data.desc &&
        nextProps.data.desc !== undefined) ||
      (this.props.data.sourceText !== nextProps.data.sourceText &&
        nextProps.data.sourceText !== undefined) ||
      this.props.data.q3Text !== nextProps.data.q3Text ||
      this.props.data.q4Text !== nextProps.data.q4Text ||
      this.props.data.q51Text !== nextProps.data.q51Text
    ) {
      return false;
    }

    // console.log('SHOULD UPDATE');
    // if any other field is being changed rerendering is ooke
    return true;
  }

  validateField(field) {
    let length = this.props.data[field].length === 0;
    if (field === 'dataSource') {
      length = this.props.data[field].value.length === 0;
    }

    if (
      field === 'year' &&
      this.props.data[field] &&
      this.props.data[field].length > 0 &&
      (!/^\d+$/.test(this.props.data[field]) ||
        this.props.data[field].length > 4)
    ) {
      return true;
    }

    return this.props.metaDataEmptyFields.indexOf(field) !== -1 && length;
  }

  render() {
    return (
      <ModuleContainer>
        <SectionHeading>Describe meta data</SectionHeading>
        {/*////////////////////////////////////////////////////////////////////*/}
        <FieldContainer>
          <TextField
            error={this.validateField('title')}
            defaultValue={this.props.data.title}
            label="Title data set"
            onChange={e => this.props.simpleChange(e.target.value, 'title')}
            required
          />
        </FieldContainer>

        {/*////////////////////////////////////////////////////////////////////*/}
        <FieldContainer>
          <TextField
            multiline
            defaultValue={this.props.data.desc}
            error={this.validateField('desc')}
            label="Description"
            onChange={e => this.props.simpleChange(e.target.value, 'desc')}
            required
          />
        </FieldContainer>

        {/*////////////////////////////////////////////////////////////////////*/}
        <TwoFieldContainer>
          <SelectContainer>
            <InputFieldLabel
              text="Select data source*"
              style={{
                color: this.validateField('dataSource')
                  ? theme.color.aidsFondsRed
                  : ''
              }}
            />
            <SelectSurround>
              <ZoomSelect
                search={false}
                dropDownWidth={290}
                placeHolderText="Connect to Zoom data source"
                data={dataSourceOptions.concat(this.props.data.fileSources)}
                valueSelected={this.props.data.dataSource.label}
                selectVal={value =>
                  this.props.dropDownChange(value, 'dataSource', 'sourceText')
                }
              />
            </SelectSurround>
          </SelectContainer>
          <OrLabel> or </OrLabel>
          <DataSourceTextCont>
            <TextField
              error={this.validateField('dataSource')}
              defaultValue={this.props.data.sourceText}
              label="Create new name for data source"
              onChange={e =>
                this.props.otherDropdownText(
                  e.target.value,
                  'dataSource',
                  'sourceText',
                  dataSourceOptions.concat(this.props.data.fileSources)
                )
              }
            />
          </DataSourceTextCont>
        </TwoFieldContainer>

        <FieldContainer>
          <TextField
            defaultValue={this.props.data.org}
            error={this.validateField('org')}
            label="Organisation (upload and manage dataset)"
            onChange={e => this.props.simpleChange(e.target.value, 'org')}
            required
          />
        </FieldContainer>

        <FieldContainer>
          <TextField
            defaultValue={this.props.data.year}
            error={this.validateField('year')}
            label="Year of data collection"
            onChange={e => this.props.simpleChange(e.target.value, 'year')}
            required
          />
        </FieldContainer>

        {/*////////////////////////////////////////////////////////////////////*/}
        <FieldContainer>
          <InputFieldLabel text="Accessibility of dataset" />
          <Box>
            <RadioButtonGroup
              value={this.props.data.accessibility}
              options={accesibilityOptions}
              onChange={value =>
                this.props.simpleChange(value, 'accessibility')
              }
            />
          </Box>
        </FieldContainer>

        <InputFieldDivider />

        <SimpleParagraphText>
          The questions below are to be answered if you are uploading data that
          you or your organisation has collected. This is to get a better
          understanding of the methodology used to collect this data. Please
          answer the questions you have an answer to.
        </SimpleParagraphText>

        <InputFieldDivider />

        {/*////////////////////////////////////////////////////////////////////*/}
        <FieldContainer>
          <InputFieldLabel
            text="1. Have you tested the tool in a pilot or with a test group before
          conducting it?"
          />
          <Box direction="row">
            <RadioButtonGroup
              direction="row"
              options={options2}
              value={this.props.data.q1}
              onChange={value => this.props.simpleChange(value, 'q1')}
            />
          </Box>
        </FieldContainer>

        <InputFieldDivider />

        {/*////////////////////////////////////////////////////////////////////*/}
        <FieldContainer>
          <InputFieldLabel text="2. Does the data contain information which can be considered sensitive?" />
          <Box direction="row">
            <RadioButtonGroup
              value={this.props.data.q21}
              direction="row"
              options={options2}
              onChange={value => this.props.simpleChange(value, 'q21')}
            />
          </Box>
        </FieldContainer>

        <InputFieldDivider />

        {/*////////////////////////////////////////////////////////////////////*/}
        <FieldContainer>
          <TextField
            label="3. How did you select respondents?"
            defaultValue={this.props.data.q3Text}
            onChange={e => this.props.simpleChange(e.target.value, 'q3Text')}
          />
        </FieldContainer>

        {/*////////////////////////////////////////////////////////////////////*/}
        <FieldContainer>
          <TextField
            label="4. How many respondents were interviewed/participated?"
            defaultValue={this.props.data.q4Text}
            //
            onChange={e =>
              this.props.otherDropdownText(
                e.target.value,
                'q4',
                'q4Text',
                numberOptions
              )
            }
          />
        </FieldContainer>
      </ModuleContainer>
    );
  }
}

MetaData.propTypes = propTypes;
MetaData.defaultProps = defaultProps;

export default MetaData;
