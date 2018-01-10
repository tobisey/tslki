import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import App from './app.js'

let router = (
    <Router history={browserHistory}>
        <Route path="/" component={App}>
        </Route>
    </Router>
);


ReactDOM.render(router, document.querySelector('main'));
