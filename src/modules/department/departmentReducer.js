import { FORM_REQUEST, FORM_SUBMITTED, SUBMIT_FAILURE, DEPARTMENT_FETCH_SUCCESS, DEPARTMENT_FETCH_FAILURE, DEL_SUCCESS,
    USERS_DATA_FETCH, USERDATA_FETCH_FAILURE   } from './departmentAction'
import{ FETCH_SUCCESS } from '../authentication/loggedUser/loggedUserAction'
import { combineReducers } from 'redux'

const department = (state = {
    isFetching: false
}, action) => {
    switch (action.type) {
        case FORM_REQUEST:
        case FORM_SUBMITTED:
        case SUBMIT_FAILURE:
        case DEPARTMENT_FETCH_SUCCESS:
        case DEPARTMENT_FETCH_FAILURE:
        case DEL_SUCCESS:
        case FETCH_SUCCESS:
        case USERS_DATA_FETCH:
        case USERDATA_FETCH_FAILURE:
            return Object.assign({}, state, action)
        default:
            return state
    }
}

export const getPropsMap = (state, reducer) => {
    const props = state['departmentReducer'];
    if (props === null) return null;
    return props[reducer];
}

const departmentReducer = combineReducers({
    department
})
export default departmentReducer