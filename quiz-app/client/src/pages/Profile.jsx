import { useSelector } from 'react-redux'
import React, { useEffect } from 'react'
import { formatDistanceToNow } from 'date-fns';

const Profile = () => {

  const { user } = useSelector(state => state.auth)

  return (
    <section className='p-10 min-h-[calc(100vh-10rem)] bg-slate-900 border-slate-600 border rounded-lg flex items-center justify-center'>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-3 text-xl rounded-lg'>
        <h2>Username : <span className='font-thin'>{user.username}</span></h2>
        <p>Email : <span className='font-thin'>{user.email}</span></p>
        <p>Joined : <span className='font-thin'>{formatDistanceToNow(new Date(user.createdAt), { addSuffix: true })}</span></p>
        <p>Role : <span className='font-thin'>{user.role}</span></p>
      </div>

      <div>

      </div>

    </section>
  )
}

export default Profile