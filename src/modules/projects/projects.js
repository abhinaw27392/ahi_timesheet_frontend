//import react
import React from 'react'
import ReactDOM from 'react-dom'

//import redux
import { connect } from 'react-redux'

//import third-party
import { Alert, Form, FormControl, FormGroup, Table, Checkbox } from 'react-bootstrap'
import { ControlLabel } from "react-bootstrap";
import trim from 'trim';

// import Dialog from 'react-bootstrap-dialog'
import Dialog from 'react-dialog'

//import local
import { getPropsMap } from './projectsReducer'
import { projectsSubmit, editSubmit, getAllData, deleteProject, getAllUsers } from './projectsAction'

//import css
import './projectss.scss'

let checkBoxArr = []; let projectNameAlert = false; let projectDescAlert = false; let showDelAlert = false; let delSuccessAlert = false;
let projectHeadAlert = false;
class Projects extends React.Component {
    constructor() {
        super();
        this.state = {
            isDialogOpen: false,
            isEditDialogOpen: false,
            isShowPage: true
        }
    }
    componentDidMount() {
        this.props.getData();
        this.props.getUsers();
    }
    componentWillReceiveProps(){
        this.props.getData();
    }

    openDialog = () => {
        this.setState({ isDialogOpen: true, isShowPage: false, isEditDialogOpen: false });
        projectNameAlert = false; projectDescAlert = false; showDelAlert = false; delSuccessAlert = false; projectHeadAlert = false;
    }


    editData = '';
    openEditDialog = (row) => {
        this.editData = '';
        this.setState({ isEditDialogOpen: true, isShowPage: false, isDialogOpen: false });
        this.editData = row;
        console.log(this.editData);
        projectNameAlert = false; projectDescAlert = false; showDelAlert = false; delSuccessAlert = false; projectHeadAlert = false;
    }


    handleClose = () => this.setState({ isDialogOpen: false, isShowPage: true, isEditDialogOpen: false })




    handleInputChange(event) {
        showDelAlert = false;
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
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
        document.getElementById("ahi-project-form").reset();
        projectNameAlert = false; projectDescAlert = false; showDelAlert = false; delSuccessAlert = false; projectHeadAlert = false;
        this.setState({ isDialogOpen: true, isShowPage: false, isEditDialogOpen: false });
    }
    editReset = () => {
        document.getElementById("ahi-project-edit-form").reset();
        projectNameAlert = false; projectDescAlert = false; showDelAlert = false; delSuccessAlert = false; projectHeadAlert = false;
        this.setState({ isDialogOpen: false, isShowPage: false, isEditDialogOpen: true });
    }

