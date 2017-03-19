export default (state=false, action) => {
  switch(action.type) {
    case 'TOGGLE_DRAWER':
      return !state;
    default:
      return state;
  }
}
