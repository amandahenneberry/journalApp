import axios from 'axios'
import history from '../history'

const TOKEN = 'token'

/**
 * ACTION TYPES
 */
const SET_AUTH = 'SET_AUTH'
const SET_ENTRY = 'SET_ENTRY'
// const POST_ENTRY = 'POST_ENTRY'
const DELETE_ENTRY = 'DELETE_ENTRY'


/**
 * ACTION CREATORS
 */
const setAuth = auth => ({type: SET_AUTH, auth})
const setEntry = entry => ({type: SET_ENTRY, entry})
// const postNewEntry = newEntry =>({type: POST_ENTRY, newEntry})
const removeEntry = entryId => ({type: DELETE_ENTRY, entryId})

/**
 * THUNK CREATORS
 */

export const me = () => async dispatch => {
  const token = window.localStorage.getItem(TOKEN)
  if (token) {
    const res = await axios.get('/auth/me', {
      headers: {
        authorization: token
      }
    })
    return dispatch(setAuth(res.data))
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


export const deleteEntry = (entryId) => async dispatch => {
  try{
    const { data: entry } = await axios.delete(`/auth/me/entries/${entryId}`);
    dispatch(removeEntry(entry));
    dispatch(me());
  } catch (err){
    console.log('error in deleteThunk')
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
export default function(state ={}, action) {
  switch (action.type) {
    case SET_AUTH:
      return action.auth
    case SET_ENTRY:
      return {...state, entry: action.entry}
    // case POST_ENTRY:
    //   return [...state, action.newEntry]
    case DELETE_ENTRY:
      return { entries: state.entries.filter((entry) => entry !== action.entry)}
    default:
      return state
  }
}
