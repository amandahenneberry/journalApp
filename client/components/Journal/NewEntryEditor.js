import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';

const NewEntryEditor = props =>{
    const [entry, setEntry] = useState({})
    const [submitted, setSubmitted] = useState(false)
    const {username, id} = props

    
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
    
    return(
        <div className='newEntry'>
            {!submitted ? (
            <Form onSubmit={handleSubmit} userid={id}>
                <Form.Group className="mb-3" controlId="date">
                    <Form.Label>Date</Form.Label>
                    <Form.Control type="date" name="date" value={entry.date || ''} onChange={handleChange} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="title">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" name="title" value={entry.title || ''} onChange={handleChange}/>
                </Form.Group>
                <Stack>
                <Form.Group className="mb-3" controlId="content">
                <Form.Label>Entry</Form.Label>
                    <Form.Control as="textarea" rows={8} name="content" value={entry.content || ''} onChange={handleChange} />
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

// const mapDispatch = 

  
export default connect(mapState)(NewEntryEditor)