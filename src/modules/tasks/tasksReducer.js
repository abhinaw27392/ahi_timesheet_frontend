import { FORM_REQUEST, FORM_SUBMITTED, SUBMIT_FAILURE, TASK_FETCH_SUCCESS, TASK_FETCH_FAILURE, DEL_SUCCESS } from './tasksAction'
import{ FETCH_SUCCESS } from '../authentication/loggedUser/loggedUserAction'
import { combineReducers } from 'redux'


const tasks = (state = {
    isFetching: false
}, action) => {
    switch (action.type) {
        case FORM_REQUEST:
        case FORM_SUBMITTED:
        case SUBMIT_FAILURE:
        case TASK_FETCH_SUCCESS:
        case TASK_FETCH_FAILURE:
        case DEL_SUCCESS:
        case FETCH_SUCCESS:
            return Object.assign({}, state, action);
        default:
            return state
    }
}

export const getPropsMap = (state, reducer) => {
    const props = state['tasksReducer'];
    if (props === null) return null;
    return props[reducer];
}

const tasksReducer = combineReducers({
    tasks
})
export default tasksReducer