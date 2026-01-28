const slides = document.querySelectorAll('.slide');
let index = 0;

// Show first slide immediately
slides[index].classList.add('active');

function showSlide() {
  slides.forEach((slide, i) => {
    slide.classList.remove('active');
    if (i === index) slide.classList.add('active');
  });
  index = (index + 1) % slides.length;
}

setInterval(showSlide, 3000);





const form = document.getElementById('commentForm');
const commentList = document.getElementById('commentList');

form.addEventListener('submit', function(e) {
  e.preventDefault();

  const name = document.getElementById('customerName').value;
  const comment = document.getElementById('customerComment').value;



  form.addEventListener('submit', function(e) {
  e.preventDefault();

  alert("Thank you! Your comment has been submitted.");

  form.reset();
});

  

});