import axios from 'axios'

// ACTION TYPES

const CREATE_TODO = 'CREATE_TODO';
 const DELETE_TODO = 'DELETE_TODO';
const UPDATE_TODO = 'UPDATE_TODO';
const SET_TODOS = 'SET_TODOS';
const SET_TODO = 'SET_TODO';

// ACTION CREATORS
export const _createTodo = (todo) => {
    return {
      type: CREATE_TODO,
      todo
    };
  };
  
  export const _updateTodo = (todo) => {
    return {
      type: UPDATE_TODO,
      todo
    };
  };
  
  export const _deleteTodo = (todo) => {
    return {
      type: DELETE_TODO,
      todo
    };
  };
  
  export const setTodos = (todos) => {
    return {
      type: SET_TODOS,
      todos
    };
  };
  
  export const setTodo = (todo) => {
    return {
      type: SET_TODO,
      todo
    };
  };

//THUNKS

export const createTodo = (todo, history) => {
    return async (dispatch) => {
      const { data: created } = await axios.post('/api/todos', todo);
      dispatch(_createTodo(created));
      history.push('/');
    };
};
  
export const updateTodo = (todo, history) => {
    return async (dispatch) => {
      const { data: updated } = await axios.put(`/api/todos/${todo.id}`, todo);
      dispatch(_updateTodo(updated));
      history.push('/');
    };
};
  
export const deleteTodo = (id, history) => {
    return async (dispatch) => {
      const {data: todo} = await axios.delete(`/api/todos/${id}`);
      dispatch(_deleteTodo(todo));
      history.push('/');
    };
};
  
export const fetchTodos = () => {
    return async (dispatch) => {
      const { data: todos } = await axios.get('/api/todos');
      dispatch(setTodos(todos));
    };
};
  
export const fetchTodo = (id) => {
    return async (dispatch) => {
      const { data: todo } = await axios.get(`/api/todos/${id}`);
      dispatch(setTodo(todo));
    };
};

// TODOS REDUCER

export const ListReducer = (state = [], action) => {
    switch (action.type) {
      case SET_TODOS:
        return action.todos;
      case UPDATE_TODO:
        return state.map((todo) =>
          todo.id === action.todo.id ? action.todo : todo
        );
      case DELETE_TODO:
        return state.filter((todo) => todo.id !== action.todo.id);
      case CREATE_TODO:
        return [...state, action.todo];
      default:
        return state;
    }
};

// TODO REDUCER

export const ListItemReducer = (state = {}, action) => {
    switch (action.type) {
      case SET_TODO:
        return action.todo;
      default:
        return state;
    }
  };