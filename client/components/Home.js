import React from 'react'
import {connect} from 'react-redux'
import { NewEntryEditor  } from './Journal/NewEntryEditor';
import { Journal } from './Journal/Journal';
import Container from 'react-bootstrap/Container';




const Home = (props) =>{
  const {username, entries} = props;
   return (
      <Container>
        <h3>Welcome, {username}</h3>
        <Journal username ={username} entries={entries}/>
      </Container>
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

