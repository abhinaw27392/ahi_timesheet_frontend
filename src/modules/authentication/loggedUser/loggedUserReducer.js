import { FETCH_REQUEST, FETCH_RESET, FETCH_SUCCESS, FETCH_FAILURE } from './loggedUserAction'

const initialState = {
  pending: true,
  logged: false
}

const loggedUser = (state = initialState, action) => {
  
  switch (action.type) {
    case FETCH_REQUEST:
    case FETCH_RESET:
    case FETCH_SUCCESS:
    case FETCH_FAILURE:
      return Object.assign({}, state, action);

    default:
      return state
  }
};

export default loggedUser;
