
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
  remomeRowFromTable, getRowTypes, getProjectData
} from './timesheetAction'
import { type1, type2, type3, type4, type5, ctr } from './timesheetAction'
// import {getAllUsers} from '../projects/projectsAction'

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
let columnCount = 0; let taskDate; let taskValue = '';
let projectName = ''; let taskName = ''; let keyArr = [];
let dateArr = [];
let dateArrMonth; let datefirst; let datelast;
let showSubmit = true; let showPlus = true; let showMinus = true;
let ctr3 = 1;
class TimeSheet extends React.Component {

  constructor(props) {

    super(props);
    this.prevDate = this.prevDate.bind(this);
    this.nextDate = this.nextDate.bind(this);
    this.getNewRow = this.getNewRow.bind(this);
    this.reduceOneRow = this.reduceOneRow.bind(this);
    this.state = {
      myData: null
    };
  }

  componentWillReceiveProps() {
    // this.props.getUser();
    this.getDateRange();
    this.props.getAllData('2', datefirst, datelast);
  }

  getDateRange() {
    datefirst = new Date(dateArr[0]);
    dateArrMonth = datefirst.getMonth() + 1;
    datefirst = datefirst.getDate() + "-" + dateArrMonth + "-" + datefirst.getFullYear();
    console.log("datefirst:" + datefirst);

    datelast = new Date(dateArr[dateArr.length - 1]);
    dateArrMonth = datelast.getMonth() + 1;
    datelast = datelast.getDate() + "-" + dateArrMonth + "-" + datelast.getFullYear();
    console.log("datelast:" + datelast);
  }
  getNewRow() {
    addRow = addrowToTable();
    type = getRowTypes(type1);
    this.forceUpdate();
    return addRow;
  }

  reduceOneRow() {
    rowcount--;
    console.log("reduce rowcount:" + rowcount);
    addRow = remomeRowFromTable();
    this.forceUpdate();
  }

  prevDate() {
    // this.getDateRange();
    // this.props.getAllData('2', datefirst, datelast);
    dateArr.length = 0;
    console.log("prev ctr: " + ctr);
    if (ctr > 14) {
      disable = true;
      this.forceUpdate();
    }
    if (ctr <= 14) {
      disable1 = false;
      dateDatas = displayDates();
      this.forceUpdate();
    }
  }

  nextDate() {
    // this.getDateRange();
    // this.props.getAllData('2', datefirst, datelast);
    dateArr.length = 0;
    if (ctr < 14) {
      disable1 = true;
      this.forceUpdate();
    }
    if (ctr >= 14) {
      disable = false;
      dateDatas = displayNextDates();
      this.forceUpdate();
    }
  }

