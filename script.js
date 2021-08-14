let tipAmountTarget = document.getElementById("tip-amount-display");
let totalTarget = document.getElementById("total-display");
let error = document.getElementsByClassName('error-message');

/* Management of radio and custom button */
let inputRadioList = document.querySelectorAll("input[type='radio']");
let inputCustom = document.getElementById("custom");
inputCustom.addEventListener('click', () => {
    for(let i = 0; i < inputRadioList.length; i++){
        if(inputRadioList[i].checked == true){
            inputRadioList[i].checked = false;
        }
    }
})
for(let i = 0; i < inputRadioList.length; i++){
    inputRadioList[i].addEventListener('click', () => {
        inputCustom.value = "";
    })
}

/* Management of reset button */
let inputList = document.querySelectorAll("input");
for(let i = 0; i < inputList.length; i++){
    inputList[i].addEventListener('change', (e) => {
        calculate();
    })
}

/* Calculate the tip amount and total per person */
function calculate(){
    let bill = document.getElementById("bill");
    let number = document.getElementById("number");
    let custom = document.getElementById("custom");
    let tip = 0;
    for(let i = 0; i < inputRadioList.length; i++){
        if(inputRadioList[i].checked == true){
           tip = inputRadioList[i];
        }
    }

    /* Field management */
    let billValue;
    let numberValue;
    let tipValue;
    if(bill.value == ""){
        error[0].style.display = "block";
    } else if(bill.value.length > 0){
        error[0].style.display = "none"; 
        billValue = parseFloat(bill.value);
    }
    if(number.value == ""){
        error[1].style.display = "block"; 
    } else if(number.value.length > 0){
        error[1].style.display = "none";
        numberValue = parseInt(number.value);
    }
    if(custom.value.length > 0){
        tipValue = parseInt(custom.value);
    }
    for(let i = 0; i < inputRadioList.length; i++){
        if(inputRadioList[i].checked == true){
            tipValue = parseInt(inputRadioList[i].value);
        }
    }
    /* Calculation and visual modification */
    if(billValue != undefined && numberValue != undefined){
        if(tipValue != undefined){
            var tipAmount = billValue * tipValue / 100;
            let tipAmountPerPerson = tipAmount / numberValue;
            tipAmountTarget.innerText = `$${tipAmountPerPerson}`
        } else if(tipValue == undefined){
            tipAmount = 0;
        }
        let totalPerPerson = (billValue + tipAmount) / numberValue;
        totalTarget.innerText = `$${totalPerPerson}`;
    }
    /* Reset button background */ 
    if(tipValue != undefined || billValue != undefined || numberValue != undefined || error[0].style.display == "block" || error[1].style.display == "block"){
        resetButton.style.backgroundColor = "rgb(38, 192, 171)";
    } else {
        resetButton.style.backgroundColor = "#00666C";
    }
}

/* Reset management */
let resetButton = document.querySelector("button");
resetButton.addEventListener('click', () => {
    bill.value = "";
    number.value = "";
    custom.value = "";
    for(let i = 0; i < inputRadioList.length; i++){
        if(inputRadioList[i].checked == true){
            inputRadioList[i].checked = false;
        }
    }
    tipAmountTarget.innerText = `$0.00`;
    totalTarget.innerText = `$0.00`;
    resetButton.style.backgroundColor = "#00666C";
    error[0].style.display = "none";
    error[1].style.display = "none";
});