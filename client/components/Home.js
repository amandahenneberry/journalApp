import React, {useState, useEffect} from 'react'
import {connect, useSelector} from 'react-redux'
import { NewEntryEditor  } from './Journal/NewEntry/NewEntryEditor';
import Journal from './Journal/Journal';
import { ToDos } from './ToDoList/ToDos';
import { logout } from '../store';
import axios from "axios";
import { useDispatch} from 'react-redux';


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

const apiKey = `ecc22e13d2f6b0f1baf1d1b90561a03b`


const Home = (props) =>{
  const {username, id, handleClick} = props;
  const entries = useSelector(state => state.auth.entries);
  const todos = useSelector(state => state.auth.todos);

//journal or 'to do'
  const [active, setActive] = useState(props.active);
  const handleSelect = (tab) =>{
    setActive(tab)
  };

  //date & time
  const [date,  setDate] = useState(new Date());

  useEffect(() =>{
    const timer = setInterval(()=>setDate(new Date()), 1000)
    return function cleanup(){
        clearInterval(timer)
    }
});

//weather
const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  // const [weather, setWeather] = useState(" ");
  const [temperature, setTemperature] = useState(0);
  const [cityName, setCityName] = useState(" ");
  const [description, setDescription] = useState(" ");
  const [icon, setIcon] = useState(" ");
  const [loadingWeather, setLoadingWeather]  = useState(true);
  const [high, setHigh] = useState(0);
  const [low, setLow] = useState(0);


  const savePositionToState = (position) => {
    setLatitude(position.coords.latitude);
    setLongitude(position.coords.longitude);
  };

  const error =()=>{
    console.log('error  retrieving location')
  }

  const options = {
    enableHighAccuracy: true,
    timeout: Infinity,
    maximumAge: 0,
  };

  const fetchLocation = async () => {
    try {
      await window.navigator.geolocation.getCurrentPosition(
        savePositionToState, error, options);
        if(latitude && longitude){
            const res = await axios.get(`http://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=5&appid=${apiKey}
        `);
        setCityName(res.data[0].local_names.en);
        console.log(res.data)
        }
        
    } catch (err) {
      console.error('error fetching loaction');
    }
  };

  const fetchWeather = async () => {
    try {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${apiKey}`
      );
      setTemperature(res.data.main.temp);
      // setWeather(res.data.weather[0].main);
      setDescription(res.data.weather[0].description);
      setIcon(res.data.weather[0].icon);
      setHigh(res.data.main.temp_max)
      setLow(res.data.main.temp_min)
      console.log(res.data);
    } catch (err) {
      console.error('error fetching weather data');
    }
  };

  

  useEffect(() => {
    const controller = new AbortController();

    try{
      fetchLocation(), {
        signal: controller.signal
      }
     
    }  catch(err){
      console.log('error fetching location')
    };

    return () => controller?.abort();

 
  }, [latitude, longitude]);

  useEffect(()=>{
    const controller = new AbortController();
    try{
      fetchWeather(), {
        
      }
    } catch(err){
      console.log('error fetching weather data')
    };

    return () => controller?.abort();
   
  },[cityName])

  useEffect(()=>{
    
    if(cityName !== " " && description !== " "  && icon  !== " "){
      setLoadingWeather(false)
    }

  },[cityName])

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
            <Journal username ={username} entries={entries} handleClick={handleClick} cityName={cityName} weatherIcon={icon}/>  
          </div>
        </div>
      </center>   
      </Tab> 
      
      <Tab eventKey="toDos" title="To-Do List">
      <div className='ToDoBg'> 
      <ToDos todos={todos} userId={id} setActive={setActive} />
      </div>
      </Tab>  
      
      </Tabs>
      </Row>
    </Col>
    <Col>
    <div className="weatherContainer">
      <Weather loadingWeather={loadingWeather} cityName={cityName} temperature={temperature} description={description} high={high} low={low} icon={icon}/>
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
    // entries: state.auth.entries,
    // todos: state.auth.todos
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

