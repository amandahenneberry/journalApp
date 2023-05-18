import axios from 'axios'
import history from '../history'

const TOKEN = 'token'

/**
 * ACTION TYPES
 */
const SET_AUTH = 'SET_AUTH';
const SET_ENTRY = 'SET_ENTRY';
// const SET_ENTRIES = 'SET_ENTRIES'
const POST_ENTRY = 'POST_ENTRY'
const DELETE_ENTRY = 'DELETE_ENTRY';
const UPDATE_ENTRY = 'UPDATE_ENTRY';

const SET_TODO = 'SET_TODO';
// const SET_TODOS = 'SET_TODOS';
const POST_TODO = 'POST_TODO';
const DELETE_TODO = 'DELETE_TODO'
const UPDATE_TODO = 'UPDATE_TODO';


/**
 * ACTION CREATORS
 */
const setAuth = auth => ({type: SET_AUTH, auth})
const setEntry = entry => ({type: SET_ENTRY, entry})
// const setEntries = entries =>({type: SET_ENTRIES, entries})
const postEntry = entry =>({type: POST_ENTRY, entry})
const removeEntry = entryId => ({type: DELETE_ENTRY, entryId});
const updateEntry = (entry) => ({type: UPDATE_ENTRY, entry})

const setTodo = todo => ({type: SET_TODO, todo});
// const setTodos = todos => ({type: SET_TODOS, todos});
const postTodo = todo => ({type: POST_TODO, todo})
const removeTodo = todoId => ({type: DELETE_TODO, todoId})
const updateTodo = (todo) => ({type: UPDATE_TODO, todo})


/**
 * THUNK CREATORS
 */

//FIGURE OUT how to dispatch   setEntry from here too
export const me = () => async dispatch => {
  const token = window.localStorage.getItem(TOKEN)
  if (token) {
    const res = await axios.get('/auth/me', {
      headers: {
        authorization: token
      }
    })
    dispatch (setAuth(res.data));

    // return 
  }
}

export const fetchEntry = (entryId) => async dispatch => {
  try {
    const res = await axios.get(`/auth/me/entries/${entryId}`);
    return dispatch(setEntry(res.data))
  } catch (error) {
    console.log('error getting entry')
  }
}

export const fetchTodo = (todoId) => async dispatch => {
  try {
    const res = await axios.get(`/auth/me/todos/${todoId}`);
    return dispatch(setTodo(res.data))
  } catch (error) {
    console.log('error getting todo')
  }
}

export const postTodoThunk = (todo) => async dispatch =>{
  try{
    const { data: created } = await axios.post(`auth/me/todos`, todo)
    const action = postTodo(created);
    dispatch(action);
  }catch(error){
    console.log('error posting todo')
  }
}

export const postEntryThunk = (entry) => async dispatch =>{
  try{
    const { data: created } = await axios.post(`auth/me/entries`, entry)
    const action = postEntry(created);
    dispatch(action)
  }catch(error){
    console.log('error posting new entry')
  }
}

export const updateEntryThunk = (entry) => async dispatch =>{
  try{
    const { data: updated } = await axios.put(`/auth/me/entries/${entry.id}`, entry);
    dispatch(updateEntry(updated));
  }catch(err){
    console.log('error in editEntry thunk')
  }
}


export const deleteEntry = (entryId) => async dispatch => {
  try{
    const { data: entry } = await axios.delete(`/auth/me/entries/${entryId}`);
    dispatch(removeEntry(entry));
    dispatch(me())
  } catch (err){
    console.log('error in entry deleteThunk')
  } 
}

export const deleteTodo = (todoId) => async dispatch => {
  try{
    const { data: todo } = await axios.delete(`/auth/me/todos/${todoId}`);
    dispatch(removeTodo(todo));
    dispatch(me())
  } catch (err){
    console.log('error in todo deleteThunk')
  } 
}

export const editTodo = (todo) => async dispatch =>{
  try{
    const { data: updated } = await axios.put(`/auth/me/todos/${todo.id}`, todo);
    dispatch(updateTodo(updated));
  }catch(err){
    console.log('error in editTodo thunk')
  }
}


export const authenticate = (username, password, method) => async dispatch => {
  try {
    const res = await axios.post(`/auth/${method}`, {username, password})
    window.localStorage.setItem(TOKEN, res.data.token)
    dispatch(me())
  } catch (authError) {
    return dispatch(setAuth({error: authError}))
  }
}

export const logout = () => {
  window.localStorage.removeItem(TOKEN)
  history.push('/')
  return {
    type: SET_AUTH,
    auth: {}
  }
}

/**
 * REDUCER
 */
export default function(state ={ entries : [], todos: []}, action) {
  switch (action.type) {
    case SET_AUTH:
      return action.auth
    case SET_ENTRY:
      return {...state, entry: action.entry}
      case UPDATE_ENTRY:
        return {...state,  entries: state.entries = state.entries.map(entry => entry.id === action.entry.id ? action.entry : entry)}
    case SET_TODO:
      return {...state, todo: action.todo}
    // case SET_ENTRIES:
    //   return {...state, entries: [...state.entries, action.entries]}
    // case SET_TODO:
    // case SET_TODOS:
    //   return {...state, todos: [...state.todos, action.todos]}
    //   return {...state, todo: action.todo}
    case POST_TODO:
     return {...state, todos: [...state.todos, action.todo]}
    case POST_ENTRY:
      return {...state, entries: [...state.entries, action.entry]}
    case DELETE_ENTRY:
      return { ...state, entries: state.entries = state.entries.filter((entry) => entry !== action.entry)}
    case UPDATE_TODO:
      return {...state, todos: state.todos = state.todos.map(todo => todo.id === action.todo.id ? action.todo : todo)}
    case DELETE_TODO:
      return { ...state, todos: state.todos = state.todos.filter((todo) => todo !== action.todo)}
    default:
      return state
  }
}
