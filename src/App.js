import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Editor from "./components/Editor";

function App() {
  return (
    <>
   <BrowserRouter>
   <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/editor/:roomId" element={<Editor/>}/>
   </Routes>
   </BrowserRouter>
    </>
  );
}

export default App;
