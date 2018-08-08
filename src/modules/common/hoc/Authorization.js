// import react
import React, { Component } from 'react';
//import { Redirect } from 'react-router-dom'

// import redux
import { connect } from 'react-redux';

// import local
import { getPropsMap } from '../../authentication/authenticationReducer'
import  Home  from '../../home/Home'

/**
 * Function to check if the user has the role/permission required 
 * to access the Component
 * @param {array} allowedRoles - user roles that are allowed to see the page.
 * @param {array} groups - users security profile 
 * @returns {boolean} 
 */
export const checkRoleExists = (allowedRoles, groups) => {
    const groupObj = convertArrToObj(groups);
    return allowedRoles.some(function (element, index) {
        let secObj = groupObj[element.group]; 
        if(element.module){
          secObj = secObj ? convertArrToObj(secObj.modules) : null;
        }
        return secObj ? ( element.module ? (secObj[element.module] ? true : false) : 
                          true) : 
                        false;
    });
};


/** 
 * Function will return an object with key as the groupname and module array as value
 * or moduleName as the key and the module as the value
 * @param {array} groups - users security profile 
 * @param {string} level - the level that we want to create the object for: Group/Module 
 * @returns {array}  
 *  {'Admin':[{'id':1,'name':'Pricing','code':'PRICING'},{...}],
 * 'Report':[{...},{...}]}
 */
const convertArrToObj = (arr = []) => {
  return arr.reduce((result, item) => {
    result[item.code] = item;
    return result;
  }, {});
}

/**
 * HOC that Handles whether or not the user is allowed to see the page.
 * @param {array} allowedRoles - user roles that are allowed to see the page.
 * @returns {Component}
 */
const Authorization = (allowedRoles) => 
   WrappedComponent => {
     class WithAuthorization extends Component {
       render() {
         const { user } = this.props;        
         if(!user)
           return null;
         if (checkRoleExists(allowedRoles, user.groups)){
           return <WrappedComponent {...this.props} />;
         } else {
           this.props.history.push('/app');
           return <Home/>;
           //return <Redirect to='/' />;// Redirection loads the component again by calling the API, which I dont want
         }
       }
     };
     return connect(state => {
       return { user: getPropsMap(state, 'loggedUser').userData };
     })(WithAuthorization);
  };

  export default Authorization;
