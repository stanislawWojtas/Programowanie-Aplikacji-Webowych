import { useState } from 'react'
import './App.css'
import AddForm from './AddForm'
import sorcererImg from './assets/mag.png';
import warriorImg from './assets/warrior.png';
import druidImg from './assets/druid.png';
import rogueImg from './assets/lotr.png';

export type Avatar = {
  id:string, img:string
}
const avatars:Avatar[] = [
  { id: "sorcerer", img: sorcererImg },
  { id: "warrior", img: warriorImg },
  { id: "druid", img: druidImg },
  { id: "rogue", img: rogueImg },
];

export type Character = {
  name:string,
  age:number,
  class: "sorcerer" | "warrior" | "druid" | "rogue" | "",
  stats: {
    strength: number,
    intelligence: number,
    wisdom: number,
    charisma: number
  }
}

function App() {
  
  const [isFormActive, setIsFormActive] = useState<boolean>(true);

  const [characters, setCharacters] = useState<Character[]>([]);

  const handleNewCharacter = (c:Character) => {
    setCharacters((prev) => [...prev, c]);
    setIsFormActive(false); //po dodaniu wyłączamy formularz
  }
  return(
    <div>
      {isFormActive ?  <AddForm avatars={avatars} onAdd={handleNewCharacter} cancel={() => setIsFormActive(false)}/> : <button onClick={() => setIsFormActive(true)}>Nowa Postać</button>}
      <div className='cards'>
        {characters.map(c => (
          <li key={`${c.name}-${c.age}`} className='card'>
            <h2>{c.name}</h2>
            <h3>{c.class}</h3>
            <div className='card-wrapper'>
              <img src={avatars.find(a => a.id === c.class)?.img ?? ''} alt={c.class} />
              <div>
                <p>Siła: {c.stats.strength}</p>
                <p>Inteligencja: {c.stats.intelligence}</p>
                <p>Mądrość: {c.stats.wisdom}</p>
                <p>Charyzma: {c.stats.charisma}</p>
              </div>
            </div>
          </li>
        ))}
      </div>
    </div>
  )
}

export default App
