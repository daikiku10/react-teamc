import {SETTOPPING} from '../actions/index'

const initialState = {
  toppings:[]
}

export default (state = initialState, action) => {
  switch(action.type){
    case SETTOPPING:
      return {toppings:[...state.toppings, action.topping]}
    default:
      return state
  }
}