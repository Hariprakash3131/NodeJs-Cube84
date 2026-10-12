
// Show employees whose salary is more than ₹30,000.
const employees = [
  { name: "Hari", salary: 25000 },
  { name: "John", salary: 50000 },
  { name: "Ravi", salary: 30000 },
  { name: "Kumar", salary: 60000 }
];


const findSalary=employees.filter(emp => emp.salary <=30000 )


console.log(findSalary)