
import { postApi } from "../common/api"
import EmployeeHome from "./employee"
import { getApi } from '../common/api';

export const FORM_REQUEST = 'FORM_REQUEST_EMPLOYEE'
export const FORM_SUBMITTED = 'FORM_SUBMITTED_EMPLOYEE'
export const SUBMIT_FAILURE = 'SUBMIT_FAILURE_EMPLOYEE'

export const DEL_SUCCESS = 'DEL_SUCCESS_EMPLOYEE'

export const EMPLOYEE_FETCH_REQUEST = 'EMPLOYEE_FETCH_REQUEST'
export const EMPLOYEE_FETCH_SUCCESS = 'EMPLOYEE_FETCH_SUCCESS'
export const EMPLOYEE_FETCH_FAILURE = 'EMPLOYEE_FETCH_FAILURE'

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

export function employeeSubmit(formData) {
    // console.log("supervisor res:################################################")
    // console.log(formData.supervisor);

    let data = {
        'loginId': formData.loginId,
        'firstName': formData.firstName,
        'lastName': formData.lastName,
        'dob': formData.dob,
        'designation': formData.designation,
        'joiningDate': formData.joiningDate,
        'role': formData.role,
        'supervisorId': formData.supervisorId
    }
    // console.log("added data is:" + data);
    // window.location.reload();
    return dispatch => {
        dispatch(requestFormData(formData));

        return postApi({
            url: '/ahits/rest/user/adduser',
            dispatch,
            data,
            successCallBack: receiveFormData,
            failureCallback: submitError
        });
    }
}

export function editSubmit(formData) {
    let data = {
        'id':formData.id,
        'loginId': formData.loginId,
        'firstName': formData.firstName,
        'lastName': formData.lastName,
        'dob': formData.dob,
        'designation': formData.designation,
        'joiningDate': formData.joiningDate,
        'role': formData.role,
        'supervisorId': formData.supervisorId
    }
    console.log("updated data is:");
    console.log(data);
    // window.location.reload();
    return dispatch => {
        dispatch(requestFormData(formData));

        return postApi({
            url: '/ahits/rest/user/adduser',
            dispatch,
            data,
            successCallBack: receiveFormData,
            failureCallback: submitError
        });
    }
}

export function deleteEmployee(id) {
    console.log("deleteEmployee is executing");
    console.log('/ahits/rest/employees/delete?employeeIds=' + id);


    return dispatch => {

        dispatch(requestFetch())

        return getApi({
            url: '/ahits/rest/employees/delete?employeeIds=' + id,
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
export function receiveFetch(employeeData) {
    // console.log("employeedata is: "+JSON.stringify(employeeData));

    return {
        type: EMPLOYEE_FETCH_SUCCESS,
        pending: false,
        logged: true,
        employeeData
    }
}

export function fetchError(message) {
    return {
        type: EMPLOYEE_FETCH_FAILURE,
        pending: false,
        logged: false,
        errorMessage: message
    }
}

export function requestFetch() {
    return {
        type: EMPLOYEE_FETCH_REQUEST,
        pending: true,
        logged: false
    }
}

export function getAllData() {
    return dispatch => {

        dispatch(requestFetch())

        return getApi({
            url: '/ahits/rest/employees/all',
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





