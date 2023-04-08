import React, {useState, useEffect} from 'react'
import  { EntryMap } from './EntryMap'
import  SingleEntry  from './SingleEntry'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


export const AllUserEntries = (props) => {
  const [entry, setEntry] = useState([]);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);


  const onEntryClick = (entry) =>{
   setEntry(() => {
    return [entry]
   });
  //  handleShow();
  setShow(()=>{
    return true
  })
  }

  useEffect(()=>console.log(`entry state: ${entry}`, [entry]), [entry])

  const entries = props.entries;
  const username = props.username;
    return (
      <div>   
        {entry.length <= 0? (
          <EntryMap entries={entries} onEntryClick ={onEntryClick} />

        ) : (<div>
          <Modal show={show} onHide={handleClose}>
            <SingleEntry username={ username } entryId = {[entry]} />
          </Modal>
        </div>)}
      </div>
      
    )
}

