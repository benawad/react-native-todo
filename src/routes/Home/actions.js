export const checkIfSignedIn = () => ({
  type: 'CHECK_IF_SIGNED_IN',
});

export const setTodos = (todos) => ({
  type: 'SET_TODOS',
  todos,
});

export const addTodo = (todo) => ({
  type: 'ADD_TODO',
  todo,
});

export const deleteTodo = (id) => ({
  type: 'DELETE_TODO',
  id,
});
