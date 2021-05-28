import {CARTSET} from '../actions/index'

const initialState = {
  cart:""
}

export default (state = initialState, action) => {
  switch(action.type){
    case CARTSET:
      return {cart: action.cartData}
    default:
      return state
  }
}