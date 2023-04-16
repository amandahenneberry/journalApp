import React, {useState} from 'react';
import axios from 'axios';

// const url = `https://api.openweathermap.org/data/2.5/weather?q=dallas&appid=ecc22e13d2f6b0f1baf1d1b90561a03b`;

const  Weather = () =>{

    return (
        <div>
            <div className = "container">
                <div className = "top">
                    <div className = "location">
                        <p>Dallas</p>
                    </div>
                    <div className="temp">
                        <h1>68 F</h1>
                    </div>
                    <div className="description">
                        <p>Clouds</p>
                    </div>
                </div>
                    <div className="bottom">
                        <div className="feels">
                            <p>65 F</p>
                        </div>
                      <div className="humidity">
                        <p>20%</p>
                        </div>
                        <div className="wind">
                            <p>20 MPH</p>
                        </div>  
                    </div>
            </div>
        </div>
    )

}

export default Weather