    render() {

        const { addSubmit, editSubmit, errorMessage, isFetching, projectData, delData, usersData } = this.props;
        let projectNameInput = ''; let descInput = ''; let headed_byInput = '';
        console.log("usersData is:" + JSON.stringify(usersData));
        console.log("projectData is:" + projectData);

        function handledelete() {
            if (checkBoxArr != '') {
                delSuccessAlert = true;
                console.log("deleteproject is executing...");
                delData(checkBoxArr);

                checkBoxArr.length = 0;
            }
            else {
                console.log("delete alert is working");
                showDelAlert = true; delSuccessAlert = false;
            }
        }
        return (

            <div className="container">

                {this.state.isShowPage &&
                    <div className="panel">
                        <h1>PROJECTS</h1>
                    </div>
                }

                {this.state.isShowPage &&
                <div className="panel">
                    {this.state.isShowPage &&
                        <div>
                            {showDelAlert ? (<Alert bsStyle="danger">Please Seelct a project!</Alert>) : null}
                            {/* {delSuccessAlert ? (<Alert bsStyle="success" >Your project is successfully deleted!</Alert>) : null} */}

                            <button type="button" onClick={this.openDialog} className="btn btn-primary adddisplay" >Add</button>
                            <button type="button" className="btn btn-danger deldisplay" onClick={handledelete} >Del</button>
                            <br /><br />
                        </div>
                    }
                    <br /><br />
                    {
                        projectData != null &&
                        this.state.isShowPage &&
                        <div className="panel panel-blur">
                            <Table responsive bordered condensed hover className="tableStyle">
                                <thead>
                                    {
                                        <tr>
                                            <th>Select</th>
                                            <th><ControlLabel>ProjectName</ControlLabel></th>
                                            <th><ControlLabel>Description</ControlLabel></th>
                                            <th><ControlLabel>Headed By</ControlLabel></th>
                                        </tr>
                                    }

                                </thead>
                                <tbody>
                                    {projectData.map((row) => {
                                        // console.log("row_id:" + row.projectId);
                                        return <tr className="test">
                                            <td><Checkbox name={row.projectId} onChange={this.handleInputChange}></Checkbox></td>
                                            <td><a onClick={() => this.openEditDialog(row)} title="Edit your project">{row.projectName}</a></td>
                                            <td>{row.projectDescription}</td>
                                            <td>{row.headedBy}</td>
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

                {
                    this.state.isDialogOpen &&
                    <div className="panel">
                        <h1>ADD NEW PROJECT</h1>
                    </div>
                }

                {this.state.isDialogOpen &&
                
                <div className="panel">
                    {this.state.isDialogOpen &&
                        <div className="panel panel-blur">
                        <Form className="ahi-project-form" id="ahi-project-form" onSubmit={(e) => {
                            e.preventDefault();
                            let datas = ''; projectDescAlert = false; projectNameAlert = false; projectHeadAlert = false;

                            projectNameInput.value = trim(projectNameInput.value);
                            descInput.value = trim(descInput.value);

                            if (projectNameInput.value != '' && descInput.value != '' && headed_byInput.value != 'select') {
                                datas = { projectId: null, projectName: projectNameInput.value, projectDescription: descInput.value, headedByUserId: headed_byInput.value };
                                addSubmit(datas);
                                this.handleClose();
                            }
                            else if (projectNameInput.value == '') {
                                console.log("projectname alert is working");
                                projectNameAlert = true;
                                this.setState({ isDialogOpen: true, isShowPage: false, isEditDialogOpen: false });
                            }
                            else if (descInput.value == '') {
                                console.log("desc alert is working");
                                projectDescAlert = true;
                                this.setState({ isDialogOpen: true, isShowPage: false, isEditDialogOpen: false });
                            }
                            else if (headed_byInput.value == 'select') {
                                console.log("Headed By alert is working");
                                projectHeadAlert = true;
                                this.setState({ isDialogOpen: true, isShowPage: false, isEditDialogOpen: false });
                            }
                            //-------------------------------------added
                        }
                        }>
                            <FormGroup >
                                {errorMessage ? (<Alert bsStyle="danger"><strong>Error!</strong> {errorMessage}</Alert>) : null}
                            </FormGroup>

                            <FormGroup >
                                {isFetching ? (<Alert bsStyle="success" >Your Project is successfully Added!</Alert>) : null}
                            </FormGroup>

                            <FormGroup >
                                {projectNameAlert ? (<Alert bsStyle="danger" >Please Enter project name!</Alert>) : null}
                            </FormGroup>
                            <FormGroup >
                                {projectDescAlert ? (<Alert bsStyle="danger" >Please Enter project description!</Alert>) : null}
                            </FormGroup>
                            <FormGroup >
                                {projectHeadAlert ? (<Alert bsStyle="danger" >Please Enter Headed By!</Alert>) : null}
                            </FormGroup>

                            <FormGroup controlId="formControlsSelect" className="ahi-project-name">
                                <ControlLabel>Project Name</ControlLabel>
                                <FormControl type="string" placeholder="enter ProjectName"
                                    inputRef={(ref) => {
                                        projectNameInput = ref
                                    }}
                                />
                            </FormGroup>

                            <FormGroup className="ahi-project-desc">
                                <ControlLabel>Description</ControlLabel>
                                <FormControl type="string" placeholder="enter description"
                                    inputRef={(ref) => {
                                        descInput = ref
                                    }}
                                />
                            </FormGroup>
                            <FormGroup controlId="formControlsSelect" className="form-inline1">
                                <ControlLabel >Headed By:</ControlLabel>&nbsp;
                                <FormControl componentClass="select" placeholder="select" inputRef={
                                    (ref) => { headed_byInput = ref }
                                }>
                                    <option value="select" >select</option>
                                    {usersData.map(res => {
                                        return <option value={res.id}>{res.firstName} {res.lastName}</option>
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
                            <br />

                        </Form>
                        </div>
                   
                    
                            }


                </div>
                        }

                {
                    this.state.isEditDialogOpen &&
                    <div className="panel">
                        <h1>EDIT PROJECT</h1>
                    </div>
                }
                {this.state.isEditDialogOpen &&
                <div className="panel">
                    {this.state.isEditDialogOpen &&
                        <div className="panel panel-blur">
                        <Form className="ahi-project-form" id="ahi-project-edit-form" onSubmit={(e) => {
                            e.preventDefault();
                            let datas = ''
                            projectNameAlert = false; projectDescAlert = false; showDelAlert = false; delSuccessAlert = false; projectHeadAlert = false;

                            if (projectNameInput.value != '' && trim(projectNameInput.value) == '') {
                                console.log("projectNameAlert is working");
                                projectNameAlert = true;
                                this.setState({ isEditDialogOpen: true, isShowPage: false, isDialogOpen: false });
                            }
                            else if (descInput.value != '' && trim(descInput.value) == '') {
                                console.log("projectDescAlert is working");
                                projectDescAlert = true;
                                this.setState({ isEditDialogOpen: true, isShowPage: false, isDialogOpen: false });
                            }
                            else {
                                projectNameInput.value = trim(projectNameInput.value);
                                descInput.value = trim(descInput.value);

                                if (projectNameInput.value == '' && descInput.value != '' && headed_byInput.value != 'select') {
                                    datas = { projectId: this.editData.projectId, projectName: this.editData.projectName, projectDescription: descInput.value, headedByUserId: headed_byInput.value }
                                }
                                else if (descInput.value == '' && projectNameInput.value != '' && headed_byInput.value != 'select') {
                                    datas = { projectId: this.editData.projectId, projectName: projectNameInput.value, projectDescription: this.editData.projectDescription, headedByUserId: headed_byInput.value }
                                }
                                else if (descInput.value == '' && projectNameInput.value == '' && headed_byInput.value != 'select') {
                                    datas = { projectId: this.editData.projectId, projectName: this.editData.projectName, projectDescription: this.editData.projectDescription, headedByUserId: headed_byInput.value }
                                }
                                else if (descInput.value == '' && projectNameInput.value == '' && headed_byInput.value == 'select') {
                                    datas = { projectId: this.editData.projectId, projectName: this.editData.projectName, projectDescription: this.editData.projectDescription, headedByUserId: this.editData.headedByUserId }
                                }
                                else if (descInput.value == '' && projectNameInput.value != '' && headed_byInput.value == 'select') {
                                    datas = { projectId: this.editData.projectId, projectName: projectNameInput.value, projectDescription: this.editData.projectDescription, headedByUserId: this.editData.headedByUserId }
                                }
                                else if (descInput.value != '' && projectNameInput.value == '' && headed_byInput.value == 'select') {
                                    datas = { projectId: this.editData.projectId, projectName: this.editData.projectName, projectDescription: descInput.value, headedByUserId: this.editData.headedByUserId }
                                }
                                else {
                                    datas = { projectId: this.editData.projectId, projectName: projectNameInput.value, projectDescription: descInput.value, headedByUserId: headed_byInput.value }
                                }

                                editSubmit(datas);
                                this.handleClose();
                            }
                        }
                        }>
                            <FormGroup >
                                {errorMessage ? (<Alert bsStyle="danger"><strong>Error!</strong> {errorMessage}</Alert>) : null}
                            </FormGroup>

                            <FormGroup >
                                {isFetching ? (<Alert bsStyle="success" >Your Project is successfully Editted!</Alert>) : null}
                            </FormGroup>
                            <FormGroup >
                                {projectNameAlert ? (<Alert bsStyle="danger" >Please Enter valid project name!</Alert>) : null}
                            </FormGroup>
                            <FormGroup >
                                {projectDescAlert ? (<Alert bsStyle="danger" >Please Enter valid project description!</Alert>) : null}
                            </FormGroup>

                            <FormGroup controlId="formControlsSelect" className="ahi-project-name">
                                <ControlLabel>Project Name</ControlLabel>
                                <FormControl type="string" placeholder={this.editData.projectName}
                                    inputRef={(ref) => {
                                        projectNameInput = ref
                                    }}
                                />
                            </FormGroup>

                            <FormGroup className="ahi-project-desc">
                                <ControlLabel>Description</ControlLabel>
                                <FormControl type="string" placeholder={this.editData.projectDescription}
                                    inputRef={(ref) => {
                                        descInput = ref
                                    }}
                                />
                            </FormGroup>
                            <FormGroup controlId="formControlsSelect" className="form-inline1">
                                <ControlLabel >Headed By:</ControlLabel>&nbsp;
                                    <FormControl componentClass="select" placeholder={this.editData.headedByUserId} inputRef={
                                    (ref) => { headed_byInput = ref }
                                }>
                                    {usersData.map(res => {
                                        if (this.editData.headedByUserId == res.id) {
                                            return <option value="select" >{res.firstName} {res.lastName}</option>
                                        }
                                    })}
                                    {usersData.map(res => {
                                        if (this.editData.headedByUserId != res.id) {
                                            return <option value={res.id}>{res.firstName} {res.lastName}</option>
                                        }
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
                            <br />

                        </Form>
                        </div>



                    }

                </div>
                }
                <br />
            </div>
        );
    }
}


const mapStateToProps = state => {
    return getPropsMap(state, 'projects');
}
const ProjectsHome = connect(mapStateToProps, { getData: getAllData, addSubmit: projectsSubmit, editSubmit: editSubmit, delData: deleteProject, getUsers: getAllUsers })(Projects);
export default ProjectsHome;

