import React, { Component }from 'react'
import {connect} from 'react-redux'
import { NewEntryEditor  } from './NewEntryEditor';
import { Journal } from './Journal';
// import { fetchEntries } from '../store/entries';
// import { fetchJournal } from '../store/entries';

/**
 * COMPONENT
 */
export class Home extends Component {
  constructor(props){
    super(props);
    this.state = { journal: []}
  }

  componentDidMount(){
    this.setState({ journal: this.props.entries})
  }

  render(){
    const {username, id, entries} = this.props;
    console.log(`userId: ${id}`)
    console.log(`entries: ${entries}`)
    // console.log(`state from home: ${this.state.journal}`)
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

// const mapDispatch = dispatch =>{
//   return{
//     loadJournal: (id)=>dispatch(fetchJournal(id))
//   }

// }

// export default connect(mapState, mapDispatch)(Home)
export default connect(mapState)(Home)

