import {LOGINUSER, LOGOUTUSER} from '../actions/index';

const initialState = {
  user:null
}

export default (state = initialState, action) => {
  switch(action.type){
    case LOGINUSER:
      return {user:action.user}
    case LOGOUTUSER:
      return {user:null}
    default:
      return state
  }
}