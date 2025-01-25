const userSurname = document.querySelector('input[name="surname"]'); // Получите элемент input с фамилией
const userName = document.querySelector('input[name="name"]'); // Получите элемент input с именем

const goodsElements = document.querySelectorAll('input[type="checkbox"]'); // Получите элементы checkbox с товарами
const countElements = document.querySelectorAll('input[type="number"]'); // Получите элементы input с количеством

const btn = document.querySelector(".btn"); // Получите элемент button
const resultElem = document.querySelector(".sum"); // Получите элемент span для итоговой суммы

function calculateTotal() { 
    let totalSum = 0;
    goodsElements.forEach((checkbox, index) => {
        if (checkbox.checked) {
            const productName = checkbox.getAttribute('data-goods');
            const countInput = countElements[index];
            const count = parseInt(countInput.value) || 0;
            const prices = {
                "expresso": 80,
                "americano": 110,
                "latte": 120,
                "capuchino": 90,
                "chocolate_muffin": 80,
                "blueberry_muffin": 90,
                "apple_tart": 100
            };
            totalSum += prices[productName] * count; // Считаем сумму
        }
    });
    return totalSum;
}

// Обновляем итоговую сумму в span
function updateTotal() {
    const totalSum = calculateTotal();
    resultElem.textContent = `${totalSum} р.`; // Обновляем текст в span
}

// Обработчик событий для чекбоксов
goodsElements.forEach((product, index) => {
    product.addEventListener('change', () => {
        const countInput = countElements[index];
        if (product.checked) {
            countInput.value = 1; // Устанавливаем значение 1 при выборе чекбокса
        } else {
            countInput.value = 0; // Убираем значение при снятии выбора
        }
        updateTotal(); // Обновляем итоговую сумму
    });
});

// Обработчик событий для полей ввода количества
countElements.forEach((elem) => {
    elem.addEventListener('input', updateTotal); // Обновляем итоговую сумму при изменении количества
});

// Обработчик событий для кнопки
btn.addEventListener('click', () => {
    const totalSum = calculateTotal(); 
    alert(`Заказчик: ${userName.value} ${userSurname.value} \nИтого: ${totalSum} р.`); // Выводим результат в alert
});