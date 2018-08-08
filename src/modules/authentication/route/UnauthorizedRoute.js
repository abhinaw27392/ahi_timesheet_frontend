import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import Login from '../login/Login'
import Logout from '../logout/Logout'


const UnauthorizedRoute = () => {
  
  return(
  
    <Switch>
      <Route path="/auth/login" component={Login} />
      <Route path="/auth/logout" component={Logout} />
      <Redirect to="/auth/login" />
    </Switch>
  
  )
}
export default UnauthorizedRoute