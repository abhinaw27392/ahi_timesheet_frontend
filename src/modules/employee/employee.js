//import react
import React from 'react'
import ReactDOM from 'react-dom'

//import redux
import { connect } from 'react-redux'

//import third-party
import { Alert, Form, FormControl, FormGroup, Table, Checkbox } from 'react-bootstrap'
import { ControlLabel } from "react-bootstrap";
import trim from 'trim';
import Time from 'react-time';
import Moment from 'moment';

// import Dialog from 'react-bootstrap-dialog'
import Dialog from 'react-dialog'

//import local
import { getPropsMap } from './employeeReducer'
import { employeeSubmit, editSubmit, getAllData, deleteEmployee, getAllUsers } from './employeeAction'

//import css
import './employee.scss'

let checkBoxArr = [];
let employeeIdAlert = false; let empIdUniqueAlert = false; let dobAlert2 = false;
let employeeFirstNameAlert = false; let employeeLastNameAlert = false; let dobAlert = false;let dobEditAlert = false; let designationAlert = false;
let joiningDateAlert = false; let roleAlert = false; let supervisorAlert = false;

class Employee extends React.Component {
    constructor() {
        super();
        this.state = {
            isDialogOpen: false,
            isEditDialogOpen: false,
            isShowPdob: true
        }
    }
    componentDidMount() {
        this.props.getUsers();
    }
    // componentWillReceiveProps() {
    //     this.props.getUsers();
    // }

    openDialog = () => {
        this.setState({ isDialogOpen: true, isShowPdob: false, isEditDialogOpen: false });
        employeeIdAlert = false; empIdUniqueAlert = false; dobAlert2 = false;
        employeeFirstNameAlert = false; employeeLastNameAlert = false; dobAlert = false;dobEditAlert = false; designationAlert = false;
        joiningDateAlert = false; roleAlert = false; supervisorAlert = false;

    }


    editData = '';
    openEditDialog = (row) => {
        this.editData = '';
        this.setState({ isEditDialogOpen: true, isShowPdob: false, isDialogOpen: false });
        this.editData = row;
        employeeIdAlert = false; empIdUniqueAlert = false; dobAlert2 = false;
        employeeFirstNameAlert = false; employeeLastNameAlert = false; dobAlert = false; dobEditAlert = false;designationAlert = false;
        joiningDateAlert = false; roleAlert = false; supervisorAlert = false;
    }


    handleClose = () => {
        this.setState({ isDialogOpen: false, isShowPdob: true, isEditDialogOpen: false });
    }




    handleInputChange(event) {
        const target = event.target;
        const value = target.type == 'checkbox' ? target.checked : target.value;
        console.log(value);
        const checkedvalue = target.name;
        console.log(checkedvalue);

        if (value == true) {
            checkBoxArr.push(checkedvalue);
        }
        if (value == false) {
            for (let i = 0; i < checkBoxArr.length; i++) {
                if (checkBoxArr[i] == checkedvalue) {
                    checkBoxArr.splice(i, 1);

                }
            }
        }
        console.log("checkboxarr is:" + checkBoxArr);
    }

    addReset = () => {
        document.getElementById("ahi-employee-form").reset();
        employeeIdAlert = false; empIdUniqueAlert = false; dobAlert2 = false;
        employeeFirstNameAlert = false; employeeLastNameAlert = false; dobAlert = false;dobEditAlert = false; designationAlert = false;
        joiningDateAlert = false; roleAlert = false; supervisorAlert = false;
        this.setState({ isDialogOpen: true, isShowPdob: false, isEditDialogOpen: false });
    }
    editReset = () => {
        document.getElementById("ahi-employee-edit-form").reset();
        employeeIdAlert = false; empIdUniqueAlert = false; dobAlert2 = false;
        employeeFirstNameAlert = false; employeeLastNameAlert = false; dobAlert = false;dobEditAlert = false; designationAlert = false;
        joiningDateAlert = false; roleAlert = false; supervisorAlert = false;
        this.setState({ isDialogOpen: false, isShowPdob: false, isEditDialogOpen: true });
    }


