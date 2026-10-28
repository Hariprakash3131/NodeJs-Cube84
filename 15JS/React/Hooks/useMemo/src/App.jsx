import { useState } from "react";
import employees from "./employees";
import EmployeeList from "./EmployeeList";

function App() {
  const [search, setSearch] = useState("");
  const [theme, setTheme] = useState(false);

  console.log("Filtering Employees...");

  const filteredEmployees = employees.filter((emp) =>
    emp.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>

      <button onClick={() => setTheme(!theme)}>
        Toggle Theme
      </button>

      <br /><br />

      <input
        type="text"
        placeholder="Search Employee"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <EmployeeList employees={filteredEmployees} />

    </div>
  );
}

export default App;