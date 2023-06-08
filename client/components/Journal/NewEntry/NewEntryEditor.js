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
    const [newEntry, setNewEntry] = useState({content: '', title: ''});
    const [submitted, setSubmitted] = useState(false)
    const dispatch = useDispatch();
    const {id, setToggle, toggle} = props
    //alerts
    const [showTitleAlert, setTitleAlert] = useState(false);

    //image  and upload image pop-up
    const [image, setImage] = useState('');
    const [url, setUrl ] = useState("");
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
       setImage(e.target.files[0]);
       handleChange(e);
       
    }

    const uploadPhoto = () =>{
        const data = new FormData();
        data.append("file", image);
        data.append("upload_preset", "weblogapp");
        data.append("cloud_name","dl9ypspru");
        fetch("https://api.cloudinary.com/v1_1/dl9ypspru/image/upload",{
            method:"post",
            body: data
        })
        .then(resp => resp.json())
        .then(data => {
        setUrl(data.url);
        // console.log('URL: '+url)
        })
        .catch(err => console.log(err))
    }

    const addPhoto = async () =>{
        await uploadPhoto();
        // console.log('URL: '+url);
        setPhotoAdded(true);
        
    }

    useEffect(()=>{setNewEntry((prev)=>({
        ...prev,
        photo: url
    }))}, [url])
    
    const handleRemovePhoto=()=>{
        setImage(null);
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
                        <Form.Control type="text" name="title" value={newEntry.title || ''} onChange={handleChange} placeholder='Title'/>
                     {showTitleAlert? (<div style={{color:'red'}}><small>Title must be 30 characters or less</small></div>):('')}
                    </Form.Group>
                </Stack>
                <Form.Group className="mb-3" controlId="content">
                    <Form.Control as="textarea" rows={12} name="content" value={newEntry.content || ''} onChange={handleChange} placeholder='Write your entry...'/>
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
                                {image && (
                                    <div>
                                        <Stack direction='horizontal'>
                                        <img alt="not found" width={"250px"} src={URL.createObjectURL(image)} />
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
                
                {newEntry.content === '' ? (
                    <>
                    <Button variant="secondary" type="submit" disabled>Submit Entry</Button>
                    <small style={{color:'red'}}>type an entry ... </small>
                    </>
                ) : (
                    <Button variant="primary" type="submit">Submit Entry</Button>
                )}
                
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