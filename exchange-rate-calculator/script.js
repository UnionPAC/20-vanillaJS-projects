const currencyOne = document.getElementById('currency-one');
const currencyTwo = document.getElementById('currency-two');
const amountOne = document.getElementById('amount-one');
const amountTwo = document.getElementById('amount-two');

const swapButton = document.getElementById('swap');
const rateEl = document.getElementById('rate');

// Fetch exchange rates and update the DOM
calculate = () => {
    const currency_one = currencyOne.value;
    const currency_two = currencyTwo.value;

    fetch(`https://v6.exchangerate-api.com/v6/76e15abdab7025db6ddb32c4/latest/${currency_one}`)
        .then(res => res.json())
        .then(data => {

            /* console.log(data); */

            const rate = data.conversion_rates[currency_two];

            rateEl.innerText = `1 ${currency_one} = ${rate} ${currency_two}`;

            amountTwo.value = (amountOne.value * rate).toFixed(2);
        });
}

calculate();



// Event Listeners

currencyOne.addEventListener('change', calculate);
amountOne.addEventListener('input', calculate);

currencyTwo.addEventListener('change', calculate);
amountTwo.addEventListener('input', calculate);

swapButton.addEventListener('click', () => {
    const temp = currencyOne.value;
    currencyOne.value = currencyTwo.value;
    currencyTwo.value = temp;
    calculate();
})