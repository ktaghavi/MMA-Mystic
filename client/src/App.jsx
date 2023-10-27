import { useState, useEffect } from 'react'
import {BrowserRouter, Routes, Route, NavLink} from 'react-router-dom'
import './App.css'

import NavBar from './components/Header/NavBar'

import Home from './components/pages/1.home/Home'
import Login from './components/pages/2.login/Login'
import SignUp from './components/pages/3.signup/SignUp'
import CompareFighters from './components/pages/4.compare-fighters/CompareFighters'
import Predictions from './components/pages/5.predictions/Predictions'
import Profile from './components/pages/6.profile/Profile'
import UpcomingEvents from './components/pages/7.upcoming-events/UpcomingEvents'
import PastEvents from './components/pages/8.past-events/PastEvents'
import Footer from './components/Footer/Footer'

function App() {
  const [currentUser, setCurrentUser] = useState(null)
  
  return (  
    
    <BrowserRouter>

      <NavBar currentUser={currentUser} />

      <Routes>


        <Route path="/" element={<Home />}/>

        <Route path="login" element={<Login setCurrentUser={setCurrentUser}/>}/>
        <Route path="signup" element={<SignUp />}/>
        <Route path='compare-fighters' element={<CompareFighters />}/>
        <Route path='predictions' element={<Predictions />}/>
        <Route path='profile' element={<Profile />}/>
        <Route path='upcoming-events' element={<UpcomingEvents />}/>
        <Route path='past-events' element={<PastEvents />}/>

      </Routes> 

      <Footer /> 
    
    </BrowserRouter>
  )
}
  
export default App
  
