// import react
import React from 'react';
import { Switch, Route } from 'react-router-dom'

// import local
import Authorization from '../common/hoc/Authorization'
import Home  from '../home/Home'
import TimesheetHome from '../timesheet/TimesheetHome' 
import Tasks from '../tasks/tasks'
import Department from '../department/department'
import EmployeeHome from '../employee/employee'
import Projects from '../projects/projects'
import Myprofile from '../myprofile/myprofile'


//import css
import './Main.css';

export const EMPLOYEE_ROLE = [{ 'group': 'USER' }, { 'group': 'MANAGER' }, { 'group': 'ADMIN' }];
export const MANAGER_ROLE = [{ 'group': 'MANAGER' }, { 'group': 'ADMIN' }];
export const ADMIN_ROLE = [{ 'group': 'ADMIN' }];

const Employee = Authorization(EMPLOYEE_ROLE)
const Manager = Authorization(MANAGER_ROLE)
const Admin = Authorization(ADMIN_ROLE) 

// export const Main = () =>

//   (
//     <main>
//       <Switch>
//         <Route path='/app/manager' component={Manager(ManagerHome)} />
//         <Route path='/app/admin' component={Admin(AdminHome)} />
//         <Route path='/app/timesheet' component={Employee(TimesheetHome)} />
//         <Route exact path='/app' component={Home} />
//       </Switch>
//     </main>
//   )

 

export const Main = () =>

  (
    <main>
      <Switch>
        <Route path='/app/mytask' component={Tasks} />
        <Route path='/app/timesheet' component={TimesheetHome} />
        <Route path='/app/admin/department' component={Department} />
        <Route path='/app/admin/employee' component={EmployeeHome} />
        <Route path='/app/admin/projects' component={Projects} />
        <Route path='/app/myprofile' component={Myprofile} />
        <Route exact path='/app' component={Home} />
      </Switch>
    </main>
  )