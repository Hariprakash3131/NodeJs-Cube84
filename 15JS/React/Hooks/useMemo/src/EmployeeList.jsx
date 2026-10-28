function EmployeeList({ employees }) {
  console.log("Employee List Render");

  return (
    <div>
      {employees.map((emp) => (
        <div key={emp.id}>
          <h3>{emp.name}</h3>
          <p>{emp.department}</p>
          <p>₹ {emp.salary}</p>
          <hr />
        </div>
      ))}
    </div>
  );
}

export default EmployeeList;