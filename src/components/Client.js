import React from 'react'
import Avatar from 'react-avatar'

const Client = ({username}) => {
  return (
    <div className='flex gap-2 items-center bg-gray-700 p-2 rounded-lg'>
<Avatar name={username} size={40} round="10px" />
<span className='text-gray-300'>{username} </span>
    </div>
  )
}

export default Client