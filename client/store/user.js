import axios from 'axios'

const SET_USER = 'SET_USER';
const SET_USER_JOURNAL = 'SET_USER_JOUNRAL'


const setUser = (user) => {
    return {
      type: SET_USER,
      user
    }
}

export const fetchUser = (id) =>{
    return async (dispatch) =>{
        try{
            const {data} = await axios.get(`/api/users/${id}`)
            dispatch(setUser(data))
        } catch (err) {
            console.log(err)
        }
    }
}

const initialState = {info: {}, journal:[]}

export default(state = initialState, action) =>{
    switch(action.type){
        case SET_USER:
            return {...state, info: action.user}
        case SET_USER_JOURNAL:
            return {...state, journal: action.entries}
        default:
            return state
    }
}