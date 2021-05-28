import {DELETEITEM, SETITEM} from '../actions/index'

const initialState = {
  items:[]
}

export default (state = initialState, action) => {
  switch(action.type){
    case SETITEM:
      return {items: [...state.items, action.item]}
    case DELETEITEM:
      return {items: []}
    default:
      return state
  }
}