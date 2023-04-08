import React, {Component}  from 'react'
import {connect} from 'react-redux'
import { fetchEntry } from '../../store/auth';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

class SingleEntry extends Component{

    componentDidMount(){
       this.props.loadEntry(this.props.entryId);

    }

    render(){
        const entry = this.props.entry || [];
        const content = entry.content || 'content fail';
        const date = entry.date || '';

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
             <p>{date}</p>
           </Modal.Footer>
           </div>
        )
    }

}

const mapStateToProps = (state) =>{
    return{
        entry: state.auth.entry
    }
}

const mapDispatchToProps=(dispatch)=>{
    return{
        loadEntry: (entryId) => dispatch(fetchEntry(entryId))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(SingleEntry);
