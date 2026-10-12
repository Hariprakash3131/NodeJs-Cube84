const users=[
    {name:"James",active:true},
    {name:"Prabu",active:true},
    {name:'Swamy' ,active:false}
]

const active=users.filter(act => act.active)
const nonActive=users.filter(non =>!non.active)



console.log(active)

console.log(nonActive)