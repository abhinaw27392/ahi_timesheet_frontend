// import redux
import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

// import local
import authenticationReducer from '../modules/authentication/authenticationReducer'
import { errors } from '../modules/common/error/errorReducer'
import timesheetReducer from '../modules/timesheet/timesheetReducer'
import tasksReducer from '../modules/tasks/tasksReducer'
import departmentReducer from '../modules/department/departmentReducer'
import employeeReducer from '../modules/employee/employeeReducer'
import projectReducer from '../modules/projects/projectsReducer'

const appReducer = combineReducers({
  authenticationReducer,
  timesheetReducer,
  tasksReducer,
  projectReducer,
  employeeReducer,
  departmentReducer,
  errors,
  router: routerReducer

})

export default appReducer
