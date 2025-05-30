document.addEventListener('DOMContentLoaded', () => {

  function changePlaceholder(input, newPlaceholder) {
    input.placeholder = newPlaceholder;
  }

  // Функция для сброса плейсхолдера
  function resetPlaceholder(input, originalPlaceholder) {
    input.placeholder = originalPlaceholder;
  }

  // Формат даты ДД.ММ.ГГГГ
  function formatDate(value) {
    const digits = value.replace(/\D/g, '').slice(0, 8);
    let formatted = '';
    if (digits.length >= 2) {
      formatted += digits.slice(0, 2) + '.';
    } else {
      formatted += digits;
    }
    if (digits.length >= 4) {
      formatted += digits.slice(2, 4) + '.';
    } else if (digits.length > 2) {
      formatted += digits.slice(2);
    }
    if (digits.length > 4) {
      formatted += digits.slice(4);
    }
    return formatted;
  }

  // Формат времени ЧЧ:ММ
  function formatTime(value) {
    const digits = value.replace(/\D/g, '').slice(0, 4);
    let formatted = '';
    if (digits.length >= 2) {
      formatted += digits.slice(0, 2) + ':';
    } else {
      formatted += digits;
    }
    if (digits.length > 2) {
      formatted += digits.slice(2);
    }
    return formatted;
  }

  // Формат имени — первая буква заглавная (каждое слово)
  function formatName(value) {
    return value
      .toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  // Формат телефона +7 (999) 999-99-99
  function formatPhone(value) {
    let digits = value.replace(/\D/g, '').slice(0, 11);
    let formatted = '';
    if (digits.length > 0) formatted = '+7 ';
    if (digits.length > 1) formatted += '(' + digits.substring(1, 4);
    if (digits.length >= 4) formatted += ') ' + digits.substring(4, 7);
    if (digits.length >= 7) formatted += '-' + digits.substring(7, 9);
    if (digits.length >= 9) formatted += '-' + digits.substring(9, 11);
    return formatted;
  }

  // Автоформат при вводе
  document.getElementById('data').addEventListener('input', function () {
    this.value = formatDate(this.value);
  });

  document.getElementById('time').addEventListener('input', function () {
    this.value = formatTime(this.value);
  });

  document.getElementById('name').addEventListener('input', function () {
    this.value = formatName(this.value);
  });

  document.getElementById('phone').addEventListener('input', function () {
    this.value = formatPhone(this.value);
  });
  const bookingForm = document.getElementById('bookingForm');

  // Валидация email
  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  // Валидация даты (ДД.ММ.ГГГГ)
  function validateDate(date) {
    const parts = date.split('.');
    if (parts.length !== 3) return false;
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10);
    const year = parseInt(parts[2], 10);
    if (isNaN(day) || isNaN(month) || isNaN(year)) return false;
    if (year < 1900 || year > 2100) return false;
    if (month < 1 || month > 12) return false;
    const daysInMonth = new Date(year, month, 0).getDate();
    if (day < 1 || day > daysInMonth) return false;
    return true;
  }

  // Валидация времени ЧЧ:ММ
  function validateTime(time) {
    const parts = time.split(':');
    if (parts.length !== 2) return false;
    const hh = parseInt(parts[0], 10);
    const mm = parseInt(parts[1], 10);
    if (isNaN(hh) || isNaN(mm)) return false;
    if (hh < 0 || hh > 23) return false;
    if (mm < 0 || mm > 59) return false;
    return true;
  }

  // Обработка отправки формы бронирования
  bookingForm.addEventListener('submit', function (event) {
    event.preventDefault();

    // Очистка ошибок
    const errorIds = ['data', 'time', 'name', 'phone', 'email'];
    errorIds.forEach(id => {
      document.getElementById('error-' + id).textContent = '';
      const input = document.getElementById(id);
      input.classList.remove('error');
    });

    const dataInput = document.getElementById('data');
    const timeInput = document.getElementById('time');
    const nameInput = document.getElementById('name');
    const phoneInput = document.getElementById('phone');
    const emailInput = document.getElementById('email');

    let isValid = true;

    // Валидация даты
    if (!validateDate(dataInput.value)) {
      isValid = false;
      document.getElementById('error-data').textContent = 'Введите корректную дату ДД.ММ.ГГГГ';
      dataInput.classList.add('error');
    }

    // Валидация времени
    if (!validateTime(timeInput.value)) {
      isValid = false;
      document.getElementById('error-time').textContent = 'Введите корректное время ЧЧ:ММ';
      timeInput.classList.add('error');
    }

    // Валидация имени (не пустое, минимум 2 символа)
    if (!nameInput.value.trim() || nameInput.value.trim().length < 2) {
      isValid = false;
      document.getElementById('error-name').textContent = 'Введите корректное имя';
      nameInput.classList.add('error');
    }

    // Валидация телефона (должен быть полный)
    const phoneDigits = phoneInput.value.replace(/\D/g, '');
    if (phoneDigits.length !== 11 || phoneDigits.charAt(0) !== '7') {
      isValid = false;
      document.getElementById('error-phone').textContent = 'Введите корректный номер телефона';
      phoneInput.classList.add('error');
    }

    // Валидация email (если заполнено)
    if (emailInput.value.trim() && !validateEmail(emailInput.value.trim())) {
      isValid = false;
      document.getElementById('error-email').textContent = 'Введите корректный email';
      emailInput.classList.add('error');
    }

    if (isValid) {
      // Если валидация прошла успешно
      showPopup();
    }
  });
  function generateBookingNumber() {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const letter = letters.charAt(Math.floor(Math.random() * letters.length));
    const numbers = Math.floor(1000 + Math.random() * 9000);
    return letter + numbers;
  }

  function generateTableNumber() {
    return Math.floor(1 + Math.random() * 10);
  }

  function showPopup() {
    const bookingNumber = generateBookingNumber();
    const tableNumber = generateTableNumber();
    const popup = document.getElementById('bookingPopup');
    const popupText = document.getElementById('bookingPopupText');

    popupText.innerHTML = `Ваш номер брони: <strong>${bookingNumber}</strong><br>Столик № <strong>${tableNumber}</strong>`;
    popup.classList.remove('d-none');
  }

  // Кнопка закрытия попапа
  document.getElementById('popupCloseBtn').addEventListener('click', () => {
    const popup = document.getElementById('bookingPopup');
    popup.classList.add('d-none');
  });
})