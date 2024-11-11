let a = "";
let b = "";
let sign = "";
let result = false;

let inputNumder = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "."];
let operation = ["-", "+", "*", "/"];
let out = document.querySelector(".calc-input-screen p");

function clearAll (){
    a = "";
    b = "";
    sign = "";
    result = false;
    out.textContent = 0;
}

let clear = document.querySelector(".ac");
clear.addEventListener("click", clearAll);



