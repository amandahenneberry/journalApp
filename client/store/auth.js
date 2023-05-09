import axios from 'axios'
import history from '../history'

const TOKEN = 'token'

/**
 * ACTION TYPES
 */
const SET_AUTH = 'SET_AUTH';
const SET_ENTRY = 'SET_ENTRY';
const SET_ENTRIES = 'SET_ENTRIES'
const POST_ENTRY = 'POST_ENTRY'
const DELETE_ENTRY = 'DELETE_ENTRY';
const SET_TODO = 'SET_TODO';
const POST_TODO = 'POST_TODO';
const DELETE_TODO = 'DELETE_TODO'


/**
 * ACTION CREATORS
 */
const setAuth = auth => ({type: SET_AUTH, auth})
const setEntry = entry => ({type: SET_ENTRY, entry})
const setEntries = entries =>({type: SET_ENTRIES, entries})
const postEntry = entry =>({type: POST_ENTRY, entry})
const removeEntry = entryId => ({type: DELETE_ENTRY, entryId});
const setTodo = todoId => ({type: SET_TODO, todoId});
const postTodo = todo => ({type: POST_TODO, todo})
const removeTodo = todoId => ({type: DELETE_TODO, todoId})

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
    // return dispatch (setAuth(res.data))
    // dispatch (setEntries(res.data.entries))
    dispatch (setAuth(res.data));
    // dispatch(setEntries(res.data.entries));
    return 
  }
}

// export const fetchEntries = () => async dispatch =>{
//   try{
//     const token = window.localStorage.getItem(TOKEN)
//     if (token) {
//       const res = await axios.get('/auth/me', {
//         headers: {
//           authorization: token
//         }
//       })
//    return dispatch(setEntries(res.data.entries))
//     }
//   }catch(err){
//     console.log('error fetching entries')
//   }
// }

export const fetchEntry = (entryId) => async dispatch => {
  try {
    const res = await axios.get(`/auth/me/entries/${entryId}`);
    return dispatch(setEntry(res.data))
  } catch (error) {
    console.log('error getting entry')
  }
}

// export const fetchEntries = (userId) => async dispatch  => {
//   try{
//     const res = await axios.get(`/auth/${userId}/entries`);
//     return dispatch({setEntries(res.data)})
//   }catch(error){
//     console.log('error fetching  entries')
//   }
// }

export const fetchTodo = (todoId) => async dispatch  =>{
  try{
    const res = await axios.get(`/auth/me/todos/${todoId}`);
    dispatch(setTodo(res.data));
    // return history.push('/');
  }catch(error){
    console.log('error fetching single todo')
  }
}

export const postTodoThunk = (todo) => async dispatch =>{
  try{
    const { data: created } = await axios.post(`auth/me/todos`, todo)
    dispatch(postTodo(created));
    dispatch(me());
    return
  }catch(error){
    console.log('error posting todo')
  }
}

export const postEntryThunk = (entry) => async dispatch =>{
  try{
    const { data: created } = await axios.post(`auth/me/entries`, entry)
    dispatch(postEntry(created));
    return dispatch(me())
    // return fetchEntries();
    // window.location.reload();

    // return history.push('/')
  }catch(error){
    console.log('error posting new entry')
  }
}


export const deleteEntry = (entryId) => async dispatch => {
  try{
    const { data: entry } = await axios.delete(`/auth/me/entries/${entryId}`);
    dispatch(removeEntry(entry));
    dispatch(me());
  } catch (err){
    console.log('error in entry deleteThunk')
  } 
}

export const deleteTodo = (todoId) => async dispatch => {
  try{
    const { data: todo } = await axios.delete(`/auth/me/todos/${todoId}`);
    dispatch(removeTodo(todo));
    dispatch(me());
  } catch (err){
    console.log('error in todo deleteThunk')
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
export default function(state ={ entries : []}, action) {
  switch (action.type) {
    case SET_AUTH:
      return action.auth
    case SET_ENTRY:
      return {...state, entry: action.entry}
    case SET_ENTRIES:{
      return {...state, entries: [...state.entries, action.entries]}
    }
    case SET_TODO:
      return {...state, todo: action.todo}
    case POST_TODO:
     return {...state, todos: [...state.todos, action.todo]}
    case POST_ENTRY:
      return {...state, entries: [...state.entries, action.newEntry]}
    case DELETE_ENTRY:
      return { entries: state.entries.filter((entry) => entry !== action.entry)}
    case DELETE_TODO:
      return { todos: state.todos.filter((todo) => todo !== action.todo)}
    default:
      return state
  }
}
