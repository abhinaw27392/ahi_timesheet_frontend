import { postApi } from "../common/api"
import TasksHome from "./tasks"
import { getApi } from '../common/api';

export const FORM_REQUEST = 'FORM_REQUEST_TASKS'
export const FORM_SUBMITTED = 'FORM_SUBMITTED_PROJECT_TASKS'
export const SUBMIT_FAILURE = 'SUBMIT_FAILURE_PROJECT_TASKS'

// export const FETCH_RESET = 'FETCH_RESET'
// export const FETCH_REQUEST = 'TASK_FETCH_REQUEST'
// export const FETCH_SUCCESS = 'TASK_FETCH_SUCCESS'
// export const FETCH_FAILURE = 'TASK_FETCH_FAILURE'
export const DEL_SUCCESS = 'DEL_SUCCESS'

export const TASK_FETCH_REQUEST = 'TASK_FETCH_REQUEST'
export const TASK_FETCH_SUCCESS = 'TASK_FETCH_SUCCESS'
export const TASK_FETCH_FAILURE = 'TASK_FETCH_FAILURE'

export function requestFormData(formData) {
    return {
        type: FORM_REQUEST,
        isFetching: true,
        formData
    }
}

export function receiveFormData() {
    return {
        type: FORM_SUBMITTED,
        isFetching: false
    }
}
export function submitError(message) {
    return {
        type: SUBMIT_FAILURE, 
        isFetching: false,
        showErrorMessage: true,
        errorMessage: message
    }
}

export function tasksSubmit(formData) {

    let data = {
        'taskId': formData.taskId,
        'taskName': formData.taskName,
        'taskDescription': formData.taskDescription,
        'userId': formData.userId
    }
    console.log("added data is:"+data);
    // window.location.reload();
    return dispatch => {
        dispatch(requestFormData(formData));

        return postApi({
            url: '/ahits/api/tasks/',
            dispatch,
            data,
            successCallBack: receiveFormData,
            failureCallback: submitError
        });
    }
}

export function editSubmit(formData) {
    let data = {
        'taskId': formData.taskId,
        'taskName': formData.taskName,
        'taskDescription': formData.taskDescription,
        'userId': formData.userId
    }

    // window.location.reload();
    return dispatch => {
        dispatch(requestFormData(formData));

        return postApi({
            url: '/ahits/api/tasks/',
            dispatch,
            data,
            successCallBack: receiveFormData,
            failureCallback: submitError
        });
    }
}

export function deleteTask(id) {
    console.log("deleteTask is executing");
    console.log('/ahits/api/tasks/delete?taskIds=' + id);


    return dispatch => {

        dispatch(requestFetch())

        return getApi({
            url: '/ahits/api/tasks/delete?taskIds=' + id,
            dispatch,
            successCallBack: delFetch,
            failureCallback: fetchError
        });

    }
}

export function delFetch() {
    console.log("delfetch success is executing...........");
    return {
        type: DEL_SUCCESS,
        pending: false,
        delFetch: true
    }
}
export function receiveFetch(taskData) {
    console.log("taskdata is: "+JSON.stringify(taskData));

    return {
        type: TASK_FETCH_SUCCESS,
        pending: false,
        logged: true,
        taskData
    }
}

export function fetchError(message) {
    return {
        type: TASK_FETCH_FAILURE,
        pending: false,
        logged: false,
        errorMessage: message
    }
}

export function requestFetch() {
    return {
        type: TASK_FETCH_REQUEST,
        pending: true,
        logged: false
    }
}

export function getAllData() {
    return dispatch => {

        dispatch(requestFetch())

        return getApi({
            url: '/ahits/api/tasks/all',
            dispatch,
            successCallBack: receiveFetch,
            failureCallback: fetchError
        });

    }
}






