import React, {Fragment, useEffect} from 'react'
import {connect, useSelector} from 'react-redux'
import {withRouter, Route, Switch, Redirect} from 'react-router-dom'
import Home from './components/Home';
import {me} from './store';
import { useDispatch } from 'react-redux';
import { LoginPage } from './components/LoginPage';
/**
 * COMPONENT
 */
const Routes =(props)=>{
  const {isLoggedIn} = props;
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(me())
  }, [])

  return (
      <div>
        {isLoggedIn ? (
          <Switch>
            <Route path="/home" component={Home} />
            <Redirect to="/home" />
          </Switch>
        ) : (
          <Switch>
            <Route path='/' exact component={ LoginPage } />

          </Switch>
        )}
      </div>
    )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.auth.id,
  }
}

export default withRouter(connect(mapState)(Routes))
