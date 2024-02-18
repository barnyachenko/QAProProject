"use strict";
window.fineList = {
    searchFines : searchFines
}

//Ця зміна містить всі дані які в нас зберігаються у файлі data
let DB = data.finesData;

    /*
     Напишіть свій код тут!
     Як ви бачите функція повертає статичні дані.
     Замість масиву який прописаний хардкодом, вам необхідно реалізувати цю функцію
     так, щоб вона повертала масив відповідно переданому значенню в функцію.
     Саме значення - це "Пошук за номером" або "Пошук за типом штрафу"
     Тип штрафу може бути тільки
     - Перевищення швидкості
     - Невірне паркування
     - Їзда у не тверезому стані
     */
       
    function displayValidationMessage(inputId, message) {
        const validationMessageElement = document.getElementById(`${inputId}ValidationMessage`);
        if (validationMessageElement) {
            validationMessageElement.textContent = message;
        } else {
            console.error(`Validation message element with ID ${inputId}ValidationMessage not found.`);
        }
    }

    function searchFines(number, fineType) {
        clearValidationMessages();
        let results = [];
    
        if (number) {
            // Перевірка для номера штрафу
            if (!isNaN(number)) { // Перевірка чи введено число
                let num = number.trim(); // Видаляємо зайві пробіли
                if (num.length <= 3) { // Перевірка довжини номера штрафу
                    let paddedNumber = num.padStart(3, '0'); // Доповнюємо номер до трьох знаків
                    results = DB.filter(fine => fine.номер === paddedNumber);
                    return results;
                } else {
                    displayValidationMessage('number', "Номер штрафу повинен мати не більше трьохзначного числа.");
                    return [];
                }
            } else {
                displayValidationMessage('number', "Введено невірний формат для номера штрафу.");
                return [];
            }
        }
    
        if (fineType) {
            // Перевірка для типу штрафу
            let type = fineType.trim(); // Видаляємо зайві пробіли
            if (['Перевищення швидкості', 'Невірне паркування', 'Їзда у не тверезому стані'].includes(type)) { // Перевірка чи введено існуючий тип
                results = DB.filter(fine => fine.тип === type);
                return results;
            } else {
                displayValidationMessage('type', "Введено невірний тип штрафу.");
                return [];
            }
        }
    
        // Повертаємо всі записи, якщо обидва поля пошуку порожні
        if (!number && !fineType) {
            clearValidationMessages();
            return DB;
        }
    }

function clearValidationMessages() {
    document.getElementById('numberValidationMessage').textContent = '';
    document.getElementById('typeValidationMessage').textContent = '';
}