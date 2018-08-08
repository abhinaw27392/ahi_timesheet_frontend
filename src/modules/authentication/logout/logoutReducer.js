import { LOGOUT_SUCCESS } from './logoutAction'

// The auth reducer. The starting state sets authentication
// based on a token being in local storage. In a real app,
// we would also want a util to check if the token is expired.
const logout = (state = {
    isFetching: false,
    isAuthenticated: false
  }, action) => {
    
  switch (action.type) {
    
    case LOGOUT_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: false
      })
      
    default:
      return state
  }
};

export default logout;