
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

let inputRefs = {
  project: [],
  task: [],
  type1: [],
  type2: [],
  type3: [],
  type4: [],
  type5: []
};


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

    let submittedData = {
      project: [{
        projectInput1: "asset management"
      },
      {
        projectInput2: "time management"
      },
      {
        projectInput3: "asset management"
      },
      {
        projectInput4: "time management"
      },
      {
        projectInput5: "asset management"
      }
      ],
      task: [
        { taskInput1: "development" },
        { taskInput2: "select" },
        { taskInput3: "select" },
        { taskInput4: "select" },
        { taskInput5: "select" }
      ],
      type1: [
        { a0: 1 },
        { a1: 2 },
        { a2: 6 },
        { a3: 3 },
        { a4: 1 },
        { a5: 2 },
        { a6: 3 },
        { a7: 4 },
        { a8: 2 },
        { a9: 6 },
        { a10: 3 },
        { a11: 8 },
        { a12: 2 },
        { a13: 7 },
        { a14: 1 },
        { a15: 2 },
        { a16: 6 },
        { a17: 3 },
        { a18: 1 },
        { a19: "" },
        { a20: 3 }
      ],
      type2: [
        { b0: 1 },
        { b1: 2 },
        { b2: 6 },
        { b3: 3 },
        { b4: 1 },
        { b5: 2 },
        { b6: 3 },
        { b7: 1 },
        { b8: 2 },
        { b9: 6 },
        { b10: 3 },
        { b11: 1 },
        { b12: "" },
        { b13: 3 },
        { b14: 1 },
        { b15: 2 },
        { b16: "" },
        { b17: 3 },
        { b18: 1 },
        { b19: 2 },
        { b20: 3 }
      ],
      type3: [],
      type4: [],
      type5: []
    }
    let disableField = false;
    return (
      <Form className="ahi-timesheet-form" onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(inputRefs);
        disableField = true;

        inputRefs.project.length = 0;
        inputRefs.task.length = 0;
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
                    inputRefs.project.length = 0
                    if (ref != null)
                      inputRefs.project.push({ projectInput1: ref.value });
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
                    inputRefs.task.length = 0
                    if (ref != null)
                      inputRefs.task.push({ taskInput1: ref.value });
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
                  inputRefs.type1.length = 0;

                  return <td >
                    <FormGroup>
                      {/* <FormControl type="number" placeholder={submittedData.type1[name.slice(1)][name]}  //------------placeholder for editted data---- */}
                      <FormControl type="number"
                        inputRef={(ref) => {
                          if (ref != null) {
                            inputRefs.type1.push({ [name]: ref.value })
                          }
                        }}
                      />
                      <FormControl.Feedback />
                    </FormGroup>
                  </td>
                }
                )}
            </tr>
            <tr>
              <td></td>
              <td>
                <FormControl componentClass="select" placeholder="select" inputRef={
                  (ref) => {
                    if (ref != null) {
                      inputRefs.project.push({ projectInput2: ref.value });
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
                    if (ref != null) {
                      inputRefs.task.push({ taskInput2: ref.value });
                    }
                  }
                }>
                  <option value="select" >select</option>
                  {taskData.map(res => {
                    return <option value={res.taskName}>{res.taskName}</option>
                  })
                  }

                </FormControl>
              </td>
              {type2.map(function (name) {
                inputRefs.type2.length = 0;
                return <td ><FormGroup>
                  <FormControl type="number"
                    inputRef={(ref) => {
                      if (ref != null) {
                        inputRefs.type2.push({ [name]: ref.value })
                      }
                    }}
                  />
                  <FormControl.Feedback />
                </FormGroup></td>
              }
              )}
            </tr>
            <tr>
              <td></td>
              <td>
                <FormControl componentClass="select" placeholder="select" inputRef={
                  (ref) => {
                    if (ref != null) {
                      inputRefs.project.push({ projectInput3: ref.value });
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
                      inputRefs.task.push({ taskInput3: ref.value });
                  }
                }>
                  <option value="select" >select</option>
                  {taskData.map(res => {
                    return <option value={res.taskName}>{res.taskName}</option>
                  })
                  }

                </FormControl>
              </td>
              {type3.map(function (name) {
                inputRefs.type3.length = 0;
                return <td ><FormGroup>
                  <FormControl type="number"
                    inputRef={(ref) => {
                      if (ref != null) {
                        inputRefs.type3.push({ [name]: ref.value })
                      }
                    }}
                  />
                  <FormControl.Feedback />
                </FormGroup></td>
              }
              )}
            </tr>
            <tr>
              <td></td>
              <td>
                <FormControl componentClass="select" placeholder="select" inputRef={
                  (ref) => {
                    if (ref != null) {
                      inputRefs.project.push({ projectInput4: ref.value });
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
                    if (ref != null) {
                      inputRefs.task.push({ taskInput4: ref.value });
                    }
                  }
                }>
                  <option value="select" >select</option>
                  {taskData.map(res => {
                    return <option value={res.taskName}>{res.taskName}</option>
                  })
                  }

                </FormControl>
              </td>
              {type4.map(function (name) {
                inputRefs.type4.length = 0;
                return <td ><FormGroup>
                  <FormControl type="number"
                    inputRef={(ref) => {
                      if (ref != null) {
                        inputRefs.type4.push({ [name]: ref.value })
                      }
                    }}
                  />
                  <FormControl.Feedback />
                </FormGroup></td>
              }
              )}
            </tr>
            <tr>
              <td></td>
              <td>
                <FormControl componentClass="select" placeholder="select" inputRef={
                  (ref) => {
                    if (ref != null) {
                      inputRefs.project.push({ projectInput5: ref.value });
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
                    if (ref != null) {
                      inputRefs.task.push({ taskInput5: ref.value });
                    }
                  }
                }>
                  <option value="select" >select</option>
                  {taskData.map(res => {
                    return <option value={res.taskName}>{res.taskName}</option>
                  })
                  }

                </FormControl>
              </td>
              {type5.map(function (name) {
                inputRefs.type5.length = 0;
                return <td ><FormGroup>
                  <FormControl type="number"
                    inputRef={(ref) => {
                      if (ref != null) {
                        inputRefs.type5.push({ [name]: ref.value })
                      }
                    }}
                  />
                  <FormControl.Feedback />
                </FormGroup></td>
              }
              )}
            </tr>

          </tbody>

        </Table> <br />
        <FormGroup>
          <button type="submit" className="btn btn-primary submitbtn" disabled={disableField}>Submit</button>&nbsp;&nbsp;
          <button type="button" className="btn btn-primary" >Edit</button>
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



