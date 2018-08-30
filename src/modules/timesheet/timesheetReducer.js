import {
    FORM_REQUEST, FORM_SUBMITTED, SUBMIT_FAILURE, PROJECT_DATA_FETCH_SUCCESS,
    PROJECT_DATA_FETCH_FAILURE, TIMESHEET_DATA_FETCH_FAILURE, TIMESHEET_DATA_FETCH_SUCCESS
} from './timesheetAction'
import { combineReducers } from 'redux';


const timesheet = (state = {
    isFetching: false
}, action) => {
    switch (action.type) {
        case FORM_REQUEST:
        case FORM_SUBMITTED:
        case SUBMIT_FAILURE:
        case PROJECT_DATA_FETCH_SUCCESS:
        case PROJECT_DATA_FETCH_FAILURE:
        case TIMESHEET_DATA_FETCH_SUCCESS:
        case TIMESHEET_DATA_FETCH_FAILURE:
            return Object.assign({}, state, action)
        default:
            return state
    }
}

export const getPropsMap = (state, reducer) => {
    const props = state['timesheetReducer'];
    if (props === null) return null;
    return props[reducer];
}

const timesheetReducer = combineReducers({
    timesheet
})
export default timesheetReducer