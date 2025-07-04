import React, { useContext, useEffect } from 'react'
import Navbar from '../components/Navbar'
import { useState } from 'react'
import { assets, jobsApplied } from '../assets/assets'
import moment from 'moment'
import axios from 'axios';
import Footer from '../components/Footer'
import { AppContext } from '../context/AppContext'
import { useAuth, useUser } from '@clerk/clerk-react'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Applications = () => {

  const {user} = useUser()
  const {getToken} = useAuth()
  const [isEdit, setIsEdit] = useState(false)
  const [resume, setResume] = useState(null)

  const {backendUrl, userData, userApplications,fetchUserData,fetchUserApplications} = useContext(AppContext)

  const updateResume = async () => {
      try {
        const formData = new FormData()
        formData.append('resume',resume)
        const token = await getToken()

        const {data} = await axios.post(backendUrl+'/api/users/update-resume',
          formData,
          {headers:{Authorization : `Bearer ${token}`}}
        )
        if(data.success){
          toast.success(data.message)
          await fetchUserData()
        }else{
          toast.error(data.message)
        }
      } catch (error) {
        toast.error(error.message)
      }

      setIsEdit(false)
      setResume(null)
  }

  useEffect(( ) => {
    if(user){

      fetchUserApplications()
    }
 },[user])

  if (!userData) {
    return (
      <>
        <Navbar />
        <div className='container px-4 min-h-[65vh] 2xl:px-20 mx-auto my-10'>
          <h2 className='text-xl font-semibold'>Your Resume</h2>
          <p className='text-gray-500'>Loading user data...</p>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
    <Navbar/>
    <div className='container px-4 min-h-[65vh] 2xl:px-20 mx-auto my-10'>
      <h2 className='text-xl font-semibold'>Your Resume</h2>
      {/* <div className='flex gap-2 mb-6 mt-3'>
        {isEdit || !userData.resume ? (
  <>
    <label htmlFor='resumeUpload' className='flex items-center'>
      <p className='bg-blue-100 text-blue-600 px-4 py-2 rounded-lg mr-2'>{resume ? resume.name : "Select Resume"} </p>
      <input id='resumeUpload' onChange={e => setResume (e.target.files[0])} accept='application/pdf' type='file' />
      <img src={assets.profile_upload_icon} alt="" />
    </label>
    <button onClick={updateResume} className='bg-green-100 border border-green-400 rounded-lg px-4 py-2'>save</button>
  </>
) : (
  <div className='flex gap-2'>
    <a target="_blank" href={userData.resume} className='bg-blue-100 text-blue-600 px-4 py-2 rounded-lg' >
      Resume
    </a>
    <button onClick={()=>setIsEdit(true)} className='text-gray-500 border border-gray-300 rounded-lg px-4 py-2'>Edit</button>
  </div> */}
  <div className='flex gap-2 mb-6 mt-3'>
        {isEdit || !userData.resume ? (
          <div className="flex items-center gap-3">
            <label
              htmlFor="resumeUpload"
              className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5-5m0 0l5 5m-5-5v12" />
              </svg>
              {resume ? "Change File" : "Select Resume"}
              <input
                id="resumeUpload"
                type="file"
                accept="application/pdf"
                className="hidden"
                onChange={e => setResume(e.target.files[0])}
              />
            </label>
            <span className="text-gray-700 text-sm">
              {resume ? resume.name : "No file selected"}
            </span>
            <button
              onClick={updateResume}
              className="bg-green-100 border border-green-400 rounded-lg px-4 py-2 text-green-700 hover:bg-green-200 transition"
            >
              Save
            </button>
          </div>
        ) : (
          <div className='flex gap-2'>
            <a target="_blank" href={userData.resume} className='bg-blue-100 text-blue-600 px-4 py-2 rounded-lg' >
              Resume
            </a>
            <button onClick={()=>setIsEdit(true)} className='text-gray-500 border border-gray-300 rounded-lg px-4 py-2'>Edit</button>
          </div>
        )}
      </div>
      <h2 className='tex-xl font-semibold mb-4'>Jobs Applied</h2>
      <table className='min-w-full bg-white border rounded-lg'>
        <thead>
        <tr>
          <th className='py-3 px-4 border-b text-left'>Company</th>
          <th className='py-3 px-4 border-b text-left'>Job Title</th>
          <th className='py-3 px-4 border-b text-left max-sm: hidden'>Location</th>
          <th className='py-3 px-4 border-b text-left max-sm: hidden'>Date</th>
          <th className='py-3 px-4 border-b text-left'>Status</th>
        </tr>
        </thead>
        <tbody>
          {(userApplications || []).map((job, index)=> true ? (
            <tr key={index}>
              <td className='py-3 px-4 flex-items-center gap-2 border-b'>
                <img className='w-8 h-8' src={job.companyId.image} alt="" />
                {job.companyId.name}
              </td>
              <td className='py-2 px-4 border-b'>{job.jobId.title}</td>
              <td className='py-2 px-4 border-b'>{job.jobId.location}</td>
              <td className='py-2 px-4 border-b'>{moment(job.date).format('ll')}</td>
              <td className='py-2 px-4 border-b'>
                <span className={`${job.status === 'Accepted' ? 'bg-green-100':job.status === 'Rejected' ? 'bg-red-100' : 'bg-blue-100'} px-4 py-2 rounded`}>
                {job.status}
                </span></td>

            </tr>
          ) : (null) )}

        </tbody>
      </table>
    </div>
    <Footer/>
    </>
  )
}

export default Applications

