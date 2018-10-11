
import { postApi } from "../common/api"
import DepartmentHome from "./department"
import { getApi } from '../common/api';

export const FORM_REQUEST = 'FORM_REQUEST_DEPARTMENT'
export const FORM_SUBMITTED = 'FORM_SUBMITTED_DEPARTMENT'
export const SUBMIT_FAILURE = 'SUBMIT_FAILURE_DEPARTMENT'

export const DEL_SUCCESS = 'DEL_SUCCESS_DEPARTMENT'

export const DEPARTMENT_FETCH_REQUEST = 'DEPARTMENT_FETCH_REQUEST'
export const DEPARTMENT_FETCH_SUCCESS = 'DEPARTMENT_FETCH_SUCCESS'
export const DEPARTMENT_FETCH_FAILURE = 'DEPARTMENT_FETCH_FAILURE'

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

export function departmentSubmit(formData) {

    let data = {
        'departmentId': formData.departmentId,
        'departmentName': formData.departmentName,
        'departmentDescription': formData.departmentDescription,
        'headedByUserId': formData.headedByUserId
    }
    console.log("added data is:" + data);
    // window.location.reload();
    return dispatch => {
        dispatch(requestFormData(formData));

        return postApi({
            url: 'http://localhost:6090/ahits/rest/departments/',
            dispatch,
            data,
            successCallBack: receiveFormData,
            failureCallback: submitError
        });
    }
}

export function editSubmit(formData) {
    let data = {
        'departmentId': formData.departmentId,
        'departmentName': formData.departmentName,
        'departmentDescription': formData.departmentDescription,
        'headedByUserId': formData.headedByUserId
    }

    // window.location.reload();
    return dispatch => {
        dispatch(requestFormData(formData));

        return postApi({
            url: 'http://localhost:6090/ahits/rest/departments/',
            dispatch,
            data,
            successCallBack: receiveFormData,
            failureCallback: submitError
        });
    }
}

export function deleteDepartment(id) {
    console.log("deleteDepartment is executing");
    console.log('http://localhost:6090/ahits/rest/departments/delete?departmentIds=' + id);


    return dispatch => {

        dispatch(requestFetch())

        return getApi({
            url: 'http://localhost:6090/ahits/rest/departments/delete?departmentIds=' + id,
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
export function receiveFetch(departmentData) {
    // console.log("departmentdata is: "+JSON.stringify(departmentData));

    return {
        type: DEPARTMENT_FETCH_SUCCESS,
        pending: false,
        logged: true,
        departmentData
    }
}

export function fetchError(message) {
    return {
        type: DEPARTMENT_FETCH_FAILURE,
        pending: false,
        logged: false,
        errorMessage: message
    }
}

export function requestFetch() {
    return {
        type: DEPARTMENT_FETCH_REQUEST,
        pending: true,
        logged: false
    }
}

export function getAllData() {
    return dispatch => {

        dispatch(requestFetch())

        return getApi({
            url: 'http://localhost:6090/ahits/rest/departments/all',
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
            url: 'http://localhost:6090/ahits/rest/user/users',
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





