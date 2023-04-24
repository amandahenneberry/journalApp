import React from 'react';

export const DateTime = (props) =>{
    const {date, time} = props

    const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

    const d = new Date();
    let day = weekday[d.getDay()];

    return(
        <div>
            <h1>{time}</h1>
            <h4>{day}, {date}</h4>
            
        </div>
    )
}

export default DateTime