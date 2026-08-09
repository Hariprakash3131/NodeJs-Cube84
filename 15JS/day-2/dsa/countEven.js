let array=[2,4,63,2,43,456,445562,7,5,4,68]

let count=0

for(let i=0;i<array.length;i++){
    if(array[i]%2==0){
        count++
    }
}

console.log(count)