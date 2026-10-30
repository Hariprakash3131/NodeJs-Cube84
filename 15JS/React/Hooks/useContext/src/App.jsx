import Home from "./Home";
import { UserContext } from "./UserContext";

function App() {

  const user = "James";

  return (

    <UserContext.Provider value={user}>

      <Home />

    </UserContext.Provider>

  );

}

export default App;