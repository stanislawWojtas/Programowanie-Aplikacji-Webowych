import { useEffect, useState } from "react";

import { initialProducts } from "./data";

type Item = {
  id:number,
  name:string,
  isPriority:boolean,
  isCompleted:boolean
};

function App() {
 
  const [lists, setLists] = useState<{ mine: Item[]; sister: Item[] }>({ mine: [], sister: [] })

  //losowanie tylko na starcie
  useEffect( () => {
    const myItems: Item[] = [];
    const sisterItems: Item[] = [];

    initialProducts.forEach((item) => {
      if(Math.random() > 0.5){
        myItems.push(item);
      }else{
        sisterItems.push(item);
      }
    })

    setLists({ mine:myItems, sister:sisterItems})
  }, [])

  
  const changeCompleted = (id: number) => {
    setLists(prev => ({
      mine: prev.mine.map(i => i.id === id ? { ...i, isCompleted: !i.isCompleted } : i),
      sister: prev.sister.map(i => i.id === id ? { ...i, isCompleted: !i.isCompleted } : i),
    }));
  }


  return(
    <div className="container">
      <h1>Świąteczne Listy</h1>
      <div className="lists">
        <ul>Ja
          {lists.mine.map(i => (
          <li key={i.id} 
              onClick={() => changeCompleted(i.id)} 
              style={{
                color: i.isPriority ? (i.isCompleted ? "#d9a293ff" : "red") : (i.isCompleted ? "grey" : "black"),
                textDecoration: i.isCompleted ? "line-through" : "none"
              }}
            >{i.name}</li>
           ))}
        </ul>
        <ul>Siostra
          {lists.sister.map(i => (
          <li key={i.id} 
              onClick={() => changeCompleted(i.id)} 
              style={{
                color: i.isPriority ? (i.isCompleted ? "#d9a293ff" : "red") : (i.isCompleted ? "grey" : "black"),
                textDecoration: i.isCompleted ? "line-through" : "none"
              }}
            >{i.name}</li>
           ))}
        </ul>
      </div>
    </div>
  )
}
export default App
