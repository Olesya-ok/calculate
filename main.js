const calc = document.querySelector('.calc');
const calcInputScreen = document.querySelector('.calc-input-screen');

let result = false;
let prevValue = "";

const popupCheckbox = document.querySelector('.popup-window');
const historyPanel = document.querySelector('.history-panel');
const historyList = document.querySelector('.history-list');

let history = JSON.parse(localStorage.getItem('calcHistory')) || [];

// Функция добавления записи в историю и сохранение в localStorage
function addToHistory(calculation) {
    history.unshift(calculation);
    if (history.length > 10) {
        history.pop();
    }
    localStorage.setItem('calcHistory', JSON.stringify(history));
    renderHistory();
}

// Загружаем историю из localStorage при старте
document.addEventListener('DOMContentLoaded', renderHistory);

// Обработчик для калькулятора
calc.addEventListener('click', (event) => {
    if (!event.target.classList.contains('btn')) return;

    const value = event.target.innerText;
    let currentExpression = "";

    switch (value) {
        case 'AC':
            calcInputScreen.innerText = "0";
            currentExpression = "";
            break;
        case 'C':
            calcInputScreen.innerText = "";
            break;
        case '%':
            if (calcInputScreen.innerText !== "") {
                currentExpression = calcInputScreen.innerText + " / 100";
                calcInputScreen.innerText = eval(currentExpression);
            }
            break;
        case '=':
            if (calcInputScreen.innerText !== "") {
                currentExpression = calcInputScreen.innerText;
                try {
                    const result = eval(currentExpression);
                    calcInputScreen.innerText = result;

                    // Добавляем строку в историю
                    addToHistory(`${currentExpression} = ${result}`);
                } catch (e) {
                    console.error("Ошибка вычисления:", e);
                }
            }
            break;
        default:
            if (['+', '*', '/', '-'].includes(value)) {
                if (calcInputScreen.innerText === "" || calcInputScreen.innerText === "0") return;

                calcInputScreen.innerText += value;
            } else {
                if (calcInputScreen.innerText === "0" && value !== ".") {
                    calcInputScreen.innerText = value;
                } else {
                    calcInputScreen.innerText += value;
                }
            }
    }
});

// Слушатель для открытия/закрытия панели истории
popupCheckbox.addEventListener('change', () => {
    if (popupCheckbox.checked) {
        historyPanel.classList.add('active'); // Показываем окно
    } else {
        historyPanel.classList.remove('active'); // Прячем окно
    }
});

const toggle = document.getElementById('theme-toggle');

// Проверяем сохранённое состояние темы
document.addEventListener('DOMContentLoaded', () => {
    const darkMode = localStorage.getItem('dark-mode');
    if (darkMode === 'enabled') {
        document.body.classList.add('dark-mode');
        toggle.checked = true;
    }
});

// Слушатель события изменения состояния переключателя
toggle.addEventListener('change', () => {
    if (toggle.checked) {
        document.body.classList.add('dark-mode');
        localStorage.setItem('dark-mode', 'enabled');
    } else {
        document.body.classList.remove('dark-mode');
        localStorage.setItem('dark-mode', 'disabled');
    }
});

const clearHistoryButton = document.querySelector('.clear-history');

// Функция очистки истории
function clearHistory() {
    history = [];
    localStorage.removeItem('calcHistory');
    renderHistory();
}

// Обработчик нажатия на кнопку очистки
clearHistoryButton.addEventListener('click', clearHistory);

// Функция рендеринга истории
function renderHistory() {
    historyList.innerHTML = '';
    history.forEach((item) => {
        const li = document.createElement('li');
        li.textContent = item;
        historyList.appendChild(li);
    });
}






