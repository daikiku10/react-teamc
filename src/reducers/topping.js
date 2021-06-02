import {DELETETOPPING, SETTOPPING} from '../actions/index'

const initialState = {
  toppings:[]
}

export default (state = initialState, action) => {
  switch(action.type){
    case SETTOPPING:
      return {toppings:action.toppings}
    case DELETETOPPING:
      return {toppings: []}
    default:
      return state
  }
}