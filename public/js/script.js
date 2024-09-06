const btn = document.getElementById('menu');
const navhide = document.getElementsByClassName("links")[0];
const cal = document.getElementsByClassName("calculater")[0];
const calculater = document.getElementsByClassName("cals")[0];
const close = document.getElementsByClassName("close")[0];
btn.addEventListener('click', () => {
  navhide.classList.toggle("active")
  console.log("here");

});
if (close) {
  close.addEventListener('click', () => {
    calculater.classList.toggle("active")
  });
}
if (cal) {
  cal.addEventListener('click', () => {
    calculater.classList.toggle("active")
  });
}



// let imgs = document.querySelectorAll(".banner-wrapper img");
// let banner = document.querySelector(".banner-wrapper");
// let count = 1;
// if(banner){
//     function slide() {
//         if (count < imgs.length) {
//             console.log(banner.clientWidth)
//             banner.style.translate = count * banner.clientWidth + "px";
//             count++;
//         }
//         else {
//             count = 1;
//             banner.style.translate = "0%";
//         }

//     }


//     setInterval(function () {
//         slide();
//     }, 5000)


// }


// Add this to your existing script.js file

document.addEventListener('DOMContentLoaded', function () {
  const slides = document.querySelectorAll('.slide');
  const prevBtn = document.querySelector('.prev');
  const nextBtn = document.querySelector('.next');
  let currentSlide = 0;

  function showSlide(index) {
    slides[currentSlide].classList.remove('active');
    slides[index].classList.add('active');
    currentSlide = index;
  }

  function nextSlide() {
    let nextIndex = (currentSlide + 1) % slides.length;
    showSlide(nextIndex);
  }

  function prevSlide() {
    let prevIndex = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(prevIndex);
  }

  // Auto-advance slides every 5 seconds
  setInterval(nextSlide, 5000);

  // Event listeners for manual navigation
  nextBtn.addEventListener('click', nextSlide);
  prevBtn.addEventListener('click', prevSlide);
});




document.addEventListener('DOMContentLoaded', function () {
  const slider = document.querySelector('.slider');
  const slides = document.querySelectorAll('.slide');
  const prevBtn = document.querySelector('.slider-btn.prev');
  const nextBtn = document.querySelector('.slider-btn.next');
  let currentSlide = 0;

  function setSliderHeight() {
    const activeSlide = document.querySelector('.slide.active');
    if (activeSlide && slider) {
      slider.style.height = `${activeSlide.offsetHeight}px`;
    }
  }

  function showSlide(n) {
    slides[currentSlide].classList.remove('active');
    currentSlide = (n + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
    setSliderHeight();
  }

  function nextSlide() {
    showSlide(currentSlide + 1);
  }

  function prevSlide() {
    showSlide(currentSlide - 1);
  }

  // Set initial height
  setSliderHeight();

  // Update height on window resize
  window.addEventListener('resize', setSliderHeight);

  // Event listeners for buttons
  nextBtn.addEventListener('click', nextSlide);
  prevBtn.addEventListener('click', prevSlide);

  // Optional: Auto-slide every 5 seconds
  setInterval(nextSlide, 5000);
});