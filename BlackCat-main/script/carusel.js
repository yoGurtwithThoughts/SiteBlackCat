let currentIndex = 1;
const items = document.querySelectorAll('.carousel-item');
const totalItems = items.length;

function moveLeft() {
  currentIndex = (currentIndex - 1 + totalItems) % totalItems;
  updateCarousel();
}

function moveRight() {
  currentIndex = (currentIndex + 1) % totalItems;
  updateCarousel();
}

function updateCarousel() {
  items.forEach((item, index) => {
    item.classList.remove('center', 'next', 'prev');
    
    if (index === currentIndex) {
      item.classList.add('center');
    } else if (index === (currentIndex + 1) % totalItems) {
      item.classList.add('next');
    } else if (index === (currentIndex - 1 + totalItems) % totalItems) {
      item.classList.add('prev');
    }
  });
}

updateCarousel(); // Инициализация слайдера