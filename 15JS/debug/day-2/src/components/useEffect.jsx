import {useState,useEffect} from 'react'
function DayTwo() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log("Effect");
  });

  return (
    <button onClick={() => setCount(count + 1)}>
      {count}
    </button>
  );
}

export default DayTwo