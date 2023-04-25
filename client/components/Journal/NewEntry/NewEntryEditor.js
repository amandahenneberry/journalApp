import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import { FloatingLabel, Modal } from 'react-bootstrap';
const moment = require('moment');


//alerts
//for 'upload photo'

const NewEntryEditor = props =>{
    const [entry, setEntry] = useState({})
    const [submitted, setSubmitted] = useState(false)
    const {username, id} = props
    //alerts
    const [showTitleAlert, setTitleAlert] = useState(false);

    //image  and upload image pop-up
    const [selectedImage, setSelectedImage] = useState('');
    const [photoAdded, setPhotoAdded] = useState(false)
    
  
   
    const handleChange = ({ target }) => {
        const {id} = props;
        const { name, value } = target;
        const title= entry.title;
        const today = moment().format("YYYY-MM-DD")
        if(!entry.date){
            setEntry((prev) => ({
                ...prev,
                date: today.toString()
              }));   
        }
        
        setEntry((prev) => ({
          ...prev,
          userId: id,
          [name]: value
        }));   

        if(title.length  >=  30){
            setTitleAlert(true)
        } else {
            setTitleAlert(false)
        }

    };

    const submitEntry = () =>{
        axios.post(`/api/entries`, entry)
    }

    const handleSubmit = (evt) =>{
        evt.preventDefault();
        setSubmitted(true);
        console.log('new entry: '+entry.content)
        submitEntry();
    }

    //image
    const handlePhoto = (e) =>{
       setSelectedImage(e.target.files[0]);
       handleChange(e);
       
    }

    const addPhoto = () =>{
        //**convert photo? figure out... */
        setPhotoAdded(true)
    }

    const handleRemovePhoto=()=>{
        setSelectedImage(null);
        // handleChange(entry.photo = '')
        setEntry((prev) =>({
            ...prev,
            photo: ''
        }));
        setPhotoAdded(false)
    }

    return(
        <div>
            {!submitted ? (
            <Form onSubmit={handleSubmit} userid={id}>
                 {/* <div>{showTitleAlert? (<div style={{color:'red'}}>hi</div>):('')}</div> */}

                <Stack gap={1}>
                <Stack direction='horizontal' className='d-flex align-items-center justify-content-center text-center not-found-container'>
                    <Form.Group className="mb-3" controlId="date">
                        <Form.Control type="date" name="date" value={entry.date || moment().format("YYYY-MM-DD")} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="title">
                        <Form.Control type="text" name="title" value={entry.title || ' '} onChange={handleChange} placeholder='Title'/>
                     {showTitleAlert? (<div style={{color:'red'}}><small>Title must be 30 characters or less</small></div>):('')}
                    </Form.Group>
                </Stack>
                <Form.Group className="mb-3" controlId="content">
                    <Form.Control as="textarea" rows={12} name="content" value={entry.content || ''} onChange={handleChange} placeholder='Write an entry...' />
                </Form.Group>
                <div>
                    {photoAdded ? (
                        <Stack direction="horizontal" className='d-flex align-items-center justify-content-center text-center not-found-container'>
                            <img alt='Photo added!' width={"40px"} src='./images/photo_icon.png'/>
                            <Button variant="link" onClick={handleRemovePhoto}>RemovePhoto</Button>
                            
                        </Stack>
                        ) : (
                        <Form.Group controlId="formFileSm">
                            <Form.Control type="file" name="photo" value={entry.photo || ''}  onChange={handlePhoto} />
                                {selectedImage && (
                                    <div>
                                        <Stack direction='horizontal'>
                                        <img alt="not found" width={"250px"} src={URL.createObjectURL(selectedImage)} />
                                        <div className="vr" />
                                        <Stack gap={3}>
                                            <br/>
                                        <Button size="sm" variant="outline-primary" onClick={handleRemovePhoto}>Remove photo</Button>
                                        <Button size="sm" variant="outline-primary" onClick={addPhoto}>Add photo</Button>
                                        </Stack>
                                    </Stack>
                                        
                                        
                                    </div>   
                                )} 
                        </Form.Group>      
                        )
                        
                    }
                </div>
                
                

                <Button variant="primary" type="submit">Submit Entry</Button>
                </Stack>
            </Form>
               
                
            ):(
            <div>
                New Entry Submitted!
                <div>
                <Button variant="outline-secondary"  onClick={()=>window.location.reload()}>Return Home</Button>

                </div>
            </div>
            )}
        </div>
    )
}

const mapState = state => {
    return {
      username: state.auth.username,
      id: state.auth.id,
      entries: state.auth.entries
    }
}


  
export default connect(mapState)(NewEntryEditor)