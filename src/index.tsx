import React from 'react';
import ReactDOM from 'react-dom';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import App from './App';

import { reducer, StateProvider } from './state';

ReactDOM.render(
  <StateProvider reducer={reducer}>
    <App />
  </StateProvider>,
  document.getElementById('root')
);
