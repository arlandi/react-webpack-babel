import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import '../styles/index.scss';
import LeadGen from './LeadGen/LeadGen'

ReactDOM.render(
  <AppContainer>
    <div className='ui-container'>
      <LeadGen/>
    </div>
  </AppContainer>,
  document.getElementById( 'element-plugin-ui' )
);

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./LeadGen/LeadGen', () => {
    const NextApp = require('./LeadGen/LeadGen').default;
    ReactDOM.render(
      <AppContainer>
        <NextApp/>
      </AppContainer>,
      document.getElementById( 'element-plugin-ui' )
    );
  });
}
