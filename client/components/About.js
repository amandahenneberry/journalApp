import React from 'react'
import Accordion from 'react-bootstrap/Accordion'
import { useAccordionButton } from 'react-bootstrap/AccordionButton';
import Card from 'react-bootstrap/Card';

function CustomToggle({ children,  eventKey}) {
    const decoratedOnClick = useAccordionButton(eventKey, () =>
      console.log('displaying about | contact...'),
    );
    return (
        <button
          type="button"
          style={{ backgroundColor: 'pink' }}
          onClick={decoratedOnClick}
        >
          {children}
        </button>
    );
}
    

const About = () =>{
    return(
        <Accordion > 
            <Card>
                <Card.Header>
                    <CustomToggle eventKey="0">about | contact &nbsp; &nbsp;</CustomToggle>
                    

                </Card.Header>
                <Accordion.Collapse eventKey="0">
                <Card.Body>
                    ABOUT ME PAGE 
                        !!!!
                </Card.Body>
                </Accordion.Collapse>
                
            </Card>
        </Accordion>

    )
}

export default About