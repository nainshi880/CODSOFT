import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import ApplyJob from './Pages/ApplyJob'
import Applications from './Pages/Applications'
import RecruiterLogin from './components/RecruiterLogin'
import { AppContext } from './context/AppContext'
import { useContext } from 'react'
import Dashboard from './Pages/Dashboard'
import AddJob from './Pages/AddJob'
import ManageJob from './Pages/ManageJob'
import ViewApplications from './Pages/ViewApplications'
import 'quill/dist/quill.snow.css'

const App = () => {
  const {showRecruiterLogin} = useContext(AppContext)
  return (
    <div>
      { showRecruiterLogin && <RecruiterLogin/>}
    <Routes>
      <Route path='/' element={<Home />} /> 
      <Route path='/apply-job/:id' element={<ApplyJob />} />
       <Route path='/applications' element={<Applications />} />
       <Route path='/dashboard' element= {<Dashboard />} >
       <Route path='add-job' element= {<AddJob />} />
       <Route path='manage-job' element= {<ManageJob />} />
       <Route path='view-applications' element= {<ViewApplications />} />
       </Route>
      
    </Routes>
    </div>
  )
}

export default App
