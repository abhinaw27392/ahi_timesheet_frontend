import { combineReducers } from 'redux'
import login from './login/loginReducer'
import logout from './logout/logoutReducer'
import loggedUser from './loggedUser/loggedUserReducer'

const authenticationReducer = combineReducers({  
  login,
  logout,
  loggedUser  
})

export const  getPropsMap = (state, reducer) => {
  const props = state['authenticationReducer']; 
  if(props === null) return null;
  return props[reducer];
}

export default authenticationReducer