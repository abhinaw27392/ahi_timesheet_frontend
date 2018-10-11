
//import react
import React from 'react'

//import redux
import { connect } from 'react-redux'

//import third-party 
import { Alert, Form, FormControl, FormGroup, Table } from 'react-bootstrap'
import Time from 'react-time'

//import local
import { getPropsMap } from './timesheetReducer'
import {
  displayDates, timesheetSubmit, displayNextDates, addrowToTable, getAllData,
  remomeRowFromTable, getRowTypes, getProjectData, getTaskData, makeRowCountZero
} from './timesheetAction'
import { type1, ctr } from './timesheetAction'
import { getLoggedUser } from './../authentication/loggedUser/loggedUserAction'

//import css
import './timesheet.css'

let dateDatas = displayDates();

let addRow = [];
let type = getRowTypes(type1);

let inputRefs = {
  data: []
}

let items1 = {};
let disable = false; let disable1 = false;
let rowcount = 0; let projectTaskName = [];
let projectTaskName1 = [];
let columnCount = 0; let taskDate; let taskValue = ''; let taskValueArr = [];
let projectName = ''; let taskName = ''; let keyArr = [];
let dateArr = [];
let dateArrMonth; let datefirst; let datelast;
let showSubmit = true; let showPlus = true; let showMinus = true;
let ctr3 = 1;
let addRowShow = false; let counter = 0;
// let showRow = false;

class TimeSheet extends React.Component {

  constructor(props) {

    super(props);
    console.log("this.props:");
    console.log(this.props);
    this.prevDate = this.prevDate.bind(this);
    this.nextDate = this.nextDate.bind(this);
    this.getNewRow = this.getNewRow.bind(this);
    this.reduceOneRow = this.reduceOneRow.bind(this);
  }

  componentDidMount() {
    this.getDateRange();
    if (this.props.userData != null) {
      console.log("this.props.userData.id:" + this.props.userData.id);
      this.props.getAllData(this.props.userData.id, datefirst, datelast);
      this.props.getProjectData();
      this.props.getTaskData(this.props.userData.id);
    }
  }


  getDateRange() {
    datefirst = new Date(dateDatas[0]);
    dateArrMonth = datefirst.getMonth() + 1;
    datefirst = datefirst.getDate() + "-" + dateArrMonth + "-" + datefirst.getFullYear();

    datelast = new Date(dateDatas[dateDatas.length - 1]);
    dateArrMonth = datelast.getMonth() + 1;
    datelast = datelast.getDate() + "-" + dateArrMonth + "-" + datelast.getFullYear();
  }
  getNewRow() {

    addRow = addrowToTable();
    type = getRowTypes(type1);
    this.forceUpdate();
    return addRow;
  }

  reduceOneRow() {
    rowcount--;
    addRow = remomeRowFromTable();
    if (0 == addRow.length) {
      counter = 0;
    }
    this.forceUpdate();
  }


  prevDate() {

    makeRowCountZero();
    rowcount = 0;
    counter = 0;
    addRow.length = 0;
    dateArr.length = 0;


    if (ctr > 14) {
      disable = true;

    }

    if (ctr <= 14) {
      disable1 = false;
      dateDatas = displayDates();
    }

    if (this.props.myMap != null) {
      ctr3 = 1;
    }
    console.log(dateDatas);
    this.getDateRange();
    if (this.props.userData != null) {
      let timesheetdatas = this.props.getAllData(this.props.userData.id, datefirst, datelast);
      console.log("timesheetdatas:" + JSON.stringify(timesheetdatas));
    }

    console.log("datearray is:" + dateArr);

  }

  nextDate() {

    makeRowCountZero();
    rowcount = 0;
    counter = 0;
    addRow.length = 0;
    dateArr.length = 0;

    if (ctr < 14) {
      disable1 = true;
    }

    if (ctr >= 14) {
      disable = false;
      dateDatas = displayNextDates();
    }

    console.log(dateDatas);
    this.getDateRange();
    if (this.props.userData != null) {
      let timesheetdatas = this.props.getAllData(this.props.userData.id, datefirst, datelast);
      console.log("timesheetdatas:" + JSON.stringify(timesheetdatas));
    }

    console.log("datearray is:" + dateArr);
  }


