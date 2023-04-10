import React, { useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';

export function Alert_NewEntry() {
  const [show, setShow] = useState(false);

  return (
    <>
      <Alert show={show} variant="light">
        <Alert.Heading>Entry's Unsaved!</Alert.Heading>
        <p>
          You haven't submitted your entry! If you 'Go Home' now, it will be erased.
        </p>
        <hr />
        <div className="d-flex justify-content-end">
          <Button onClick={() => window.location.reload()} variant="outline-danger" size="sm">
            Go Home
          </Button>
          <Button onClick={() => {setShow(false)}} variant="outline-secondary" size="sm">
            Continue Entry
          </Button>
        </div>
      </Alert>

      {!show && <Button variant='link' onClick={() => setShow(true)}>Home</Button>}
    </>
  );
}