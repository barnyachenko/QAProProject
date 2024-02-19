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

function payFine() {
const penalty = DB.find(function(item){
    return item.номер === fineNumber.value}); 

    if (!patternFNumber.test(fineNumber.value)) {
        alert("Номер не відповідає формату");
        return false;
    }

     if (!patternSum.test(amount.value)) {
        alert("Сума не відповідає формату");
        return false;
    }

     if (!patternPassport.test(passport.value)) {
        alert("Паспорт не відповідає формату");
        return false;
    }

     if (!patternCard.test(creditCardNumber.value)) {
        alert("Карта не відповідає формату");
        return false;
    }

     if (!patternCVV.test(cvv.value)) {
        alert("CVV не відповідає формату");
        return false;
    }

    if (!penalty) {
        alert("Такого штрафу не існує");
        return false;
    }
    console.log("1",typeof amount.value);
    console.log("2",typeof penalty.сума);
    console.log("3", amount.value);
    console.log("4", penalty.сума);

    if(amount.value != penalty.сума){ 
        alert("Сума не співпадає штрафу");
        return false;
    }
    const newDB = DB.filter(function(item){
        return item.номер !== penalty.номер
    })
    alert("Ваш штраф оплачено!");
    
    window.data = {
        finesData: newDB
    }
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