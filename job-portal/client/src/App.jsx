import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import ApplyJob from './Pages/ApplyJob'
import Applications from './Pages/Applications'
import RecruiterLogin from './components/RecruiterLogin'
import { AppContext } from './context/AppContext'
import { useContext } from 'react'

const App = () => {
  const {showRecruiterLogin} = useContext(AppContext)
  return (
    <div>
      { showRecruiterLogin && <RecruiterLogin/>}
    <Routes>
      <Route path='/' element={<Home />} /> 
      <Route path='/apply-job/:id' element={<ApplyJob />} />
       <Route path='/applications' element={<Applications />} />
      
    </Routes>
    </div>
  )
}

export default App
