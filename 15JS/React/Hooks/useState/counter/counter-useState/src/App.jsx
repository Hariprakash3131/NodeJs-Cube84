import { useState } from 'react'


function App() {
  const[count,setCount]=useState(0)

  return (
    <>
     <h1>
       Counter App


     </h1>

     <h2>
      {count}
     </h2>

     <button onClick={() => setCount(count+1)}>
        Increment
     </button>
    </>
    
  )
}

export default App
