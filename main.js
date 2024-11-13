const calc = document.querySelector('.calc');
const calcInputScreen = document.querySelector('.calc-input-screen');

let result = false;
let prevValue = "";

calc.addEventListener('click', (event) => {
    if (!event.target.classList.contains('btn')) return;

    const value = event.target.innerText;

    switch (value) {
        case 'AC':
            calcInputScreen.innerText = "0"; // Сброс экрана на 0
            prevValue = "";
            result = false;
            break;
        case 'C':
            calcInputScreen.innerText = "";
            break;
        case '%':
            if (calcInputScreen.innerText !== "") {
                calcInputScreen.innerText = eval(calcInputScreen.innerText + "/100");
                result = true;
            }
            break;
        case '=':
            if (calcInputScreen.innerText !== "") {
                calcInputScreen.innerText = eval(calcInputScreen.innerText);
                prevValue = calcInputScreen.innerText;
                result = true;
            }
            break;
        default:
            if (result && ['+', '-', '*', '/'].includes(value)) {
                // При добавлении новой операции после результата
                calcInputScreen.innerText = prevValue + value;
                result = false;
            } else if (result) {
                // Если результат есть, начинаем с нового значения
                calcInputScreen.innerText = value !== "." ? value : "0.";
                result = false;
            } else {
                // Проверка на 0 в начале
                if (calcInputScreen.innerText === "0" && value !== ".") {
                    calcInputScreen.innerText = value;
                } else {
                    calcInputScreen.innerText += value;
                }
            }
    }
});






// let a = "";
// let b = "";
// let sign = "";
// let result = false;
//
// let inputNumder = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "."];
// let operation = ["-", "+", "*", "/"];
// let out = document.querySelector(".calc-input-screen p");
//
// function clearAll (){
//     a = "";
//     b = "";
//     sign = "";
//     result = false;
//     out.textContent = 0;
// }
//
// let clear = document.querySelector(".ac");
// clear.addEventListener("click", clearAll);
//
// let press = document.querySelector(".button");
// press.addEventListener("click", pressEvent)
//
// function pressEvent(event) {
//     const key = event.target.textContent;
//     if (inputNumder.includes(key)) {
//         if (result) {
//             a = key;
//             result = false;
//         } else if (!sign) {
//             a += key;
//         }else {
//             b += key;
//                }
//         out.textContent = b ? b : a;
//     }
//     if (operation.includes(key)) {
//         sign = key;
//         out.textContent = sign;
//     }
// }
//
// let equalBtn = document.querySelector(".calc-equal");
//
// equalBtn.addEventListener("click", function () {
//     if (a && b && sign) { // Проверяем, что есть оба числа и знак операции
//         let result;
//         switch (sign) {
//             case "+":
//                 result = parseFloat(a) + parseFloat(b);
//                 break;
//             case "-":
//                 result = parseFloat(a) - parseFloat(b);
//                 break;
//             case "*":
//                 result = parseFloat(a) * parseFloat(b);
//                 break;
//             case "/":
//                 result = parseFloat(b) !== 0 ? parseFloat(a) / parseFloat(b) : "Ошибка";
//                 break;
//         }
//
//         out.textContent = result; // Выводим результат на экран
//         a = result.toString(); // Сохраняем результат в переменную a для дальнейших вычислений
//         b = ""; // Очищаем b
//         sign = ""; // Сбрасываем знак
//     }
// });



