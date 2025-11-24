import { useEffect, useState } from 'react'

import './App.css'
import Friend from './FriendCard';


type Person = {
  id: number,
  name: string,
  phone: string,
  email: string;
};

function App() {

  const [people, setPeople] = useState<Person[]>([])

  useEffect( () => {
    const load = async () => {
      const response = await fetch("/people.json")
      if(!response.ok)throw new Error("fail" + response.status);
      const data = await response.json()
      setPeople(data)
    }
    load()
  }, [])

  return(
    <div>
      <h1>Friends</h1>
      <ul>
        {people.map(p => (
          <li>
            <Friend name={p.name} id={p.id} email={p.email} phone={p.phone}/>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
