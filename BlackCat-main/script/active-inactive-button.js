document.addEventListener("DOMContentLoaded", function () {
    const carousel = document.getElementById("coffeeCarousel"); 
    const prevButton = document.querySelector(".custom-prev"); 
    const nextButton = document.querySelector(".custom-next"); 

    if (!carousel || !prevButton || !nextButton) {
        console.error("Ошибка: не найдены элементы карусели или кнопки.");
        return;
    }

    function updateButtonStates() {
        const items = Array.from(carousel.querySelectorAll(".carousel-item"));
        const currentIndex = items.findIndex(item => item.classList.contains("active"));

        updateButtonImages(currentIndex, items.length);

        prevButton.classList.toggle("inactive", currentIndex === 0);
        nextButton.classList.toggle("inactive", currentIndex === items.length - 1);
    }

    function updateButtonImages(currentIndex, totalItems) {
        const prevImg = prevButton.querySelector("img");
        const nextImg = nextButton.querySelector("img");

        if (!prevImg || !nextImg) {
            console.error("Ошибка: изображения кнопок не найдены.");
            return;
        }

        prevImg.src = currentIndex === 0 
            ? "../images/card-icon/inactivebutton.svg" 
            : "../images/card-icon/activebutton.svg";

        nextImg.src = currentIndex === totalItems - 1 
            ? "../images/card-icon/inactivebutton.svg" 
            : "../images/card-icon/backicon.svg";
    }

    updateButtonStates();
    carousel.addEventListener("slid.bs.carousel", updateButtonStates);

    prevButton.addEventListener("click", function () {
        carousel.carousel("prev");
    });

    nextButton.addEventListener("click", function () {
        carousel.carousel("next");
    });
});