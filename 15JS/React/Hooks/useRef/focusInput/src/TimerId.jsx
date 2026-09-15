import { useRef } from "react";

function Timer() {

  const timerRef = useRef();

  function startTimer() {

    timerRef.current = setInterval(() => {
      console.log("Running...");
    }, 1000);

  }

  function stopTimer() {

    clearInterval(timerRef.current);

  }

  return (
    <>
      <button onClick={startTimer}>
        Start
      </button>

      <button onClick={stopTimer}>
        Stop
      </button>
    </>
  );
}

export default Timer