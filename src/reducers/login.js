export default (state={}, action) => {
  console.log(action.type);
  switch(action.type) {
    case 'LOGIN_SUCCEEDED':
      return state;
    case 'LOGIN_FAILED':
      return state;
    default:
      return state;
  }  
}
