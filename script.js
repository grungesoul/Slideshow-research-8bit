document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.slide');
    let currentSlide = 0;

    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        slides[index].classList.add('active');
        
        // Reset and start typing animation for the new slide
        const textElements = slides[index].querySelectorAll('.typewriter');
        textElements.forEach(element => {
            element.classList.remove('typing-started');
        });
        typeAllTexts(textElements);
    }

    // Handle next button clicks
    document.querySelectorAll('.next-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        });
    });

    // Handle previous button clicks
    document.querySelectorAll('.prev-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            showSlide(currentSlide);
        });
    });

    async function typeText(element) {
        const text = element.textContent;
        element.textContent = '';
        element.classList.add('typing');
        element.classList.add('typing-started');
        
        for (let char of text) {
            element.textContent += char;
            await new Promise(resolve => setTimeout(resolve, 50));
        }
        
        element.classList.remove('typing');
    }

    async function typeAllTexts(elements) {
        for (const element of elements) {
            await typeText(element);
        }
    }

    // Start typing animation for the first slide
    typeAllTexts(slides[0].querySelectorAll('.typewriter'));
}); 