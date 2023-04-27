import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import { NewEntryEditor  } from './Journal/NewEntry/NewEntryEditor';
import Journal from './Journal/Journal';
import { ToDos } from './ToDoList/ToDos';
import { logout } from '../store';
//bootstrap
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

//
import { DateTime } from './DateTime';
import  Weather  from './Weather/Weather'


const Home = (props) =>{
  const {username, entries, handleClick} = props;
  const [date,  setDate] = useState(new Date());
  const [active, setActive] = useState(props.active || 'journal')

  
  
  useEffect(() =>{
    const timer = setInterval(()=>setDate(new Date()), 1000)
    return function cleanup(){
        clearInterval(timer)
    }
});

const handleSelect = (tab) =>{
  setActive(tab)
}
return (
  <Container fluid className="vertical-center">
    <Row>
    <Col>
      <div className= "dateContainer">
      <DateTime date={date.toLocaleDateString()} time={date.toLocaleTimeString()}/>
      </div>
    </Col>
    <Col xs={6} style={{display: 'flex'}}>  
    <Row>
      <Tabs
      defaultActiveKey="journal"
      transition={false}
      id="noanim-tab-example"
      className="tabBar"
      activeKey={active}
      onSelect={handleSelect}

    >
      <Tab eventKey="journal" title="Journal">
      <center>
        <div className='journalBg'> 
          <div className='paperBg'>
            <Journal username ={username} entries={entries} handleClick={handleClick}/>  
          </div>
        </div>
      </center>   
      </Tab> 
      
      <Tab eventKey="toDos" title="To-Do List">
      <div className='ToDoBg'> 
      <ToDos />
      </div>
      </Tab>  
      
      </Tabs>
      </Row>
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

