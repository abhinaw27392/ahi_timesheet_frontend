
import { API_ERROR_RESET, API_ERROR, UNAUTHORIZED_ERROR } from '../api'

export function errors(state = {unauthorized:false, error: null}, action) {
  switch (action.type) {

    case API_ERROR_RESET:
        //return Object.assign({}, state, {unauthorized:false, error: null})
        return action.payload;

    case API_ERROR:
        return Object.assign({}, state, {unauthorized:false, ...action})

    case UNAUTHORIZED_ERROR:
        return Object.assign({}, state, {unauthorized:true})

    default:
      return state;
  }
}
