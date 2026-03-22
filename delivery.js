// 1. База данных блюд
const menuData = [
    { id: 1, name: "ЦЕХ-Бургер", price: 650, cat: "burgers", img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=600", desc: "Мраморная говядина, копченый сулугуни." },
    { id: 2, name: "Филадельфия", price: 890, cat: "sushi", img: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=600", desc: "Свежий лосось, сливочный сыр, огурец." },
    { id: 3, name: "Black Burger", price: 720, cat: "burgers", img: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?q=80&w=600", desc: "Черная булка, карамелизированный лук." },
    { id: 4, name: "Ролл Дракон", price: 950, cat: "sushi", img: "https://images.unsplash.com/photo-1559466273-d95e72debaf8?q=80&w=600", desc: "Угорь, авокадо, соус унаги." },
    { id: 5, name: "Лимонад Базилик", price: 350, cat: "drinks", img: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=600", desc: "Домашний сироп, свежий базилик, лайм." },
];

let cart = JSON.parse(localStorage.getItem('ceh_cart')) || [];

// 2. Рендер меню
function renderMenu(category = 'all') {
    const container = document.getElementById('menu-container');
    container.style.opacity = '0';

    setTimeout(() => {
        container.innerHTML = '';
        const filtered = category === 'all' ? menuData : menuData.filter(item => item.cat === category);

        filtered.forEach(item => {
            const card = `
                <div class="food-card anim-reveal-up">
                    <img src="${item.img}" class="food-img" loading="lazy">
                    <div class="food-info">
                        <h4>${item.name}</h4>
                        <p>${item.desc}</p>
                        <div class="food-price-row">
                            <span class="price">${item.price} ₴</span> 
                            <button class="add-btn" onclick="addToCart(${item.id})">+</button>
                        </div>
                    </div>
                </div>
            `;
            container.innerHTML += card;
        });

        container.style.opacity = '1';
        container.style.transition = 'opacity 0.3s ease';
    }, 100);
}

// 3. Логика корзины
window.addToCart = function(id) {
    const item = menuData.find(p => p.id === id);
    cart.push(item);
    updateCartUI();
}

function updateCartUI() {
    const cartBar = document.getElementById('cart-bar');
    const cartInfo = document.getElementById('cart-info');
    const cartTotal = document.getElementById('cart-total');

    const total = cart.reduce((sum, item) => sum + item.price, 0);
    localStorage.setItem('ceh_cart', JSON.stringify(cart));
    localStorage.setItem('ceh_total', total);

    if (cart.length > 0) {
        if(cartBar) cartBar.classList.add('active');
        if(cartInfo) cartInfo.innerText = `В КОРЗИНЕ ${cart.length} ТОВАРОВ`;
        if(cartTotal) cartTotal.innerText = total;
    } else {
        if(cartBar) cartBar.classList.remove('active');
    }

    if (typeof updateGlobalCart === "function") updateGlobalCart();
}

// 4. Переключение категорий
document.querySelectorAll('.category-item').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelector('.category-item.active').classList.remove('active');
        btn.classList.add('active');
        renderMenu(btn.dataset.cat);
    });
});

// Инициализация
document.addEventListener('DOMContentLoaded', () => {
    renderMenu();
    updateCartUI(); // Проверяем корзину сразу при входе
});

// Клик по плашке корзины — сохраняем данные и улетаем на чек-аут
document.getElementById('cart-bar').addEventListener('click', () => {
    if (cart.length > 0) {
        // Сохраняем массив корзины в память браузера
        localStorage.setItem('ceh_cart', JSON.stringify(cart));
        // Считаем итоговую сумму
        const total = cart.reduce((sum, item) => sum + item.price, 0);
        localStorage.setItem('ceh_total', total);
        
        // Переходим на страницу оформления
        window.location.href = 'checkout.html';
    }
});