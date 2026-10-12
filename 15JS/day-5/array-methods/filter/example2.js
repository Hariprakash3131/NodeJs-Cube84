const emp =[{
    Name:"Desik", Salary:70000
},
  {Name:'Thiyagu',Salary:50000},
  {Name:'Ravi',Salary:30000},
  {Name:'Prabu',Salary:20000}
]


const highSalary=emp.filter(e => e.Salary >=50000)

console.log(highSalary)


const name=emp.filter(e => e.Name =="Prabu")

console.log(name)