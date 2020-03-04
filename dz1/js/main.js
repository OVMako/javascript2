const products = [
    {id: 1, title: 'Notebook', price: 2000, img: 'https://placehold.it/200x150'},
    {id: 2, title: 'Mouse', price: 20, img: 'https://placehold.it/200x150'},
    {id: 3, title: 'Keyboard', price: 200, img: 'https://placehold.it/200x150'},
    {id: 4, title: 'Gamepad', price: 50, img: 'https://placehold.it/200x150'},
];

const renderProduct = (title, price) => {
    return `<div class="product-item">
                <img src="https://placehold.it/200x150" alt="${title}">
                <h3>${title}</h3>
                <p>${price}$</p>
                <button class="buy-btn">Купить</button>
            </div>`
};
const renderPage = list => {
    const productsList = list.map(item => renderProduct(item.title, item.price));
    document.querySelector('.products').innerHTML = productsList;
};

renderPage(products);