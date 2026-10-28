import { useMemo, useState } from "react";
import employees from "./employees";
import EmployeeList from "./EmployeeList";

function App() {
  const [search, setSearch] = useState("");
  const [theme, setTheme] = useState(false);

  const filteredEmployees = useMemo(() => {
    console.log("Filtering Employees.. .");

    return employees.filter((emp) =>
      emp.department.toLowerCase().includes(search.toLowerCase()) ||
       emp.name.toLowerCase().includes(search.toLowerCase()) ||
       emp.salary.toString().includes(search)
    );
  }, [search]);

  return (
    <div
      style={{
        background: theme ? "#333" : "#fff",
        color: theme ? "#fff" : "#000",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
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