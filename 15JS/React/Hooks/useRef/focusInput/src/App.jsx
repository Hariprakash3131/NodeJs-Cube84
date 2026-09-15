import { useRef } from "react";

function App() {

  const inputRef = useRef(null);

  function focusInput() {
    inputRef.current.focus();
  }

  return (
    <>
      <input ref={inputRef} />

      <button onClick={focusInput}>
        Focus Input
      </button>
    </>
  );
}

export default App;