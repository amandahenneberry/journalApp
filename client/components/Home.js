import React from 'react'
import {connect} from 'react-redux'
import { NewEntryEditor  } from './Journal/NewEntryEditor';
import { Journal } from './Journal/Journal';


const Home = (props) =>{
  const {username, entries} = props;
   return (
      <div>
        <h3>Welcome, {username}</h3>
        <Journal username ={username} entries={entries}/>
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

export default connect(mapState)(Home)

