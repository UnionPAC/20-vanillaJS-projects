const addUserBtn = document.getElementById('add-user');
const doubleMoneyBtn = document.getElementById('double');
const showMillionsBtn = document.getElementById('show-millionaires');
const sortRichestBtn = document.getElementById('sort');
const calcWealthBtn = document.getElementById('calculate-wealth');

const main = document.getElementById('main');

let data = [];

// Format number as money
// https://stackoverflow.com/questions/149055/how-to-format-numbers-as-currency-string
const formatMoney = (number) => {
   return '$' + (number).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');  // 12,345.67
}

// Update DOM
const updateDOM = (providedData = data) => {
    // Clear main div
    main.innerHTML = '<h2><strong>Person</strong> Wealth</h2>';

    providedData.forEach(item => {
        const element = document.createElement('div');

        element.classList.add('person');
        element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(item.money)}`
        main.appendChild(element);
    });
}

// Add new obj to data arr
const addData = (obj) => {
    data.push(obj);

    updateDOM();
}

// fetch random user and add money

const getRandomUser = async () => {
    const res = await fetch('https://randomuser.me/api/');
    const data = await res.json();

    const user = data.results[0];

    const newUser = {
        name: `${user.name.first} ${user.name.last}`,
        money: Math.floor(Math.random() * 1000000)
    }

    addData(newUser);
}

// Double everyones money
const doubleMoney = () => {
    data = data.map((user) => {
        return { ...user, money: user.money * 2 };
    });

    updateDOM();
}

// Sort users by richest
const sortByRichest = () => {
    data.sort((a, b) => b.money - a.money);

    updateDOM();
}

// Filter for millionaires
const showMillionaires = () => {
    data = data.filter(user => user.money >= 1000000);

    updateDOM();
}

// Calculate total wealth of all users
function calcWealth() {
    const wealth = data.reduce((acc, user) => (acc += user.money), 0);

    const wealthEl = document.createElement('div');
    wealthEl.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(wealth)}</strong></h3>`
    main.appendChild(wealthEl);
}

getRandomUser();
getRandomUser();
getRandomUser();

// Event Listeners

addUserBtn.addEventListener('click', getRandomUser);
doubleMoneyBtn.addEventListener('click', doubleMoney);
sortRichestBtn.addEventListener('click', sortByRichest);
showMillionsBtn.addEventListener('click', showMillionaires);
calcWealthBtn.addEventListener('click', calcWealth)