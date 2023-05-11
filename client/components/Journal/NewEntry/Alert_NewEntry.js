import React, { useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';


export function Alert_NewEntry({setToggle, toggle}) {
  const [show, setShow] = useState(false);

  return (
    <div>
      <Alert show={show} variant="secondary" position='fixed'>
        <Alert.Heading><h6>Entry's Unsaved!</h6></Alert.Heading>
        <p>
          <small>You haven't submitted your entry! If you don't submit, it will be erased.</small>
        </p>
        <hr />
        <div className="d-flex justify-content-end">
          <small>
          <Button onClick={() => {setShow(false); setToggle(!toggle)}} variant="outline-danger" size="sm">
            Go Home
          </Button>
          <Button onClick={() => {setShow(false)}} variant="outline-secondary" size="sm">
            Continue Entry
          </Button>

          </small>
          
        </div>
      </Alert>

      {!show && <Button variant='link' onClick={() => setShow(true)}>Home</Button>}
    </div>
  );
}