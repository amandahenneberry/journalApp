import React from 'react'
import {connect} from 'react-redux'
import { NewEntryEditor  } from './Journal/NewEntryEditor';
import Journal from './Journal/Journal';
import { logout } from '../store';
//bootstrap
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';



const Home = (props) =>{
  const {username, entries, handleClick} = props;

   return (
      <Container fluid className="vertical-center">
        <Row>
        <Col></Col>
        <Col>        
        <div className='journalBg'> 
          <div className='paperBg'>
          <Journal username ={username} entries={entries} handleClick={handleClick}/>  
          </div>
        </div>
        </Col>
        <Col></Col>
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

