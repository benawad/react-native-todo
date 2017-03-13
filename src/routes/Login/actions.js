export const loginSucceeded = (data) => ({
  type: 'LOGIN_SUCCEEDED',
  data,
})

export const loginFailed = (err) => ({
  type: 'LOGIN_FAILED',
  err,
})
