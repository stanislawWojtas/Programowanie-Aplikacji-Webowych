import { useState } from 'react'
import './App.css'

function App() {

  const [countries, setCountries] = useState<string[]>([]);

  const [inputValue, setInputValue] = useState('');

  const handleBtnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    
    if(inputValue.trim() === '') return;

    setCountries([...countries, inputValue])
    setInputValue('');
  }

  const deleteCountryHandler = (index: number) => {
    const newCountries = countries.filter((_,i) => i !== index);
    setCountries(newCountries)
  }

  const calcBackgroundColor = (c:string, i:number) => {
    if((c.toLowerCase().includes('a') || c.toLowerCase().includes('r')) && i%2 === 0) return "lightblue"
    else if(i%2 === 0) return "yellow"
    else if(c.length > 6) return "orange"
    else return "gray"
  }

  return(
    <>
      <h1>Country List</h1>
      <div className='container'>
        <h3>moje ulubione kraje</h3>
        <form>
          <label>
            <input type="text" placeholder='Country...' value={inputValue} onChange={(e) => setInputValue(e.target.value)}/>
          </label>
          <button type='submit' onClick={handleBtnClick}>Dodaj Kraj</button>
        </form>
        <ul>
          {countries.map((c, index) => (
            <li key={index} style={{backgroundColor: calcBackgroundColor(c, index)}}>
              <Country index={index} country={c} onDelete={() => deleteCountryHandler(index)}/>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

function Country(props: {index:number, country:string, onDelete: ()=>void}) {

  const deleteCountry = () => {
    alert("usunieto kraj")
  }
  return (
    <>
      <p>{props.index}. {props.country}</p>
      <button onClick={props.onDelete}>usuń go</button>
      <a href={`https://pl.wikipedia.org/wiki/${props.country}`} target="_blank" rel="noopener noreferrer">Wikipedia Link</a>
    </>
  )
}

export default App
