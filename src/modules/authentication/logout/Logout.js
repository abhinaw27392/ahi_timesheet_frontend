// import react
import React from 'react';
import { Redirect } from 'react-router-dom'

// import redux
import { connect } from 'react-redux'

// import local
import { logoutUser } from './logoutAction'
import { getPropsMap } from '../authenticationReducer'

class LogoutComponent extends React.Component {
    
  componentWillMount() {
      
      this.props.onLogout()
    
  }

  render() {
    //const { component: Component, pending, logged, location, ...rest } = this.props;
    // window.location.reload();
    return (
      
      <Redirect to='/auth/login' />
      
    )
  }
}

const mapStateToProps = state => {
  return getPropsMap(state, 'logout');
}

const Logout = connect( mapStateToProps,  { onLogout: logoutUser })(LogoutComponent);
export default Logout;

