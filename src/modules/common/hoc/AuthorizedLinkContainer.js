
// import react
import React, { Component } from 'react';
//import { Redirect } from 'react-router-dom'

// import redux
import { connect } from 'react-redux';

// import third-party
import { LinkContainer } from 'react-router-bootstrap'

//import local
import { checkRoleExists } from './Authorization'  
import { getPropsMap } from '../../authentication/authenticationReducer'
/**
 * HOC that Handles whether or not the user is allowed to see the page.
 * @param {array} allowedRoles - user roles that are allowed to see the page.
 * @returns {Component}
 */

class AuthorizedLink extends Component {
    render() {
        const { user, allowedRoles, dispatch, ...rest } = this.props;        
        
        if (checkRoleExists(allowedRoles, user.groups)){
            return <LinkContainer {...rest} />;
        } else {
            return null;
        }
    }
};

const AuthorizedLinkContainer = connect(state => {
       return { user: getPropsMap(state, 'loggedUser').userData };
     })(AuthorizedLink);

export default AuthorizedLinkContainer;
