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
export const setItem = (item) => ({
  type:SETITEM,
  item:item
})

export const SETTOPPING = 'setTopping'
export const setTopping = (topping) => ({
  type:SETTOPPING,
  topping:topping
})