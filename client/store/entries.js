import axios from 'axios'
import history from '../history'

//Action types
const SET_ENTRIES = 'SET_ENTRIES'
const SET_USER_JOURNAL = 'SET_USER_JOURNAL'
const POST_ENTRY = 'POST_ENTRY'

//Action Creators

const setEntries = entries => ({type: SET_ENTRIES, entries})

const setJournal= (entries) => {
  return {
    type: SET_USER_JOURNAL,
    entries
  }
}

// const postEntry = entry = ({type: POST_ENTRY, entry})


//Thunks

export const fetchEntries = () => {
    return async (dispatch) => {
      try {
        const { data } = await axios.get(`/api/entries`);
        dispatch(setEntries(data));
      } catch (err) {
        console.log(err);
      }
    };
  };

  
  
  export const fetchJournal= (userId) => {
    return async (dispatch) => {
      try {
        const {data} = await axios.get(`/api/entries/${userId}`)
        dispatch(setJournal(data))
      } catch (err) {
        console.log(err)
      }
    }
}

//   export const fetchEntry = (userId, entryId) => {
//     return async (dispatch) => {
//       try{
//         const { data } = await axios.get(`/api/users/${userId}/entries/${entryId}`)
//         dispatch(setEntry(data));
//       }catch (err) {
//         console.log(err)
//       }
//     }
//   }
  
//   export const addEntry = (userId, history) =>{
//     return async(dispatch) =>{
//       const { data: added } = await axios.post(`/api/users/${userId}/entries`, entries);
//       dispatch(post(added));
//       history.push('/');
//     }
//   }
  //REDUCER
  const initialState = [];
  
  const journalReducer=(state = initialState, action) =>{
    switch (action.type) {
      case SET_ENTRIES:
        return action.entries
      case SET_USER_JOURNAL:
        return {...state, journal: action.entries}
      case POST_ENTRY:
        return [...state, action.entry]
      default:
        return state;
    }
  }
  
  export default journalReducer;
