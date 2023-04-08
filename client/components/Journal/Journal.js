import React, {useState} from 'react'
import  NewEntryEditor   from './NewEntryEditor';
import { AllUserEntries } from './AllUserEntries';

export const Journal = ({username, entries}) => {
  //setting up toggle
  // const [viewEntries, newEntry] = useState(viewEntries);
  const [toggle, setToggle] = useState(false)
    return (
      
      <div>
        <h3>{username}'s Journal</h3>
        {!toggle ? (
          <div>
            <AllUserEntries username={username} entries = {entries} />
            <button onClick={() => setToggle(!toggle)}>Write a new entry</button>
          </div>
        ) : (
          <div>
            <button onClick={() => setToggle(!toggle)}>View Entries</button>
            <NewEntryEditor username = {username} entries = {entries}/>
          </div>
        )}
        
      </div>
    )
}
