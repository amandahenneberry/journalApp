import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
// import { postEntry } from '../../store'



const NewEntryEditor = props =>{
    const [entry, setEntry] = useState({})
    const [submitted, setSubmitted] = useState(false)
    const {username, id} = props


    useEffect(() => {
        const {id} = props;
        setEntry((prev) =>({
            ...prev,
            userId: id
        }));
    },[props])

    const handleChange = ({ target }) => {
        const { name, value } = target;
        setEntry((prev) => ({
          ...prev,
          [name]: value
        }));
    };

    const submitEntry = () =>{
        axios.post(`/api/entries`, entry)
    }

    const handleSubmit = (evt) =>{
        evt.preventDefault();
        setSubmitted(true);
        console.log('new entry: '+entry.content)
        submitEntry()
    }
    
    return(
        <div>
            {!submitted ? (
            <div>
                <form onSubmit={handleSubmit} userid={id} >
                <div>
                    <label htmlFor="date">
                        <small>Date</small>
                    </label>
                    <input type="date" name="date" value={entry.date || ''} onChange={handleChange}/>
                </div>
                <div>
                    <label htmlFor="title">
                        <small>Title</small>
                    </label>
                    <input type="text" name="title" value={entry.title || ''} onChange={handleChange}/>
                </div>
                <div>
                    <label htmlFor="content">
                        <small>Entry</small>
                    </label>
                    <input type="text" name="content" value={entry.content || ''} onChange={handleChange}/>
                </div>
                <button type="submit">Submit</button>
            </form>
            </div>
            ):(
            <div>
                New Entry Submitted!
            </div>
            )}
            

        </div>
    )
}

const mapState = state => {
    return {
      username: state.auth.username,
      id: state.auth.id,
      entries: state.auth.entries
    }
  }

// const mapDispatch = (dispatch, {history}) =>{
//     return {
//         handleSubmit(evt){
//             evt.preventDefault();
//             // const userId = evt.target.userid
//             const date = evt.target.date.value
//             const title = evt.target.title.value
//             const content = evt.target.content.value
//             dispatch(postEntry({date, title, content}, history))

//         }
//     }
// }

  
export default connect(mapState)(NewEntryEditor)