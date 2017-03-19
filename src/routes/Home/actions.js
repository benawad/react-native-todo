export const checkIfSignedIn = () => ({
  type: 'CHECK_IF_SIGNED_IN',
});

export const addTodo = (todo) => ({
  type: 'ADD_TODO_NEED_LIST_ID',
  todo,
});

export const deleteTodo = (id) => ({
  type: 'DELETE_TODO_NEED_LIST_ID',
  id,
});

export const updateTodo = (todo) => ({
  type: 'UPDATE_TODO_NEED_LIST_ID',
  todo,
});

export const setUser = (user) => ({
  type: 'SET_USER',
  user,
})

export const setTodoLists = (todoLists) => ({
  type: 'SET_TODO_LISTS',
  todoLists,
});

export const addTodoList = (todoList) => ({
  type: 'ADD_TODO_LIST',
  todoList,
});

export const deleteTodoList = (id) => ({
  type: 'DELETE_TODO_LIST',
  id,
});
