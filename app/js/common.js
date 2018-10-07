//Scroll
const anchors = document.querySelectorAll('a[href*="#"]')

for (let anchor of anchors) {
  anchor.addEventListener('click', function (e) {
    e.preventDefault()

    const blockID = anchor.getAttribute('href')

    document.querySelector('' + blockID).scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
  })
}

//Modal
var modal = document.getElementById('modalWindow');
var btn = document.getElementById("modalTrigger");
var span = document.getElementsByClassName("modal__close")[0];

btn.onclick = function() {
    modal.style.display = "block";
}
span.onclick = function() {
    modal.style.display = "none";
}
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

//Carousel
$(document).ready(function(){
  $('.carousel').slick({
    dots: false,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3000,
    infinite: true,
    speed: 1500,
    fade: true,
    cssEase: 'linear',
    adaptiveHeight: true,
    prevArrow: '<div class="slick-prev">Previous</div>',
    nextArrow: '<div class="slick-next slick-next-rev">Next</div>'
  });
});

//Validation
$.validate({
    modules : 'date, security'
});
