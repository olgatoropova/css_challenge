const priceRange = document.getElementById('priceRange');
const amountText = document.querySelector('.amount');

const updateAmount = (priceInCents) => {
    console.log(priceInCents);
    //const dollars = Math.floor(priceInCents / 100);
    //const cents = priceInCents % 100;
    //const price = '${dollars}.${cents}';
    const value = Number(priceInCents / 100).toFixed(2);
    amountText.innerText = value;
}

priceRange.addEventListener('input', (e) => updateAmount(e.target.value));