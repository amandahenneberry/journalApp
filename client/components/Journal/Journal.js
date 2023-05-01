import React, {useState} from 'react'
import {connect} from 'react-redux'
import  NewEntryEditor   from './NewEntry/NewEntryEditor';
import { AllUserEntries } from './AllUserEntries';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';

import Alert from 'react-bootstrap/Alert';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import { Stack } from 'react-bootstrap';


import { logout } from '../../store';
import { Alert_NewEntry } from './NewEntry/Alert_NewEntry';

const Journal = ({username, entries, handleClick, cityName, weatherIcon}) => {
  const [toggle, setToggle] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

    return (
      <div>
        {console.log('toggle: '+toggle)}
  
        {!toggle ? (
          <Container>
            <h3>{username}'s Journal</h3>
            <Row className="justify-content-md-center">
              <Col>
              <AllUserEntries username={username} entries = {entries} />
              </Col>
            </Row>
            
            <Row className="justify-content-md-center">
            <Col>
            <Button type='button'  variant="link"  onClick={() => setToggle(!toggle)}>Write a new entry</Button>
            </Col>
            </Row>

            <Row className="justify-content-md-center">
            <Col>
            <Button type='button' variant='link' onClick={handleClick}>
            Logout
          </Button> 
            </Col>
            </Row>
           
          </Container>
        ) : (
          <div className='newEntry'>
            <Nav>
            <Stack direction='horizontal'>
            <AllUserEntries username={username} entries = {entries} />
              <Alert_NewEntry show={showAlert} variant='link'>
                Home
              </Alert_NewEntry>
            <Button type='button' variant='link' onClick={handleClick}>
            Logout
          </Button> 
          </Stack>
            </Nav>
            <NewEntryEditor username = {username} entries = {entries} cityName={cityName} weatherIcon={weatherIcon}/>
            <br/>
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

