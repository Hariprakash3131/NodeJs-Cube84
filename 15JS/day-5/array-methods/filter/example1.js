// Filter : Returns Elements matching a condition 


// Purpose
// filter() is used to select elements that match a condition and returns a new array.
// - ✅ Returns a new array
// - ✅ Does not change the original array
// - ✅ Used when you want only matching data



// Interview Definition (Simple English)
// filter() is an array method that returns a new array containing only the elements that satisfy a given condition. It does not modify the original array.
const fil=[29,70,60,40]

const even=fil.filter(ev=>ev %2==0)

console.log(even)