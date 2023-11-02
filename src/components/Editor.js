import React, { useEffect, useRef, useState } from "react";
import Logo from "../utils/logo.png";
import Client from "./Client";
import { ImCopy } from "react-icons/im";
import { MdOutlineExitToApp } from "react-icons/md";
import { BsCheckAll } from "react-icons/bs";
import MainEditor from "./MainEditor";
import { initSocket } from "../socket";
import ACTIONS from "../Action";
import {
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import toast from "react-hot-toast";

const Editor = () => {
  const [isCopied, setIsCopied] = useState(false);
  const location = useLocation();
  const { roomId } = useParams();
  const reactNavigator = useNavigate();
  // console.log("ID", roomId)
  const [clients, setClients] = useState([]);
  const socketRef = useRef(null);
  const codeRef = useRef(null);

  useEffect(() => {
    const init = async () => {
      socketRef.current = await initSocket();
      socketRef.current.on("connect_error", (err) => handleErrors(err));
      socketRef.current.on("connect_failed", (err) => handleErrors(err));

      function handleErrors(e) {
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
  return () => {
      socketRef.current.disconnect();
      socketRef.current.off(ACTIONS.JOINED);
      socketRef.current.off(ACTIONS.DISCONNECTED);
  };
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
  return (
    <div className="bg-[url('/src/utils/bg.jpg')] ">
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
        <div className="h-full px-3 py-4 bg-gray-800 flex justify-between flex-col ">
          <div>
            <div className="flex justify-center   border-b-2 border-gray-600">
              <img src={Logo} alt="Logo" className="w-36 my-2" />
            </div>
            <ul className="space-y-2 font-medium  mt-6">
              {clients.map((item) => {
                return <Client key={item.socketId} username={item.username} />;
              })}
            </ul>
          </div>

          <div className="flex text-white flex-col ">
            <button
              onClick={copyRoomId}
              className="flex justify-between items-center text-black cursor-pointer bg-[#ffffff] border-0 py-2 px-6 focus:outline-none rounded text-lg mb-2 active:scale-95 duration-150 "
            >
              Copy Room ID
              {!isCopied ? <ImCopy /> : <BsCheckAll />}
            </button>
            <button
              onClick={() => reactNavigator("/")}
              className=" flex justify-center gap-3 items-center text-white cursor-pointer bg-[#ff3c3c] border-0 py-2 px-6 focus:outline-none rounded text-lg mb-2 active:scale-95 duration-150 "
            >
              Exit
              <MdOutlineExitToApp />
            </button>
          </div>
        </div>
      </aside>

      <div className="p-4 ml-64 h-screen ">
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
