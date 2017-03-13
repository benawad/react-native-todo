export default (state={}, action) => {
  console.log(action.type);
  switch(action.type) {
    case 'LOGIN_SUCCEEDED':
      console.log('success reducer');
      console.log(action.data);
      return state;
    case 'LOGIN_FAILED':
      console.log('failed reducer');
      console.log(action.err);
      return state;
    default:
      return state;
  }  
}
