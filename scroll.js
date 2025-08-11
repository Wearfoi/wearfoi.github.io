document.addEventListener('DOMContentLoaded', function() {
    const carouselInner = document.querySelector('.carousel-inner');
    const items = document.querySelectorAll('.carousel-item');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    let currentIndex = 0;
    const itemCount = items.length;

    function updateCarousel() {
        const itemWidth = items[0].offsetWidth;
        carouselInner.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
        
        // Update active class
        items.forEach((item, index) => {
            item.classList.toggle('active', index === currentIndex);
        });
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % itemCount;
        updateCarousel();
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + itemCount) % itemCount;
        updateCarousel();
    }

    // Button events
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);

    // Initialize
    updateCarousel();

    // Handle window resize
    window.addEventListener('resize', updateCarousel);
});