import Home from "./Home";
import { UserContext } from "./UserContext";

function App() {

  const user = "J  ames";

  return (

    <UserContext.Provider value={user}>

      <Home />

    </UserContext.Provider>

  );

}

export default App;