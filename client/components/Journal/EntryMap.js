// import React, {useState} from 'react'
import React from "react"

export const EntryMap = ({ entries, onEntryClick }) => {

    const handleClick = ({ target }) => {
        const entry = target.value;
        onEntryClick(entry);
      };

      
    return (
        <div id='entries' className='column'>
        {
          entries.map(entry => (
            <div className='entry' key={entry.id}>
                <button value = {entry.id} onClick={handleClick}>{entry.title}</button>
              <hr />
            </div>
          ))
        }
      </div>
      
    )
  }