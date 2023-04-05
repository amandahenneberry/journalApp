import React from 'react'

export const AllUserEntries = (props) => {
    const entries = props.entries
    return (
      <div id='entries' className='column'>
        {
          entries.map(entry => (
            <div className='entry' key={entry.id}>
              {/* <Link to = {`/entries/${entry.id}`}> */}
                <h3>{entry.title}</h3>
              {/* <a>
                <p>{story.author.name}</p>
              </a> */}
              {/* <Link to ={`/authors/${story.author.id}`}>
                <h3>{story.author.name}</h3>
              </Link> */}
              <hr />
            </div>
          ))
        }
      </div>
    )
  }