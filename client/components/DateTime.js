import React from 'react';

export const DateTime = (props) =>{
    const {date, time} = props

    const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

    const d = new Date();
    let day = weekday[d.getDay()];

    return(
        <div>
            <p>{day}</p>
            <p> {date}</p>
            <p>{time}</p>
        </div>
    )
}

export default DateTime