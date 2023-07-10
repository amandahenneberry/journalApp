import React, {useState, useEffect} from 'react'
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

const MobileJournal = ({username, entries, handleClick, cityName, weatherIcon, description, high, low}) => {
  const [toggle, setToggle] = useState(false);
  const [showAlert, setShowAlert] = useState(false);


    return (
      <div>
  
        {!toggle ? (
          <Container fluid>
            <h3>{username}'s Journal</h3>
            {/* <Row >
              <Col>
              <AllUserEntries username={username} entries={entries} toggle={toggle} setToggle={setToggle} />
              </Col>
            </Row> */}
{/*             
            <Row >
            <Col>
            <Button type='button'  variant="link"  onClick={() => setToggle(!toggle)}>Write a new entry</Button>
            </Col>
            </Row>

            <Row >
            <Col>
            <Button type='button' variant='link' onClick={handleClick}>
            Logout
          </Button> 
            </Col>
            </Row> */}
           
          </Container>
        ) : (
        //   <div className='newEntry'>
        <div>
            NEW ENTRY
            {/* <div style={{padding: '0px 10px 0px 10px'}}>
            <Nav>
            <Stack direction='horizontal'>
            <AllUserEntries username={username} entries={entries} />
              <Alert_NewEntry show={showAlert} toggle={toggle} setToggle={setToggle} variant='link'>
                Home
              </Alert_NewEntry>
            <Button type='button' variant='link' onClick={handleClick}>
            Logout
          </Button> 
          </Stack>
            </Nav>
            
            <NewEntryEditor username = {username} entries = {entries} cityName={cityName} weatherIcon={weatherIcon} description={description} high={high} low={low} toggle={toggle} setToggle={setToggle}/>
            </div>
            <br/>
            <br/>
            <br/> */}
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
  }
}

export default connect(mapState, mapDispatch)(MobileJournal)

