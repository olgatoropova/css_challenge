const incomeInput = document.getElementById("income");

const expenseNameInput = document.getElementById("expense-name");
const expenseAmountInput = document.getElementById("expense-amount");
const addExpenseButton = document.getElementById("add-expense-button");

const expenseTableElement = document.querySelector(".expense-table");

const summaryAmountElements = document.querySelectorAll(".summary-amount");
const summaryIncomeElement = summaryAmountElements[0];
const summaryExpensesElement = summaryAmountElements[1];
const summaryBalanceElement = summaryAmountElements[2];

let income = 0;
let expenses = 0;
let balance = 0;

let count = 0;

const formatMoney = (value) => {
    return `\$${value.toFixed(2)}`;
}

const deleteExpense = (deleteButton, amount) => {
    const id = deleteButton.parentElement.getAttribute("data-expense");

    const elementsToDelete  = document.querySelectorAll(`[data-expense="${id}"]`);
    elementsToDelete.forEach((el) => {
        el.remove();
    });

    expenses -= amount;
    summaryExpensesElement.innerText = formatMoney(expenses);

    updateBalance();
}

const updateBalance = () => {
    balance = income - expenses;
    summaryBalanceElement.innerText = formatMoney(balance);
    
    if (balance > 0) {
        summaryBalanceElement.classList.remove('negative');
        summaryBalanceElement.classList.add('positive');
    } else if (balance < 0) {
        summaryBalanceElement.classList.remove('positive');
        summaryBalanceElement.classList.add('negative');
    } else {
        summaryBalanceElement.classList.remove('positive');
        summaryBalanceElement.classList.remove('negative');
    }

}

incomeInput.addEventListener('blur', (e) => {
    const value = incomeInput.value;
    if (isNaN(value)) {
        window.alert(`Budget ${value} must be a valid number`);
        return;
    }
    income = Number(value);
    summaryIncomeElement.innerText = formatMoney(income);

    updateBalance();
});

addExpenseButton.addEventListener('click', (e) => {
    const amount = expenseAmountInput.value;
    if (isNaN(amount)) {
        window.alert(`Expense amount ${amount} must be a valid number`);
        return;
    }
    
    const numericAmount = Number(amount);
    expenseTableElement.innerHTML += `
                <div data-expense="item-${count}">${expenseNameInput.value}</div>
                <div data-expense="item-${count}">${formatMoney(numericAmount)}</div>
                <div data-expense="item-${count}" class="delete">
                    <button name="delete-expense" class="delete-expense" onclick="deleteExpense(this, ${numericAmount});">
                        <img src="images/trash.svg" alt="Delete Expense" />
                    </button>
                </div>`;
    count++;

    expenseNameInput.value = '';
    expenseAmountInput.value = '';

    expenses += numericAmount;
    summaryExpensesElement.innerText = formatMoney(expenses);

    updateBalance();
});

