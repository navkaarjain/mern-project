import React from 'react';
import {Route} from 'react-router-dom';
import Navbar from './components/Navbar'
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import Login from './components/Login';
import Signup from './components/Signup';
import './App.css';
import Logout from './components/Logout'

const App=()=>{
  return(
    <>
    <Navbar/>

    <Route exact path='/'>
    <Home/>
    </Route>

    <Route path='/about'>
    <About/>
    </Route>

    <Route path='/contact'>
    <Contact/>
    </Route>

    <Route path='/login'>
    <Login/>
    </Route>

    <Route path='/signup'>
    <Signup/>
    </Route>
    <Route path='/logout'>
    <Logout/>
    </Route>
      
    </>
      )
}
export default App;