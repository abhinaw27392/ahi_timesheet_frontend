//import react
import React from "react";
import { Link } from "react-router-dom";

// import redux
import { connect } from "react-redux";

// import third-party
import { IndexLinkContainer, LinkContainer } from "react-router-bootstrap";
import { Nav, Navbar, NavItem, NavDropdown, MenuItem } from "react-bootstrap";

//import local
import AuthorizedLinkContainer from "../common/hoc/AuthorizedLinkContainer";
import loggedUser from '../authentication/loggedUser/loggedUserReducer'

import { EMPLOYEE_ROLE, MANAGER_ROLE, ADMIN_ROLE } from "../main/Main";

// import css
import "./Header.scss";
import Logo from "./AH_Long.png";

export const HeaderComponent = ({ userData }) => (
  <header>
    <Navbar inverse fixedTop collapseOnSelect>

      <Navbar.Header>
        <div className="navbar-brand">
          <img src={Logo} height="40" alt="ah-logo" />
        </div>
        <Navbar.Toggle />
      </Navbar.Header>

      <Nav >
        <IndexLinkContainer to="/app" activeHref="active">
          <NavItem >Home</NavItem>
        </IndexLinkContainer>

        <LinkContainer to="/app/timesheet" activeHref="active">
          <NavItem >Timesheet</NavItem>
        </LinkContainer>

        <NavDropdown title="My AH" id="basic-nav-dropdown">
          <LinkContainer to="/app/mytask">
            <MenuItem >My Task</MenuItem>
          </LinkContainer>
          <LinkContainer to="/app/myprofile">
            <MenuItem >My Profile</MenuItem>
          </LinkContainer>
        </NavDropdown>

        {userData != null && userData.role == "admin" ? (
          <NavDropdown title="Admin" id="basic-nav-dropdown">
            <LinkContainer to="/app/admin/department">
              <MenuItem >Department</MenuItem>
            </LinkContainer>
            <LinkContainer to="/app/admin/employee">
              <MenuItem >Employee</MenuItem>
            </LinkContainer>
            <LinkContainer to="/app/admin/projects">
              <MenuItem >Projects</MenuItem>
            </LinkContainer>
          </NavDropdown>) : null}


      </Nav>

      {userData ? (
        <Nav pullRight>
          <NavItem>
            <span>
              {userData.firstName} {userData.lastName}
            </span>
          </NavItem>
          <NavItem componentClass="span" eventKey={20} href="#">
            <Link to="/auth/logout" className="logout">Logout</Link>
          </NavItem>
        </Nav>
      ) : null}
    </Navbar>
  </header>
);

const mapStateToProps = state => {
  return state.authenticationReducer.loggedUser;
};

const Header = connect(mapStateToProps, null, null, { pure: false })(HeaderComponent);

export default Header;

