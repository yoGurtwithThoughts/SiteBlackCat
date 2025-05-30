// Генерация номера брони
function generateBookingNumber() {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const letter = letters.charAt(Math.floor(Math.random() * letters.length));
  const numbers = Math.floor(1000 + Math.random() * 9000);
  return letter + numbers;
}

// Генерация номера столика
function generateTableNumber() {
  return Math.floor(1 + Math.random() * 10);
}

// Отображение попапа
function showPopup() {
  const bookingNumber = generateBookingNumber();
  const tableNumber = generateTableNumber();
  const popup = document.getElementById('bookingPopup');
  const popupText = document.getElementById('bookingPopupText');

  popupText.innerHTML = `Ваш номер брони: <strong>${bookingNumber}</strong><br>Столик № <strong>${tableNumber}</strong>`;
  popup.classList.remove('d-none');
}

// Закрытие попапа
function closePopup() {
  const popup = document.getElementById('bookingPopup');
  if (popup) {
    popup.classList.add('d-none'); // Скрываем попап
  }
}

// Инициализация событий
document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form');

  // Обработка отправки формы
  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    if (validateForm(form)) {  // если валидация прошла успешно
      showPopup();
    }
    // если валидация не прошла — ничего не делаем с попапом
  });

  // Закрытие попапа по кнопке "Закрыть"
  const popupCloseBtn = document.getElementById('popupCloseBtn');
  if (popupCloseBtn) {
    popupCloseBtn.addEventListener('click', closePopup);
  }

  // Закрытие попапа при клике вне его области
  document.addEventListener('click', (e) => {
    const popup = document.getElementById('bookingPopup');
    if (popup && !popup.contains(e.target) && !e.target.closest('.popup')) {
      closePopup();
    }
  });
});