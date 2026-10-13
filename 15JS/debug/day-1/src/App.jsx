import { useState } from "react";

function Counter() {

  const [count, setCount] = useState(0);

  function increment() {
  
   const inCrement=count+1
   setCount(inCrement)

  }

  return (
    <div>
      <h1>Count : {count}</h1>

      <button onClick={increment}>
        Increment
      </button>
    </div>
  );
}

export default Counter;