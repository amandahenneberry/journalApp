import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {connect} from 'react-redux'



const  Weather = (props) =>{
    const { location } = props;

    

    useEffect(() => {
        console.log('location: '+location);
      }, [location])

    return (
        <div>
            <div className = "container">
                <div className = "top">
                    <div className = "location">
                        <p>{location}</p>
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

// const mapState = state => {
//     return {
//     location: location
//     }
//   }

// export default connect(mapState)(Weather)
export default Weather


