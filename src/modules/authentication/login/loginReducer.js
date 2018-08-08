import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE } from './loginAction'
import { LOGOUT_REQUEST, LOGOUT_SUCCESS } from '../logout/logoutAction'

// T
// based on a token being in local storage. In a real app,he auth reducer. The starting state sets authentication
// we would also want a util to check if the token is expired.
const login = (state = {
    isFetching: false,
    isAuthenticated: false
  }, action) => {
    
  switch (action.type) {
    case LOGIN_REQUEST:
    case LOGIN_SUCCESS:
    case LOGIN_FAILURE:
    case LOGOUT_REQUEST:
    case LOGOUT_SUCCESS:
      return Object.assign({}, state, action)

    default:
      return state
  }
}

export default login

