import { useState } from 'react'
import './App.css'

function App() {

  return(
    <Actor name="Robert" lastname='Lewandowski'/>
  )
}

function Actor(props : {name: string, lastname: string, title?: string}) {
  const [title, setTitle] = useState('');

  const handleChange = (e) => {
    setTitle(e.target.value);
  }

  return (
    <>
      <input type="text" name='title' value={title ? title : ""} onChange={handleChange}/>
      <div className='card'>
        <h2> {props.name} {props.lastname}</h2>
        <h3>{title ? "Zagrał w filmie: " + title : ""}</h3>
      </div>
    </>
  )
}

export default App
