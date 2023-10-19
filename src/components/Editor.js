import React, { useState } from "react";
import Logo from "../utils/logo.png";
import Client from "./Client";
import {ImExit, ImCopy} from "react-icons/im"

const Editor = () => {
  const [clients, setClients] = useState([
    { socketId: 1, username: "Suraj Dev" },
    { socketId: 2, username: "P joshi" },
  ]);
  return (
    <div className="bg-[url('/src/utils/bg.jpg')]">
      <button className="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-200 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 ">
        <span className="sr-only">Open sidebar</span>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          />
        </svg>
      </button>

      <aside className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0">
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-800 flex justify-between flex-col ">
         <div>
         <div className="flex justify-center   border-b-2 border-gray-600">
            <img src={Logo} alt="Logo" className="w-36 my-2" />
          </div>
          <ul className="space-y-2 font-medium  mt-6">
            {clients.map((item) => {
              return (
                <li key={item.socketId}>
                  <Client username={item.username} />
                </li>
              );
            })}
          </ul>
         </div>

          <div className="flex text-white flex-col ">
            <button className="flex justify-between items-center text-black cursor-pointer bg-[#ffffff] border-0 py-2 px-6 focus:outline-none rounded text-lg mb-2 active:scale-95 duration-150 " >Copy Room ID
            <ImCopy/>
            </button>
            <button className=" flex justify-between items-center text-black cursor-pointer bg-[#47e3be] border-0 py-2 px-6 focus:outline-none rounded text-lg mb-2 active:scale-95 duration-150 ">
              Exit
              
            <ImExit/>
              </button>
          </div>
        </div>
      </aside>

      
      <div className="p-4 sm:ml-64 ">
        <div className="p-4 border-2 border-gray-200 border-double rounded-lg dark:border-gray-700">

        </div>
      </div>
    </div>
  );
};

export default Editor;
