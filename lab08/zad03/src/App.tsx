import { createContext, useState } from 'react'
import Title from './Title';
import TopicCard from './TopicCard';

export const MyContext = createContext(null);

function App() {

  const [topic, setTopic] = useState("The Basics");
  return(
    <MyContext.Provider value={{topic, setTopic}}>
      <Title />
      <div className='main-container'>
        <h2>Wybierz Temat</h2>
        <div className='topic-container'>
          <TopicCard name='The Basics' description='Core Angular basics you have to know' handleButtonClick={(n) => setTopic(n)}/>
          <TopicCard name='Components' description='Components are a core concept for building Angular UIs and apps' handleButtonClick={(n) => setTopic(n)}/>
          <TopicCard name='Events' description='Events are important in Angular' handleButtonClick={(n) => setTopic(n)}/>
        </div>
      </div>
    </MyContext.Provider>
  )

}

export default App
