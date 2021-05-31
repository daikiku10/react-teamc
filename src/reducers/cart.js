import {CARTSET, NEWCART, ADDCART, CARTRESET, ORDER, ORDERSET, ORDERRESET, DELETECART, ORDERCANCEL} from '../actions/index'

const initialState = {
  cart:"",
  orders:[],
  userInfo:""
}

export default (state = initialState, action) => {
  switch(action.type){
    case CARTSET:
      return {
        cart: action.cartData,
        orders:[],
        userInfo:state.userInfo
      }
    case NEWCART:
      return {
        cart: action.cartData,
        orders:[],
        userInfo:state.userInfo
      }
    case ADDCART:
      return {
        cart: action.cartData,
        orders:[],
        userInfo:state.userInfo
      }
    case CARTRESET:
      return {
        cart: "",
        orders:[],
        userInfo:state.userInfo
      }
    case DELETECART:
      return {
        cart: action.cartData,
        orders:[],
        userInfo:state.userInfo
      }
    case ORDERSET:
      if(state.orders == null){
        return {
          cart:state.cart,
          orders:[...action.orderData],
          userInfo:state.userInfo
        }
      }else {
        return {
          cart:state.cart,
          orders:[...state.orders, action.orderData],
          userInfo:state.userInfo
        }
      }
    case ORDERRESET:
      return {
        cart:state.cart,
        orders:[],
        userInfo: state.userInfo
      }
    case ORDER:
      return {
        cart:"",
        orders:[],
        userInfo:action.userInfo
      }
    case ORDERCANCEL:
      return {
        cart:"",
        orders:[...state.orders],
        userInfo:state.userInfo
      }
    default:
      return state
  }
}