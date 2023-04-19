import axios from "axios";
import React, { useEffect, useState } from "react";


const apiKey = `ecc22e13d2f6b0f1baf1d1b90561a03b`
function Weather() {
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [weather, setWeather] = useState(" ");
  const [temperature, setTemperature] = useState(0);
  const [cityName, setCityName] = useState(" ");

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
      console.error(err);
    }
  };

  const fetchWeather = async () => {
    try {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${apiKey}`
      );
      setTemperature(res.data.main.temp);
      setWeather(res.data.weather[0].main);
      console.log(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  

  useEffect(() => {
    fetchLocation();
  }, [latitude, longitude]);

  useEffect(()=>{
    fetchWeather();
  },[cityName])

  return (
    <>
    {cityName === " " && weather === " " ? (
        <div>
            <p>loading...</p>
        </div>
    ) : (
        <div className="app">
      <div className="app__container">
        <h1>{cityName}</h1>
        <h2>{temperature}ºF</h2>
        <h2>{weather}</h2>
      </div>
    </div>
    )}
    
    </>
    
  );
}

export default Weather;