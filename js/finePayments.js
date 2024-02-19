"use strict";
/**
Перед вами список полів. Це можна сказати пряме посилання на кожне із полів форми.
Якщо ви додасте до змінної .value (fineNumber.value) то отримаєте значення
яке зберігається в цьому полі.
 */
let fineNumber = document.getElementById("fineNumber");
let passport = document.getElementById("passport");
let creditCardNumber = document.getElementById("creditCardNumber");
let cvv = document.getElementById("cvv");
let amount = document.getElementById("amount");
let buttonSubmit = document.getElementById("payFine");

//Ця зміна містить всі дані які в нас зберігаються у файлі data
let DB = data.finesData;

let patternFNumber = /^[0-9]{3}$/;
let patternPassport = /^[А-ЯҐЄІЇ]{2}[0-9]{6}$/;
let patternCard = /^(\d[ -]*?){16}$/;
let patternCVV = /^\d{3,4}$/; // 4 for American Express
let patternSum = /^\d+(\.\d{1,2})?$/; // potential for decimal sum too

buttonSubmit.addEventListener('click', payFine);

function displayValidationMessage(inputId, message) {
    const validationMessageElement = document.getElementById(`${inputId}ValidationMessage`);
    if (validationMessageElement) {
        validationMessageElement.textContent = message;
    } else {
        console.error(`Validation message element with ID ${inputId}ValidationMessage not found.`);
    }
}

function clearValidationMessages() {
    document.getElementById('fineNumberValidationMessage').textContent = '';
    document.getElementById('passportValidationMessage').textContent = '';
    document.getElementById('creditCardNumberValidationMessage').textContent = '';
    document.getElementById('cvvValidationMessage').textContent = '';
    document.getElementById('amountValidationMessage').textContent = ''
}

function payFine() {
    clearValidationMessages();
    let num = fineNumber.value.trim();
    if (num.length <= 3) {
        let paddedNumber = num.padStart(3, '0');
        fineNumber.value = paddedNumber; // Оновлення значення введеного номера
    }
const penalty = DB.find(function(item){
    return item.номер === fineNumber.value}); 

    if (!patternFNumber.test(fineNumber.value)) {
        //alert("Номер не відповідає формату");
        displayValidationMessage('fineNumber', "Номер штрафу може бути тільки числом 1-999.");
        return false;
    }

    if (!patternPassport.test(passport.value)) {
        //alert("Паспорт не відповідає формату");
        displayValidationMessage('passport', "Паспортні дані у форматі: перші дві літери українського алфавіту та 6 цифр.");
        return false;
    }

    if (!patternCard.test(creditCardNumber.value)) {
        //alert("Карта не відповідає формату");
        displayValidationMessage('creditCardNumber', "Номер кредитної картки 16 цифр.");
        return false;
    }

    if (!patternCVV.test(cvv.value)) {
        //alert("CVV не відповідає формату");
        displayValidationMessage('cvv', "Номер CVV-коду може бути 3-4 значним числом.");
        return false;
    }

     if (!patternSum.test(amount.value)) {
        //alert("Сума не відповідає формату");
        displayValidationMessage('amount', "Сума штрафу може бути тільки числом.");
        return false;
    }

    if (!penalty) {
        //alert("Такого штрафу не існує");
        displayValidationMessage('fineNumber', "Введіть номер існуючого штрафу.");
        return false;
    }
    console.log("1",typeof amount.value);
    console.log("2",typeof penalty.сума);
    console.log("3", amount.value);
    console.log("4", penalty.сума);

    if(amount.value != penalty.сума){ 
        //alert("Сума не співпадає штрафу");
        displayValidationMessage('amount', "Сума штрафу повинна збігатися із сумою вказаного штрафу.");
        return false;
    }

    clearValidationMessages();

    const newDB = DB.filter(function(item){
        return item.номер !== penalty.номер
    })

    setTimeout( () => alert("Ваш штраф оплачено!"), 0);

    window.data = {
        finesData: newDB
    }

    return true;
}

/**
Вам необхідно реалізувати наступний функціонал.
Зробити валідацію до всіх полів
1. Номер та сума повинні бути однакові як в існуючого штрафу - якщо ні видавати
alert "Номер не співпадає" або "Сума не співпадає"

2. Паспортні дані у форматі - перші дві літери укр алфавіту, та 6 цифр.
Якщо не співпадає то видавати alert "Не вірний паспортний номер"

3. Номер кредитної карки 16 цифр -
якщо не співпадає то видавати alert "Не вірна кредитна картка"

4. cvv 3 цифри - якщо не співпадає то видавати alert "Не вірний cvv".

Якщо валідація проходить успішно, то виконати оплату,
 тобто вам потрібно видалити обєкт з DB
 */

// buttonSubmit.addEventListener('click',payFine);
// function payFine(){


// }