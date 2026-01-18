console.log("sinh 1");

setTimeout(()=>{
    console.log("SetTime out");
}, 0)

console.log("sinh 2");

const promise = new Promise((resolve, reject) => {
    const isSucces = !true;
    //асинхронные функции (операции)
    if(isSucces){
        resolve("Evrything is good!")
    } else {
        reject("Error!")
    }
});

promise
    .then(result => console.log(result))
    .catch(reject => console.error(reject));

console.log("start");

setTimeout(()=>console.log("SetTimeout"), 0); // macrotask

Promise.resolve().then(() => console.log("Promise")); // microtask

console.log("end");

const promise = new Promise((resolve, reject) => {
    const isSucces = true;
        //асинхронные функции (операции)
    if(isSucces){
        resolve("Evrything is good!")
    } else {
        reject("Error!")
    }
});

promise
    .then(result => console.log(result))
    .catch(reject => console.error(reject))
    .finally(console.log("The end"));

Итого:
    then — для результата,
    catch — для ошибки,
    finally — для завершения.


const user ={
    id: 1,
    name: "Alex",
    age: 35
};

function getUser(){

    const isSucces = true;
    return new Promise((res, rej) => {
        setTimeout(() => {
            isSucces ? res(user) : rej("Ошибка при загрузке");
        }, 2000)
    })
}

getUser()
    .then(data => console.log(data))
    .catch(error => console.log(error))
    .finally(console.log("Запрос завершился"));



const user ={
    id: 1,
    name: "Alex",
    age: 35
};

function showSpiner(){
    console.log('spiner is running');
}

function hidenSpiner(){
     console.log('spiner stopped');
}

function getUser(){
    showSpiner()

    const isSucces = true;
    return new Promise((res, rej) => {
        setTimeout(() => {
            isSucces ? res(user) : rej("Ошибка при загрузке");
        }, 2000)
    })
}

getUser()
    .then(data => console.log(data))
    .catch(error => console.log(error))
    .finally(() => hidenSpiner());

Задача 3:
    - Запросить данные пользователя с сервера,
    - показать спиннер во время загрузки,
    - обработать результат и ошибку.




const URL = "https://jsonplaceholder.typicode.com/users";
const btn = document.querySelector("#btn");

function showSpiner(){
    console.log('spiner is running');
}

function hidenSpiner(){
     console.log('spiner stopped');
}

function getUser(){
    showSpiner()
        return fetch(URL)
        .then(res => {
            console.log(res);
            if(res.ok){
                return res.json();
            } else {

            } throw new Error("Ошибка сервера")
        })
        .then(users => console.log(users))
        .catch(er => console.log(er))
        .finally(hidenSpiner);
}

function handleClick(){
getUser()
    .then(users => console.log(users))
    .catch(er => console.log(er))
    .finally(hidenSpiner);
}


btn.addEventListener("click", getUser);





Задача 4: Simpsons API
 - загружать персонажей
 - показывать спиннер
 - рендерить карточки
 - обрабатывать ошибки
При решении этой задачи, мы будем использовать современную структуру async / await — это удобный способ работать с асинхронным кодом в JavaScript так, как будто он синхронный.
без использование .then() и .catch()
вот такая структура: 

async function loadUsers() {
  try {
    показать спиннер
    fetch / axios
    проверить response.ok
    const data = await response.json()
    рендер
  } catch (error) {
    // обработка ошибки
  } finally {