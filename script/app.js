const product = {
    crazy: {
        name: 'Crazy',
        price: 31000,
        img: 'images/products/burger-1.png',
        amount: 0,
        get totalSum() {
            return this.price * this.amount;
        }
    },
    light: {
        name: 'Light',
        price: 26000,
        img: 'images/products/burger-2.png',
        amount: 0,
        get totalSum() {
            return this.price * this.amount;
        }
    },
    cheeseburger: {
        name: 'Cheeseburger',
        price: 29000,
        img: 'images/products/burger-3.png',
        amount: 0,
        get totalSum() {
            return this.price * this.amount;
        }
    },
    dburger: {
        name: 'Dburger',
        price: 24000,
        img: 'images/products/burger-4.png',
        amount: 0,
        get totalSum() {
            return this.price * this.amount;
        }
    }
};

const productBtns = document.querySelectorAll('.wrapper__list-btn'),
    basketBtn = document.querySelector('.wrapper__navbar-btn'),
    basketModal = document.querySelector('.wrapper__navbar-basket'),
    basketModalClose = document.querySelector('.wrapper__navbar-close'),
    basketModalChecklist = document.querySelector('.wrapper__navbar-checklist'),
    basketModalTotalPrice = document.querySelector('.wrapper__navbar-totalprice'),
    basketTotalAmount = document.querySelector('.warapper__navbar-count'),
    basketOrder = document.querySelector('.wrapper__navbar-bottom');

basketBtn.addEventListener('click', () => {
    basketModal.classList.add('active');
});
basketModalClose.addEventListener('click', () => {
    basketModal.classList.remove('active');
});

productBtns.forEach(btn => {
    btn.addEventListener('click', function () {
        addProduct(this);
    });
});

function addProduct(btn) {
    let parent = btn.closest('.wrapper__list-card');
    let parentId = parent.getAttribute('id');
    product[parentId].amount++;

    renderBasket();
};

function renderBasket() {
    const productArray = [];

    for (const key in product) {
        const productItem = product[key];
        const productCard = document.querySelector(`#${productItem.name.toLowerCase()}`);
        const productAmount = productCard.querySelector('.wrapper__list-count');

        if (productItem.amount) {
            productArray.push(productItem);
            productAmount.classList.add('active');
            productAmount.innerHTML = productItem.amount;
        } else {
            productAmount.classList.remove('active');
            productAmount.innerHTML = 0;
        }

        basketModalTotalPrice.innerHTML = totalSumProduct();
    }

    basketModalChecklist.innerHTML = '';
    
    productArray.forEach(item => {
        basketModalChecklist.innerHTML += cardItemProduct(item);
    })

    let allCount = totlalCountProduct();

    if (allCount) {
        basketTotalAmount.classList.add('active');
        basketTotalAmount.innerHTML = allCount;
    } else {
        basketTotalAmount.classList.remove('active');
        basketTotalAmount.innerHTML = 0;
    }
}

function totlalCountProduct() {
    let total = 0;

    for (const key in product) {
        total += product[key].amount;
    }

    return total;
}

function totalSumProduct() {
    let total = 0;

    for (const key in product) {
        total += product[key].totalSum;
    }

    return total;
}

function cardItemProduct(obj) {
    const {name, price, img, amount} = obj;

    return `
        <div class="wrapper__navbar-product">
            <div class="wrapper__navbar-info">
                <img src="${img}" alt="${name}" class="wrapper__navbar-productImage">
                <div class="wrapper__navbar-productInfo">
                    <p class="wrapper__navbar-infoName">${name}</p>
                    <p class="wrapper__navbar-infoPrice">${price}</p>
                </div>
            </div>
            <div class="wrapper__navbar-option" id="${name.toLowerCase()}_card">
                <button class="wrapper__navbar-symbol" data-symbol="-">-</button>
                <span class="wrapper__navbar-count">${amount}</span>
                <button class="wrapper__navbar-symbol" data-symbol="+">+</button>
            </div>
        </div>
    `;
}

window.addEventListener('click', (e) => {
    if (e.target.classList.contains('wrapper__navbar-symbol')) {
        let symbol = e.target.getAttribute('data-symbol');
        let parent = e.target.closest('.wrapper__navbar-option');

        if (parent) {
            let parentId = parent.getAttribute('id').split('_')[0];

            if (symbol == '+') product[parentId].amount++;
            else if (symbol == '-') product[parentId].amount--;

            renderBasket();
        }
    }
})

const printWrapper = document.querySelector('.print__wrapper'),
    print = document.querySelector('.print'),
    printBody = document.querySelector('.print__body'),
    printFooter = document.querySelector('.print__footer');
    
basketOrder.addEventListener('click', () => {
    printBody.innerHTML = '';
    
    for (const key in product) {
        const {name, totalSum, amount} = product[key];
        
        if (amount) {
            printWrapper.classList.add('active');
            print.classList.add('active');
            basketModal.classList.remove('active');
            
            printBody.innerHTML += `
                <div class="print__body-item">
                    <p class="print__body-item_name">
                        <span>${name}</span>
                        <span>${amount} шт.</span>
                    </p>
                    <p>${totalSum}</p>
                </div>
            `;

            printFooter.innerHTML = `Общая стоимость: ${totalSumProduct()}`;
        }        
        
        setTimeout(() => {
            print.classList.remove('active')
            printWrapper.classList.remove('active')
        }, 5000);
    }
    
    product[key].amount = 0;
    renderBasket();
})