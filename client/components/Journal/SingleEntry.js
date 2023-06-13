import React, {Component}  from 'react'
import {connect} from 'react-redux'
import { fetchEntry, updateEntryThunk, me } from '../../store/auth';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Stack from 'react-bootstrap/Stack';
import  Row  from 'react-bootstrap/Row';
import  Col  from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form'
import axios from 'axios';


class SingleEntry extends Component{
    constructor(props){
        super(props)
        this.state = {
            edit: false,
            title: '',
            content: '',
            photo: '',
            photoDeleted: false,
            photoAdded: false,
            url: ""
        }
        this.handleChange=this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleReload = this.handleReload.bind(this)
        this.deletePhoto = this.deletePhoto.bind(this)
        this.uploadPhoto = this.uploadPhoto.bind(this);
        this.addPhoto = this.addPhoto.bind(this);
        this.handleAddPhoto = this.handleAddPhoto.bind(this);
        this.handleRemovePhoto = this.handleRemovePhoto.bind(this);
        this.deleteFromCloudinary = this.deleteFromCloudinary.bind(this);
        this.onKeyDown = this.onKeyDown.bind(this);
    }

    componentDidMount(){
       this.props.loadEntry(this.props.entryId);
    }

    componentDidUpdate(prevProps){
        if (prevProps.entry!== this.props.entry){
            this.setState({
                title: this.props.entry.title || '',
                content: this.props.entry.content || '',
                photo: this.props.entry.photo || ''
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
    }

    handleReload(){
        this.props.reload();
    }

    //edit photo

    deletePhoto(){
        this.setState({
            photo: '',
            photoDeleted: true
        });
        this.deleteFromCloudinary();
    }

    handleAddPhoto(e){
        e.preventDefault();
        this.setState({photo: e.target.files[0]});
    }

    handleRemovePhoto(){
        this.setState({photo: '', photoAdded:false})
    }

    uploadPhoto(){
        const data = new FormData();
        data.append("file", this.state.photo);
        data.append("upload_preset", "weblogapp");
        data.append("cloud_name","dl9ypspru");
        fetch("https://api.cloudinary.com/v1_1/dl9ypspru/image/upload",{
            method:"post",
            body: data
        })
        .then(resp => resp.json())
        .then(data => {
        this.setState({url: data.url});
        })
        .finally(()=>{
            this.setState({
                photoAdded:true,
                photo: this.state.url
            })
        })
        .catch(err => console.log(err))
    }

    addPhoto(){
        this.uploadPhoto()   
    }

    deleteFromCloudinary(){
        const data = new FormData();
        data.append("file", this.props.entry.photo);
        data.append("upload_preset", "weblogapp");
        data.append("cloud_name","dl9ypspru");
        fetch("https://api.cloudinary.com/v1_1/dl9ypspru/image/destroy/",{
            method:"post",
            body: data
        })
    }

    onKeyDown(e){
        const { value } = e.target;

        if (e.key === 'Tab') {
          e.preventDefault();

          const cursorPosition = e.target.selectionStart;
          const cursorEndPosition = e.target.selectionEnd;
          const tab = '\t';

          e.target.value =
            value.substring(0, cursorPosition) +
            tab +
            value.substring(cursorEndPosition);

          // if you modify the value programmatically, the cursor is moved
          // to the end of the value, we need to reset it to the correct
          // position again
          e.target.selectionStart = cursorPosition + 1;
          e.target.selectionEnd = cursorPosition + 1;
        }
    }
    
    render(){
        const entry = this.props.entry || [];
        const content = entry.content || 'content fail';
        const title = entry.title || [];
        const photo = entry.photo || '';
        const date = entry.date || '';
        const location = entry.location || '';
        const weatherIcon = entry.weatherIcon || '';
        const weatherDescription = entry.weatherDescription || '';
        const high = entry.high || '';
        const low = entry.low || '';
        const {handleDelete} = this.props;
        const {handleClose} = this.props;

        console.log(entry)
        return(
            <div style={{overflow: 'auto'}}>
                { this.state.edit ? (
                    <center>
                        <Form onSubmit={this.handleSubmit}>
                            <Modal.Header closeButton>
                                <span>
                                    <p><small>{date}<img width="25px" height="auto" src ={`https://openweathermap.org/img/wn/${weatherIcon}@2x.png`}/>{location}</small></p>
                                </span>
                            </Modal.Header>
                            <Modal.Body>
                                <h3> 
                                    <Form.Group>
                                        <Form.Control className="mb-3" type="text" name="title" value={this.state.title} onChange={this.handleChange} />
                                            {/* {showTitleAlert? (<div style={{color:'red'}}><small>Title must be 30 characters or less</small></div>):('')} */}
                                    </Form.Group>
                                </h3>
                                <Form.Group className="mb-3" controlId="content">
                                    <Form.Control as="textarea" onKeyDown={this.onKeyDown} rows={12} cols={100} name="content" style={{whiteSpace:'pre-wrap'}} value={this.state.content} onChange={this.handleChange}/>
                                 </Form.Group>
                                    {photo !=='' && !this.state.photoDeleted ? (
                                        <center>
                                            <img alt='photo?' width={"250px"} src={photo}/>
                                            <Button size = 'sm' onClick={this.deletePhoto}>
                                                remove photo
                                            </Button>
                                        </center>
                                    ) 
                                    :
                                    (
                                        <>
                                            {this.state.photoAdded ? (
                                                <Stack direction="horizontal" className='d-flex align-items-center justify-content-center text-center not-found-container'>
                                                    <img alt='Photo added!' width={"40px"} src='./images/photo_icon.png'/>
                                                    <Button variant="link" onClick={this.handleRemovePhoto}>RemovePhoto</Button>
                            
                                                </Stack>
                                            ):(
                                        
                                                <>
                                                <Form.Group controlId="formFileSm">
                                                <Form.Control type="file" name="photo" onChange={this.handleAddPhoto} />
                                                    {this.state.photo && (
                                                        <div>
                                                            <Stack direction='horizontal'>
                                                                <img alt="not found" width={"250px"} src={URL.createObjectURL(this.state.photo)} />
                                                                <div className="vr" />
                                                                <Stack gap={3}>
                                                                    <br/>
                                                                    <Button size="sm" variant="outline-primary" onClick={this.handleRemovePhoto}>Remove photo</Button>
                                                                    <Button size="sm" variant="outline-primary" onClick={this.addPhoto}>Add photo</Button>
                                                                </Stack>
                                                            </Stack>
                                                        </div>   
                                                    )} 
                                                </Form.Group>      
                                                </>
                                            )}
                                        </>
                                    )}
                                
                                    
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="primary" type="submit">Submit Changes</Button>
                                {/* <Button variant="primary" type="submit">S</Button> */}
                                {/* <Button size="sm" variant="danger" type='button' onClick={handleDelete}>Delete Entry</Button> */}
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
                                    <table>

                                            <tr>
                                                <th style={{color:'gray'}}>{date}</th>
                                            </tr>
                                            <small>
                                            
                                            <tr>
                                               
                                                <td>
                                                <b>{location}</b>
                                                 <img width="25px" height="auto" src ={`https://openweathermap.org/img/wn/${weatherIcon}@2x.png`}/> <em>{weatherDescription}</em>
                                                 </td>
                                                
                                            </tr>
                                            <tr>
                                              
                                                <small style={{fontSize: 'smaller'}}>
                                                <td><b>H:</b>{high}ºF &nbsp; <b>L:</b>{low}ºF</td>                                                
                                                </small>
                                                
                                            </tr>
                                            </small>
                                    </table>
                                </span>
                    
                            </Modal.Header>
                            <Modal.Body style={{whiteSpace:'pre-wrap'}}>
                                <p>{content}</p>
                                    
                                {photo ? (
                                    <div>
                                        <center>
                                        <img alt='photo?' width={"250px"} src={photo}/>
                                        </center>
                                        
                                    </div>
                                    ) 
                                    :
                                    (
                                        <>
                                        </>
                                    )
                                }
                                    
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="outline-primary"onClick={()=>{this.setState({ edit: true})}}>Edit</Button>
                                <Button size='sm' variant="danger" type='button' onClick={handleDelete}> Delete Entry</Button>
                            </Modal.Footer>  
                        </div>
                    )
                }
            </div>
        )
    }

}

const mapStateToProps = (state) =>{
    return{
        entry: state.auth.entry,
    }
}

const mapDispatchToProps=(dispatch)=>{
    return{
        loadEntry: (entryId) => dispatch(fetchEntry(entryId)),
        editEntry: (entry) => dispatch(updateEntryThunk(entry)),
        reload: () => dispatch(me())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(SingleEntry);
