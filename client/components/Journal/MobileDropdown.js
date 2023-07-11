import * as React from 'react';
import Button from 'react-bootstrap/Button';
import  Row  from 'react-bootstrap/Row';

export const MobileDropdown = ({entries, onEntryClick}) => {
    const handleMenuOne = () => {
      console.log('clicked one');
    };
  
    const handleMenuTwo = () => {
      console.log('clicked two');
    };
  
    return (
      <Dropdown
        trigger={<button>View Entry Log</button>}
        // menu={[
        //   <button onClick={handleMenuOne}>Menu 1</button>,
        //   <button onClick={handleMenuTwo}>Menu 2</button>,
        // ]}
        entries={entries}
      />
    );
  };
  
  const Dropdown = ({ trigger, entries, onEntryClick }) => {
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
          <div className="menu">
            {entries.map((entry, index) => (
              <div key={index} className="menu-item">
                {/* {React.cloneElement(entry, {
                  onClick: () => {
                    entry.props.onClick();
                    setOpen(false);
                  },
                })} */}
                    <Row>
                        <small style={{color: 'gray'}}>{entry.date}</small>
                        <Button type ='button' size='sm' variant="link" value = {entry.id} onClick={onEntryClick}>               
                        <div className="vr"></div>
                        {entry.title.slice(0, 20)}...
                      </Button>
                    </Row>
                

              </div>
            ))}
          </div>
        ) : null}
      </div>
    );
  };