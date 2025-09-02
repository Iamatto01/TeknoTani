/*
 * Teknotani JavaScript
 *
 * This script provides basic interactivity for the Teknotani website.
 * It controls the carousel on the home page and provides a placeholder
 * function for the AI identification page.  The carousel automatically
 * rotates through slides and allows manual selection via indicators.
 * The AI handler displays a simple message indicating that the AI
 * functionality is not yet implemented.  Additional interactivity can
 * be added here as needed.
 */

document.addEventListener('DOMContentLoaded', function () {
  const carousel = document.querySelector('.carousel');
  if (carousel) {
    const slides = carousel.querySelectorAll('.slide');
    const indicators = carousel.querySelectorAll('.indicators button');
    let currentSlide = 0;
    let intervalId;

    /**
     * Shows the slide at the given index and updates indicators.
     * @param {number} index The index of the slide to display
     */
    function showSlide(index) {
      slides.forEach((slide, i) => {
        // translate each slide container horizontally by 100% increments
        slide.style.transform = `translateX(-${index * 100}%)`;
      });
      indicators.forEach((indicator, i) => {
        indicator.classList.toggle('active', i === index);
      });
      currentSlide = index;
    }

    /**
     * Advances to the next slide, looping back to the first slide when
     * reaching the end of the list.
     */
    function nextSlide() {
      let next = currentSlide + 1;
      if (next >= slides.length) next = 0;
      showSlide(next);
    }

    /**
     * Starts the automatic slide rotation.
     */
    function startAutoRotate() {
      intervalId = setInterval(nextSlide, 5000);
    }

    /**
     * Stops the automatic slide rotation.
     */
    function stopAutoRotate() {
      if (intervalId) clearInterval(intervalId);
    }

    // Attach click handlers to indicators for manual navigation
    indicators.forEach((button, i) => {
      button.addEventListener('click', () => {
        stopAutoRotate();
        showSlide(i);
        startAutoRotate();
      });
    });

    // Initialise carousel
    showSlide(0);
    startAutoRotate();
  }
});

/**
 * Placeholder function for the AI page.  When called, it displays a
 * message indicating that the AI feature is not yet available.  This
 * function is invoked from the AI page's button click handler.
 */
function handleAI() {
  const result = document.getElementById('ai-result');
  if (result) {
    result.textContent = 'Ciri AI belum diaktifkan. Ini hanya contoh antara muka.';
  }
}