import React, {Fragment, useEffect} from 'react'
import {connect, useSelector} from 'react-redux'
import {withRouter, Route, Switch, Redirect} from 'react-router-dom'
import Home from './components/Home';
// import {me, fetchEntries} from './store';
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
    // Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
    // Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
    isLoggedIn: !!state.auth.id,
    // entries: state.auth.entries
  }
}

// const mapDispatch = dispatch => {
//   return {
//     loadInitialData: () => dispatch(me()),
//   }
// }

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState)(Routes))
