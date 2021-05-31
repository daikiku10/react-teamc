import firebase from 'firebase'
import {CART_STATUS_IN} from './status'

export const LOGINUSER = 'loginUser'
export const loginUser = (user) => ({
  type:LOGINUSER,
  user:user
})
export const LOGOUTUSER = 'logoutUser'
export const logoutUser = () => ({
  type:LOGOUTUSER
})

export const SETITEM = 'setItem'
export const setItem = () => dispatch => {
  firebase.firestore().collection('items').get().then( snapshot => {
    snapshot.forEach( item => {
      return dispatch({
        type:SETITEM,
        item:item.data()
      })
    })
  })
}
export const SETTOPPING = 'setTopping'
export const setTopping = () => dispatch => {
  firebase.firestore().collection('toppings').get().then( snapshot => {
    snapshot.forEach( topping => {
      return dispatch ({
        type:SETTOPPING,
        topping:topping.data()
      })
    })
  })
}
export const DELETEITEM = 'deleteItem'
export const deleteItem = () => ({
  type:DELETEITEM
})
export const DELETETOPPING = 'deleteTopping'
export const deleteTopping = () => ({
  type:DELETETOPPING
})

export const CARTSET = 'cartSet'
export const cartSet = (user) => dispatch => {
  firebase.firestore().collection(`users/${user.uid}/orders`).get().then(snapshot => {
    snapshot.forEach(item => {
      const data = item.data()
      data.orderId = item.id
      if(data.status === CART_STATUS_IN){
          dispatch ({
            type:CARTSET,
            cartData:data
          })
      } 
    })
  })
}
export const CARTRESET = 'cartReset'
export const cartReset = () => ({
  type:CARTRESET
})

export const NEWCART = 'newCart'
export const newCart = (user, cart) => dispatch => {
  if(user){
    firebase.firestore().collection(`users/${user.uid}/orders`).add(cart).then(doc => {
      cart.orderId = doc.id
      return dispatch ({
        type:NEWCART,
        cartData:cart
      })
    })
  } else {
    return dispatch ({
      type:NEWCART,
      cartData:cart
    })
  }
}

export const ADDCART = 'addCart'
export const addCart = (user, cart) => dispatch => {
  if(user){
    firebase.firestore().collection(`users/${user.uid}/orders`).doc(cart.orderId).update(cart).then(() => {
      return dispatch ({
        type:ADDCART,
        cartData:cart
      })
    })
  } else {
    return dispatch ({
      type:ADDCART,
      cartData:cart
    })
  }
}

export const DELETECART = 'deleteCart'
export const deleteCart = (user, cart) => dispatch => {
  if(user){
    firebase.firestore().collection(`users/${user.uid}/orders`).doc(cart.orderId).update(cart).then(() => {
      return dispatch ({
        type:DELETECART,
        cartData:cart
      })
    })
  } else {
    return dispatch ({
      type:DELETECART,
      cartData:cart
    })
  }
}

export const ORDERSET = 'orderSet'
export const orderSet = user => dispatch => {
  firebase.firestore().collection(`users/${user.uid}/orders`).get().then(snapshot => {
    snapshot.forEach(item => {
      const data = item.data()
      if(data.status !== CART_STATUS_IN){
        dispatch({
          type:ORDERSET,
          orderData:data
        })
      }
    })
  })
}
export const ORDERRESET = 'orderReset'
export const orderReset = () => ({
  type:ORDERRESET
})


export const ORDER = 'order'
export const order = (user, orderInfo) => dispatch => {
  firebase.firestore().collection(`users/${user.uid}/orders`).doc(orderInfo.orderId).update(orderInfo).then(() => {
    let userInfo = {
      userName: orderInfo.destinationName,
      email: orderInfo.destinationEmail,
      zipcode: orderInfo.destinationZipcode,
      address: orderInfo.destinationAddress,
      tel: orderInfo.tel,
      creditcardNo: orderInfo.creditcardNo
    }
    firebase.firestore().collection(`users/${user.uid}/userInfo`).add(userInfo).then(() => {

      return dispatch ({
        type:ORDER,
        orderInfo:orderInfo,
        userInfo: userInfo
      })
    })
  }) 
}

export const ORDERCANCEL = 'orderCancel'
export const orderCancel = (user,orderInfo) => dispatch => {
  firebase.firestore().collection(`users/${user.uid}/orders`).doc(orderInfo.orderId).update(orderInfo).then(() => {
    return dispatch ({
      type:ORDERCANCEL,
      orderInfo:orderInfo
    })
  })
}