  render() {
    const { handleSubmit, errorMessage, myMap } = this.props;

    // console.log("projectData is:")
    // console.log(projectData);
    
    // console.log("usersData is:" + JSON.stringify(usersData));

    if (myMap != null) {
      console.log("mymap size:" + myMap.size);
      keyArr.length = 0;
      rowcount = 0;
      myMap.forEach((value, key) => {
        keyArr.push(key);
      })
    }

    if (ctr3 == 1) {
      addRow = this.getNewRow();
      ctr3 = 2;
    }

    // console.log("timesheet data is:");
    // console.log(myMap);

    let projectData = [{
      projectId: "1",
      projectName: "asset management"
    },
    {
      projectId: "2",
      projectName: "time management"
    },

    {
      projectId: "3",
      projectName: "money management"
    }
    ]

    let taskData = [{
      taskId: "1",
      taskName: "development"
    },
    {
      taskId: "2",
      taskName: "debugging"
    },
    {
      taskId: "3",
      taskName: "testing"
    }
    ]
    let disableField = false;
    let i = 6;


    let projectNameInput = []; let taskNameInput = []; let tempArr = [];

    let placeholderValue = ''; let index = 0;


    return (
      <Form className="ahi-timesheet-form" onSubmit={(e) => {
        e.preventDefault();
        inputRefs.data.length = 0;

        // console.log("dateArr is:" + dateArr);

        let m = 0; let n = 0; let count = 0; let m1 = 0;
        for (m = 0; m < projectNameInput.length; m++) {
          // console.log(projectNameInput.length);
          items1 = {};
          items1.projectName = projectNameInput[m].value;
          items1.taskName = taskNameInput[m].value;
          for (n = count, m1 = 0; n < count + 7; n++ , m1++) {
            // console.log(n);
            items1[m1] = tempArr[n].value;
          }
          count = count + 7;
          inputRefs.data.push(items1);
        }

        // console.log("initialdata is:");
        // console.log(inputRefs.data);

        //---------------------------------array manipulation for data submission--------------------------------


        let dataArr = []; let i = 0;
        inputRefs.data.map((fdata) => {
          for (i = 0; i < 7; i++) {
            let data = {}
            if (fdata[i] != '') {
              data.id = null;
              data.projectName = fdata.projectName;
              data.taskName = fdata.taskName;
              data.date = dateArr[i];
              data.totalHours = fdata[i];
              data.empId = "2";                 //----------------------------------------hardcoded----------------------
              dataArr.push(data);
            }

          }
        });


        // console.log("dataArray is:")
        // console.log(dataArr);
        let isSubmit = window.confirm("Do you really want to submit the form?");
        if (isSubmit) {
          handleSubmit(dataArr);
          showSubmit = false; showPlus = false; showMinus = false;
          alert("your data is successfully submitted!");
        }
        else alert("form submission failed!");

      }
      }>
        <FormGroup >
          {errorMessage ? (<Alert bsStyle="danger"><strong>Error!</strong> {errorMessage}</Alert>) : null}
        </FormGroup>
        {
          <Table responsive bordered condensed hover type="number">
            <thead>
              <tr>
                <th><button className="leftShift btn btn-primary" type="button" disabled={disable} title = "Prev" onClick={this.prevDate} >>>></button></th>
                <th >Project</th>
                <th >TaskName</th>
                {dateDatas.map(function (date) {
                  dateArr.push(date);

                  return <th ><Time value={date} format="DD-MMM-YY" className="workType-width" /></th>
                })}
                <th><button className="btn btn-primary" type="button" disabled={disable1} title = "Next" onClick={this.nextDate} >>>></button></th>
              </tr>
            </thead>
            <tbody>
              {myMap != null &&
                keyArr.map((key) => {
                  showSubmit = true;
                  console.log("keyarray length: " + keyArr.length);
                  rowcount++;
                  // console.log("rowcount: "+rowcount +"keyArr")
                  // console.log("rowcount is:" + rowcount);
                  if (key != null) {
                    projectTaskName = key.split("-");
                    projectName = projectTaskName[0];
                    taskName = projectTaskName[1];
                    // console.log("projectName:" + projectName + "taskName:" + taskName);
                    columnCount = 0;
                  }
                  return <tr>
                    <td>

                    </td>
                    <td>
                      <FormControl type="text" disabled = "true" placeholder={projectName}
                          inputRef={(ref) => {
                            if (ref != null) {
                              projectNameInput.push(ref);

                            }
                          }}
                        />
                        <FormControl.Feedback />
                    </td>
                    <td>
                      <FormControl type="text" disabled = "true" placeholder={taskName}
                          inputRef={(ref) => {
                            if (ref != null) {
                              taskNameInput.push(ref);

                            }
                          }}
                        />
                        <FormControl.Feedback />
                    </td>

                    {type.map(function (name) {
                      taskValue = null;
                      for (var v of myMap.get(key)) {
                        let taskMonth; let dateArrMonth; let dateNew;

                        taskDate = new Date(v.date);
                        taskMonth = taskDate.getMonth() + 1;
                        taskDate = taskDate.getDate() + "-" + taskMonth + "-" + taskDate.getFullYear();
                        // console.log("taskDate: " + taskDate);

                        dateNew = new Date(dateArr[columnCount]);

                        dateArrMonth = dateNew.getMonth() + 1;
                        dateNew = dateNew.getDate() + "-" + dateArrMonth + "-" + dateNew.getFullYear();
                        // console.log("systemDate:" + dateNew);

                        if (taskDate == dateNew) {
                          taskValue = v.value;
                          // console.log("taskValue is:" + taskValue);
                          break;

                        }
                      }

                      columnCount++;
                      return <td>

                        <FormControl type="number" disabled = "true" name={name} placeholder={taskValue}
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
                      {/* {rowcount == keyArr.length && rowcount > 1 &&
                        <button type="button" className="btn btn-danger" onClick={this.reduceOneRow} >-</button>
                      } */}
                    </td>
                  </tr>
                })

              }

              {myMap != null && myMap.size == 0 &&

                addRow.map((rowcount) => {
                  showSubmit = false;
                  console.log("rowcount is:" + rowcount);
                  return <tr>
                    <td>
                      {rowcount == addRow.length &&
                        <button type="button" className="btn btn-info" onClick={this.getNewRow} >+</button>
                      }

                    </td>
                    <td>
                      <FormControl componentClass="select" placeholder="select" inputRef={
                        (ref) => {
                          if (ref != null) {
                            projectNameInput.push(ref);
                            // console.log("projectName is:" + items1.projectName);
                          }

                        }
                      }>
                        <option value="select" >select</option>
                        {projectData.map(res => {
                          return <option value={res.projectName}>{res.projectName}</option>
                        })
                        }

                      </FormControl>
                    </td>
                    <td>
                      <FormControl componentClass="select" placeholder="select" inputRef={
                        (ref) => {
                          if (ref != null)
                            // inputRefs.timesheetData.push({ taskInput1: ref.value });
                            taskNameInput.push(ref);
                        }
                      }>
                        <option value="select" >select</option>
                        {taskData.map(res => {
                          return <option value={res.taskName}>{res.taskName}</option>
                        })
                        }

                      </FormControl>
                    </td>

                    {
                      type1.map(function (name) {

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
                      {rowcount == addRow.length && rowcount > 1 &&
                        <button type="button" className="btn btn-danger" onClick={this.reduceOneRow} >-</button>
                      }
                    </td>
                  </tr>
                })

              }
            </tbody>

          </Table>
        }
        <br />
        <FormGroup>
          {showSubmit == false &&
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
  handleSubmit: timesheetSubmit, getProjectData: getProjectData,
  getAllData: getAllData
})(TimeSheet);
export default TimesheetHome;



