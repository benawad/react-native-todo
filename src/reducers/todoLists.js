const addTodo = (todoList, todo) => ({
  id: todoList.id,
  name: todoList.name,
  todos: [...todoList.todos, todo],
});
const deleteTodo = (todoList, id) => ({
  id: todoList.id,
  name: todoList.name,
  todos: todoList.todos.filter(todo => todo.id !== id),
});
const updateTodo = (todoList, todo) => ({
  id: todoList.id,
  name: todoList.name,
  todos: todoList.todos.map((t) => t.id === todo.id ? todo : t),
});

export default (state=[], action) => {
  switch(action.type) {
    case 'SET_TODO_LISTS':
      return action.todoLists;
    case 'ADD_TODO_LIST':
      return [...state, action.todoList];
    case 'DELETE_TODO_LIST':
      return state.filter(tl => tl.id !== action.id);
    case 'ADD_TODO':
      return state.map((tl) => tl.id === action.listId ? addTodo(tl, action.todo) : tl);
    case 'DELETE_TODO':
      return state.map((tl) => tl.id === action.listId ? deleteTodo(tl, action.id) : tl);
    case 'UPDATE_TODO':
      return state.map((tl) => tl.id === action.listId ? updateTodo(tl, action.todo) : tl);
    default:
      return state;
  }
}
