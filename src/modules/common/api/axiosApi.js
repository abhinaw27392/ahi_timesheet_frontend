// import third-party
import axios from 'axios';

export const API_ERROR_RESET = 'API_ERROR_RESET'
export const API_ERROR = 'API_ERROR'
export const UNAUTHORIZED_ERROR = 'UNAUTHORIZED_ERROR'
export const ERROR_RESET_PAYLOAD = {unauthorized:false, error: null}

export function getApi({url, params, dispatch, successCallBack, failureCallback}) {  
    dispatch({type: API_ERROR_RESET, payload: ERROR_RESET_PAYLOAD});
    return axios.get(url)
            .then(response => {
                
                if (!response.status === 200) {
                    // If there was a problem, we want to
                    // dispatch the error condition
                    if(typeof failureCallback === 'function'){
                        dispatch(failureCallback(response.statusText))
                    }else{
                        // handle other cases like application error/ authentication authorization
                        // Dispatch the generic "global errors" action
                        // This is what makes its way into state.errors
                        dispatch({type: API_ERROR, error: response});
                    
                    }
                    
                } else {
                    // Dispatch the success action
                    if(typeof successCallBack === 'function'){
                        dispatch(successCallBack(response.data, params))
                    }else{
                        return new Promise(res => res(response.data));
                    }
                }
            }
        ).catch(function (error) {
            //console.log("Get API Error: ", error);
            if(typeof failureCallback === 'function'){
                dispatch(failureCallback(error.response.statusText))
            }
            if (error.response.status === 401) {//Unauthorized 
                dispatch({type: UNAUTHORIZED_ERROR, error: error});
            }else{
                let errorObj = {status : error.response.status, errorMsg : error.response.data};
                dispatch({type: API_ERROR, error: errorObj});
            }
            
        })

}

export function postApi({url, dispatch, data, successCallBack, failureCallback}) {  
    
    dispatch({type: API_ERROR_RESET, payload: ERROR_RESET_PAYLOAD});
    return axios.post(url, data)
            .then(response => {
                
                if (!response.status === 200) {
                    // If there was a problem, we want to
                    // dispatch the error condition
                    if(typeof failureCallback === 'function'){
                        dispatch(failureCallback(response.statusText))
                    }else{
                        // handle other cases like application error/ authentication authorization
                        // Dispatch the generic "global errors" action
                        // This is what makes its way into state.errors
                        dispatch({type: API_ERROR, error: response});
                    }
                } else {
                    // Dispatch the success action
                    if(typeof successCallBack === 'function'){
                        dispatch(successCallBack(response.data))
                    }
                }
            }
        ).catch(function (error) {
            //console.log("POST API Error: ", error);
            if(typeof failureCallback === 'function'){
                dispatch(failureCallback(error.response.statusText))
            }
            if (error.response.status === 401) {//Unauthorized 
                dispatch({type: UNAUTHORIZED_ERROR, error: error});
            }else{
                let errorObj = {status : error.response.status, errorMsg : error.response.data};
                dispatch({type: API_ERROR, error: errorObj});
            }
            
        })
          
}