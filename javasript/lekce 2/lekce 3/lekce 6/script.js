// function welcome () {
//     return "Welcome to JavaScript!";
// }
// let fun = welcome();
// console.log(fun);
// // document.body.innerHTML = fun;
// function sum (a, b) {
//     return a + b
//     console.log (a + b);
// }
// let sum2 = sum(3, 4);
// console.log(sum2);
// console.log(sum( 5, 7));
// const sum = (a, b) => {a + b};
// let result = a + b;
// return result;
// const sum = (a, b) =>{
//     let result = a + b;
//     return result;
// }
// function salary( object ) {
//     let total = 0;
//     for ()

const salary = {
    alex: 1200,
    boris: 1800,
    christina: 1500,
};

// console.log(Object.values(salary).reduce((a, b) => a + b));

function sumSalary(object) {
    let total = 0;
    let newArray = Object.values(object);
    for (let i of newArray) {
        total += i;
    }
    return total;
}

console.log(sumSalary(salary));
let result = salary(salaries);
console.log\(result);

