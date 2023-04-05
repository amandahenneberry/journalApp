import React, { Component }from 'react'
import {connect} from 'react-redux'
import { NewEntryEditor  } from './NewEntryEditor';
import { Journal } from './Journal';


/**
 * COMPONENT
 */
export class Home extends Component {
  
  render(){
    const {username, id, entries} = this.props;
    console.log(`userId: ${id}`)
    console.log(`entries: ${entries}`)
   return (
      <div>
        <h3>Welcome, {username}</h3>
        <Journal username ={this.props.username} entries={this.props.entries}/>
      </div>
    )

  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    username: state.auth.username,
    id: state.auth.id,
    entries: state.auth.entries
  }
}

export default connect(mapState)(Home)

