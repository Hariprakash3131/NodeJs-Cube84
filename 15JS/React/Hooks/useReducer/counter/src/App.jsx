import { useReducer } from "react";

const initialState = {
  count: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };

    case "decrement":
      return { count: state.count - 1 };

    case "reset":
      return { count: 0 };

    default:
      return state;
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div
      style={{
        textAlign: "center",
        marginTop: "100px",
        fontFamily: "Arial",
      }}
    >
      <h1>useReducer Counter</h1>

      <h2>{state.count}</h2>

      <button onClick={() => dispatch({ type: "increment" })}>
        +
      </button>

      <button
        onClick={() => dispatch({ type: "decrement" })}
        style={{ margin: "0 10px" }}
      >
        -
      </button>

      <button onClick={() => dispatch({ type: "reset" })}>
        Reset
      </button>
    </div>
  );
}

export default App;``