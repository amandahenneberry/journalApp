import React, {Component}  from 'react'
import {connect} from 'react-redux'
import { fetchEntry, updateEntryThunk, me} from '../../store/auth';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Stack from 'react-bootstrap/Stack';
import  Row  from 'react-bootstrap/Row';
import  Col  from 'react-bootstrap/Col';
import history from '../../history';
import Form from 'react-bootstrap/Form'

class SingleEntry extends Component{
    constructor(props){
        super(props)
        this.state = {
            edit: false,
            submitted: false,
            title: '',
            content: ''
        }
        this.handleChange=this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(){
       this.props.loadEntry(this.props.entryId);
    //    this.setState({
    //     title: this.props.entry.title,
    //     content: this.props.entry.content
    //    })
    }

    componentDidUpdate(prevProps){
        if (prevProps.entry!== this.props.entry){
            this.setState({
                title: this.props.entry.title || '',
                content: this.props.entry.content || ''
            })
        }
    }

    handleChange(evt){
        evt.preventDefault();
        this.setState({
            [evt.target.name]: evt.target.value
        })
    }

    handleSubmit(evt){
        evt.preventDefault();
        this.props.editEntry({...this.props.entry, ...this.state});
        this.setState({ submitted: true})
    }
    
    render(){
        const entry = this.props.entry || [];
        const content = entry.content || 'content fail';
        const title = entry.title || [];
        const photo = entry.photo || 'error loading photo';
        const date = entry.date || '';
        const location = entry.location || '';
        const weatherIcon = entry.weatherIcon || '';
        const {handleDelete} = this.props;
        const {handleClose} = this.props;

        console.log(entry)
        return(
            <div>
                {this.state.submitted ? (
                
                    <Modal.Body>
                        <Stack>
                            <Row>
                            <center>Entry Updated!</center>
                            </Row>
                            <Row>
                                <Col></Col>
                                <Col>
                                <center>
                                <Button variant="outline-secondary"  onClick={handleClose}>Okay!</Button>
                                </center>
                                </Col>
                                <Col></Col>
                            </Row>
                        </Stack>
                    </Modal.Body>
                )
                :
                (<>
                    { this.state.edit ? (
                    <center>
                    <Form onSubmit={this.handleSubmit}>
                    <Modal.Header closeButton>
                    <span>
                        <p><small>{date}<img width="25px" height="auto" src ={`https://openweathermap.org/img/wn/${weatherIcon}@2x.png`}/>{location}</small></p>
                        </span>
                </Modal.Header>
                <Modal.Body>
                    <h3> <Form.Group>
                        <Form.Control className="mb-3" type="text" name="title" value={this.state.title} onChange={this.handleChange} />
                     {/* {showTitleAlert? (<div style={{color:'red'}}><small>Title must be 30 characters or less</small></div>):('')} */}
                    </Form.Group>
                    </h3>
                    <Form.Group className="mb-3" controlId="content">
                    <Form.Control as="textarea" rows={12} cols={100} name="content" value={this.state.content} onChange={this.handleChange}/>
                </Form.Group>
                    <p><img alt='photo?' src={photo}/></p>
                </Modal.Body>
                <Modal.Footer>
                     <Button variant="primary" type='button' onClick={handleDelete}>
                   Delete Entry
                 </Button>
                    <Button variant="primary" type="submit">Submit Entry</Button>

                 {/* <button onClick={()=>{}}>EDITING...</button> */}
               </Modal.Footer> 
               </Form>
                    </center>
                )
                :
                (
                    <div>
                <Modal.Header closeButton>
                    <span>
                        <h3>{title}</h3>
                        <p><small>{date}<img width="25px" height="auto" src ={`https://openweathermap.org/img/wn/${weatherIcon}@2x.png`}/>{location}</small></p>
                        </span>
                    
                </Modal.Header>
                <Modal.Body>
                    <p>{content}</p>
                    <p><img alt='photo?' src={photo}/></p>
                </Modal.Body>
                <Modal.Footer>
                     <Button variant="primary" type='button' onClick={handleDelete}>
                   Delete Entry
                 </Button>
                 <button onClick={()=>{this.setState({ edit: true})}}>EDIT</button>
                 
               </Modal.Footer>  
               </div>
                )}
                </>)}
                
           
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
        editEntry: (entry) => dispatch(updateEntryThunk(entry)),
        me: () => dispatch(me())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(SingleEntry);