  render() {

    const { handleSubmit, errorMessage, myMap, projectData, taskData, userData, getAllData } = this.props;
    let idArr = [];

    taskValueArr.length = 0;

    console.log("userData is:" + JSON.stringify(userData));

    let enableAddRow = () => {
      counter = 1;
      addRowShow = true;
      addRow.length = 0;
      return this.getNewRow();
    }

    if (myMap != undefined && myMap.size == 0) {
      addRowShow = true;

    }


    if (myMap != null) {
      keyArr.length = 0;
      rowcount = 0;
      myMap.forEach((value, key) => {
        keyArr.push(key);
      })

      console.log("keyarr is:");
      console.log(keyArr);
    }


    if (ctr3 == 1 && myMap != null && myMap.size == 0) {
      addRow = this.getNewRow();
      ctr3 = 2;
    }

    let projectNameInput = []; let taskNameInput = []; let tempArr = [];

    let placeholderValue = ''; let index = 0;


    return (

      <Form className="ahi-timesheet-form" onSubmit={(e) => {
        e.preventDefault();
        // ------------------------------------------------getting data for given range of date----------------------
        // this.getDateRange();
        // if (this.props.userData != null) {
        //   let timesheetdatas = this.props.getAllData(this.props.userData.id, datefirst, datelast);
        //   console.log("timesheetdatas:" + JSON.stringify(timesheetdatas));
        // }

        inputRefs.data.length = 0;

        //--------------------------------------data submission for empty fields-----------------------------------------------------

        if (myMap.size == 0) {
          let m = 0; let n = 0; let count = 0; let m1 = 0;

          for (m = 0; m < projectNameInput.length; m++) {
            items1 = {};
            items1.projectName = projectNameInput[m].value;
            items1.taskName = taskNameInput[m].value;

            for (n = count, m1 = 0; n < count + 7; n++ , m1++) {
              items1[m1] = tempArr[n].value;
            }
            count = count + 7;
            inputRefs.data.push(items1);
          }
        }

        //-------------------------------------------edited data submit-------------------------------------------------------
        else {

          if (myMap != null) {
            let m = 0; let count = 0; let m1 = 0; let n = 0; let m2 = 0; let m3 = 0;
            myMap.forEach((value, key) => {
              console.log("value is:" + JSON.stringify(value));
              items1 = {};
              projectTaskName1 = key.split("-");

              if (projectNameInput[m].value == 'select' && taskNameInput[m].value == 'select') {
                items1.projectName = projectTaskName1[0];
                items1.taskName = projectTaskName1[1];
              }

              else if (projectNameInput[m].value == 'select' && taskNameInput[m].value != 'select') {
                items1.projectName = projectTaskName1[0];
                items1.taskName = taskNameInput[m].value;
              }

              else if (projectNameInput[m].value != 'select' && taskNameInput[m].value == 'select') {
                items1.projectName = projectNameInput[m].value;
                items1.taskName = projectTaskName1[1];
              }

              else if (projectNameInput[m].value != 'select' && taskNameInput[m].value != 'select') {
                items1.projectName = projectNameInput[m].value;
                items1.taskName = taskNameInput[m].value;
              }


              console.log("taskValueArr is:");
              console.log(taskValueArr);
              for (n = count, m1 = 0, m2 = 0; n < count + 7; n++ , m1++ , m3++) {

                if (tempArr[m3].value != '' && taskValueArr[m3] == false) {
                  items1[m1] = tempArr[m3].value;
                  console.log("items1[" + m1 + "]:" + items1[m1]);
                  //  console.log("tempArr["+m3+"].value:"+tempArr[m3].value);
                  console.log("taskValueArr is:" + taskValueArr[m3]);
                }

                else if (tempArr[m3].value != '' && taskValueArr[m3] == true) {
                  items1[m1] = tempArr[m3].value;
                  console.log("items1[" + m1 + "]:" + items1[m1]);
                  // console.log("tempArr["+m3+"].value:"+tempArr[m3].value);
                  console.log("taskValueArr is:" + taskValueArr[m3]);
                  m2++;
                }

                else {

                  if (taskValueArr[m3] == false) {
                    items1[m1] = "";
                    console.log("items [" + m1 + "]:" + items1[m1]);
                    console.log("taskValueArr is:" + taskValueArr[m3]);

                  }

                  else if (m2 < value.length && taskValueArr[m3] == true) {
                    items1[m1] = value[m2].value;
                    console.log("value of items1" + m1 + "is:" + items1[m1]);
                    console.log("taskValueArr is:" + taskValueArr[m3]);
                    items1.id = idArr[m2];
                    m2++;
                  }
                }
              }
              inputRefs.data.push(items1);
              m++;
            });

            //-----------------------------------------new row data submission in edited form-----------------------------------------

            let m4 = 0; let n4 = 0; let count4 = 0; let m14 = 0; 

            
            for (m4 = 0; m4 < (projectNameInput.length - myMap.size); m4++) {

              console.log("projectNameInput" +( m4 + myMap.size )+":"+ projectNameInput[m4 + myMap.size].value);
          
              items1 = {};
              items1.projectName = projectNameInput[m4 + myMap.size].value;
              items1.taskName = taskNameInput[m4 + myMap.size].value;

              for (n4 = count4, m14 = 0; n4 < count4 + 7; n4++ , m14++) {
                items1[m14] = tempArr[m3].value;
                m3++;
              }

              count4 = count4 + 7;
              inputRefs.data.push(items1);

            }
            console.log("inputrefs:");
            console.log(inputRefs.data);
          }

        }


        //---------------------------------------------array manipulation for data submission--------------------------------


        let dataArr = []; let i = 0; let k = 0; let dataCount = 0; let projectTaskData = [];
        projectTaskData.length = 0;

        console.log(inputRefs.data);
        inputRefs.data.map((fdata) => {
          
          for (let i = 0; i < projectTaskData.length; i++) {

            if (fdata.projectName != "select" && fdata.taskName != "select" && projectTaskData[i] == fdata.projectName + "-" + fdata.taskName) {
              dataCount = 1;
              // console.log(projectTaskData);
              alert("projectName and taskName is repeating");

            }
          }

          if (fdata.projectName != "select" && fdata.taskName != "select") {

            for (i = 0; i < 7; i++) {
              let data = {}

              if (fdata[i] != undefined && ("" + fdata[i] + "") != "" && userData != null) {
                console.log("fdata is:" + "" + fdata[i] + "");
                if (fdata[i] < 0) {
                  dataArr.length = 0;
                  dataCount = 1;
                  alert("data must be greater then or equal to zero");
                  break;
                }

                else if (fdata[i] >= 10) {
                  dataArr.length = 0;
                  dataCount = 1;
                  alert("data must be less than working hours");
                  break;
                }

                else {

                  data.id = idArr[k];
                  k++;
                  data.projectName = fdata.projectName;
                  data.taskName = fdata.taskName;
                  data.date = dateArr[i];
                  data.totalHours = fdata[i];
                  data.empId = userData.id;
                  dataArr.push(data);



                }

              }

            }
          }
          if (fdata.projectName == "select" || fdata.taskName == "select") {
            dataCount = 1;
            alert("projectName/taskName should not be select");

          }


          projectTaskData.push(fdata.projectName + "-" + fdata.taskName);
          console.log(projectTaskData);
        });

        if (dataArr.length > 0 && dataCount == 0) {
          let isSubmit = window.confirm("Do you really want to submit the form?");

          if (isSubmit) {
            console.log("dataArray is:" + JSON.stringify(dataArr));

            handleSubmit(dataArr);

            //-------------------------------for data refresh-----------------------
            // console.log("datedatas is:");
            // console.log(dateDatas);
            // this.getDateRange();
            // if (userData != null) {
            //   getAllData(userData.id, datefirst, datelast);
            // }
            //---------------------------------------------------------------------
            showSubmit = false; showPlus = false; showMinus = false;
            alert("your data is successfully submitted!");

            // window.location.reload();
          }

          else {
            alert("form submission failed!");

            // window.location.reload();
          }
        }


      }
      }>
        <FormGroup >
          {errorMessage ? (<Alert bsStyle="danger"><strong>Error!</strong> {errorMessage}</Alert>) : null}
        </FormGroup>
        {
          <Table responsive hover type="number">
            <thead className="panel panel-heading">
              <tr>
                <th><button className="leftShift btn btn-primary" type="button" disabled={disable} title="Prev" onClick={this.prevDate} >>>></button></th>
                <th >Project</th>
                <th >TaskName</th>
                {dateDatas.map(function (date) {
                  dateArr.push(date);

                  return <th ><Time value={date} format="DD-MMM-YY" className="workType-width" /></th>
                })}
                <th><button className="btn btn-primary" type="button" disabled={disable1} title="Next" onClick={this.nextDate} >>>></button></th>
              </tr>
            </thead>
            <tbody >


              {/* -------------------------------------------------edited text fields in table body----------------------------------------------- */}


              {myMap != null &&
                keyArr.map((key) => {
                  console.log("rowcount in edited form:" + rowcount + '   ' + "keyArr.length:" + keyArr.length);
                  showSubmit = true;
                  rowcount++;

                  if (key != null) {
                    projectTaskName = key.split("-");
                    projectName = projectTaskName[0];
                    taskName = projectTaskName[1];
                    columnCount = 0;
                  }

                  return <tr>
                    <td>
                      {rowcount == keyArr.length && counter == 0 &&
                        <button type="button" className="btn btn-info" onClick={enableAddRow} >+</button>
                      }
                    </td>
                    <td>
                      <FormControl componentClass="select" placeholder={projectName} inputRef={
                        (ref) => {
                          if (ref != null) {
                            projectNameInput.push(ref);
                          }
                        }
                      }>
                        <option value="select" >{projectName}</option>
                        {projectData != null &&
                          projectData.map(res => {
                            if (res.projectName != projectName)
                              return <option value={res.projectName}>{res.projectName}</option>
                          })
                        }

                      </FormControl>
                    </td>
                    <td>
                      <FormControl componentClass="select" placeholder={taskName} inputRef={
                        (ref) => {
                          if (ref != null) {
                            taskNameInput.push(ref);
                          }
                        }
                      }>
                        <option value="select" >{taskName}</option>
                        {taskData != null &&
                          taskData.map(res => {
                            if (res.taskName != taskName)
                              return <option value={res.taskName}>{res.taskName}</option>
                          })
                        }

                      </FormControl>
                    </td>

                    {type.map(function (name) {
                      // console.log("type array is:");
                      // console.log(type);

                      taskValue = null;

                      for (var v of myMap.get(key)) {
                        let taskMonth; let dateArrMonth; let dateNew;

                        taskDate = new Date(v.date);
                        taskMonth = taskDate.getMonth() + 1;
                        taskDate = taskDate.getDate() + "-" + taskMonth + "-" + taskDate.getFullYear();

                        dateNew = new Date(dateArr[columnCount]);
                        dateArrMonth = dateNew.getMonth() + 1;
                        dateNew = dateNew.getDate() + "-" + dateArrMonth + "-" + dateNew.getFullYear();

                        if (taskDate == dateNew) {
                          taskValue = v.value;
                          taskValueArr.push(true);
                          idArr.push(v.id);
                          break;
                        }
                      }
                      columnCount++;
                      if (taskValue == null) {
                        taskValueArr.push(false);
                      }
                      return <td>
                        <FormControl type="number" name={name} placeholder={taskValue}
                          inputRef={(ref) => {
                            if (ref != null) {
                              tempArr.push(ref);

                            }
                          }}
                        />
                        <FormControl.Feedback />
                      </td>
                    }

                    )}

                    <td>
                    </td>
                  </tr>
                })
              }

              {/* ---------------------------------------------Empty row in table body-------------------------------------------------- */}


              {myMap != null && addRowShow == true &&

                addRow.map((rowcount) => {
                  console.log("rowcount:" + rowcount + '  ' + "addRow.length" + addRow.length);

                  showSubmit = false;
                  return <tr>
                    <td>
                      {myMap.size == 0 && rowcount == addRow.length &&
                        <button type="button" className="btn btn-info" onClick={this.getNewRow} >+</button>
                      }
                      {rowcount - 1 == addRow.length && myMap.size == 0 &&
                        <button type="button" className="btn btn-info" onClick={this.getNewRow} >+</button>
                      }
                      {rowcount == addRow.length && myMap.size != 0 &&
                        <button type="button" className="btn btn-info" onClick={this.getNewRow} >+</button>
                      }

                      {/* <button type="button" className="btn btn-info" onClick={this.getNewRow} >+</button> */}

                    </td>
                    <td>
                      <FormControl componentClass="select" placeholder="select" inputRef={
                        (ref) => {
                          if (ref != null) {
                            projectNameInput.push(ref);
                          }

                        }
                      }>
                        <option value="select" >select</option>
                        {projectData != null &&
                          projectData.map(res => {
                            return <option value={res.projectName}>{res.projectName}</option>
                          })
                        }

                      </FormControl>
                    </td>
                    <td>
                      <FormControl componentClass="select" placeholder="select" inputRef={
                        (ref) => {
                          if (ref != null)
                            taskNameInput.push(ref);
                        }
                      }>
                        <option value="select" >select</option>
                        {taskData != null &&
                          taskData.map(res => {
                            return <option value={res.taskName}>{res.taskName}</option>
                          })
                        }

                      </FormControl>
                    </td>

                    {

                      type.map(function (name) {
                        return <td >
                          <FormGroup>

                            <FormControl type="number" name={name}
                              inputRef={(ref) => {
                                if (ref != null) {
                                  tempArr.push(ref);
                                }
                              }}
                            />
                            <FormControl.Feedback />
                          </FormGroup>
                        </td>
                      }
                      )}
                    <td>
                      {myMap.size == 0 && rowcount == addRow.length && rowcount > 1 &&
                        <button type="button" className="btn btn-danger" onClick={this.reduceOneRow} >-</button>
                      }
                      {rowcount > 1 && rowcount - 1 == addRow.length && myMap.size == 0 &&
                        <button type="button" className="btn btn-danger" onClick={this.reduceOneRow} >-</button>
                      }
                      {rowcount == addRow.length && myMap.size != 0 &&
                        <button type="button" className="btn btn-danger" onClick={this.reduceOneRow} >-</button>
                      }
                      {/* {projectNameInput.length == (addRow.length + myMap.size) && 
                        <button type="button" className="btn btn-danger" onClick={this.reduceOneRow} >-</button>
                      } */}


                    </td>
                  </tr>
                })

              }
            </tbody>

          </Table>
        }
        <br />
        <FormGroup>
          {/* {showSubmit == false && */}
          {
            <button type="submit" className="btn btn-primary submitbtn">Submit</button>
          }
        </FormGroup>
      </Form >

    );
  }
}

const mapStateToProps = state => {
  return getPropsMap(state, 'timesheet');
}

const TimesheetHome = connect(mapStateToProps, {
  handleSubmit: timesheetSubmit, getProjectData: getProjectData, getTaskData: getTaskData,
  getAllData: getAllData, getLoggedUser: getLoggedUser
})(TimeSheet);

export default TimesheetHome;



