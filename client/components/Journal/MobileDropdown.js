import * as React from 'react';
import Button from 'react-bootstrap/Button';
import  Row  from 'react-bootstrap/Row';

export const MobileDropdown = ({entries, onEntryClick}) => {
    // const handleMenuOne = () => {
    //   console.log('clicked one');
    // };
  
    // const handleMenuTwo = () => {
    //   console.log('clicked two');
    // };

    const handleClick = ({ target }) => {
        const entry = target.value;
        onEntryClick(entry);
    };
  
    return (
      <Dropdown
        trigger={<button>View Entry Log</button>}
        // menu={[
        //   <button onClick={handleMenuOne}>Menu 1</button>,
        //   <button onClick={handleMenuTwo}>Menu 2</button>,
        // ]}
        entries={entries}
        entryClick={handleClick}
      />
    );
  };
  
  const Dropdown = ({ trigger, entries, entryClick }) => {
    const [open, setOpen] = React.useState(false);
  
    const handleOpen = () => {
      setOpen(!open);
    };

    // const handleClick = ({ target }) => {
    //     const entry = target.value;
    //     onEntryClick(entry);
    // };
  
    return (
      <div className="dropdown">
        {React.cloneElement(trigger, {
          onClick: handleOpen,
        })}
        {open ? (
          <ul className="menu">
            {
              entries
              .sort((a,b) => {
                return new Date(a.date) - new Date(b.date)
              })
              .map(entry => (
                <li key={entry.id} >
                  <Row>
                        <small style={{color: 'gray'}}>{entry.date}</small>
                        <Button type ='button' size='sm' variant="link" value = {entry.id} onClick={entryClick}>               
                        <div className="vr"></div>
                        {entry.title.slice(0, 20)}...
                      </Button>
                    </Row>
                </li>
              ))
            }
          </ul>
        ) : null}
      </div>
    );
  };