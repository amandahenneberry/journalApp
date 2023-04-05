// import React, { Component } from 'react'
import React, {useState} from 'react'
// import {connect} from 'react-redux'
import { NewEntryEditor  } from './NewEntryEditor';
import { AllUserEntries } from './AllUserEntries';

export const Journal = ({username, entries}) => {
  //setting up toggle
  // const [viewEntries, newEntry] = useState(viewEntries);
  const [toggle, setToggle] = useState(false)
    return (
      
      <div>
        {/* {console.log(`from Journal component - props ${entries}`)} */}
        <h3>{username}'s Journal</h3>
        {!toggle ? (
          <div>
            <AllUserEntries entries = {entries} />
            <button onClick={() => setToggle(!toggle)}>Write a new entry</button>
          </div>
        ) : (
          <div>
            <button onClick={() => setToggle(!toggle)}>View Entries</button>
            <NewEntryEditor />
          </div>
        )}
        
      </div>
    )
}
