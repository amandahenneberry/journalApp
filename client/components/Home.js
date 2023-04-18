import React, {useState, useEffect} from 'react'
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
//
import { DateTime } from './DateTime';
import axios from 'axios';
import  Weather  from './Weather'


const apiKey = '8418f9d139d369b5c0fd0fbcae584b7e'


const Home = (props) =>{
  const {username, entries, handleClick} = props;
  const [date,  setDate] = useState(new Date());

  //Location & Weather
  const [lat, setLat] = useState(null)
  const [lon, setLon] = useState(null)
  const [weather, setWeather] = useState({})
  const [location, setLocation] = useState(null)

  const url = `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&appid=8418f9d139d369b5c0fd0fbcae584b7e`
  
  useEffect(() =>{
    const timer = setInterval(()=>setDate(new Date()), 1000)
    return function cleanup(){
        clearInterval(timer)
    }
});

const getLocation = () =>{
  navigator.geolocation.getCurrentPosition(function(position) {
    setLat(position.coords.latitude);
    setLon(position.coords.longitude);
    console.log("Latitude is :", position.coords.latitude);
    console.log("Longitude is :", position.coords.longitude);
  });
}

useEffect(() => {
  getLocation();
  console.log(`LAT & LON: `+lat +' ' +lon)
}, [lon])
    

useEffect(()=>{
  if(lat && lon){
    axios.get(url).then((response) => {
      setLocation(response.data[0].name)
      // console.log(response.data[0].name)
      // console.log(location)
    })
  }else{
    console.log('loading location...')
  }
}, [lon])

useEffect(() => {
  if(location){
    axios.get()
  }
})

return (
  <Container fluid className="vertical-center">
    <Row>
    <Col>
      <div>
      <DateTime date={date.toLocaleDateString()} time={date.toLocaleTimeString()}/>
      </div>
    </Col>
    <Col>        
    <div className='journalBg'> 
      <div className='paperBg'>
      <Journal username ={username} entries={entries} handleClick={handleClick}/>  
      </div>
    </div>
    </Col>
    <Col>
    <div>
      <Weather location={location}/>
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

