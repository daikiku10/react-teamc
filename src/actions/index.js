import firebase from 'firebase'

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
export const cartSet = (cartData) => ({
  type:CARTSET,
  cartData:cartData
})



