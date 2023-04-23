import axios from "axios";
import React, { useEffect, useState } from "react";
import Spinner from 'react-bootstrap/Spinner';

const apiKey = `ecc22e13d2f6b0f1baf1d1b90561a03b`
// const apiKey = process.env.NODE_ENV.REACT_APP_WEATHER_API_KEY

function Weather() {
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
    <div className="weatherContainer">
    {loadingWeather ? (
        <div>
            <p>loading weather...</p>
            <Spinner animation="border" role="status"  variant="light">
      <span className="visually-hidden">Loading...</span>
    </Spinner>

        </div>
    ) : (
        <div className="app">
      <div className="app__container">
        <h4>{cityName}</h4>
        <h1>{temperature}ºF</h1>
        {/* <h2>{weather}</h2> */}
        <h5>
          <img width="50px" height="auto" src ={`https://openweathermap.org/img/wn/${icon}@2x.png`}/>
          <em>{description}</em>
        </h5>
        <h5>H:{high}º L:{low}º</h5>
      </div>
    </div>
    )}
    
    </div>
    
  );
}

export default Weather;