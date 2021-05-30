import { ContactSupportOutlined } from '@material-ui/icons'
import {CARTSET, NEWCART, ADDCART, CARTRESET, ORDER, ORDERSET, ORDERRESET,} from '../actions/index'

const initialState = {
  cart:"",
  orders:[]
}

export default (state = initialState, action) => {
  switch(action.type){
    case CARTSET:
      return {cart: action.cartData}
    case NEWCART:
      return {cart: action.cartData}
    case ADDCART:
      return {cart: action.cartData}
    case CARTRESET:
      return {cart: ""}
    // 配列にできない
    case ORDERSET:
      if(state.orders == null){
        return {
          cart:"",
          orders:[...action.orderData]}
      }else {
        return {
          cart:"",
          orders:[...state.orders, action.orderData]}
      }
    case ORDERRESET:
      return {
        cart:"",
        orders:[]
      }
    case ORDER:
      return {
        cart:"",
        orders:[...state.orders, action.orderInfo,action.userInfo]
      }
    default:
      return state
  }
}