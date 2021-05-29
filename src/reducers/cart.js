import {CARTSET, NEWCART, ADDCART, CARTRESET, ORDER, ORDERSET,} from '../actions/index'
import { CART_STATUS_IN } from '../actions/status'

const initialState = {
  cart:"",
  orders:[]
}

export default (state = initialState, action) => {
  switch(action.type){
    case CARTSET:
      console.log(action.cartData)
      return {
        cart: action.cartData,
        orders:state.orders
      }
    case NEWCART:
      return {cart: action.cartData}
    case ADDCART:
      return {cart: action.cartData}
    case CARTRESET:
      return {cart: ""}
    case ORDERSET:
      return {
        cart:state.cart,
        orders: action.orderData
      }
    case ORDER:
        return {
          cart:"",
          orders:action.orderInfo
        }
    default:
      return state
  }
}