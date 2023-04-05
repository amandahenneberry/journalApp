// import React, { Component } from 'react'
import React from 'react'
// import {connect} from 'react-redux'
import { NewEntryEditor  } from './NewEntryEditor';



export const Journal = ({username, entries}) => {
    return (
      <div>
        {console.log(`from Journal component - props ${entries}`)}
        <h3>{username}'s Journal</h3>
        <NewEntryEditor />
      </div>
    )
}


// export class Journal extends React {
//   constructor(props){
//     super(props)
//     this.state = {

//     }
//   }

//   componentDidMount(){
//     this.setState({})
//   }
  
//   render(){
//     const {username} = this.props
//     return (
//       <div>
//         <h3>{username}'s Journal</h3>
//         <NewEntryEditor />
//       </div>
//     )
//   }
// }
