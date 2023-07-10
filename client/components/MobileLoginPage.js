import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { ButtonGroup, Container } from 'react-bootstrap';
import { Login, Signup } from './AuthForm';
import { Stack } from 'react-bootstrap'
import { Journals, ListCheck } from 'react-bootstrap-icons'



export const MobileLoginPage = () =>{
    const [toggle, setToggle] = useState('Login');
    const [hoverX, onHoverX] = useState(false)
    

    return(
        <div>
            <Container fluid>
                <div className='loginBg'>
                <Row>
                    <Col></Col>
                    <Col>
                    <h1><br></br><center>WebLog <Journals style={{color: 'cadetBlue', fontSize: '45px'}}/></center></h1>
                    <center><em><p>Daily Journal + "To Do" List</p></em></center>
                    </Col>
                    
                    <Col></Col>
                    </Row>
                    
                {toggle === 'Login' ? (
                    <Container>
                        <Row >
                            <Col></Col>
                            <Col><center><Login toggle={toggle}/></center></Col>
                            <Col></Col>
                        </Row>
                        <Row>
                            <Col></Col>
                            <Col>
                                <Stack direction='horizontal'>
                                   <div>New Here?</div>
                                    <div>
                                    <Button 
                                    onMouseEnter={()=>{
                                        onHoverX(true);
                                      }}
                                      onMouseLeave={()=>{
                                        onHoverX(false);
                                      }}
                                    bsstyle='default'
                                    size='sm' 
                                    style={{borderColor:'transparent' , textDecoration:'underline', color: hoverX ? 'white' :'cadetBlue', backgroundColor: 'transparent', outline: 'none'}} 
                                    onClick={()=>setToggle('Signup')}
                                    >
                                        <em><b>Create Account</b></em>
                                    </Button>
                                        </div>
                                        
                                </Stack>
                            </Col>
                            <Col></Col>
                        </Row>
                    </Container>

                    ) : (
                        <Container>
                        <Row>
                            <Col></Col>
                            <Col><center><Signup toggle={toggle}/></center></Col>
                            <Col></Col>
                        </Row>
                        <Row>
                            <Col></Col>
                            <Col>
                                <Stack direction='horizontal' >
                                    <div>Have an account?</div>
                                    <div>
                                    <Button 
                                    onMouseEnter={()=>{
                                        onHoverX(true);
                                      }}
                                      onMouseLeave={()=>{
                                        onHoverX(false);
                                      }}
                                    bsstyle='default'
                                    size='sm' 
                                    style={{borderColor:'transparent' , textDecoration:'underline', color: hoverX ? 'white' : 'cadetBlue', backgroundColor: 'transparent', outline: 'none'}} 
                                    onClick={()=>setToggle('Login')}
                                    >
                                        <em><b>Log in</b></em>
                                    </Button>
                                    </div>
                            
                                </Stack>
                            </Col>
                            <Col></Col>
                        </Row>
                    </Container>
                    )
                }
                </div>
            </Container>
        </div>
    )
}