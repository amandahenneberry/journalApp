import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import { FloatingLabel, Modal } from 'react-bootstrap';

//for 'upload photo'

const NewEntryEditor = props =>{
    const [entry, setEntry] = useState({})
    const [submitted, setSubmitted] = useState(false)
    const {username, id} = props
    //image  and upload image pop-up
    const [selectedImage, setSelectedImage] = useState('');

    
    const handleChange = ({ target }) => {
        const {id} = props;
        const { name, value } = target;
        setEntry((prev) => ({
          ...prev,
          userId: id,
          [name]: value
        }));
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

    const handleRemovePhoto=()=>{
        setSelectedImage(null);
        handleChange(entry.photo = '')
    }

    return(
        <div className='newEntry'>
            {!submitted ? (
            <Form onSubmit={handleSubmit} userid={id}>
                <Form.Group className="mb-3" controlId="date">
                    <Form.Control type="date" name="date" value={entry.date || ''} onChange={handleChange} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="title">
                    <Form.Control type="text" name="title" value={entry.title || ''} onChange={handleChange} placeholder='Title'/>
                </Form.Group>
                <Stack>
                <Form.Group className="mb-3" controlId="content">
                    <Form.Control as="textarea" rows={8} name="content" value={entry.content || ''} onChange={handleChange} placeholder='Write an entry...' />
                </Form.Group>
                <Form.Group controlId="formFileSm">
                <Form.Control type="file" name="photo" value={entry.photo || ''}  onChange={handlePhoto} />
                {selectedImage && (
                        <img alt="not found" width={"250px"} src={URL.createObjectURL(selectedImage)} />
                    )
                }
                </Form.Group>
                <Button variant="outline-dark" type="submit">Submit</Button>
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