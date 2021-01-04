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
            <p>${this.price}$</p>
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

    _handelEvents(event) {

        if (event.target.name == 'add') {
            this.catalog.forEach((elem) => {
                if (event.target.dataset.id === elem.productId) {
                    console.log(`${elem.productName} КУПЛЕНО!`);
                    basketList.render(elem);
                }
            });
        }
    }
}

class BasketItems extends CatalogItems {
    constructor(title, price, image, id, amount) {
        super(title, price, image, id);
        this.amount = amount;
    }
    getTemplate() {
        return `
        <div class='basket-list'>    
            <img width='110' src='${this.image}'>
            <div>
                <h3>${this.title}</h3>
                <p>${this.price}$</p>
                <div class='basket-amount'>
                    <button>-</button>
                    <p>${this.amount}<p>
                    <button name='add' data-id='${this.id}'>+</button>
                </div>
            </div>        
        </div>`
    }
}

class BasketList {
    constructor() {
        this.orderList = [];
        this.container = '';
        this.sum = 0;
    }

    render(elem) {
        let isResult = true;
        console.log('Visited render in BastetList');

        this.orderList.some(basketObj => {
            if (elem.productId === basketObj.id) {
                /*  **Меняет кол-во товара** */

                basketObj.amount += 1;
                this.container = '';
                isResult = false;
            }
        });

        if (isResult) {
            const basketItem = new BasketItems(elem.productName, elem.productPrice, elem.productImg, elem.productId, elem.amount = 1);
            this.orderList.push(basketItem);
            this.container = '';
            isResult = true;
        }

        this.orderList.forEach(obj => {
            this.container += obj.getTemplate();
            this.sum += obj.amount * obj.price;
        });
        
        document.querySelector(`#basket`).innerHTML = this.container + 'Сумма заказа: ' + this.sum;
    }
}

const basketList = new BasketList;

const list = new CatalogList;
list.fetchCatalog();
list.render('#catalog');
document.addEventListener('click', (event) => {
    list._handelEvents(event);
});