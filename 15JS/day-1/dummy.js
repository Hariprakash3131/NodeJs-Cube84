// var a=10
// var b=50
// var b=100

// b=900
// console.log(a)
// console.log(b)


let a=30
// let a=1000  error
a=60

console.log(a)


const n=100000

// n=199999  //Error
console.log(n)



const student = {
    name: "Hari",
    age: 22,
    city: "Tirunelveli",
    course: "BCA"
};

console.log(student);




const arr = [1000, 45, 3, 78, 20];

let largest = arr[0];

for (let i = 1; i < arr.length; i++) {

    if (arr[i] > largest) {

        largest = arr[i];

    }

}

console.log(largest);