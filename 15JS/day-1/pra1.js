const large=[3,56,668,563,564,64563,34453]

let findLarge=large[0]

for(let i=1;i<large.length;i++){
    if(large[i]>findLarge){
        findLarge=large[i]
    }
}

console.log(findLarge)