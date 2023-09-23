const menu = document.querySelector('ul.menu');
const cartSummary = document.querySelector('ul.cart-summary');

const total = document.querySelector('.amount.price.total');
const tax = document.querySelector('.amount.price.tax');
const subtotal = document.querySelector('.amount.price.subtotal');
const totals = document.querySelector('.totals');
const emptyCartText = document.querySelector('.empty');

const menuItems = [
{
    name: 'French Fries with Ketchup',
    price: 223,
    image: 'plate__french-fries.png',
    alt: 'French Fries',
    count: 0
},
{
    name: 'Salmon and Vegetables',
    price: 512,
    image: 'plate__salmon-vegetables.png',
    alt: 'Salmon and Vegetables',
    count: 0
},
{
    name: 'Spaghetti with Meat Sauce',
    price: 782,
    image: 'plate__spaghetti-meat-sauce.png',
    alt: 'Spaghetti with Meat Sauce',
    count: 0
},
{
    name: 'Ravioli',
    price: 499,
    image: 'plate__ravioli.png',
    alt: 'Ravioli',
    count: 0
},
{
    name: 'Tortellini',
    price: 399,
    image: 'plate__tortellini.png',
    alt: 'Tortellini',
    count: 0
},
{
    name: 'Fish Sticks with Fries',
    price: 634,
    image: 'plate__fish-sticks-fries.png',
    alt: 'Fish Sticks with Fries',
    count: 0
},
{
    name: 'Chicken Salad',
    price: 698,
    image: 'plate__chicken-salad.png',
    alt: 'Chicken Salad',
    count: 0
}
];

const renderMenu = () => {
    
    const menuItemsHTMLString = menuItems.map( (item, index) => {
        const formattedPrice = formatPrice(item.price);
        const inCart = item.count > 0;

        return `
            <li>
                <div class="plate">
                    <img src="images/${item.image}" alt="${item.alt}" />
                </div>
                <div class="content">
                    <div class="menu-item">${item.name}</div>
                    <div class="price">${formattedPrice}</div>
                    ${!inCart ? 
                        `<button class="add" onClick="addToCart(${index})">
                            Add to Cart
                        </button>` :
                        `<button class="in-cart">
                            <img src="images/check.svg" alt="Check" />
                            In Cart
                        </button>`}
                </div>
            </li>
        `;
    }).join('');

    menu.innerHTML = menuItemsHTMLString;
}

const getDollarsAndCents = (priceInPennies) => {
    const dollars = Math.floor(priceInPennies / 100);
    const cents = priceInPennies % 100;
    return [dollars, cents];
}

const formatPrice = (priceInPennies) => {
    const [dollars, cents] = getDollarsAndCents(priceInPennies);
    return `$${dollars}.${cents}`;
}

const renderCart = () => {
    const cartSummaryHTMLString = menuItems.map((item, index) => {
        if (item.count === 0) return "";

        const formattedSinglePrice = formatPrice(item.price);
        const formattedManyPrice = formatPrice(item.price * item.count);

        return `
            <li>
                <div class="plate">
                    <img src="images/${item.image}" alt="${item.alt}" />
                    <div class="quantity">${item.count}</div>
                </div>
                <div class="content">
                    <p class="menu-item">${item.name}</p>
                    <p class="price">${formattedSinglePrice}</p>
                </div>
                <div class="quantity__wrapper">
                    <button class="decreases" onClick="decreaseItemCount(${index})">
                        <img src="images/chevron.svg" alt="Decreases" />
                    </button>
                    <div class="quantity">${item.count}</div>
                    <button class="increases" onClick="increaseItemCount(${index})">
                        <img src="images/chevron.svg" alt="Increases" />
                    </button>
                </div>
                <div class="subtotal">${formattedManyPrice}</div>
            </li>
        `;
    }).join('');
    
    cartSummary.innerHTML = cartSummaryHTMLString;

    totals.style.display = 'block';

    const subtotalPrice = menuItems.reduce((acc, item) => {
        return acc + item.price * item.count;
    }, 0);
    subtotal.innerHTML = formatPrice(subtotalPrice); 

    const taxPrice = Math.floor(subtotalPrice / 10);
    tax.innerHTML = formatPrice(taxPrice);

    total.innerHTML = formatPrice(subtotalPrice + taxPrice);

    if (cartSummaryHTMLString) {
        totals.style.display = 'block';
        emptyCartText.style.display = 'none';
    } else {
        totals.style.display = 'none';
        emptyCartText.style.display = 'block';
    }
}

const increaseItemCount = (index) => {
    menuItems[index].count++;
    renderCart();
}

const decreaseItemCount = (index) => {
    const currentCount = menuItems[index].count;
    if (currentCount <= 0) return;

    const newCount = --menuItems[index].count;
    if (newCount === 0) {
        renderMenu();
    }
    renderCart();
}

const addToCart = (index) => {
    menuItems[index].count++;
    renderMenu();
    renderCart();
}

renderMenu();