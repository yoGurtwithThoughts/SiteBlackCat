
    let currentCategory = 'coffee'; // По умолчанию отображается кофе

    function filterCategory(category) {
        const allItems = document.querySelectorAll('.carousel-item');

        if (currentCategory === category) {
            allItems.forEach(item => {
                if (item.classList.contains(category)) {
                    item.classList.add('active');
                } else {
                    item.classList.remove('active');
                }
            });
        } else {
            allItems.forEach(item => item.classList.remove('active'));
            document.querySelectorAll(`.${category}`).forEach((item, index) => {
                if (index === 0) item.classList.add('active');
            });
            currentCategory = category;
        }
    }

    // 👇 Добавь вызов фильтрации при загрузке
    document.addEventListener("DOMContentLoaded", () => {
        filterCategory('coffee');
    });

    let scrollIndex = 0;
  const cardWidth = 420 + 16; // ширина + отступ
  const maxVisible = 3;

  function scrollRight() {
    const track = document.getElementById('carouselTrack');
    const total = track.children.length;
    const maxIndex = total;

    scrollIndex = (scrollIndex + 1) % total;
    track.style.transform = `translateX(-${scrollIndex * cardWidth}px)`;
  }

  window.onload = () => {
    scrollIndex = 0;
    document.getElementById('carouselTrack').style.transform = 'translateX(0)';
  };