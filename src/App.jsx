import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Bussiness from './BussinessOwner/component/Page/Bussiness'
import { BrowserRouter } from 'react-router-dom'

function App() {

  return (
    <>
  <BrowserRouter>
    <Bussiness />
  </BrowserRouter>
    </>
  )
}

export default App
