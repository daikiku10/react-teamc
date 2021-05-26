export const LOGINUSER = 'loginUser'
export const loginUser = (user) => ({
  type:LOGINUSER,
  user:user
})

export const LOGOUTUSER = 'logoutUser'
export const logoutUser = () => ({
  type:LOGOUTUSER
})