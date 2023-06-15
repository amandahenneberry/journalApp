import React, {useState} from 'react'
import Accordion from 'react-bootstrap/Accordion'
import { useAccordionButton } from 'react-bootstrap/AccordionButton';
import Card from 'react-bootstrap/Card';
import { XLg } from 'react-bootstrap-icons';

function CustomToggle({ children,  eventKey, toggle, setToggle}) {
    

    const decoratedOnClick = useAccordionButton(eventKey, () =>
      console.log('displaying about | contact...'),
    );

    const [hoverX, onHoverX] = useState(false)
  

    return (
        <button
        onMouseEnter={()=>{
            onHoverX(true);
          }}
           onMouseLeave={()=>{
            onHoverX(false);
           }}
          type="button"
          style={{ backgroundColor: 'transparent', float: 'right', borderColor:'transparent', outline: 'none', color: hoverX ? 'black' : 'white' }}
          onClick={()=>{decoratedOnClick(); setToggle(!toggle)}}
        >
          {children}
        </button>
    );
}
    

const About = () =>{
    const [toggle, setToggle] = useState(false)

    return(
        <Accordion> 
            <Card bsstyle='default' style={{ borderColor:'transparent', outline: 'none', backgroundColor: 'transparent'}}>
                <Card.Header>
                    <CustomToggle eventKey="0" toggle={toggle} setToggle={setToggle}>
                        { !toggle ? (<>about | contact &nbsp; &nbsp; &nbsp; &nbsp;</>) : (<><XLg/> &nbsp; &nbsp;&nbsp; &nbsp;</>) }
                        </CustomToggle>
                    

                </Card.Header>
                <Accordion.Collapse eventKey="0">
                <Card.Body style={{backgroundColor: 'white', margin: '10px'}}>
                    ABOUT ME PAGE 
                        !!!!
                </Card.Body>
                </Accordion.Collapse>
                
            </Card>
        </Accordion>

    )
}

export default About