import React, {useState, useEffect} from 'react'
import  { EntryMap } from './EntryMap'
import  SingleEntry  from './SingleEntry'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { deleteEntry } from '../../store';
import { useDispatch } from 'react-redux';
import history from '../../history';


export const AllUserEntries = (props) => {
  const [entry, setEntry] = useState([]);
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();

  const handleClose = () => setShow(false);
  const handleDelete = () =>{
    dispatch(deleteEntry([entry]));
  }


  const onEntryClick = (entry) =>{
   setEntry(() => {
    return [entry]
   });
  setShow(()=>{
    return true
  })
  }

  useEffect(()=>console.log(`entry state: ${entry}`, [entry]), [entry])


  let entries = props.entries;

  const username = props.username;
    return (
      <div>   
        {entry.length <= 0? (
          <EntryMap entries={entries} onEntryClick ={onEntryClick} />

        ) : (<div>
          <EntryMap entries={entries} onEntryClick ={onEntryClick} />
          <Modal show={show} onHide={handleClose}>
            <SingleEntry username={ username } entryId = {[entry]} handleDelete = {handleDelete}/>
          </Modal>
        </div>)}
      </div>
      
    )
}

