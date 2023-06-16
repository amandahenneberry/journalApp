import React, {useState} from 'react'
import Accordion from 'react-bootstrap/Accordion'
import { useAccordionButton } from 'react-bootstrap/AccordionButton';
import Card from 'react-bootstrap/Card';
import { XLg } from 'react-bootstrap-icons';
import { Linkedin, EnvelopeAt } from 'react-bootstrap-icons';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Stack from 'react-bootstrap/Stack';

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
                <Card.Body style={{backgroundColor: 'white', margin: '10px', borderRadius: '25px'}}>
                    <center>
                    <h4>Log your days and keep track of your 'to-do' list with <b><span style={{color: 'gray'}}>WebLog</span></b>!</h4>
                    
                    <p> Create an account to receive a password-protected <b><span  style={{color: 'cadetblue'}}>web journal</span></b> and editable <b><span style={{color: 'darkgoldenrod'}}>'to-do' list</span></b>.</p>
                    <br/>
                    </center>

                <center>
                <Container style={{textAlign: 'left'}}>
                <Stack direction="horizontal">
                    
                    <Container class Name="p-2" style={{paddingLeft: '10%'}}>
                        <p>
                       
                        <Row>
                            <Col>
                                <b><span style={{color: 'cadetblue'}}>Start a multi-media journal</span></b>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <span style={{color: 'cadetblue'}}>&nbsp;Use as a...</span>
                            </Col>
                        </Row>
                  
                        <ul>
                                <Row style={{color: 'gray'}}>
                                    <Col><li>diary</li> </Col>
                                </Row>
                                <Row style={{color: 'gray'}}>
                                    <Col><li>notepad</li></Col>
                                </Row>
                                <Row style={{color: 'gray'}}>
                                    <Col><li>info tracking log</li></Col>
                                </Row>
                                <Row style={{color: 'gray'}}>
                                    <Col><li>daily photo album</li></Col>
                                </Row>
                                <Row style={{color: 'gray'}}>
                                    <Col><li>poetry-draft holder</li></Col>
                                </Row>
                                <Row style={{color: 'gray'}}>
                                    <Col><li>record of 'random thoughts and ideas'</li></Col>
                                </Row>
                                <Row style={{color: 'gray'}}>
                                    <Col><li>personal birding catalogue <br></br>&nbsp;&nbsp;&nbsp;<b><span style={{color: 'cadetblue'}}>...or a neat place to mix and store <em>all of the above</em>!</span></b> </li> </Col>
                                </Row>
                            </ul>
                        </p>
                    </Container>


                    <Container className="p-2 ms-auto" style={{paddingRight: '10%'}}>
                        <p>
                        <Row>
                            <Col>
                                <b><span style={{color:'darkgoldenrod'}}>Keep track of your tasks</span></b>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <span style={{color:'darkgoldenrod'}}>&nbsp;Maintain a 'to-do' list</span>
                            </Col>
                        </Row>
                        <ul>
        
                                <Row style={{color: 'gray'}}>
                                    <Col><li>Add, edit, delete, and mark tasks as 'complete'</li></Col>
                                </Row>
                                <Row style={{color: 'gray'}}>
                                    <Col><li>access a list of all 'completed' tasks</li></Col>
                                </Row>
                                <Row style={{color: 'gray'}}>
                                    <Col>&nbsp;</Col>
                                </Row>
                                <Row style={{color: 'gray'}}>
                                    <Col>&nbsp;</Col>
                                </Row>
                                <Row style={{color: 'gray'}}>
                                    <Col>&nbsp;</Col>
                                </Row>
                                <Row style={{color: 'gray'}}>
                                    <Col>&nbsp;</Col>
                                </Row>
                                <Row style={{color: 'gray'}}>
                                    <Col>&nbsp;</Col>
                                </Row>
                                <Row style={{color: 'gray'}}>
                                    <Col>&nbsp;</Col>
                                </Row>
                            </ul>
                        </p>
                    </Container>

                </Stack>

                </Container>
                </center>
                    

    

                    <center>
                    <br/><h6>On 'login', the user dashaboards display the current time, date, and weather for the user's geographic location.</h6>
                    <p style ={{color: 'gray'}}>
                    <br/><small>This is a fullstack, JWT password protected web app - featuring a React-Redux front end, and Sequelize + Postgres back end & database. 
                    <br/><br/>For more info on tech and features, please view the 'README' file in this project's <a href = "https://github.com/amandahenneberry/journalApp" target="_blank">github repository</a>!</small>
                    </p>
                    </center>
                    
                   
                    <br/>
                    <p style={{textAlign: 'right'}}>
                    contact: <a href = "mailto: amandahenneberry@icloud.com"><EnvelopeAt/></a> <a href ="" target="_blank"><Linkedin/></a>
                    &nbsp; &nbsp; &nbsp; &nbsp;
                    </p>
                </Card.Body>
                </Accordion.Collapse>
                
            </Card>
        </Accordion>

    )
}

export default About