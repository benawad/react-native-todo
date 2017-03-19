export default (state=0, action) => {
  switch(action.type) {
    case 'CHANGE_LIST':
      return action.newList;
    default:
      return state;
  }
}
