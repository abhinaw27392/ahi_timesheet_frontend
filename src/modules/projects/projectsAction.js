
import { postApi } from "../common/api"
import ProjectsHome from "./projects"
import { getApi } from '../common/api';

export const FORM_REQUEST = 'FORM_REQUEST_PROJECT'
export const FORM_SUBMITTED = 'FORM_SUBMITTED_PROJECT'
export const SUBMIT_FAILURE = 'SUBMIT_FAILURE_PROJECT'

export const DEL_SUCCESS = 'DEL_SUCCESS_PROJECT'

export const PROJECT_FETCH_REQUEST = 'PROJECT_FETCH_REQUEST'
export const PROJECT_FETCH_SUCCESS = 'PROJECT_FETCH_SUCCESS'
export const PROJECT_FETCH_FAILURE = 'PROJECT_FETCH_FAILURE'

export const USERS_DATA_FETCH = 'USERS_DATA_FETCH'
export const USERDATAS_REQUEST = 'USERDATAS_REQUEST'
export const USERDATA_FETCH_FAILURE = 'USERDATA_FETCH_FAILURE'

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

export function projectsSubmit(formData) {

    let data = {
        'projectId': formData.projectId,
        'projectName': formData.projectName,
        'projectDescription': formData.projectDescription,
        'headedByUserId': formData.headedByUserId
    }
    console.log("added data is:" + data);
    // window.location.reload();
    return dispatch => {
        dispatch(requestFormData(formData));

        return postApi({
            url: '/ahits/rest/projects/',
            dispatch,
            data,
            successCallBack: receiveFormData,
            failureCallback: submitError
        });
    }
}

export function editSubmit(formData) {
    let data = {
        'projectId': formData.projectId,
        'projectName': formData.projectName,
        'projectDescription': formData.projectDescription,
        'headedByUserId': formData.headedByUserId
    }

    // window.location.reload();
    return dispatch => {
        dispatch(requestFormData(formData));

        return postApi({
            url: '/ahits/rest/projects/',
            dispatch,
            data,
            successCallBack: receiveFormData,
            failureCallback: submitError
        });
    }
}

export function deleteProject(id) {
    console.log("deleteProject is executing");
    console.log('/ahits/rest/projects/delete?projectIds=' + id);


    return dispatch => {

        dispatch(requestFetch())

        return getApi({
            url: '/ahits/rest/projects/delete?projectIds=' + id,
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
export function receiveFetch(projectData) {
    // console.log("projectdata is: "+JSON.stringify(projectData));

    return {
        type: PROJECT_FETCH_SUCCESS,
        pending: false,
        logged: true,
        projectData
    }
}

export function fetchError(message) {
    return {
        type: PROJECT_FETCH_FAILURE,
        pending: false,
        logged: false,
        errorMessage: message
    }
}

export function requestFetch() {
    return {
        type: PROJECT_FETCH_REQUEST,
        pending: true,
        logged: false
    }
}

export function getAllData() {
    return dispatch => {

        dispatch(requestFetch())

        return getApi({
            url: '/ahits/rest/projects/all',
            dispatch,
            successCallBack: receiveFetch,
            failureCallback: fetchError
        });

    }
}
export function getAllUsers() {
    return dispatch => {
        dispatch(requestFetch2())

        return getApi({
            url: '/ahits/rest/user/users',
            dispatch,
            successCallBack: receiveFetch2,
            failureCallback: fetchError2
        })
    }
}
export function receiveFetch2(usersData) {

    return {
        type: USERS_DATA_FETCH,
        pending: false,
        logged: true,
        usersData
    }
}
export function requestFetch2() {
    return {
        type: USERDATAS_REQUEST,
        pending: true,
        logged: false
    }
}
export function fetchError2(message) {
    return {
        type: USERDATA_FETCH_FAILURE,
        pending: false,
        logged: false,
        errorMessage: message
    }
}





