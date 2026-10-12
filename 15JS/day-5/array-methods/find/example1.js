// Find : Returns the first matching element

const user=[
    {id:1,name:'Thiyagu'},
    {id:3,name:'Virat'},
    {id:2,name:"desik"},
    {id:3,name:'Prakash'}
]


const findId=user.find(us => us.id===3)

// const findId=user.find(us => us.id===2)
console.log(findId)