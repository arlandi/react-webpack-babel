import React from 'react';
import { Card, Loader, Dropdown } from 'semantic-ui-react';
import LeadGenSettings from './LeadGenSettings';
import { getOption, getTerms } from '../dataHelper';

export default class LeadGen extends React.Component {
  state = {
    globalLeadGenSetting: false,
    sections: [],
    selectedSection: false,
    selectedSectionSetting: false,
  }

  componentWillMount() {
    getOption( 'lead-gen-global' ).then( ( response ) => {
      const globalLeadGenSetting = response.data || 'empty';
      this.setState( { globalLeadGenSetting } );
    } );
    getTerms( 'category' ).then( ( response ) => {
      const sections = response.map( ( section ) => {
        const { slug, name } = section;
        return {
          key: slug,
          value: slug,
          text: name,
        }
      } );
      this.setState( { sections } );
    } );
  }

  handleSectionChange = ( e, data ) => {
    this.setState( { selectedSection: 'loading' } );
    const selectedSection = data.value;
    getOption( selectedSection ).then( ( response ) => {
      const selectedSectionSetting = response.data || 'empty';
      this.setState( { selectedSectionSetting, selectedSection } );
    } );
  }

  render() {
    const { globalLeadGenSetting, sections, selectedSection, selectedSectionSetting } = this.state;
    const isSelectedSectionLoading = 'loading' === selectedSection;
    const showEnableToggle = true;

    return (
      <Card className='lead-gen-container' fluid>
        <Card.Content>
          <h1>Lead Gen Configuration</h1>
          <h2>Global Config:</h2>
          { globalLeadGenSetting ?
            <LeadGenSettings optionName='lead-gen-global' initialState={ globalLeadGenSetting } /> :
            <Loader active inline='centered' />
          }
          <h2>Sections Config:</h2>
          { sections &&
            <Dropdown className='section-select' selection placeholder='Select a section' options={ sections } onChange={ this.handleSectionChange } />
          }
          { ! isSelectedSectionLoading && selectedSectionSetting &&
            <LeadGenSettings fieldOptions={ { showEnableToggle } } optionName={ selectedSection } initialState={ selectedSectionSetting } />
          }
          { isSelectedSectionLoading && <Loader active inline='centered' /> }
        </Card.Content>
      </Card>
    )
  }
}
