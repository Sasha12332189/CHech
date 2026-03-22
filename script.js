// Функция плавного перехода между страницами
document.addEventListener('DOMContentLoaded', () => {
    const links = document.querySelectorAll('.nav-link, .logo, .btn-filled');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href && href.includes('.html')) {
                e.preventDefault();
                document.body.classList.add('transition-active');
                
                setTimeout(() => {
                    window.location.href = href;
                }, 600);
            }
        });
    });

    // Анимация появления контента при загрузке
    setTimeout(() => {
        document.body.classList.remove('loading');
    }, 100);
});

// Пример для страницы Доставки: Фильтрация корнеров
const filterMenu = (category) => {
    const items = document.querySelectorAll('.menu-card');
    items.forEach(item => {
        item.style.display = item.dataset.cat === category ? 'block' : 'none';
    });
}

// Плавный скролл до якоря
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

function updateGlobalCart() {
    // Проверяем, есть ли уже созданная плашка, если нет — создаем
    let cartBtn = document.getElementById('global-cart');
    if (!cartBtn) {
        cartBtn = document.createElement('div');
        cartBtn.id = 'global-cart';
        cartBtn.className = 'floating-cart';
        document.body.appendChild(cartBtn);
        
        cartBtn.addEventListener('click', () => {
            window.location.href = 'checkout.html';
        });
    }

    const cartData = JSON.parse(localStorage.getItem('ceh_cart')) || [];
    const total = localStorage.getItem('ceh_total') || 0;

    if (cartData.length > 0) {
        cartBtn.innerText = `КОРЗИНА: ${total} ₴`;
        cartBtn.classList.add('active');
    } else {
        cartBtn.classList.remove('active');
    }
}

// Запускаем проверку при загрузке любой страницы
document.addEventListener('DOMContentLoaded', updateGlobalCart);

// Слушаем изменения в localStorage (если добавили товар на странице доставки)
window.addEventListener('storage', updateGlobalCart);

function updateCartWidget() {
    const cartWidget = document.getElementById('cart-widget'); // Твоя плашка
    const cartTotalDisplay = document.getElementById('cart-total'); // Сумма на плашке
    
    const total = localStorage.getItem('ceh_total') || 0;
    const cart = JSON.parse(localStorage.getItem('ceh_cart')) || [];

    if (cart.length > 0) {
        cartWidget.style.display = 'flex'; // Показываем, если не пустая
        cartTotalDisplay.innerText = total;
    } else {
        cartWidget.style.display = 'none'; // Прячем, если удалили всё
    }
}

// Запускаем при каждой загрузке страницы
window.onload = updateCartWidget;