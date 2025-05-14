 // Массивы с изображениями для левого, центрального и правого блоков
        const leftImages = [
            "../images/people2.svg ",
            "../images/people3.svg ",
            "../images/people6.svg  "
        ];
        const rightImages = [
             "../images/people5.svg ",
            "../images/people4.svg ",
            "../images/people3.svg  "
        ];

        let currentIndex = 0;

        // Функция для обновления изображений
        function updateImages() {
            const leftImageElement = document.getElementById('leftImage').querySelector('img');
            const rightImageElement = document.getElementById('rightImage').querySelector('img');

            // Обновляем изображения в левом и правом блоках
            leftImageElement.src = leftImages[currentIndex];
            rightImageElement.src = rightImages[currentIndex];
        }

        // Слушаем событие смены слайда в карусели
        const carousel = document.getElementById('mainCarousel');
        carousel.addEventListener('slid.bs.carousel', () => {
            currentIndex = Array.from(carousel.querySelectorAll('.carousel-item')).findIndex(item => item.classList.contains('active'));
            updateImages();
        });

        // Инициализация изображений при загрузке страницы
        updateImages();