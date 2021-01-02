class CatalogItems {
    constructor(title, price, image, id) {
        this.title = title;
        this.price = price;
        this.image = image;
        this.id = id;
    }

    getTemplate() {
        return `
        <div class='catalog-list'>    
            <h3>${this.title}</h3>
            <p>${this.price}</p>
            <img width='150' src='${this.image}'><br>
            <button name='add' data-id='${this.id}'>Купить</button>
        </div>`
    }
}

class CatalogList {
    catalog = [];
    container = document.querySelector('#catalog');

    fetchCatalog() {
        this.catalog = [{
                productName: "MANGO PEOPLE T-SHIRT",
                productPrice: 52,
                productImg: "https://raw.githubusercontent.com/alishka242/static/master/IMG/fetured_1.jpg",
                productId: "prod_0"
            },
            {
                productPrice: 53,
                productImg: "https://raw.githubusercontent.com/alishka242/static/master/IMG/fetured_2.jpg",
                productName: "BANANA PEOPLE T-SHIRT",
                productId: "prod_1"
            },
            {
                productName: "STRAWBERRY PEOPLE T-SHIRT",
                productPrice: 55,
                productImg: "https://raw.githubusercontent.com/alishka242/static/master/IMG/fetured_3.jpg",
                productId: "prod_2"
            }
        ];
    }
    render(selector) {
        const templates = this.catalog
            .map((i) => new CatalogItems(i.productName, i.productPrice, i.productImg, i.productId).getTemplate())
            .join("");
        document.querySelector(`${selector}`).innerHTML = templates;
    }

    getSum() {
        let summ = 0;
        this.catalog
            .map((i) => {
                return summ += +i.productPrice
            });
        document.querySelector('#summ').innerHTML = `<p>${summ}</p>`;
    }

    _handelEvents(event) {
        if (event.target.name == 'add') {
            this.catalog.forEach((elem) => {
                if (event.target.dataset.id === elem.productId) {
                    console.log(`${elem.productName} КУПЛЕНО!`);
                    basketList.render(elem);
                }
            });
            // let id = event.target.dataset.id; //from data-id
            // let item = this.items.find(el => el.productId == id);
            // this.basket.add(item);
        }
    }
}

class BasketItems extends CatalogItems {
    constructor(title, price, image, id, amount) {
        super(title, price, image, id);
        this.amount = amount;
    }
    getTemplate(amount) {
        return `
        <div class='basket-list'>    
            <h3>${this.title}</h3>
            <p>${this.price}</p>
            <img width='150' src='${this.image}'><br>
            <div class='basket-amount'>
                <button>-</button>
                <p>${this.amount}<p>
                <button name='add' data-id='${this.id}'>+</button>
                
            </div>
            
        </div>`

    }
}

class BasketList {
    constructor() {
        this.orderList = [];
        this.container = null;
    }

    // container = document.querySelector('#basket');
    render(elem) {
        console.log('Visited render in BastetList');
        if (!this.orderList.length) {
            /*  **Создает первый эл-т в корзине**   */

            const basketItem = new BasketItems(elem.productName, elem.productPrice, elem.productImg, elem.productId, elem.amount = 1).getTemplate(1);
            this.container = basketItem;
            // document.querySelector(`#basket`).innerHTML = this.container;
            // this.orderList.push(elem);
        } else {
            //Еще не может менять кол-во товара в корзине и при добавлении 3-его эл-та добавляет повторно последний эл-т

            this.orderList.forEach(basketObj => {
                console.log(basketObj);
                if (elem.productId === basketObj.productId) {
                    /*  **Меняет кол-во товара** */

                    //this.basketItem.getTemplate(basketObj.amount++);
                    basketObj.amount += 1;
                    this.container

                    // return this.container;
                } else {
                    /*  **Добавляет новый эл-т в корзину** */

                    const basketItem = new BasketItems(elem.productName, elem.productPrice, elem.productImg, elem.productId, elem.amount = 1).getTemplate(1);
                    this.container += basketItem;
                    // document.querySelector(`#basket`).innerHTML = this.container;
                    // this.orderList.push(elem);
                }
            });
        };
        document.querySelector(`#basket`).innerHTML = this.container;
        this.orderList.push(elem);
    }
}

const basketList = new BasketList;

const list = new CatalogList;
list.fetchCatalog();
list.render('#catalog');
list.getSum();
document.addEventListener('click', (event) => {
    list._handelEvents(event);
});