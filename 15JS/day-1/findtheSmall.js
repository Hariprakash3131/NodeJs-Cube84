const small=[134,56,32,565,242,742,5675]

let findSmall=small[0]


for(let i=1;i<small.length;i++){
    if(small[i]<findSmall){
        findSmall=small[i]
    }
}

console.log(findSmall)