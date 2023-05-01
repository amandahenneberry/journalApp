// import axios from "axios";
import React from "react";
import Spinner from 'react-bootstrap/Spinner';

// const apiKey = process.env.NODE_ENV.REACT_APP_WEATHER_API_KEY

const Weather = (props) => {
  const {loadingWeather, cityName, temperature, description, high, low, icon} = props;
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