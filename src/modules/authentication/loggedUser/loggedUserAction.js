// import third-party

// import local
import { getApi } from '../../common/api';

// There are three possible states for our login
// process and we need actions for each of them
export const FETCH_RESET = 'FETCH_RESET'
export const FETCH_REQUEST = 'FETCH_REQUEST'
export const FETCH_SUCCESS = 'FETCH_SUCCESS'
export const FETCH_FAILURE = 'FETCH_FAILURE'

// action objects
export function requestFetchReset() {  
  return {
    type: FETCH_RESET,    
    pending: true,    
    logged: false
  }
}

export function requestFetch() {
  return {
    type: FETCH_REQUEST,    
    pending: true,    
    logged: false
  }
}

export function receiveFetch(userData) {
  console.log("userData : "+userData);
  return {
    type: FETCH_SUCCESS,
    pending: false,
    logged: true,
    userData
  }
}

export function fetchError(message) {
  return {
    type: FETCH_FAILURE,
    pending: false,
    logged: false,
    errorMessage:message
  }
}

// thunks
export function getLoggedUser() {
  
  return dispatch => {
    
    dispatch(requestFetch())

    return getApi({
                  url: '/ahits/rest/user/userdetails',
                  dispatch,
                  successCallBack: receiveFetch,
                  failureCallback: fetchError
                });
    
  }
  
}