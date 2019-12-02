import React from 'react';
import ReactDOM from 'react-dom';
import Amplify from 'aws-amplify';

import awsConfig from './aws-exports';
import { App } from './app';

Amplify.configure(awsConfig);

ReactDOM.render(<App />, document.getElementById('root'));
