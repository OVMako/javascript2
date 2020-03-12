const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

// let getRequest = (url, cb) => {
//     let xhr = new XMLHttpRequest();
//     // window.ActiveXObject -> xhr = new ActiveXObject()
//     xhr.open("GET", url, true);
//     xhr.onreadystatechange = () => {
//         if(xhr.readyState === 4){
//             if(xhr.status !== 200){
//                 console.log('Error');
//             } else {
//                 cb(xhr.responseText);
//             }
//         }
//     };
//     xhr.send();
// };

class ProductsList {
    constructor(container = '.products'){
        this.container = container;
        this.goods = [];//массив товаров
        this.allProducts = [];//массив объектов
        this._getProducts()
            .then(data => {
                this.goods = [...data];
                this.render()
            });
    }
    // _fetchProducts(cb){
    //     getRequest(`${API}/catalogData.json`, (data) => {
    //         this.goods = JSON.parse(data);
    //         console.log(this.goods);
    //         cb();
    //     })
    // }

    // 1. Переделайте makeGETRequest() так, чтобы она использовала промисы.
    
    /*let getRequest = () => {
        fetch(url)
            .then(result => result.json())
            .then(data => {})
            .catch( =>{
                console.log('Error')
            })
    }*/

    _getProducts(){ 
        return fetch(`${API}/catalogData.json`)
            .then(result => result.json())
            .catch(error => {
                console.log(error);
            })
    }
    calcSum(){
        return this.allProducts.reduce((accum, item) => accum += item.price, 0);
    }
    render(){
        const block = document.querySelector(this.container);
        for (let product of this.goods){
            const productObj = new ProductItem(product);
            this.allProducts.push(productObj);
            block.insertAdjacentHTML('beforeend', productObj.render());
        }

    }
}


class ProductItem {
    constructor(product, img = 'https://placehold.it/200x150'){
        this.title = product.product_name;
        this.price = product.price;
        this.id = product.id_product;
        this.img = img;
    }
    render(){
        return `<div class="product-item" data-id="${this.id}">
                <img src="${this.img}" alt="Some img">
                <div class="desc">
                    <h3>${this.title}</h3>
                    <p>${this.price} $</p>
                    <button class="buy-btn">Купить</button>
                </div>
            </div>`
    }
}

let list = new ProductsList();

class Cart {
    constructor(container = '.cart-block'){
        this.container = container;
        this.item = [];
        this.sum = 0;
        this.quantity = 0;
    };
    
    init() {
        document.querySelector('#toggle-cart').addEventListener ('click', () => {
            cart.shown = !cart.shown
            cart.render ()
            document.querySelector('.cart-block').classList.toggle('invisible')
        })

        document.querySelector(this.container).addEventListener ('click', evt => {
            if (evt.target.name === 'del-btn') {
                this.removeProduct(evt.target.dataset.id)
            }
        })
    }

    render () {
        let container = document.querySelector (this.itemsContainer)
        let domString = ''

        this.items.forEach (item => {
            domString += item.createTemplate ()
        })
        container.innerHTML = domString

        document.querySelector ('#tot-sum').innerHTML = this.sum
        document.querySelector ('#tot-qua').innerHTML = this.qua
        
    }
    addProduct (product) {
        let find = this.items.find (item => item.id_product === product.id) 
        if  (!find) {
            this.items.push (createCartItem (product.id, product.name, product.price)) //потому-что дата-сет
        } else {
            find.quantity++
        }
        this.checkTotal ()
        this.render ()
    }
    removeProduct (id) {
        let find = this.items.find (item => item.id_product === id) 
        if  (find.quantity === 1) {
            this.items.splice(this.items.indexOf(find), 1)
        } else {
            find.quantity--
        }
        this.checkTotal ()
        this.render ()
    }
    checkTotal () {
        let s = 0
        let q = 0

        this.items.forEach (item => {
            q += item.quantity
            s += item.quantity * item.price
        })

        this.sum = s
        this.qua = q
    }
}


class CartItem {
    constructor(product, img = 'https://placehold.it/40x30'){
        this.title = product.title;
        this.price = product.price;
        this.id = product.id;
        this.img = img;
    }
    createTemplate () {
        return `
        <div class="cart-item" data-id="${this.id_product}">
            <img src="${this.img}" alt="${this.product_name}" width="100" height="80">
            <div class="product-desc">
                <p class="product-title">${this.product_name}</p>
                <p class="product-quantity">${this.quantity}</p>
                <p class="product-single-price">${this.price}</p>
            </div>
            <div class="right-block">
                <p class="product-price">$${this.price * this.quantity}</p>
                <button name="del-btn" class="del-btn" data-id="${this.id_product}">&times;</button>
            </div>
        </div>
        `
    }


// console.log(list.calcSum());


// const products = [
//     {id: 1, title: 'Notebook', price: 2000},
//     {id: 2, title: 'Mouse', price: 20},
//     {id: 3, title: 'Keyboard', price: 200},
//     {id: 4, title: 'Gamepad', price: 50},
//     {id: 5, title: 'Chair', price: 150},
// ];
//
// const renderProduct = (product, img = 'https://placehold.it/200x150') => {
//     return `<div class="product-item">
//                 <img src="${img}" alt="Some img">
//                 <div class="desc">
//                     <h3>${product.title}</h3>
//                     <p>${product.price} $</p>
//                     <button class="buy-btn">Купить</button>
//                 </div>
//             </div>`
// };
//
// const renderPage = list => {
//     // document.querySelector('.products').innerHTML = list.map(item => renderProduct(item)).join('');
//     // document.createElement()
//
//     // for (let element of list){
//         // document.getElementById().innerHTML += element;
//         // document.getElementById().insertAdjacentHTML('beforeend', element);
//     // }
// };
//
// renderPage(products);