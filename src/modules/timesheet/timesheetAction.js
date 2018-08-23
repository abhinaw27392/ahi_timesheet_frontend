import { postApi1, getApi } from "../common/api"

export let dates = []; export let prevDay = "";
export let type1 = []; export let type2 = []; export let type3 = [];
export let type4 = []; export let type5 = [];
export let ctr = 0;
export let rowCountArr = [];
export let rowCount = 0;

export const FORM_REQUEST = 'FORM_REQUEST_TS'
export const FORM_SUBMITTED = 'FORM_SUBMITTED_TS'
export const SUBMIT_FAILURE = 'SUBMIT_FAILURE_TS'
export const PROJECT_DATA_FETCH_FAILURE = 'PROJECT_DATA_FETCH_FAILURE';
export const PROJECT_DATA_FETCH_SUCCESS = 'PROJECT_DATA_FETCH_SUCCESS';


export function fetchError(message) {
    return {
        type: PROJECT_DATA_FETCH_FAILURE,
        pending: false,
        logged: false,
        errorMessage: message
    }
}

export function receiveFetch(projectData) {
    console.log("projectdata is: " + JSON.stringify(projectData));

    return {
        type: PROJECT_DATA_FETCH_SUCCESS,
        pending: false,
        logged: true,
        projectData
    }
}

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
        type: SUBMIT_FAILURE, SUBMIT_FAILURE,
        isFetching: false,
        showErrorMessage: true,
        errorMessage: message
    }
}

export function timesheetSubmit(formData) {
    console.log("formdata is:")
    console.log(formData);

    return dispatch => {
        return postApi1({
            url: '/ahits/api/timesheet/',
            dispatch,
            data: JSON.stringify(formData),
            successCallBack: receiveFormData,
            failureCallback: submitError
        });
    }
}

export function displayDates() {
    dates.length = 0;
    type1 = []; type2 = []; type3 = []; type4 = []; type5 = [];
    let j = ctr;
    if (ctr <= 20) {
        for (let i = j + 6; i >= j; i--) {
            prevDay = new Date(new Date().setDate(new Date().getDate() - i));
            dates.push(prevDay);
            type1.push("a" + i); type2.push("b" + i); type3.push("c" + i); type4.push("d" + i); type5.push("e" + i);
            ctr++;
        }
    }
    // console.log(type1);
    // console.log(dates);
    return dates;
}

export function displayNextDates() {
    dates.length = 0; ctr = ctr - 14;
    type1 = [];
    let j = ctr;
    if (ctr <= 20) {
        for (let i = j + 6; i >= j; i--) {
            prevDay = new Date(new Date().setDate(new Date().getDate() - i));
            dates.push(prevDay);
            type1.push("a" + i);
            ctr++;
        }
    }
    // console.log(type1);
    // console.log(dates);
    return dates;
}

export function addrowToTable() {

    rowCount++;
    rowCountArr.push(rowCount);
    // console.log(rowCount);
    return rowCountArr;
}

export function remomeRowFromTable() {
    rowCountArr.pop();
    rowCount--;
    return rowCountArr;
}

export function getRowTypes(type) {
    let typenew = Array.from(type);
    // console.log("get rowtypes array:" + typenew);
    return typenew;
}

export function getProjectData(empId) {
    return dispatch => {
        return getApi({
            url: '/ahits/api/timesheet/projectData/?empId=' + empId,
            dispatch,
            successCallBack: receiveFetch,
            failureCallback: fetchError
        });

    }
}