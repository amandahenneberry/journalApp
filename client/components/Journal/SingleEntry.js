import React, {Component}  from 'react'
import {connect} from 'react-redux'
import { fetchEntry } from '../../store/auth';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import history from '../../history';

class SingleEntry extends Component{
    constructor(props){
        super(props)
    }


    componentDidMount(){
       this.props.loadEntry(this.props.entryId);

    }

    render(){
        const entry = this.props.entry || [];
        const content = entry.content || 'content fail';
        const date = entry.date || '';
        const {handleDelete} = this.props;

        console.log(entry)
        return(
            <div>
            <Modal.Header closeButton>
                <span> 
                <div>{entry.title}</div>
                </span>
            </Modal.Header>
            <Modal.Body>
                <p>{content}</p>
            </Modal.Body>
            <Modal.Footer>
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
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(SingleEntry);
