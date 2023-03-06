import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from 'react-router-dom';
import { CurrentUserProvider } from './contexts/CurrentUserContext';
import PatchStyles from 'patch-styles';
import appStyles from './App.module.css';

ReactDOM.render(
    <Router>
      <PatchStyles classNames={appStyles}>
      <CurrentUserProvider>
      <App />
      </CurrentUserProvider>
      </PatchStyles>
    </Router>,  
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

// <React.StrictMode>
// </React.StrictMode>,