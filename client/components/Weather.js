import React, {useState} from 'react';
import axios from 'axios';


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

