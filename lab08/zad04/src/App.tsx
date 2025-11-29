import { useState } from "react";
import AddForm from "./Form";

type Item = {
  id:number,
  name:string,
  isPriority:boolean,
  isCompleted:boolean
};

function App() {

  const [items, setItems] = useState<Item[]>([]);

  const [isFormVisible, setIsFormVisible] = useState<boolean>(false);

  const handleFormVisibility = () => setIsFormVisible(!isFormVisible);

  const handleInput = (name:string, isPriority: boolean) => {
    setItems(prev => {
      const nextId = prev.length ? Math.max(...prev.map(i=>i.id))+ 1 : 1;
      return [...prev, {id:nextId, name:name, isPriority:isPriority, isCompleted:false}]
    })
  }

  const changeCompleted = (id:number) => {
    setItems(prev => prev.map(
      item => item.id === id ? {...item, isCompleted: !item.isCompleted} : item
    ));
  };

  return (
    <div className="container">
      <div className="title">
        <h1>Lista zakupów studenta PAW</h1>
        <button onClick={handleFormVisibility}
          style={isFormVisible ? 
                  {backgroundColor: "red"
                  } :
                  {backgroundColor: "gray"}
          }
          >{isFormVisible ? "Cancel" : "Add"}</button>
      </div>
      
      {isFormVisible ? <AddForm input={handleInput}/> : null}
      <ul>
        {items.map(i => (
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
  )
  
}

export default App
