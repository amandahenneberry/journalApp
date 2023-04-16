import React from 'react';

export const DateTime = (props) =>{
    const {date, time} = props

    return(
        <div>
            <p> Time : {time}</p>
            <p> Date : {date}</p>
        </div>
    )
}

export default DateTime