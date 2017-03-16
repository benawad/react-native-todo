export default (state=[], action) => {
  switch(action.type) {
    case 'SET_TODOS':
      return action.todos;
    case 'ADD_TODO':
      return [...state, action.todo];
    default:
      return state;
  }
}
