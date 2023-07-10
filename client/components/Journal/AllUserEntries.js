import React, {useState, useEffect} from 'react'
import  { EntryMap } from './EntryMap'
import  SingleEntry  from './SingleEntry'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { me, deleteEntry } from '../../store';
import { useDispatch } from 'react-redux';
import history from '../../history';


export const AllUserEntries = (props) => {
  const [entry, setEntry] = useState([]);
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();

  const handleClose = () =>{
    setShow(false);
  } 
  
  const handleDelete = () =>{
    dispatch(deleteEntry([entry]));
    handleClose();
  }

  const onEntryClick = (entry) =>{
   setEntry(() => {
    return [entry]
   });
  setShow(()=>{
    return true
  })
  }

  useEffect(()=>console.log(`SINGLE entry state: ${entry}`, [entry]), [entry])


  const entries = props.entries;
  const username = props.username;
  
    return (
      <div>
        {props.mobile ? (
          <h1>Mobile test..</h1>
        ) : (
          <>
          {entry.length <= 0? (
            <EntryMap entries={entries} onEntryClick ={onEntryClick} />
  
          ) : (<div>
            <EntryMap entries={entries} onEntryClick ={onEntryClick} />
            <Modal size="lg" show={show} onHide={handleClose}>
              <SingleEntry username={ username } entryId = {[entry]} handleDelete = {handleDelete} handleClose={handleClose}/>
            </Modal>
          </div>)}
          </>
        )}   
        
      </div>
      
    )
}

