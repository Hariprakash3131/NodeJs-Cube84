const arr=[12,3,45,617,78]

let large=arr[0]

for(let i=1;i<arr.length;i++){
    if(arr[i]>large)
        large=arr[i]
}

console.log(large)
