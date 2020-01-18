import React, {useState} from 'react';

//componente
//estado
//propriedade

function App() {
  const [counter, setCounter] = useState(0);

  function incrementCounter(){
    setCounter(counter + 1);
  }
 
  return (
    <>
<h1>Contador: {counter}</h1>
      <button onClick={incrementCounter}>SMS</button>
  
    </>
  );
}

export default App;
