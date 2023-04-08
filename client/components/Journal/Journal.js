import React, {useState} from 'react'
import  NewEntryEditor   from './NewEntryEditor';
import { AllUserEntries } from './AllUserEntries';
import Button from 'react-bootstrap/Button';


export const Journal = ({username, entries}) => {
  //setting up toggle
  // const [viewEntries, newEntry] = useState(viewEntries);
  const [toggle, setToggle] = useState(false);
  const [newEntry, setNewEntry] = useState(false);
    return (
      <div>
  
        {/* <h3>{username}'s Journal</h3> */}
        {!toggle ? (
          <div>
            <span>
              <AllUserEntries username={username} entries = {entries} />
              <Button type='button'  variant="link"  onClick={() => setToggle(!toggle)}>Write a new entry</Button>
            </span>
          </div>
        ) : (
          <div>
            <Button variant="outline-primary" type='button' onClick={() => {setToggle(!toggle); window.location.reload();}}>View Entries</Button>
            <NewEntryEditor username = {username} entries = {entries}/>
          </div>
        )}
        
      
      </div>
    )
}
