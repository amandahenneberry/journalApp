import React, {useEffect} from 'react'
import Routes from './Routes'
import About from './components/About'



const App = () => {
  return (
  <>
   <div className='app'>
      <Routes />
    </div>
    <br></br>
    <div className='footer'>
    <About />
    </div>
  </>
  )
}

export default App
