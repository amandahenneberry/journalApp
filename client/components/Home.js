import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import { NewEntryEditor  } from './Journal/NewEntry/NewEntryEditor';
import Journal from './Journal/Journal';
import { logout } from '../store';
//bootstrap
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
//
import { DateTime } from './DateTime';
import  Weather  from './Weather/Weather'


const Home = (props) =>{
  const {username, entries, handleClick} = props;
  const [date,  setDate] = useState(new Date());

  
  
  useEffect(() =>{
    const timer = setInterval(()=>setDate(new Date()), 1000)
    return function cleanup(){
        clearInterval(timer)
    }
});

return (
  <Container fluid className="vertical-center">
    <Row>
    <Col>
      <div className= "dateContainer">
      <DateTime date={date.toLocaleDateString()} time={date.toLocaleTimeString()}/>
      </div>
    </Col>
    <Col xs={6}>  
      <center>
        <div className='journalBg'> 
          <div className='paperBg'>
            <Journal username ={username} entries={entries} handleClick={handleClick}/>  
          </div>
        </div>
      </center>      
    
    </Col>
    <Col>
    <div className="weatherContainer">
      <Weather />
    </div>
    </Col>
    </Row>
  </Container>
)

  
}

const mapState = state => {
  return {
    isLoggedIn: !!state.auth.id,
    username: state.auth.username,
    id: state.auth.id,
    entries: state.auth.entries
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Home)

