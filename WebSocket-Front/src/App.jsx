import { useEffect } from 'react'
import io from 'socket.io-client'
import Tablero from './components/Tablero'
import './App.css'

const socket = io('http://localhost:8080');

function App() {
  useEffect(() => {
    
  },[]);

  return (
    <>
      <Tablero socket={socket}/>
    </>
  )
}

export default App