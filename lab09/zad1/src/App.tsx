import { useReducer, useRef, useState, type FormEvent } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router'
import Home from './pages/HomePage'
import About from './pages/AboutPage'
import Phone from './pages/PhonePage'
import MainLayout from './pages/MainLayout'



function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/phone' element={<Phone />} />
        </Route>
        
      </Routes>
    </BrowserRouter>
  ) 
}

export default App
