// import react
import React from 'react';
import { Route, Redirect } from 'react-router-dom'

// import redux
import { connect } from 'react-redux'

// import local
import { receiveLogout } from '../logout/logoutAction'
import {requestFetchReset, getLoggedUser} from '../loggedUser/loggedUserAction'
import { getPropsMap } from '../authenticationReducer'


class AuthorizedRouteComponent extends React.Component {
  
  componentWillUnmount () {
    this.props.resetFetch();
  }
  componentDidMount() {
    this.props.getUser();    
  }

  render() {
    
    const { component: Component, pending, location, ...rest } = this.props;
    const { children:routes } = this.props;
    
    return (
      <Route {...rest} render={props => {
        if (pending) {return <div>Loading...</div>}
        else{
          if(rest.errors.unauthorized){
            rest.logout(); 
            return <Redirect to={{
                          pathname: '/auth/login',
                          state: { referrer: location }
                        }}/>   
          }else{
            return <Component {...this.props} />;
          }             
        }
      }} />
    )
  }
}

const mapStateToProps = state => {
  
  const loggedUserPropsMap = getPropsMap(state, 'loggedUser');
  const maps = { ...loggedUserPropsMap, errors: state.errors} ;
  return maps;
}

const AuthorizedRoute = connect(mapStateToProps, { getUser: getLoggedUser, resetFetch: requestFetchReset, logout: receiveLogout })(AuthorizedRouteComponent);

export default AuthorizedRoute
