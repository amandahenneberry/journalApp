// import React, {useState} from 'react'
import React from "react";
import {useState} from 'react';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';




export const EntryMap = ({ entries, onEntryClick }) => {
  const [sortBy, setSortBy] = useState(false)

    const handleClick = ({ target }) => {
        const entry = target.value;
        onEntryClick(entry);
    };

    const handleSort = () =>{
      sortBy === false ? setSortBy(true) : setSortBy(false)
    } 
    
    

    return (
        <DropdownButton className='column'  size='lg' title='View Entry Log' variant="link">
          {sortBy === false ? (
            <div>
            <Button size="sm" variant="outline-secondary" onClick={handleSort}> sort by newest</Button>
            <Dropdown.Divider />
             {
              entries
              .sort((a,b) => {
                return new Date(a.date) - new Date(b.date)
              })
              .map(entry => (
                <div key={entry.id} >
                  <Row>
                        <small>{entry.date}</small>
                        <Button type ='button' size='sm' variant="link" value = {entry.id} onClick={handleClick}>               
                        <div className="vr"></div>
                        {entry.title.slice(0, 20)}...
                      </Button>
                    </Row>
                    <Dropdown.Divider />
                </div>
              ))
            }
            </div>
          ) : (
            <div>
            <Button size="sm" variant="outline-secondary" onClick={handleSort}> sort by oldest</Button>
            <Dropdown.Divider />
            {
              entries
              .sort((a,b) => {
                return new Date(a.date) - new Date(b.date)
              })
              .reverse()
              .map(entry => (
                <div key={entry.id} >
                  <Row>
                        <small>{entry.date}</small>
                        <Button type ='button' size='sm' variant="link" value = {entry.id} onClick={handleClick}>               
                        <div className="vr"></div>
                        {entry.title.slice(0, 20)}...
                      </Button>
                    </Row>
                    <Dropdown.Divider />
                </div>
              ))
            }
            </div>

          )}
       
      </DropdownButton >
      
    )
  }