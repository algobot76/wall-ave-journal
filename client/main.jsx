import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import App from '../imports/ui/App';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer from '../imports/ui/reducers';

import './main.scss';
const middleware = [thunk];
let store;

if (process.env.NODE_ENV === 'development') {
  middleware.push(createLogger());
  store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(...middleware))
  );
} else {
  store = createStore(rootReducer, applyMiddleware(...middleware));
}

Meteor.startup(() => {
  render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root')
  );
});
