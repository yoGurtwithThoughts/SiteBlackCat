let lastScrollTop = 0;
const appBar = document.querySelector('.app-bar-custom');
window.addEventListener('scroll', function () {
    let currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    if (currentScroll > lastScrollTop) {
        appBar.style.top = '-80px';  
    } else {
        appBar.style.top = '0';
    }
    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; 
});