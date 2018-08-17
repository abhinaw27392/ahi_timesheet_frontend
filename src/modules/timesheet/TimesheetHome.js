
//import react
import React from 'react'

//import redux
import { connect } from 'react-redux'

//import third-party 
import { Alert, Form, FormControl, FormGroup, Table } from 'react-bootstrap'
import Time from 'react-time'
// import { Field, reduxForm } from 'redux-form';

//import local
import { getPropsMap } from './timesheetReducer'
import { displayDates, timesheetSubmit, displayNextDates, addrowToTable, remomeRowFromTable } from './timesheetAction'
import { type1, type2, type3, type4, type5, ctr } from './timesheetAction'

//import css
import './timesheet.css'

let dateDatas = displayDates();
let addRow = addrowToTable();

let inputRefs = {
  data: []
}

let items1 = {};
let disable = false; let disable1 = false;
class TimeSheet extends React.Component {

  constructor(props) {
    super(props);
    this.prevDate = this.prevDate.bind(this);
    this.nextDate = this.nextDate.bind(this);
    this.getNewRow = this.getNewRow.bind(this);
    this.reduceOneRow = this.reduceOneRow.bind(this);
  }

  getNewRow() {
    addRow = addrowToTable();
    this.forceUpdate();
  }

  reduceOneRow() {
    addRow = remomeRowFromTable();
    this.forceUpdate();
  }

  prevDate() {

    if (ctr > 20) {
      disable = true;
      this.forceUpdate();
    }
    if (ctr <= 20) {
      disable1 = false;
      dateDatas = displayDates();
      this.forceUpdate();
    }

  }

  nextDate() {

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
    const { handleSubmit, errorMessage } = this.props;
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


    let projectNameInput = ''; let taskNameInput = ''; let tempArr = []; let ctr1 = 0;
    return (
      <Form className="ahi-timesheet-form" onSubmit={(e) => {
        e.preventDefault();
        inputRefs.data.length = 0; ctr1 = 0; let fieldName = [];

        items1.projectName = projectNameInput.value;
        items1.taskName = taskNameInput.value;
        type1.map((name) => {
          items1[name] = tempArr[ctr1++].value;
          fieldName.push(name);
        })

        inputRefs.data.push(items1);
        //---------------------------------array manipulation for data submission--------------------------------
        let dataArr = []; let i = 0;

        for (i = 0; i < 7; i++) {
          let data = {}
          inputRefs.data.map((fdata) => {
            data.id = null;
            data.projectName = fdata.projectName;
            data.taskName = fdata.taskName;
            data.date = fdata["date" + i];
            data.totalHours = fdata[fieldName[fieldName.length - i - 1]];
            data.empId = "2";       //----------------------------------------hardcoded----------------------
            dataArr.push(data);
          });

        }
        //-----------------------------------------------------------------------------

        handleSubmit(dataArr);
      }
      }>
        <FormGroup >
          {errorMessage ? (<Alert bsStyle="danger"><strong>Error!</strong> {errorMessage}</Alert>) : null}
        </FormGroup>

        <Table responsive bordered condensed hover type="number">
          <thead>
            <tr>
              <th><button className="leftShift btn btn-primary" type="button" disabled={disable} onClick={this.prevDate} >>>></button></th>
              <th >Project</th>
              <th >TaskName</th>
              {dateDatas.map(function (date) {
                items1["date" + i] = date;
                i--;
                return <th ><Time value={date} format="DD-MMM-YY" className="workType-width" /></th>
              })}
              <th><button className="btn btn-primary" type="button" disabled={disable1} onClick={this.nextDate} >>>></button></th>
            </tr>
          </thead>
          <tbody>
            {addRow.map((rowcount) => {
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
                        projectNameInput = ref;
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
                        taskNameInput = ref;
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
                        {/* <FormControl type="number" placeholder={submittedData.type1[name.slice(1)][name]}  //------------placeholder for editted data---- */}
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

        </Table> <br />
        <FormGroup>
          <button type="submit" className="btn btn-primary submitbtn">Submit</button>&nbsp;&nbsp;
          {/* <button type="button" className="btn btn-primary" >Edit</button> */}
        </FormGroup>
      </Form >

    );
  }
}

const mapStateToProps = state => {
  return getPropsMap(state, 'timesheet');
}
const TimesheetHome = connect(mapStateToProps, { handleSubmit: timesheetSubmit })(TimeSheet);
export default TimesheetHome;



