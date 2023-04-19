import axios from "axios";
import React, { useEffect, useState } from "react";


const apiKey = `ecc22e13d2f6b0f1baf1d1b90561a03b`
function Weather() {
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [weather, setWeather] = useState(" ");
  const [temperature, setTemperature] = useState(0);
  const [cityName, setCityName] = useState(" ");
  const [description, setDescription] = useState(" ");
  const [icon, setIcon] = useState(" ");
  const [loadingWeather, setLoadingWeather]  = useState(true)

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
      setDescription(res.data.weather[0].description);
      setIcon(res.data.weather[0].icon);
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

  useEffect(()=>{
  //   const [latitude, setLatitude] = useState(0);
  // const [longitude, setLongitude] = useState(0);
  // const [weather, setWeather] = useState(" ");
  // const [temperature, setTemperature] = useState(0);
  // const [cityName, setCityName] = useState(" ");
  // const [description, setDescription] = useState(" ");
  // const [icon, setIcon] = useState(" ");
  // const [loadingWeather, setLoadingWeather]  = useState(true)
    if(weather !== " " && cityName !== " " && (latitude > 0 || longitude > 0 ) && description !== " "  && icon  !== " "){
      setLoadingWeather(false)
    }

  },[icon])

  return (
    <>
    {loadingWeather ? (
        <div>
            <p>loading weather...</p>
        </div>
    ) : (
        <div className="app">
      <div className="app__container">
        <h1>{cityName}</h1>
        <div><img src ={`https://openweathermap.org/img/wn/${icon}@2x.png`}/></div>
        <h2>{temperature}ºF</h2>
        <h2>{weather}</h2>
        <p><em>{description}</em></p>
      </div>
    </div>
    )}
    
    </>
    
  );
}

export default Weather;