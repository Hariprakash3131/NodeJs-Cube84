import { useState, useRef, useEffect } from "react";

function CountRenderEx() {

  const [count, setCount] = useState(0);

  const renders = useRef(0);

  useEffect(() => {
    renders.current++;
  });

  return (
    <>
      <h1>{count}</h1>

      <h2>Render : {renders.current}</h2>

      <button onClick={() => setCount(count + 1)}>
        +
      </button>
    </>
  );
}

export default CountRenderEx