const balance = document.getElementById('balance'),
    moneyPlus = document.getElementById('money-plus'),
    moneyMinus = document.getElementById('money-minus'),
    list = document.getElementById('list'),
    form = document.getElementById('form'),
    description = document.getElementById('description'),
    amount = document.getElementById('amount')


/* const dummyTransactions = [
    { id: 1, description: 'Flowers', amount: -2500 },
    { id: 2, description: 'Crypto gains', amount: 300 }, 
    { id: 3, description: 'Kombucha', amount: -10 }, 
    { id: 4, description: 'Client payment', amount: 100 }
]; */

const localStorageTranscations = JSON.parse(localStorage.getItem('transactions'));

let transactions = localStorage.getItem('transactions') !== null ? localStorageTranscations: [];

// Add transaction
const addTransaction = (e) => {
    e.preventDefault();

    if (description.value.trim() === '' || amount.value.trim() === '') {
        alert('Please add a description and amount')
    } else {
        const transaction = {
            id: generateID(),
            description: description.value,
            amount: +amount.value
        }
        transactions.push(transaction);
        addTransactionDOM(transaction);
        updateValues();
        updateLocalStorage();


        description.value = '';
        amount.value = '';
    }
}

// Generate random ID
const generateID = () => {
    return Math.floor(Math.random() * 1000000000)
}

// Add transactions to DOM list
const addTransactionDOM = (transaction) => {
    // Get sign
    const sign = transaction.amount < 0 ? '-' : '+';

    const item = document.createElement('li');

    // Add class based on value
    item.classList.add(transaction.amount < 0 ? 'minus': 'plus')

    item.innerHTML = `
    ${transaction.description} <span>${sign}${Math.abs(transaction.amount)}</span> <button onClick={removeTransaction(${transaction.id})} class="delete-btn">x</button>
    `;

    list.appendChild(item)
}

// Update the balance, income & expenses
const updateValues = () => {
    const amounts = transactions.map(transaction => transaction.amount);

    const total = amounts.reduce((acc, item) => (acc += item), 0)
    .toFixed(2);

    const income = amounts
    .filter(item => item > 0)
    .reduce((acc, item) => (acc+= item), 0)
    .toFixed(2);

    const expenses = amounts
    .filter(item => item < 0)
    .reduce((acc, item) => (acc+= item), 0)
    .toFixed(2);

    balance.innerHTML = `$${total}`
    moneyMinus.innerHTML = `$${Math.abs(expenses)}`
    moneyPlus.innerHTML = `$${Math.abs(income)}`
}

// Delete transcation by ID
const removeTransaction = (id) => {
    transactions = transactions.filter(transaction => transaction.id !== id);

    updateLocalStorage();
    init();
}

// Update local storage transactions
const updateLocalStorage = () => {
    localStorage.setItem('transactions', JSON.stringify(transactions))
}


// Init app
const init = () => {
    list.innerHTML = '';

    transactions.forEach(addTransactionDOM);
    updateValues();
}

init();

form.addEventListener('submit', addTransaction);