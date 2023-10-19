import React, { useState } from 'react'
import { Link,  useNavigate } from 'react-router-dom'
import Logo from '../utils/logo.png'
import { v4 as uuidv4 } from 'uuid';


const Home = () => {
  const navigate=useNavigate()
  const [newRoomID, setNewRoomID]=useState('')
  const [isShow, setIsShow]=useState(false)
  const [username, setUsername]=useState('')
  const createNewRoom=()=>{
    const id=uuidv4()
    console.log(id)
    setNewRoomID(id)
  }


  const handleJoin=()=>{
    if(!newRoomID || !username){
      setIsShow(true)
      return;
    }
navigate(`/editor/${newRoomID}`,
{
  state:{
    username,
  }
})
  }

  const handleEnter=(e)=>{
    console.log(e.key)
if(e.key==="Enter"){
  handleJoin();
}
  }
  return (
    // <div className='border bg-gradient-to-bl from-green-700 via-gray-900 to-black bg-black '>
    <div className=" bg-[url('/src/utils/bg.jpg')]">
   <section className="text-gray-600 body-font border border-gray-500  rounded-xl ">
  <div className="container px-5 py-24 mx-auto flex  ">
    <div className="lg:w-1/3 md:w-1/2 bg-[#102227] rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0  z-10 shadow-md">
        <img src={Logo} alt='logo' className='w-40  bg-gray-800' /> 
        <p>One Space, Many Coders</p>
      <p className="leading-relaxed my-2 text-gray-400 text-md">Paste invitation RoomID to connect</p>
      <div className=" mb-2">
        <label  className="leading-7 text-sm  text-[#47e3be]"> Room ID</label>
        <input type="text"  value={newRoomID}  onKeyUp={handleEnter} onChange={(e)=>setNewRoomID(e.target.value)} className="w-full bg-gray-700 rounded border border-green-800 focus:border-green-500 focus:ring-2 focus:ring-green-400 text-base outline-none text-gray-200 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" placeholder='Paste or Enter Room ID' />
      </div>
      <div className=" mb-4">
        <label  className="leading-7 text-sm text-[#47e3be]"> Username</label>
        <input type="text" onKeyUp={handleEnter} onChange={(e)=>setUsername(e.target.value)} value={username} className="w-full bg-gray-700 rounded border border-green-800 focus:border-green-500 focus:ring-2 focus:ring-green-400 text-base outline-none text-gray-200 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" placeholder='Enter Username' />
      </div>
      
      
         
     <button onClick={handleJoin}   className="text-black cursor-pointer bg-[#47e3be] border-0 py-2 px-6 focus:outline-none hover:bg-[#43d7b5] rounded text-lg mb-2 active:scale-95 duration-150 ">
        Join
     
     </button>
     <p className=' text-gray-400 border-t border-b border-gray-500 mb-2 text-center py-2'>Don&apos;t have invitation?</p>
      <button onClick={createNewRoom}  className="text-black cursor-pointer bg-[#47e3be] border-0 py-2 px-6 focus:outline-none hover:bg-[#43d7b5] rounded text-lg active:scale-95 duration-150 ">
        Create New Room
 
        </button>

     { isShow && <p className='text-red-400'>RoomID and Username is required</p>}
    </div>
  </div>
</section>

    </div>
  )
}

export default Home