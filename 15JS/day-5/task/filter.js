const marks = [80,90,75,95];

const total = marks.reduce((sum, mark) => sum + mark, 0);

const average = total / marks.length;

console.log("Total:", total);

console.log("Average:", average);



const fill=marks.filter(mar=>mar >= 0)

console.log(fill)