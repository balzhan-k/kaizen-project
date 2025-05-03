document.addEventListener("DOMContentLoaded", function () {
  // Navbar background change on scroll
  const navbar = document.getElementById("navbar");

  window.addEventListener("scroll", function () {
    if (window.scrollY > 50) {
      navbar.classList.add("bg-white", "shadow-sm");
      navbar.classList.remove("bg-transparent");
    } else {
      navbar.classList.remove("bg-white", "shadow-sm");
      navbar.classList.add("bg-transparent");
    }
  });

  // Offcanvas close behavior
  const offcanvasElement = document.getElementById("navbarOffcanvasLg");
  const offcanvas = new bootstrap.Offcanvas(offcanvasElement);

  document
    .querySelectorAll(".offcanvas-body .nav-link")
    .forEach(function (link) {
      link.addEventListener("click", function () {
        offcanvas.hide();
      });
    });

  const offcanvasHeaderLink = document.getElementById("offcanvasNavbarLabel");
  offcanvasHeaderLink.addEventListener("click", function () {
    offcanvas.hide();
  });

  // Case slider logic
  const slider = document.getElementById("caseSlider");
  const caseItems = document.querySelectorAll(".case-item");
  const dots = document.querySelectorAll(".dot");
  const totalCases = caseItems.length;

  let currentIndex = 0;
  let isManualScroll = false;

  function updateSlider() {
    isManualScroll = true;
    const itemWidth = slider.offsetWidth;
    slider.scrollTo({
      left: currentIndex * itemWidth,
      behavior: "smooth",
    });
    updateDots();
    setTimeout(() => (isManualScroll = false), 500);
  }

  function updateDots() {
    dots.forEach((dot, idx) => {
      dot.classList.toggle("active", idx === currentIndex);
    });
  }

  function scrollToRight() {
    currentIndex = (currentIndex + 1) % totalCases;
    updateSlider();
  }

  function scrollToLeft() {
    currentIndex = (currentIndex - 1 + totalCases) % totalCases;
    updateSlider();
  }

  function goToSlide(index) {
    currentIndex = index;
    updateSlider();
  }

  // Handle scroll (for swipe)
  slider.addEventListener("scroll", () => {
    if (isManualScroll) return;
    const itemWidth = slider.offsetWidth;
    const newIndex = Math.round(slider.scrollLeft / itemWidth);
    if (newIndex !== currentIndex) {
      currentIndex = newIndex % totalCases;
      updateDots();
    }
  });

  // Dot click listeners
  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      goToSlide(index);
    });
  });

  // Touch support
  let startX = 0;
  slider.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
  });

  slider.addEventListener("touchend", (e) => {
    const endX = e.changedTouches[0].clientX;
    if (startX - endX > 50) {
      scrollToRight();
    } else if (endX - startX > 50) {
      scrollToLeft();
    }
  });

  // Attach buttons (optional, if not in HTML already)
  window.scrollToRight = scrollToRight;
  window.scrollToLeft = scrollToLeft;
  window.goToSlide = goToSlide;
});
