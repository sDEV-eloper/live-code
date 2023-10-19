import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <>
   <section className="text-gray-600 body-font relative">
  <div className="absolute inset-0 bg-gray-700">
    
  </div>
  <div className="container px-5 py-24 mx-auto flex">
    <div className="lg:w-1/3 md:w-1/2 bg-gray-800 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0 relative z-10 shadow-md">
      <h2 className="text-green-700 text-2xl mb-1 font-bold title-font">Live Code</h2>
      <p className="leading-relaxed mb-2 text-gray-400 text-lg">Paste invitation RoomID to connect</p>
      <div className="relative mb-2">
        <label  className="leading-7 text-sm text-green-500"> Room ID</label>
        <input type="text"  className="w-full bg-gray-700 rounded border border-green-800 focus:border-green-500 focus:ring-2 focus:ring-green-400 text-base outline-none text-gray-600 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" placeholder='Paste or Enter Room ID' />
      </div>
      <div className="relative mb-4">
        <label  className="leading-7 text-sm text-green-500"> Username</label>
        <input type="text"  className="w-full bg-gray-700 rounded border border-green-800 focus:border-green-500 focus:ring-2 focus:ring-green-400 text-base outline-none text-gray-600 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" placeholder='Enter Username' />
      </div>
      
      
         
     <button className="text-white bg-green-600 border-0 py-2 px-6 focus:outline-none hover:bg-green-700 rounded text-lg mb-2">
     <Link>
        Join
        </Link>
     </button>
     <p className=' text-gray-400 border-t border-b border-gray-500 mb-2 text-center py-2'>Don&apos;t have invitation?</p>
      <button className="text-white bg-green-600 border-0 py-2 px-6 focus:outline-none hover:bg-green-700 rounded text-lg ">
      <Link>
        Create New Room
        </Link>
        </button>

     
    </div>
  </div>
</section>

    </>
  )
}

export default Home