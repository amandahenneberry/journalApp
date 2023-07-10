import React, {Fragment, useState, useEffect} from 'react'
import {connect, useSelector} from 'react-redux'
import {withRouter, Route, Switch, Redirect} from 'react-router-dom'
import Home from './components/Home';
import MobileHome from './components/MobileHome'
import {me} from './store';
import { useDispatch } from 'react-redux';
import { LoginPage } from './components/LoginPage';
import { MobileLoginPage } from './components/MobileLoginPage';
import { useMediaQuery } from 'react-responsive';
import MediaQuery from 'react-responsive'

const Routes =(props)=>{
  const {isLoggedIn} = props;
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(me())
  }, [])

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const handleResize = () => {
    setWindowWidth(window.innerWidth)
  };

  useEffect (() => {
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, []);

  return (
      <div>
         <MediaQuery minWidth={992}>
          {/* LAPTOP */}
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
        </MediaQuery>


        <MediaQuery minWidth={768} maxWidth={991}>
        {/* smartphone  or tablet?? */}

        {windowWidth < 500 ? (
        <div>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <div className='phoneBg'>
          <center>
          <div className="phone">
          </div>
          </center>
          <div className="message">
             Please rotate your device!
          </div>
        </div>
        </div>
      ) : (
        <>
         {isLoggedIn ? (
          <Switch>
            <Route path="/home" component={MobileHomeHome} />
            <Redirect to="/home" />
          </Switch>
        ) : (
          <Switch>
            <Route path='/' exact component={ MobileLoginPage } />

          </Switch>
        )}
        </>
      )}
      </MediaQuery>


      <MediaQuery maxWidth={767}>
          {/* SMARTPHONE */}

      {windowWidth < 500 ? (
        <div>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <div className='phoneBg'>
          <center>
          <div className="phone">
          </div>
          </center>
          <div className="message">
             Please rotate your device!
          </div>
        </div>
        </div>
      ) : (
        <>
         {isLoggedIn ? (
          <Switch>
            <Route path="/home" component={MobileHome} />
            <Redirect to="/home" />
          </Switch>
        ) : (
          <Switch>
            <Route path='/' exact component={ MobileLoginPage } />

          </Switch>
        )}
        </>
      )}
      </MediaQuery>

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
