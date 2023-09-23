 const calculateButton = document.getElementById('calculate');
 
 const tipAmountText = document.getElementById('tip-amount');
 const totalPerPersonText = document.getElementById('total-per-person');
 
 const billAmountInput = document.getElementById('bill-amount');
 const numberOfPeopleInput = document.getElementById('number-of-people');


 calculateButton.addEventListener('click', () => {
    const billAmount = Number(billAmountInput.value);
    const numberOfPeople = Number(numberOfPeopleInput.value);

    const selectedRadioTip = document.querySelector('input[name="tip"]:checked');
    const tipPercentage = Number(selectedRadioTip.value);
    const totalTip = billAmount * tipPercentage / 100;

    const totalPerPerson = (billAmount + totalTip) / numberOfPeople;
    
    tipAmountText.innerText=totalTip.toFixed(2);
    totalPerPersonText.innerText = totalPerPerson.toFixed(2);

 });