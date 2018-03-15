import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { createStore, applyMiddleware } from 'redux';
import reduxPromise from 'redux-promise';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Provider } from 'react-redux';
import reducer from './reducer.js'
import App from './app.js'
export const store = createStore(reducer, composeWithDevTools(applyMiddleware(reduxPromise)));

var router = (
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path="/" component={App}>
            </Route>
        </Router>
    </Provider>
);

ReactDOM.render(router, document.querySelector('main'));
