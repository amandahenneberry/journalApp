import React, { useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';

export function Alert_NewEntry() {
  const [show, setShow] = useState(false);

  return (
    <>
      <Alert show={show} variant="success">
        <Alert.Heading>How's it going?!</Alert.Heading>
        <p>
          Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget
          lacinia odio sem nec elit. Cras mattis consectetur purus sit amet
          fermentum.
        </p>
        <hr />
        <div className="d-flex justify-content-end">
          <Button onClick={() => {setShow(false)}} variant="outline-success">
            Continue Entry
          </Button>
          <Button onClick={() => window.location.reload()} variant="outline-success">
            Home
          </Button>
        </div>
      </Alert>

      {!show && <Button variant='link' onClick={() => setShow(true)}>Home</Button>}
    </>
  );
}