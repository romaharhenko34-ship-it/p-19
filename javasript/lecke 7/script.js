// function wellcome(name , func) {   
//     function2(name)
// }
// function callback (name){
//     console.log("Wellcome " + name)
// }
// wellcome("John" , callback)

// function function2(name){
//     callback(name)
// }
// function wellcome(name , func) {
// arrray. forEach(element => {

// // ));
// const arr1 = (apple, banana, cherry);
// arr1.forEach(ei , i )=> {
//     console.log ("${el}:${i}")
// });
// apple :0
// sintax 
// array .forEach((element, index) => {
//     console.log(`${element} : ${index}`);
// }
const users  =[
    {name : "John", age: 25},
    {name : "Jane", age: 30},
    {name : "Jim", age: 35}

]
// const uptadatedUsers = users.map((user) => {
//         ...user,
//     isAdult : user.age >= 18
// });
// console.log(uptadatedUsers);
// console.log(users);
// const html = users.map((user) => {
//   return  '<div> list of users </div>'
//     '<h2> ${user.name} </h2>'
//     '<p> age : ${user.age} </p>'
//     '</div>'
// }).join('');
//  document.body.innerHTML = html 
// setTImereout(() => {
//     document .body.interhtml = '<h1> Hello World </h1>'
// }, 2000);
// Date examples (fixed constructor names and variable usage)
const date = new Date();
console.log(date.getFullYear());
console.log(date.getMonth() + 1);
console.log(date.getDate());
console.log(date.getHours());
console.log(date.getMinutes());
console.log(date.getSeconds());
console.log(date.getMilliseconds());
console.log(date.getDay());

date.setFullYear(2025);
date.setMonth(11); // December (months are 0-based)
date.setDate(25);
date.setHours(10);
date.setMinutes(30);
date.setSeconds(0);
date.setMilliseconds(0);
console.log(date);

const date2 = new Date('2023-12-31T23:59:59');
console.log(date2);

const now = new Date();
const pastDate = new Date('2000-01-01T00:00:00');
const diff = now - pastDate;
const diffInDays = Math.floor(diff / (1000 * 60 * 60 * 24));
console.log(`Difference in days: ${diffInDays}`);
// });
//     console.log(`${el} : ${i}`);

