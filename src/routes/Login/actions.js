export const loginSucceeded = (token) => ({
  type: 'LOGIN_SUCCEEDED',
  token,
})

export const loginFailed = (err) => ({
  type: 'LOGIN_FAILED',
  err,
})

export const addTokenToProps = (token) => ({
  type: 'ADD_TOKEN_TO_PROPS',
  token,
})
