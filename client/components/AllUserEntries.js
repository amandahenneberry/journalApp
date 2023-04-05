import React, {useState} from 'react'
import { SingleEntry } from './SingleEntry'


export const AllUserEntries = (props) => {
  const [entry, setEntry] = useState([])

  const clickedEntry = () =>{
    clickedEntry((entry) =>{
      return [entry]
    })
  }

  const entries = props.entries;
    return (
      <div>      
        {entry.length <= 0? (
          <div id='entries' className='column'>
          {
            entries.map(entry => (
              <div className='entry' key={entry.id}>
                  <button>{entry.title}</button>
                <hr />
              </div>
            ))
          }
        </div>
        ) : (<div></div>)}
      </div>
      
    )
  }