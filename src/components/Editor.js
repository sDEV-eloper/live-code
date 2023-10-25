import React, { useEffect, useRef, useState } from "react";
import Logo from "../utils/logo.png";
import Client from "./Client";
import { ImCopy } from "react-icons/im";
import { MdOutlineExitToApp } from "react-icons/md";
import { BsCheckAll } from "react-icons/bs";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
import { initSocket } from "../socket";
import ACTIONS from "../Action";


import {
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import toast from "react-hot-toast";
import MainEditor from "./MainEditor";

const Editor = () => {
  const [isCopied, setIsCopied] = useState(false);
  const location = useLocation();
  const { roomId } = useParams();
  const reactNavigator = useNavigate();
  // console.log("ID", roomId)
  const [clients, setClients] = useState([]);
  const socketRef = useRef(null);
  const codeRef = useRef(null);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const init = async () => {
      socketRef.current = await initSocket();
      socketRef.current.on("connect_error", (err) => handleErrors(err));
      socketRef.current.on("connect_failed", (err) => handleErrors(err));

      function handleErrors(e) {
        console.log("socket error", e);
        toast.error("socket connection failed, try again later.");
        reactNavigator("/");
      }

      socketRef.current.emit(ACTIONS.JOIN, {
        roomId,
        username: location.state?.username,
      });

      //listening for joined event
      socketRef.current.on(
        ACTIONS.JOINED,
        ({ clients, username, socketId }) => {
          if (username !== location.state?.username) {
            toast.success(`${username} joined new room`);
          }
          setClients(clients);
          socketRef.current.emit(ACTIONS.SYNC_CODE, {
            code: codeRef.current,
            socketId,
        });
        }
      );

         // Listening for disconnected
         socketRef.current.on(
          ACTIONS.DISCONNECTED,
          ({ socketId, username }) => {
              toast.success(`${username} left the room.`);
              setClients((prev) => {
                  return prev.filter(
                      (client) => client.socketId !== socketId
                  );
              });
          }
      );
  };
  init();
  // return () => {
  //     socketRef.current.disconnect();
  //     socketRef.current.off(ACTIONS.JOINED);
  //     socketRef.current.off(ACTIONS.DISCONNECTED);
  // };
  }, []);

  async function copyRoomId() {
    try {
      await navigator.clipboard.writeText(roomId);
      toast.success("Room ID has been copied to your clipboard");
      setIsCopied(true);
    } catch (err) {
      toast.error("Could not copy the Room ID");
      console.error(err);
    }
  }

  if (!location.state) {
    return <Navigate to="/" />;
  }

  const screenWidth = window.innerWidth;
 
  console.log(screenWidth)
  return (
    <div className="bg-[url('/src/utils/bg.jpg')]">
  <button onClick={toggleSidebar} className="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-200 rounded-lg sm:hidden focus:outline-none focus:ring-2">
    <span className="sr-only">Open sidebar</span>
   { !isSidebarOpen ? <AiFillCaretDown/> : <AiFillCaretUp/>}
  </button>
  <aside className="border border-red-800 fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0">
      <div className="h-full px-3 py-4 bg-gray-800 flex justify-between flex-col">
        <div>
          <div className="flex justify-center border-b-2 border-gray-600">
            <img src={Logo} alt="Logo" className="w-36 my-2" />
          </div>
          <ul className="space-y-2 font-medium mt-6 mb-2">
            {clients.map((item) => {
              return <Client key={item.socketId} username={item.username} />;
            })}
          </ul>
        </div>

        <div className="flex text-white flex-col">
          <button
            onClick={copyRoomId}
            className="flex justify-between items-center text-black cursor-pointer bg-[#ffffff] border-0 py-2 px-6 focus:outline-none rounded text-lg mb-2 active:scale-95 duration-150"
          >
            Copy Room ID
            {!isCopied ? <ImCopy /> : <BsCheckAll />}
          </button>
          <button
            onClick={() => reactNavigator("/")}
            className="flex justify-center gap-3 items-center text-white cursor-pointer bg-[#ff3c3c] border-0 py-2 px-6 focus:outline-none rounded text-lg mb-2 active:scale-95 duration-150"
          >
            Exit
            <MdOutlineExitToApp />
          </button>
        </div>
      </div>
    </aside>
 
 {   !isSidebarOpen ? null :
    <div className="text-white border">
      <div className="h-full px-3 py-4 bg-gray-800 flex justify-between flex-col">
        <div>
          <div className="flex justify-center border-b-2 border-gray-600">
            <img src={Logo} alt="Logo" className="w-36 my-2" />
          </div>
          <ul className="space-y-2 font-medium mt-6">
            {clients.map((item) => {
              return <Client key={item.socketId} username={item.username} />;
            })}
          </ul>
        </div>

        <div className="flex text-white flex-col">
          <button
            onClick={copyRoomId}
            className="flex justify-between items-center text-black cursor-pointer bg-[#ffffff] border-0 py-2 px-6 focus:outline-none rounded text-lg mb-2 active:scale-95 duration-150"
          >
            Copy Room ID
            {!isCopied ? <ImCopy /> : <BsCheckAll />}
          </button>
          <button
            onClick={() => reactNavigator("/")}
            className="flex justify-center gap-3 items-center text-white cursor-pointer bg-[#ff3c3c] border-0 py-2 px-6 focus:outline-none rounded text-lg mb-2 active:scale-95 duration-150"
          >
            Exit
            <MdOutlineExitToApp />
          </button>
        </div>
      </div>
    </div>
    
    }
  

  <div className={`p-4 md:ml-64 h-screen`}>
    <div>
      <MainEditor
        socketRef={socketRef}
        roomId={roomId}
        onCodeChange={(code) => {
          codeRef.current = code;
        }}
      />
    </div>
  </div>
</div>

  );
};

export default Editor;
