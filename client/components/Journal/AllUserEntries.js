import React, {useState, useEffect} from 'react'
import  { EntryMap } from './EntryMap'
import  SingleEntry  from './SingleEntry'


export const AllUserEntries = (props) => {
  const [entry, setEntry] = useState([]);


  const onEntryClick = (entry) =>{
   setEntry(() => {
    return [entry]
   });
  }

  useEffect(()=>console.log(`entry state: ${entry}`, [entry]), [entry])

  const entries = props.entries;
  const username = props.username;
    return (
      <div>   
        {entry.length <= 0? (
          <EntryMap entries={entries} onEntryClick ={onEntryClick} />

        ) : (<div>
          <SingleEntry username={ username } entryId = {[entry]} />
        </div>)}
      </div>
      
    )
}

