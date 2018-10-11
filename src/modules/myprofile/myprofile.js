//import react
import React from "react";
import { Link } from "react-router-dom";


// import redux
import { connect } from "react-redux";
import { Alert, Form, FormControl, FormGroup, Table, Checkbox } from 'react-bootstrap'
import { ControlLabel } from "react-bootstrap";
// import third-party
import { IndexLinkContainer, LinkContainer } from "react-router-bootstrap";
import { Nav, Navbar, NavItem, NavDropdown, MenuItem } from "react-bootstrap";

//import local
import AuthorizedLinkContainer from "../common/hoc/AuthorizedLinkContainer";
import loggedUser from '../authentication/loggedUser/loggedUserReducer'
import './myprofile.scss'

export const myprofilecomponent = ({ userData }) => (

  <div className="container">

    <div>
      {
        <div>
          <h1 className="panel panel-heading">My Profile</h1>
        </div>
      }
      <div className="panel panel-blur">

        <Form className="padme">
          <FormGroup className="ahi-department-desc">
            <ControlLabel>First Name</ControlLabel>
            <FormControl placeholder={userData.firstName} readOnly />
          </FormGroup>

          <FormGroup className="ahi-department-desc">
            <ControlLabel>Last Name</ControlLabel>
            <FormControl placeholder={userData.lastName} readOnly />
          </FormGroup>


          <FormGroup className="ahi-department-desc">
            <ControlLabel>Email</ControlLabel>
            <FormControl placeholder={userData.email} readOnly />
          </FormGroup>
        </Form>
      </div>

    </div>
  </div>
);

const mapStateToProps = state => {
  return state.authenticationReducer.loggedUser;
};

const Myprofile = connect(mapStateToProps, null, null, { pure: false })(myprofilecomponent);

export default Myprofile;

