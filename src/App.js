import Register from "./Components/Register"
import Regpixel from "./Components/Regpixel"
import Logpixel from "./Components/Logpixel"
import Home from "./Components/Home"
import Login from './Components/Login';
import ImageGrid from './Components/ImageGrid';
import Output from './Components/Output';
import Dashboard from "./Components/Dashboard";
import Button from '@mui/material/Button';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { useState } from "react"
const App = () => {

  const [gotarr, setGotarr] = useState(false)
  const [name, setName] = useState("")
  const [user, setUser] = useState("")
  const [selectedImg, setSelectedImg] = useState([]);
  const [decoy, setDecoy] = useState([])
  const [actual, setActual] = useState([])
  const [auth, setAuth] = useState(false)
  const [gotname, setGotname] = useState("")
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register fn={setGotarr} fnuser={setUser} />} />
          <Route path="/regpixel" element={gotarr ? <Regpixel user={user} /> : <Navigate to='/register' />} />
          <Route path="/logpixel" element={actual.length === 5 ? <Logpixel arr={actual} name={name} fn={setAuth} fname={setGotname} /> : <Navigate to='/login' />} />
          <Route path="/dashboard" element={auth ? <Dashboard name={gotname} /> : <Navigate to="/login" />} />
          <Route path="/login" element={<Login fn={setDecoy} fname={setName} />} />
          <Route path="/imageSelection" element={decoy.length === 30 ? <ImageGrid decoy={decoy} selectedImg={selectedImg} setSelectedImg={setSelectedImg} /> : <Navigate to="/login" />} />
          <Route path="/output" element={<Output selectedImg={selectedImg} setSelectedImg={setSelectedImg} fn={setActual} />} />
        </Routes>
      </Router>


    </>
  )
}

export default App