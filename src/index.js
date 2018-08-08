import React from 'react';
import { render } from 'react-dom'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'

import { Provider } from 'react-redux'
//------------------------

import '../node_modules/font-awesome/css/font-awesome.min.css';

import UnauthorizedRoute from './modules/authentication/route/UnauthorizedRoute';
import AuthorizedRoute from './modules/authentication/route/AuthorizedRoute';
import configureStore from './store/configureStore';
import App from './modules/App'
import './index.scss'


import { Modal } from 'react-overlays';

Modal.prototype.componentWillMount = function () {
    this.focus = () => { }; 
};


let rootElement = document.getElementById('tsApp')

render(
    <Provider store={configureStore()}>
        <BrowserRouter basename="/ahits" >
            <Switch>
                <Route path="/auth" component={UnauthorizedRoute} /> 
                <AuthorizedRoute path="/app" component={App} />
                {/* <Route path="/app" component={App} />   */}
                <Redirect to="/app" />
            </Switch>
        </BrowserRouter>
    </Provider>,
    rootElement
);

