import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { ButtonGroup, Container } from 'react-bootstrap';
import { Login, Signup } from './AuthForm';
import { Nav } from 'react-bootstrap';
import { Stack } from 'react-bootstrap'


export const LoginPage = () =>{
    const [toggle, setToggle] = useState(false);

    return(
        <div>
            <Container fluid className='vertical-center'>
                <div className='loginBg'>
                <Row>
                    <Col></Col>
                    <Col>
                    {/* <div className='loginBg'></div> */}
                    <h1><br></br><center>WebLog</center></h1><br></br><center><em><p>A Journaling App</p></em></center></Col>
                    {/* <h2><center>Daily Journal</center></h2></Col> */}

                    <Col></Col>
                    </Row>
                {!toggle? (
                    <Container>
                        <Row>
                            <Col></Col>
                            <Col xs={6}><center><Login /></center></Col>
                            <Col></Col>
                        </Row>
                        <Row>
                            <Col></Col>
                            <Col xs={2}>
                                <Stack direction='horizontal'>
                                    <div>New Here?</div>
                                    <div><Button type='button' variant='link' onClick={()=>setToggle(!toggle)}>Sign Up</Button></div>
                                </Stack>
                            </Col>
                            <Col></Col>
                        </Row>
                    </Container>

                    ) : (
                        <Container>
                        <Row>
                            <Col></Col>
                            <Col xs={6}><center><Signup /></center></Col>
                            <Col></Col>
                        </Row>
                        <Row>
                            <Col></Col>
                            <Col xs={3}>
                                <Stack direction='horizontal'>
                                    <div>Have an account?</div>
                                    <div><Button type='button' variant='link' onClick={()=>setToggle(!toggle)}>Log in</Button></div>
                            
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