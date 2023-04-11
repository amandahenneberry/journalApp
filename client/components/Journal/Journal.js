import React, {useState} from 'react'
import {connect} from 'react-redux'
import  NewEntryEditor   from './NewEntryEditor';
import { AllUserEntries } from './AllUserEntries';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Alert from 'react-bootstrap/Alert';

// import {Alert_NewEntry} from './Alert_NewEntry';

import { logout } from '../../store';
import { Alert_NewEntry } from './Alert_NewEntry';

const Journal = ({username, entries, handleClick}) => {
  const [toggle, setToggle] = useState(false);
  const [showAlert, setShowAlert] = useState(false)

    return (
      <div>
        {console.log('toggle: '+toggle)}
  
        {!toggle ? (
          <ButtonGroup>
            <AllUserEntries username={username} entries = {entries} />
            <Button type='button'  variant="link"  onClick={() => setToggle(!toggle)}>Write a new entry</Button>
            <Button type='button' variant='link' onClick={handleClick}>
            Logout
          </Button> 
          </ButtonGroup>
        ) : (
          <div>
            <ButtonGroup>
            <AllUserEntries username={username} entries = {entries} />
            <Alert_NewEntry show={showAlert}>
            Home
            </Alert_NewEntry>
            <Button type='button' variant='link' onClick={handleClick}>
            Logout
          </Button> 
          </ButtonGroup>
            <NewEntryEditor username = {username} entries = {entries}/>
          </div>
        )}
        
      
      </div>
    )
}


const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

const mapState = state => {
  return {
    isLoggedIn: !!state.auth.id,
    username: state.auth.username,
    id: state.auth.id,
    entries: state.auth.entries
  }
}

export default connect(mapState, mapDispatch)(Journal)

