export default (state=[], action) => {
  switch(action.type) {
    case 'SET_TODOS':
      return action.todos;
    case 'ADD_TODO':
      return [...state, action.todo];
    case 'DELETE_TODO':
      return state.filter(todo => todo.id !== action.id);
    default:
      return state;
  }
}
