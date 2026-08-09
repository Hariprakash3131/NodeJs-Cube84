let odd=[52,88,5,252,6,3595,3,6,7,9]

let count=0

for(let i=0;i<odd.length;i++){
    if(odd[i]%2!==0){
        count++
    }
}

console.log(count)