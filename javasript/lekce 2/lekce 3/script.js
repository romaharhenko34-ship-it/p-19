// console.log(Boolean(a), typeof (Boolean(a)));
// console.log(!!a, typeof(!!a));
// let a = "25px"
console.log(Boolean(""), typeof (Boolean("")));
let age = prompt("Введите ваш возраст");
let username = prompt("Введите имя пользователя");  
if (username === "admin") {
    let password = prompt("Введите пароль");
    if (password === "qwerty") {
        alert("Добро пожаловать!");
    } else if (password === null) {
        alert("Вход отменён");
    } else {
        alert("Пароль неверен");
    }

} else if (username === null) {
    alert("Вход отменён");
} else {
if (age >= 18) {
    alert("Доступ разрешён");
}
} else {
    alert("Доступ запрещён");
}                                   
