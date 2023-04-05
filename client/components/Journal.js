// import React, { Component } from 'react'
import React from 'react'
// import {connect} from 'react-redux'
import { NewEntryEditor  } from './NewEntryEditor';
import { AllUserEntries } from './AllUserEntries';



export const Journal = ({username, entries}) => {
    return (
      <div>
        {/* {console.log(`from Journal component - props ${entries}`)} */}
        <h3>{username}'s Journal</h3>
        <AllUserEntries entries = {entries} />
        <NewEntryEditor />
      </div>
    )
}
