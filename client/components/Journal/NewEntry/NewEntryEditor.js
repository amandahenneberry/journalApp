import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import { FloatingLabel, Modal } from 'react-bootstrap';
import { postEntryThunk } from '../../../store/auth';
import { useDispatch} from 'react-redux';

const moment = require('moment');


//alerts
//for 'upload photo'

const NewEntryEditor = props =>{
    const [newEntry, setNewEntry] = useState({});
    const [submitted, setSubmitted] = useState(false)
    const dispatch = useDispatch();
    const {id, setToggle, toggle} = props
    //alerts
    const [showTitleAlert, setTitleAlert] = useState(false);

    //image  and upload image pop-up
    const [selectedImage, setSelectedImage] = useState('');
    const [photoAdded, setPhotoAdded] = useState(false)
    
  
   
    const handleChange = ({ target }) => {
        const {id, cityName, weatherIcon} = props;
        const { name, value } = target;
        const title= newEntry.title;
        const today = moment().format("YYYY-MM-DD")
        if(!newEntry.date){
            setNewEntry((prev) => ({
                ...prev,
                date: today.toString()
              }));   
        }
        
        setNewEntry((prev) => ({
          ...prev,
          userId: id,
          [name]: value,
          location: cityName,
          weatherIcon: weatherIcon
        }));   

        if(title.length  >=  30){
            setTitleAlert(true)
        } else {
            setTitleAlert(false)
        }

    };

    const submitEntry = () =>{
        // axios.post(`/api/entries`, entry)
        // axios.post(`/auth/me/entries`, entry)
        dispatch(postEntryThunk(newEntry))

    }

    const handleSubmit = (evt) =>{
        evt.preventDefault();
        setSubmitted(true);
        console.log('new entry: '+newEntry.content)
        submitEntry();
        setNewEntry({});
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
        setNewEntry((prev) =>({
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
                        <Form.Control type="date" name="date" value={newEntry.date || moment().format("YYYY-MM-DD")} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="title">
                        <Form.Control type="text" name="title" value={newEntry.title || ' '} onChange={handleChange} placeholder='Title'/>
                     {showTitleAlert? (<div style={{color:'red'}}><small>Title must be 30 characters or less</small></div>):('')}
                    </Form.Group>
                </Stack>
                <Form.Group className="mb-3" controlId="content">
                    <Form.Control as="textarea" rows={12} name="content" value={newEntry.content || ''} onChange={handleChange} placeholder='Write an entry...' />
                </Form.Group>
                <div>
                    {photoAdded ? (
                        <Stack direction="horizontal" className='d-flex align-items-center justify-content-center text-center not-found-container'>
                            <img alt='Photo added!' width={"40px"} src='./images/photo_icon.png'/>
                            <Button variant="link" onClick={handleRemovePhoto}>RemovePhoto</Button>
                            
                        </Stack>
                        ) : (
                        <Form.Group controlId="formFileSm">
                            <Form.Control type="file" name="photo" value={newEntry.photo || ''}  onChange={handlePhoto} />
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
                <Button variant="outline-secondary"  onClick={()=> setToggle(!toggle)}>Return Home</Button>

                </div>
            </div>
            )}
        </div>
    )
}

const mapState = state => {
    return {
      id: state.auth.id,
    }
}


  
export default connect(mapState)(NewEntryEditor)