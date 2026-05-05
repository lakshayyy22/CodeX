import {BrowserRouter, Routes, Route} from "react-router-dom"
import Home from "./components/Home"
import EditorPage from "./components/EditorPage"
import "./App.css"

function App(){
  return (
    <BrowserRouter>
      <Routes>
        <Route path = "/" element = {<Home />}/>
        <Route path = "/editor/:roomId" element = {<EditorPage />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
