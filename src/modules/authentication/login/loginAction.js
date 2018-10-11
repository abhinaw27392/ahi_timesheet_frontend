// import react

// import redux

// import third-party

// import local
import { postApi } from '../../common/api';

// import css

/*
 * 
 */

// There are three possible states for our login
// process and we need actions for each of them
export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'

// action objects
export function requestLogin(creds) {
  return {
    type: LOGIN_REQUEST,
    isFetching: true,    
    isAuthenticated: false,
    creds
  }
}

export function receiveLogin() {
  return {
    type: LOGIN_SUCCESS,
    isFetching: false,
    isAuthenticated: true,
    showErrorMessage: false
  }
}

export function loginError(message) {
  console.log("LoginError is executing.......");
  return {
    type: LOGIN_FAILURE,
    isFetching: false,
    isAuthenticated: false,
    showErrorMessage:true,
    errorMessage: message
  }
}

// thunks
export function loginUser(creds) {
  let data = new FormData();

  data.append('username', creds.username);
  data.append('password', creds.password);
  // let data = {
  //   'username': creds.username,
  //   'password': creds.password
  // }
  
  return dispatch => {
    // We dispatch requestLogin to kickoff the call to the API
    dispatch(requestLogin(creds))
    
    return postApi({
                url: 'http://localhost:6090/ahits/login',
                dispatch,
                data,
                successCallBack: receiveLogin,
                failureCallback: loginError
              });

    
  }
}