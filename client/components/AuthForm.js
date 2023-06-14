import React from 'react'
import {connect} from 'react-redux'
import {authenticate} from '../store'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Row } from 'react-bootstrap';
/**
 * COMPONENT
 */
const AuthForm = props => {
  const {name, displayName, handleSubmit, error, toggle} = props

  return (
    <div>
      <Form onSubmit={handleSubmit} name={name}>
        <Row>
        <Form.Group>
          <Form.Label>
            {toggle === 'Login' ?
            (
              <small>Username</small>
            )
            :
            (
              <small>New Username</small>
            )
            }
          </Form.Label>
          <Form.Control name="username" type="text" />
        </Form.Group>
        <Form.Group>
          <Form.Label>
          {toggle === 'Login' ?
            (
              <small>Password</small>
            )
            :
            (
              <small>New Password</small>
            )
            }
          </Form.Label>
          <Form.Control name="password" type="password" />
        </Form.Group>
        
        <div>
          <Button type="submit" variant="outline-dark">{displayName}</Button>
        </div>
        {error && error.response && <div> {error.response.data} </div>}
        </Row>
      </Form>
    </div>
  )
}

const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.auth.error
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.auth.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const username = evt.target.username.value
      const password = evt.target.password.value
      dispatch(authenticate(username, password, formName))
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)
