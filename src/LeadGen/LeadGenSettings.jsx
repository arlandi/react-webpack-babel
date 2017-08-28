import React from 'react';
import { Tab, Form, Checkbox, Button } from 'semantic-ui-react';
import { updateOption } from '../dataHelper';

const languageMap = {
  'top_recirc': 'Lead gen tout to be injected in the top recirc at the specified index',
  'right_rail_one': 'Lead gen module that will be displayed first in the right rail',
  'right_rail_two': 'Lead gen module that will be displayed second in the right rail',
  'right_rail_tout': 'Lead gen tout to be injected in the 4th index of the right rail latest feed module',
  'bottom_recirc': 'Lead gen module that will be displayed below the article (after outbrain)',
}

export default class LeadGenSettings extends React.Component {

  state = {
    top_recirc: {},
    right_rail_one: {},
    right_rail_two: {},
    right_rail_tout: {},
    bottom_recirc: {},
    enabled: false,
  }

  constructor( props ) {
    super();
    if ( 'object' === typeof props.initialState ) {
      this.state = props.initialState;
    }
  }

  handleSave = () => {
    updateOption( this.props.optionName, this.state ).then( ( data ) => console.log( data ) );
  }

  handleSettingChange = ( location, key, value ) => {
    this.setState( ( prevState ) => {
      return {
        ...prevState,
        [ location ]: {
          ...prevState[ location ],
          [ key ]: value,
        },
      };
    } );
  }

  getFields = ( location, options = {} ) => {
    const { showModuleTitle, showIndexSelect } = options;
    const { module_type, feed_endpoint, mobile_feed_endpoint, module_title, tout_index } = this.state[ location ];
    const moduleTypes = [
      { key: 'none',           text: 'None',           value: 'none', },
      { key: 'compare_cards',  text: 'Compare Cards',  value: 'compare_cards', },
      { key: 'consumer_track', text: 'Consumer Track', value: 'consumer_track', },
      { key: 'dianomi',        text: 'Dianomi',        value: 'dianomi', },
      { key: 'ideal',          text: 'Ideal',          value: 'ideal', },
    ];
    const indexOptions = [
      { key: 1, text: 1, value: 1 },
      { key: 2, text: 2, value: 2 },
      { key: 3, text: 3, value: 3 },
      { key: 4, text: 4, value: 4 },
    ];

    return (
      <Form>
        <h3>{ languageMap[ location ] }</h3>
        <Form.Group>
          <Form.Select label='Module Type' options={ moduleTypes } value={ module_type } onChange={ ( e, data ) => this.handleSettingChange( location, 'module_type', data.value ) } />
          { showIndexSelect && <Form.Select label='Tout Index' options={ indexOptions } value={ tout_index } onChange={ ( e, data ) => this.handleSettingChange( location, 'tout_index', data.value ) } /> }
        </Form.Group>
        { showModuleTitle && <Form.Input label='Module Title' value={ module_title } onChange={ ( e, data ) => this.handleSettingChange( location, 'module_title', data.value ) } /> }
        <Form.Input label='Desktop Endpoint' value={ feed_endpoint } onChange={ ( e, data ) => this.handleSettingChange( location, 'feed_endpoint', data.value ) } />
        <Form.Input label='Mobile Endpoint' value={ mobile_feed_endpoint } onChange={ ( e, data ) => this.handleSettingChange( location, 'mobile_feed_endpoint', data.value ) } />
      </Form>
    );
  }

  panes = () => {
    const showModuleTitle = true;
    const showIndexSelect = true;

    return [
      { menuItem: 'Top Recirc Tout', render: () => <Tab.Pane key={ 1 } >{ this.getFields( 'top_recirc', { showIndexSelect } ) }</Tab.Pane> },
      { menuItem: 'Right Rail Module 1', render: () => <Tab.Pane key={ 2 } >{ this.getFields( 'right_rail_one', { showModuleTitle } ) }</Tab.Pane> },
      { menuItem: 'Right Rail Module 2', render: () => <Tab.Pane key={ 3 } >{ this.getFields( 'right_rail_two', { showModuleTitle } ) }</Tab.Pane> },
      { menuItem: 'Right Rail Tout', render: () => <Tab.Pane key={ 4 } >{ this.getFields( 'right_rail_tout', { showModuleTitle } ) }</Tab.Pane> },
      { menuItem: 'Bottom Recirc', render: () => <Tab.Pane key={ 5 } >{ this.getFields( 'bottom_recirc', { showModuleTitle } ) }</Tab.Pane> },
    ];
  }

  render () {
    const { showEnableToggle } = this.props.fieldOptions || {};

    return (
      <div className='lead-gen-settings'>
        { showEnableToggle && <Checkbox label='Enable Lead Gen' checked={ this.state.enabled } onChange={ ( e, data ) => this.setState( { enabled: ! this.state.enabled } ) } /> }
        <Tab menu={ { fluid: true, vertical: true, tabular: 'left' } } panes={ this.panes() } />
        <Button size='large' primary onClick={ this.handleSave }>Save</Button>
      </div>
    );
  }
}