    render() {

        const { addSubmit, editSubmit, errorMessdob, isFetching, delData, usersData } = this.props;

        let employeeIdInput = ''; let employeeFirstNameInput = ''; let employeeLastNameInput = '';
        let dobInput = ''; let designationInput = ''; let joiningDateInput = '';
        let roleInput = ''; let supervisorInput = '';

        // let userdata = [{
        //     loginId: "100023",
        //     password: "abc123",
        //     email: "abhinaw27392@gmail.com",
        //     firstName: "abhinaw",
        //     lastName: "shahi",
        //     dob: "null",
        //     designation: "tester",
        //     "joining date": null,
        //     role: "admin",
        //     supervisorId: '100035'
        // },
        // {
        //     loginId: "100024",
        //     password: "abc123",
        //     email: "abhinaw27392@gmail.com",
        //     firstName: "abhinaw",
        //     lastName: "shahi",
        //     dob: "null",
        //     designation: "tester",
        //     "joining date": null,
        //     role: "manager",
        //     supervisorId: '100035'
        // }
        // ]

        console.log("usersData is:" + JSON.stringify(usersData));


        // function handledelete() {
        //     if (checkBoxArr    != '') {
        //         console.log("deleteemployee is executing...");
        //         delData(checkBoxArr);

        //         checkBoxArr.length = 0;

        //     }
        //     else {
        //         console.log("delete alert is working");
        //     }

        // }

        return (

            <div className="container">

                {this.state.isShowPdob &&
                    <div className="panel">
                        <h1>EMPLOYEE</h1>
                    </div>
                }
                {this.state.isShowPdob &&
                    <div className="panel">
                        {this.state.isShowPdob &&
                            <div>
                                {/* {showDelAlert ? (<Alert bsStyle="danger">Please Seelct an employee!</Alert>) : null} */}
                                {/* {delSuccessAlert ? (<Alert bsStyle="success" >Your employee is successfully deleted!</Alert>) : null} */}

                                <button type="button" onClick={this.openDialog} className="btn btn-primary adddisplay" >Add User</button>
                                {/* <button type="button" className="btn btn-danger deldisplay" onClick={handledelete} >Del</button> */}
                                <br /><br />
                            </div>
                        }
                        <br /><br />
                        {usersData != null &&
                            this.state.isShowPdob &&
                            <div className="panel panel-blur">
                                <Table responsive bordered condensed hover className="tableStyle">
                                    <thead>
                                        {
                                            <tr>
                                                <th><ControlLabel>Select</ControlLabel></th>
                                                <th><ControlLabel >EmpId</ControlLabel></th>
                                                <th><ControlLabel>FirstName</ControlLabel></th>
                                                <th><ControlLabel>LastName</ControlLabel></th>
                                                <th><ControlLabel>DOB</ControlLabel></th>
                                                <th><ControlLabel>Designation</ControlLabel></th>
                                                <th><ControlLabel>JoiningDate</ControlLabel></th>
                                                <th><ControlLabel>Role</ControlLabel></th>
                                                <th><ControlLabel>Supervisor</ControlLabel></th>
                                            </tr>
                                        }

                                    </thead>
                                    <tbody>
                                        {usersData.map((row) => {
                                            {/* {userdata.map((row) => { */ }
                                            return <tr className="test">
                                                <td><Checkbox name={row.id} value = "false" onChange={this.handleInputChange}></Checkbox></td>
                                                <td><a style={{ textDecoration: 'underline', cursor: 'pointer' }} onClick={() => this.openEditDialog(row)} title="Edit employee info">{row.loginId}</a></td>
                                                <td>{row.firstName}</td>
                                                <td>{row.lastName}</td>
                                                <td><Time value={row.dob} format="DD-MMM-YY" /></td>
                                                <td>{row.designation}</td>
                                                <td><Time value={row.joiningDate} format="DD-MMM-YY" /></td>
                                                <td>{row.role}</td>
                                                {row.supervisorId != null &&
                                                    // <td>{row.supervisorId.firstName} {row.supervisorId.lastName}</td>
                                                    <td>{row.supervisorId}</td>
                                                }
                                                {row.supervisorId == null &&
                                                    <td>{row.supervisorId}</td>
                                                }

                                                {/* <td>{row.supervisorId}</td> */}
                                            </tr>
                                        })
                                        }
                                    </tbody>
                                </Table>
                            </div>

                        }
                        <br />

                    </div>
                }
                {this.state.isDialogOpen &&
                    <div className="panel">
                        <h1>ADD NEW EMPLOYEE</h1>
                    </div>
                }
                {this.state.isDialogOpen &&

                    <div className="panel">
                        {this.state.isDialogOpen &&
                            <div className="panel panel-blur">
                                <Form className="ahi-employee-form" id="ahi-employee-form" onSubmit={(e) => {
                                    e.preventDefault();
                                    let datas = '';
                                    employeeIdAlert = false; empIdUniqueAlert = false; dobAlert2 = false;
                                    employeeFirstNameAlert = false; employeeLastNameAlert = false; dobAlert = false;dobEditAlert = false; designationAlert = false;
                                    joiningDateAlert = false; roleAlert = false; supervisorAlert = false;

                                    employeeIdInput.value = trim(employeeIdInput.value);
                                    employeeFirstNameInput.value = trim(employeeFirstNameInput.value);
                                    employeeLastNameInput.value = trim(employeeLastNameInput.value);
                                    dobInput.value = trim(dobInput.value);
                                    designationInput.value = trim(designationInput.value);
                                    joiningDateInput.value = trim(joiningDateInput.value);
                                    roleInput.value = trim(roleInput.value);
                                    supervisorInput.value = trim(supervisorInput.value);


                                    {
                                        usersData != null &&
                                            usersData.map(res => {
                                                if (res.loginId == employeeIdInput.value) {
                                                    empIdUniqueAlert = true;
                                                    this.setState({ isDialogOpen: true, isShowPage: false, isEditDialogOpen: false });
                                                }
                                            })
                                    }
                                    if (employeeIdInput.value == '') {
                                        employeeIdAlert = true;
                                        this.setState({ isDialogOpen: true, isShowPage: false, isEditDialogOpen: false });
                                    }
                                    else if (employeeFirstNameInput.value == '') {
                                        employeeFirstNameAlert = true;
                                        this.setState({ isDialogOpen: true, isShowPage: false, isEditDialogOpen: false });
                                    }
                                    else if (employeeLastNameInput.value == '') {
                                        employeeLastNameAlert = true;
                                        this.setState({ isDialogOpen: true, isShowPage: false, isEditDialogOpen: false });
                                    }
                                    else if (dobInput.value == '' ) {
                                        dobAlert = true;
                                        this.setState({ isDialogOpen: true, isShowPage: false, isEditDialogOpen: false });
                                    }
                                    // else if (dobInput.value > new Date() || joiningDateInput.value > new Date()) {
                                    //     dobAlert2 = true;
                                    //     this.setState({ isDialogOpen: true, isShowPage: false, isEditDialogOpen: false });
                                    // }
                                    else if (designationInput.value == '') {
                                        designationAlert = true;
                                        this.setState({ isDialogOpen: true, isShowPage: false, isEditDialogOpen: false });
                                    }
                                    else if (joiningDateInput.value == '') {
                                        joiningDateAlert = true;
                                        this.setState({ isDialogOpen: true, isShowPage: false, isEditDialogOpen: false });
                                    }
                                    else if (roleInput.value == 'select') {
                                        console.log("role alert is working");
                                        roleAlert = true;
                                        this.setState({ isDialogOpen: true, isShowPage: false, isEditDialogOpen: false });
                                    }
                                    else if (supervisorInput.value == 'select') {
                                        console.log("supervisorId alert is working");
                                        supervisorAlert = true;
                                        this.setState({ isDialogOpen: true, isShowPage: false, isEditDialogOpen: false });
                                    }

                                    if (empIdUniqueAlert == false) {
                                        if (employeeIdInput.value != '' && employeeFirstNameInput.value != '' && employeeLastNameInput.value != '' &&
                                            dobInput.value != '' && designationInput.value != '' && joiningDateInput.value != '' &&
                                            roleInput.value != 'select' && supervisorInput.value != 'select') {

                                            datas = {
                                                loginId: employeeIdInput.value, firstName: employeeFirstNameInput.value,
                                                lastName: employeeLastNameInput.value, dob: dobInput.value, designation: designationInput.value,
                                                joiningDate: joiningDateInput.value, role: roleInput.value, supervisorId: supervisorInput.value
                                            }
                                            console.log("added data is:");
                                            console.log(datas);
                                            addSubmit(datas);
                                            this.handleClose();
                                        }
                                    }

                                }

                                }>
                                    <FormGroup >
                                        {errorMessdob ? (<Alert bsStyle="danger"><strong>Error!</strong> {errorMessdob}</Alert>) : null}
                                    </FormGroup>

                                    <FormGroup >
                                        {isFetching ? (<Alert bsStyle="success" >Your Employee is successfully Added!</Alert>) : null}
                                    </FormGroup>

                                    {/* -------------------------alerts------------------------------------------------------------- */}

                                    <FormGroup >
                                        {empIdUniqueAlert ? (<Alert bsStyle="danger" >This EmpId is already added!</Alert>) : null}
                                    </FormGroup>
                                    <FormGroup >
                                        {employeeIdAlert ? (<Alert bsStyle="danger" >Please Enter emp id!</Alert>) : null}
                                    </FormGroup>
                                    <FormGroup >
                                        {employeeFirstNameAlert ? (<Alert bsStyle="danger" >Please Enter first name!</Alert>) : null}
                                    </FormGroup>
                                    <FormGroup >
                                        {employeeLastNameAlert ? (<Alert bsStyle="danger" >Please Enter last name!</Alert>) : null}
                                    </FormGroup>
                                    <FormGroup >
                                        {dobAlert ? (<Alert bsStyle="danger" >Please Enter emp dob!</Alert>) : null}
                                    </FormGroup>
                                    <FormGroup >
                                        {dobAlert2 ? (<Alert bsStyle="danger" >Enter date before current date!</Alert>) : null}
                                    </FormGroup>
                                    <FormGroup >
                                        {designationAlert ? (<Alert bsStyle="danger" >Please Enter designation!</Alert>) : null}
                                    </FormGroup>
                                    <FormGroup >
                                        {joiningDateAlert ? (<Alert bsStyle="danger" >Please Enter joining date!</Alert>) : null}
                                    </FormGroup>
                                    <FormGroup >
                                        {roleAlert ? (<Alert bsStyle="danger" >Please Enter emp role!</Alert>) : null}
                                    </FormGroup>
                                    <FormGroup >
                                        {supervisorAlert ? (<Alert bsStyle="danger" >Please Enter supervisorId name!</Alert>) : null}
                                    </FormGroup>
                                    {/* ------------------------------------------------------------------------------------------------------- */}

                                    <FormGroup  >
                                        <ControlLabel  >EmpId:</ControlLabel>&nbsp;
                                    <FormControl type="string" placeholder="enter EmployeeId"
                                            maxLength="6"
                                            inputRef={(ref) => {
                                                employeeIdInput = ref
                                            }}
                                        />
                                    </FormGroup>
                                    <FormGroup  >
                                        <ControlLabel >First Name:</ControlLabel>&nbsp;
                                    <FormControl type="string" placeholder="enter FirstName"
                                            maxLength="12"
                                            inputRef={(ref) => {
                                                employeeFirstNameInput = ref
                                            }}
                                        />
                                    </FormGroup>
                                    <FormGroup  >
                                        <ControlLabel >Last Name:</ControlLabel>&nbsp;
                                    <FormControl type="string" placeholder="enter LastName"
                                            maxLength="12"
                                            inputRef={(ref) => {
                                                employeeLastNameInput = ref
                                            }}
                                        />
                                    </FormGroup>

                                    <FormGroup  >
                                        <ControlLabel >DOB:</ControlLabel>&nbsp;
                                    <FormControl type="date"
                                            maxLength="10"
                                            inputRef={(ref) => {
                                                dobInput = ref
                                            }}
                                        />
                                    </FormGroup>
                                    <FormGroup  >
                                        <ControlLabel >Designation:</ControlLabel>&nbsp;
                                    <FormControl type="string" placeholder="enter designation"
                                            maxLength="20"
                                            inputRef={(ref) => {
                                                designationInput = ref
                                            }}
                                        />
                                    </FormGroup>
                                    <FormGroup  >
                                        <ControlLabel >Joining Date:</ControlLabel>&nbsp;
                                    <FormControl type="date"
                                            maxLength="10"
                                            inputRef={(ref) => {
                                                joiningDateInput = ref
                                            }}
                                        />
                                    </FormGroup>

                                    <FormGroup  >
                                        <ControlLabel >Role:</ControlLabel>&nbsp;
                                    <FormControl componentClass="select" placeholder="select"
                                            inputRef={
                                                (ref) => { roleInput = ref }
                                            }>
                                            <option value="select" >select</option>
                                            <option value="admin" >admin</option>
                                            <option value="manager" >manager</option>
                                            <option value="user" >user</option>

                                        </FormControl>
                                    </FormGroup>
                                    <FormGroup  >
                                        <ControlLabel >Supervisor:</ControlLabel>&nbsp;
                                    <FormControl componentClass="select" placeholder="select"
                                            inputRef={
                                                (ref) => { supervisorInput = ref }
                                            }>
                                            <option value="select" >select</option>
                                            {usersData.map(res => {
                                                // {userdata.map(res => {
                                                // console.log(res);
                                                return <option value={res.loginId}>{res.loginId}</option>
                                            })
                                            }

                                        </FormControl>
                                    </FormGroup>
                                    <br />

                                    <FormGroup>
                                        <button className="btn btn-primary canceldisplay" onClick={this.handleClose} >Cancel</button>
                                        <button type="submit" className="btn btn-success  resetdisplay" >Submit</button>
                                        <button type="button" className="btn btn-info  resetdisplay" onClick={this.addReset} >Reset</button>
                                    </FormGroup>
                                </Form>
                                <br />

                            </div>
                        }
                        <br />

                    </div>
                }

                {this.state.isEditDialogOpen &&
                    <div className="panel">
                        <h1>EDIT EMPLOYEE</h1>

                    </div>
                }
                {usersData != null &&
                    this.state.isEditDialogOpen &&

                    <div className="panel">
                        {this.state.isEditDialogOpen &&
                            <div className="panel panel-blur">
                                <Form className="ahi-employee-form" id="ahi-employee-edit-form" onSubmit={(e) => {
                                    e.preventDefault();
                                    let datas = '';
                                    employeeIdAlert = false; empIdUniqueAlert = false; dobAlert2 = false;
                                    employeeFirstNameAlert = false; employeeLastNameAlert = false;
                                    dobAlert = false; dobEditAlert = false; designationAlert = false;
                                    joiningDateAlert = false; roleAlert = false; supervisorAlert = false;

                                    if (employeeIdInput.value != '' && trim(employeeIdInput.value) == '') {
                                        console.log("employeeIdInput value is:" + employeeIdInput.value);
                                        employeeIdAlert = true;
                                        this.setState({ isEditDialogOpen: true, isShowPage: false, isDialogOpen: false });
                                    }
                                    else if (employeeFirstNameInput.value != '' && trim(employeeFirstNameInput.value) == '') {
                                        employeeFirstNameAlert = true;
                                        this.setState({ isEditDialogOpen: true, isShowPage: false, isDialogOpen: false });
                                    }
                                    else if (employeeLastNameInput.value != '' && trim(employeeLastNameInput.value) == '') {
                                        employeeLastNameAlert = true;
                                        this.setState({ isEditDialogOpen: true, isShowPage: false, isDialogOpen: false });
                                    }
                                    else if (dobInput.value != '' && trim(dobInput.value) == '') {
                                        dobAlert = true;
                                        this.setState({ isEditDialogOpen: true, isShowPage: false, isDialogOpen: false });
                                    }
                                    else if (!dobInput.value.match(/[\d]{4}-[\d]{2}-[\d]{2}/) && dobInput.value != "") {
                                        dobEditAlert = true;
                                        this.setState({ isEditDialogOpen: true, isShowPage: false, isDialogOpen: false });
                                    }
                                    else if (designationInput.value != '' && trim(designationInput.value) == '') {
                                        designationAlert = true;
                                        this.setState({ isEditDialogOpen: true, isShowPage: false, isDialogOpen: false });
                                    }
                                    else if (joiningDateInput.value != '' && trim(joiningDateInput.value) == '') {
                                        joiningDateAlert = true;
                                        this.setState({ isEditDialogOpen: true, isShowPage: false, isDialogOpen: false });
                                    }
                                    else {
                                        employeeIdInput.value = trim(employeeIdInput.value);
                                        employeeFirstNameInput.value = trim(employeeFirstNameInput.value);
                                        employeeLastNameInput.value = trim(employeeLastNameInput.value);
                                        dobInput.value = trim(dobInput.value);
                                        designationInput.value = trim(designationInput.value);
                                        joiningDateInput.value = trim(joiningDateInput.value);


                                        if (employeeIdInput.value != '') {
                                            this.editData.loginId = employeeIdInput.value;
                                        }
                                        if (employeeFirstNameInput.value != '') {
                                            this.editData.firstName = employeeFirstNameInput.value;
                                        }
                                        if (employeeLastNameInput.value != '') {
                                            this.editData.lastName = employeeLastNameInput.value;
                                        }
                                        if (dobInput.value != '') {
                                            this.editData.dob = dobInput.value;
                                        }
                                        if (designationInput.value != '') {
                                            this.editData.designation = designationInput.value;
                                        }
                                        if (joiningDateInput.value != '') {
                                            this.editData.joiningDate = joiningDateInput.value;
                                        }
                                        if (roleInput.value != 'select') {
                                            this.editData.role = roleInput.value;
                                        }
                                        if (supervisorInput.value != 'select') {
                                            // this.editData.supervisorId.loginId = supervisorInput.value;
                                            this.editData.supervisorId = supervisorInput.value;
                                        }
                                        datas = {
                                            id: this.editData.id,
                                            loginId: this.editData.loginId, firstName: this.editData.firstName,
                                            lastName: this.editData.lastName, dob: this.editData.dob, designation: this.editData.designation,
                                            // joiningDate: this.editData.joiningDate, role: this.editData.role, supervisorId: this.editData.supervisorId.loginId
                                            joiningDate: this.editData.joiningDate, role: this.editData.role, supervisorId: this.editData.supervisorId
                                        }
                                        console.log("edited data is:");
                                        console.log(datas);
                                        editSubmit(datas);
                                        this.handleClose();

                                    }

                                }
                                }>
                                    <FormGroup >
                                        {errorMessdob ? (<Alert bsStyle="danger"><strong>Error!</strong> {errorMessdob}</Alert>) : null}
                                    </FormGroup>

                                    <FormGroup >
                                        {isFetching ? (<Alert bsStyle="success" >Your Employee is successfully Editted!</Alert>) : null}
                                    </FormGroup>

                                    {/* -------------------------alerts------------------------------------------------------------- */}
                                    <FormGroup >
                                        {employeeIdAlert ? (<Alert bsStyle="danger" >Please Enter valid emp id!</Alert>) : null}
                                    </FormGroup>
                                    <FormGroup >
                                        {employeeFirstNameAlert ? (<Alert bsStyle="danger" >Please Enter valid first name!</Alert>) : null}
                                    </FormGroup>
                                    <FormGroup >
                                        {employeeLastNameAlert ? (<Alert bsStyle="danger" >Please Enter valid last name!</Alert>) : null}
                                    </FormGroup>
                                    <FormGroup >
                                        {dobAlert ? (<Alert bsStyle="danger" >Please Enter valid emp dob!</Alert>) : null}
                                    </FormGroup>
                                    <FormGroup >
                                        {dobEditAlert ? (<Alert bsStyle="danger" >Please Enter dob in given format e.g. yyyy-mm-dd</Alert>) : null}
                                    </FormGroup>
                                    <FormGroup >
                                        {designationAlert ? (<Alert bsStyle="danger" >Please Enter valid designation!</Alert>) : null}
                                    </FormGroup>
                                    <FormGroup >
                                        {joiningDateAlert ? (<Alert bsStyle="danger" >Please Enter valid joining date!</Alert>) : null}
                                    </FormGroup>

                                    <FormGroup  >
                                        <ControlLabel >EmpId:</ControlLabel>&nbsp;
                                            <FormControl type="string" placeholder={this.editData.loginId}
                                            maxLength="6"
                                            disabled
                                            inputRef={(ref) => {
                                                employeeIdInput = ref
                                            }}
                                        />
                                    </FormGroup>
                                    <FormGroup >
                                        <ControlLabel >First Name:</ControlLabel>&nbsp;
                                            <FormControl type="string" placeholder={this.editData.firstName}
                                            maxLength="12"
                                            inputRef={(ref) => {
                                                employeeFirstNameInput = ref
                                            }}
                                        />
                                    </FormGroup>
                                    <FormGroup >
                                        <ControlLabel >Last Name:</ControlLabel>&nbsp;
                                            <FormControl type="string" placeholder={this.editData.lastName}
                                            maxLength="12"
                                            inputRef={(ref) => {
                                                employeeLastNameInput = ref
                                            }}
                                        />
                                    </FormGroup>

                                    <FormGroup  >
                                        <ControlLabel >DOB:</ControlLabel>&nbsp;
                                            <FormControl type="string" placeholder={Moment(this.editData.dob).format('YYYY-MM-DD')}
                                            maxLength="10"
                                            inputRef={(ref) => {
                                                dobInput = ref
                                            }}
                                        />
                                    </FormGroup>
                                    <FormGroup  >
                                        <ControlLabel>Designation:</ControlLabel>&nbsp;
                                            <FormControl type="string" placeholder={this.editData.designation}
                                            maxLength="20"
                                            inputRef={(ref) => {
                                                designationInput = ref
                                            }}
                                        />
                                    </FormGroup>
                                    <FormGroup  >
                                        <ControlLabel >Joining Date:</ControlLabel>&nbsp;
                                            <FormControl type="string" placeholder={Moment(this.editData.joiningDate).format('YYYY-MM-DD')}
                                            maxLength="10"
                                            inputRef={(ref) => {
                                                joiningDateInput = ref
                                            }}
                                        />
                                    </FormGroup>

                                    <FormGroup  >
                                        <ControlLabel >Role:</ControlLabel>&nbsp;
                                            <FormControl componentClass="select" placeholder="select" inputRef={
                                            (ref) => { roleInput = ref }
                                        }>
                                            <option value="select" >{this.editData.role}</option>
                                            <option value="admin" >admin</option>
                                            <option value="manager" >manager</option>
                                            <option value="user" >user</option>
                                            {/* {usersData.map(res => {
                                                    return <option value={res.id}>{res.whoCreated}</option>
                                                })
                                                } */}

                                        </FormControl>
                                    </FormGroup>
                                    <FormGroup  >
                                        <ControlLabel style={{ marginLeft: '3%' }}>Supervisor:</ControlLabel>&nbsp;
                                            <FormControl componentClass="select" placeholder="select" inputRef={
                                            (ref) => { supervisorInput = ref }
                                        }>
                                            {this.editData.supervisorId != null &&
                                                // <option value="select" >{this.editData.supervisorId.loginId}</option>
                                                <option value="select" >{this.editData.supervisorId}</option>
                                            }
                                            {this.editData.supervisorId == null &&
                                                <option value="select" >{this.editData.supervisorId}</option>
                                            }
                                            {usersData.map(res => {
                                                // {userdata.map(res => {
                                                return <option value={res.loginId}>{res.loginId}</option>
                                            })
                                            }


                                        </FormControl>
                                    </FormGroup>
                                    <br />

                                    <FormGroup>
                                        <button className="btn btn-primary canceldisplay" onClick={this.handleClose} >Cancel</button>
                                        <button type="submit" className="btn btn-success  resetdisplay" >Submit</button>
                                        <button type="button" className="btn btn-info  resetdisplay" onClick={this.editReset} >Reset</button>
                                    </FormGroup>
                                </Form>
                                <br />

                            </div>
                        }
                        <br />

                    </div>
                }

            </div>


        );
    }
}
const mapStateToProps = state => {
    return getPropsMap(state, 'employee');
}
const EmployeeHome = connect(mapStateToProps, { getData: getAllData, addSubmit: employeeSubmit, editSubmit: editSubmit, delData: deleteEmployee, getUsers: getAllUsers })(Employee);
export default EmployeeHome;

