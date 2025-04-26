let currentIndex = 0;
const slider = document.getElementById('caseSlider');
const caseItems = document.querySelectorAll('.case-item');
const dots = document.querySelectorAll('.dot');
const totalCases = caseItems.length;
let isManualScroll = false;

// Update slider position
function updateSlider() {
  isManualScroll = true;
  const itemWidth = slider.offsetWidth;
  slider.scrollTo({
    left: currentIndex * itemWidth,
    behavior: 'smooth'
  });
  updateDots();
  setTimeout(() => isManualScroll = false, 500);
}

// Update active dot
function updateDots() {
  dots.forEach((dot, idx) => {
    dot.classList.toggle('active', idx === currentIndex);
  });
}

// Scroll right
function scrollToRight() {
  currentIndex = (currentIndex + 1) % totalCases;
  updateSlider();
}

// Scroll left
function scrollToLeft() {
  currentIndex = (currentIndex - 1 + totalCases) % totalCases;
  updateSlider();
}

// Go to a specific slide (dot click)
function goToSlide(index) {
  currentIndex = index;
  updateSlider();
}

// Handle finger swipe scroll
slider.addEventListener('scroll', () => {
  if (isManualScroll) return;
  const itemWidth = slider.offsetWidth;
  const newIndex = Math.round(slider.scrollLeft / itemWidth);
  if (newIndex !== currentIndex) {
    currentIndex = newIndex % totalCases;
    updateDots();
  }
});

// Initialize dots
dots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    goToSlide(index);
  });
});

