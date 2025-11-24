import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {

  const handleOnClick = (e) => {
    e.preventDefault()
    
    e.target.style.backgroundColor = e.target.style.backgroundColor === 'white' ? 'orange' : 'white'
  }
  
  return (
    <>
      <h2>Stylowanie dynamiczne</h2>
      <div className='container'>
        <div onClick={handleOnClick}></div>
        <div onClick={handleOnClick}></div>
        <div onClick={handleOnClick}></div>
      </div>
    </>
  )
}

export default App
