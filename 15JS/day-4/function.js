function greet(){
    console.log('Welcome ')
}

greet()

//Function With Parameters

function PersonName(name){
    console.log('Hello '+name)
}

PersonName('Hari')
PersonName('Prakash')



//Function With Multiple Parameters

function add(a,b){
    console.log(a+b)
    console.log(a-b)
}

add(10,90)
add(23,90)


//Return Statement

function mul(a,b){
    return a*b
}

let ans=mul(10,2)

console.log(ans)