// import React, {useState} from 'react'
import React from "react";
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';




export const EntryMap = ({ entries, onEntryClick }) => {

    const handleClick = ({ target }) => {
        const entry = target.value;
        onEntryClick(entry);
    };
    
    

    return (
        <DropdownButton className='column'  size='lg' title='View Entry Log' variant="link">
        {
          entries.map(entry => (
            <div key={entry.id} >
              <Row>
                    <small>{entry.date}</small>
                    <Button type ='button' size='sm' variant="link" value = {entry.id} onClick={handleClick}>               
                    <div className="vr"></div>
                    {entry.title.slice(0, 12)}...
                  </Button>
                </Row>
                <Dropdown.Divider />
            </div>
          ))
        }
      </DropdownButton >
      
    )
  }