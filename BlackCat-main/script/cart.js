document.addEventListener('DOMContentLoaded', () => {
  const cartButton = document.getElementById('cart-button');
  const cartPopup = document.getElementById('cartPopup');
  const cartItemsList = document.getElementById('cartItemsList');
  const cartTotalPrice = document.getElementById('cartTotalPrice');
  const cartCloseBtn = document.getElementById('cartCloseBtn');

  const cartAddPopup = document.getElementById('cartAddPopup');
  const cartAddText = document.getElementById('cartAddText');
  const cartAddMoreBtn = document.getElementById('cartAddMoreBtn');
  const cartAddCloseBtn = document.getElementById('cartAddCloseBtn');

  const checkoutBtn = document.querySelector('#cartPopup .popup-checkout-btn'); // Кнопка "Заказать"
  const bookingSection = document.querySelector('.reserve-section'); // Секция бронирования

  const cartItems = [];

  // Функция для склонения числительных
  function declOfNum(number, titles) {
    const cases = [2, 0, 1, 1, 1, 2];
    return titles[
      number % 100 > 4 && number % 100 < 20
        ? 2
        : cases[number % 10 < 5 ? number % 10 : 5]
    ];
  }

  // Функция для отображения списка товаров и общей стоимости
  function renderCartItems() {
    cartItemsList.innerHTML = '';
    let total = 0;

    if (cartItems.length === 0) {
      cartItemsList.textContent = 'Корзина пуста';
      cartTotalPrice.textContent = 'Итого: 0 ₽';
      return;
    }

    cartItems.forEach(item => {
      const itemDiv = document.createElement('div');
      itemDiv.className = 'cart-item';
      itemDiv.textContent = `${item.name} — ${item.price} ₽ × ${item.quantity}`;
      cartItemsList.appendChild(itemDiv);

      total += item.quantity * Number(item.price);
    });

    cartTotalPrice.textContent = `Итого: ${total} ₽`;
  }

  // Функция для открытия попапа корзины
  function showCartPopup() {
    if (cartItems.length === 0) {
      alert('Ваша корзина пуста');
      return;
    }
    renderCartItems();
    cartPopup.classList.remove('d-none');
  }

  // Функция для закрытия попапа корзины
  function closeCartPopup() {
    cartPopup.classList.add('d-none');
  }

  // Функция для открытия попапа "Товар добавлен в корзину"
  function showCartAddPopup(productName) {
    cartAddText.textContent = `Товар "${productName}" добавлен в корзину`;
    cartAddPopup.classList.remove('d-none');
  }

  // Функция для закрытия попапа "Товар добавлен в корзину"
  function closeCartAddPopup() {
    cartAddPopup.classList.add('d-none');
  }

  // Очистка корзины
  function clearCart() {
    cartItems.length = 0; // Очищаем массив товаров
    renderCartItems(); // Обновляем отображение корзины
  }

  // Добавление товара в корзину
  document.querySelectorAll('.card-slider .cart-icon').forEach(icon => {
    icon.addEventListener('click', e => {
      e.stopPropagation();
      const card = icon.closest('.card-slider');
      const productName = card.querySelector('.card-title').textContent.split(' ')[0];
      const productPrice = card.querySelector('.card-title').textContent.split(' ')[1];

      const existingItem = cartItems.find(item => item.name === productName);
      if (existingItem) {
        existingItem.quantity++;
      } else {
        cartItems.push({ name: productName, price: productPrice, quantity: 1 });
      }

      showCartAddPopup(productName);
    });
  });

  // Кнопка "Добавить ещё"
  cartAddMoreBtn.addEventListener('click', () => {
    const productName = cartAddText.textContent.split('"')[1]; // Получаем название товара из текста попапа
    const existingItem = cartItems.find(item => item.name === productName);

    if (existingItem) {
      existingItem.quantity++; // Увеличиваем количество товара
    }

    closeCartAddPopup(); // Закрываем попап "Товар добавлен в корзину"
  });

  // Кнопка "Закрыть" в попапе "Товар добавлен в корзину"
  cartAddCloseBtn.addEventListener('click', () => {
    closeCartAddPopup();
  });

  // Кнопка открытия корзины
  cartButton.addEventListener('click', showCartPopup);

  // Кнопка закрытия корзины
  cartCloseBtn.addEventListener('click', closeCartPopup);

  // Кнопка "Заказать"
  checkoutBtn.addEventListener('click', () => {
    if (cartItems.length === 0) {
      alert('Ваша корзина пуста');
      return;
    }

    clearCart(); // Очищаем корзину
    closeCartPopup(); // Закрываем попап корзины

    if (bookingSection) {
      bookingSection.style.display = 'block'; // Показываем секцию бронирования
      bookingSection.scrollIntoView({ behavior: 'smooth' }); // Перемещаемся к секции
    }
  });
});