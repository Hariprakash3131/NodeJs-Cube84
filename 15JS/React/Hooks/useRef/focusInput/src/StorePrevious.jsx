import { useState, useRef, useEffect } from "react";

function StorePrevious() {

  const [count, setCount] = useState(0);

  const previous = useRef();

  useEffect(() => {
    previous.current = count;
  }, [count]);

  return (
    <>
      <h1>Current : {count}</h1>

      <h2>Previous : {previous.current}</h2>

      <button
        onClick={() => setCount(count + 1)}
      >
        Increment
      </button>
    </>
  );
}

export default StorePrevious