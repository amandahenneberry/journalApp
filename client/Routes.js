import React, {Fragment, useState, useEffect} from 'react'
import {connect, useSelector} from 'react-redux'
import {withRouter, Route, Switch, Redirect} from 'react-router-dom'
import Home from './components/Home';
import MobileHome from './components/MobileHome';
import {me} from './store';
import { useDispatch } from 'react-redux';
import { LoginPage } from './components/LoginPage';
import { MobileLoginPage } from './components/MobileLoginPage';
import { useMediaQuery } from 'react-responsive';
import MediaQuery from 'react-responsive'
import About from './components/About'
import { set } from 'react-hook-form';





const Routes =(props)=>{
  const {isLoggedIn} = props;
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(me())
  }, [])

  const [laptop, setLaptop] = useState(false);

  useEffect(() => {
    if(window.innerWidth >= 992) {
      setLaptop(true);
    } else {
      setLaptop(false);
    }
  }, []);


  useEffect(() => {
    console.log('LAPTOP? : '+laptop)
  }, [laptop])




  // const [renderCount, setRenderCount] = useState(0);
  // useEffect(() =>{
  //   setRenderCount(renderCount++)
  // }, [laptop])

  const [windowWidth, setWindowWidth] = useState(window.innerWidth); 
  const handleResize = () => {
    setWindowWidth(window.innerWidth)
  };

  useEffect (() => {
    if(laptop === false)
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, []);

  return (
    <>
          {laptop ? (
            <div>
              {/* LAPTOP */}
              {isLoggedIn ? (
                <Switch>
                  <Route path="/home" component={Home} />
                  <Redirect to="/home" />
                </Switch>
              ) : (
                <Switch>
                  <Route path='/' exact component={LoginPage} />
   
                </Switch>
                )
              }
             <br></br>
             <br></br>
             <br></br>
            <div className='footer'>
              <About />
            </div>
            </div>
        
          ) : (
            <>
              <MediaQuery minWidth={992}>
              {/* LAPTOP */}
              {isLoggedIn ? (
                <Switch>
                  <Route path="/home" component={Home} />
                  <Redirect to="/home" />
                </Switch>
              ) : (
                <Switch>
                  <Route path='/' exact component={LoginPage} />
   
                </Switch>
                )
              }
             <br></br>
             <br></br>
             <br></br>
            <div className='footer'>
              <About />
            </div>
               </MediaQuery>
          
          <MediaQuery maxWidth={991}>
        {/* smartphone  or tablet?? */}

        {windowWidth < window.innerHeight ? (
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
          <br></br>
          <br></br>
          <br></br>
          <div className='footerMobile'>
            <About />
          </div>
        </>
      )}
      </MediaQuery>
      </>
      )}
      


        

     
    </>
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
