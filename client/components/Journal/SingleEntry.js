import React, {Component}  from 'react'
import {connect} from 'react-redux'
import { fetchEntry } from '../../store/auth';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import history from '../../history';

class SingleEntry extends Component{
    constructor(props){
        super(props)
        // this.handleDelete = this.handleDelete.bind(this)
    }


    componentDidMount(){
       this.props.loadEntry(this.props.entryId);

    }

    // handleDelete(){
    //     this.props.removeEntry(this.props.entryId);
    // }

    render(){
        const entry = this.props.entry || [];
        const content = entry.content || 'content fail';
        const date = entry.date || '';
        const {handleDelete} = this.props;

        console.log('curr state: '+entry.id)
        return(
            <div>
            <Modal.Header closeButton>
                {/* <Modal.Title>
                </Modal.Title>   */}
                <span> 
                <div>{entry.title}</div></span>
            </Modal.Header>
            <Modal.Body>
                <p>{content}</p>
            </Modal.Body>
            <Modal.Footer>
             {/* <Button variant="secondary" onClick={handleClose}>
               Close
             </Button> */}
             {/* <Button variant="primary" onClick={handleClose}>
               Save Changes
             </Button> */}
                 <Button variant="primary" type='button' onClick={handleDelete}>
               Delete Entry
             </Button>
             <p>{date}</p>
           </Modal.Footer>
           </div>
        )
    }

}

const mapStateToProps = (state) =>{
    return{
        entry: state.auth.entry,
        isLoggedIn: !!state.auth.id,
        username: state.auth.username,
        id: state.auth.id,
        entries: state.auth.entries
    }
}

const mapDispatchToProps=(dispatch)=>{
    return{
        loadEntry: (entryId) => dispatch(fetchEntry(entryId)),
        // removeEntry: (entryId) => dispatch(deleteEntry(entryId)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(SingleEntry);
