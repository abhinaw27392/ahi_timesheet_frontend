
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
import { displayDates, timesheetSubmit } from './timesheetAction'
import { type1, type2, type3, type4, type5, ctr } from './timesheetAction'

//import css
import './timesheet.css'

let dateDatas = displayDates();

// let inputRefs = {
//   project: [],
//   task: [],
//   type1: [],
//   date:[],
//   hours:[],
//   empId: ""
// };

let inputRefs = {
  timesheetData: []
}


class TimeSheet extends React.Component {


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
    return (
      <Form className="ahi-timesheet-form" onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(inputRefs);
        disableField = true;

        inputRefs.timesheetData.length = 0;
        // inputRefs.task.length = 0;
      }
      }>
        <FormGroup >
          {errorMessage ? (<Alert bsStyle="danger"><strong>Error!</strong> {errorMessage}</Alert>) : null}
        </FormGroup>

        <Table responsive bordered condensed hover type="number">
          <thead>
            <tr>
              <th><button className="leftShift btn btn-primary" onClick={displayDates} >>>></button></th>
              <th >Project</th>
              <th >TaskName</th>
              {dateDatas.map(function (date) {
                return <th ><Time value={date} format="DD-MMM-YY" className="workType-width" /></th>
              })}
              <th><button className="btn btn-primary" >>>></button></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td></td>
              <td>
                <FormControl componentClass="select" placeholder="select" inputRef={
                  (ref) => {
                    inputRefs.timesheetData.length = 0
                    if (ref != null)
                      inputRefs.timesheetData.push({ projectInput1: ref.value });
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
                      inputRefs.timesheetData.push({ taskInput1: ref.value });
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
                      <FormControl type="number"
                        inputRef={(ref) => {
                          if (ref != null) {
                            inputRefs.timesheetData.push({ [name]: ref.value })
                          }
                        }}
                      />
                      <FormControl.Feedback />
                    </FormGroup>
                  </td>
                }
                )}
            </tr>
          

          </tbody>

        </Table> <br />
        <FormGroup>
          <button type="submit" className="btn btn-primary submitbtn" disabled={disableField}>Submit</button>&nbsp;&nbsp;
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



