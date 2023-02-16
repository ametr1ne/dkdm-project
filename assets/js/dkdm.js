$('#portfolio-slider').owlCarousel({
    items: 3,
    margin: 30,
    loop: true,
    center: true,
    autoWidth: true,
    stagePadding: 20
})

// program course accordeon

$('.program-item__header').on('click', function() {
    let height = $(this).next().find('ul')[0].clientHeight + 10

    if ($(this).parent().hasClass('list--opened')) {
        $(this).next().css('max-height', "0");
    } else {
        $(this).next().css('max-height', height + "px");
    }
    
    $(this).parent().toggleClass('list--opened')
})

// parallax

const rotatingStar = document.getElementById('rotating-star')
const headBlock = $('.head')

window.addEventListener("scroll", function() {
    if (window.pageYOffset < 1200) {
        headBlockBounds = headBlock[0].getBoundingClientRect()
        rotatingStar.style.transform = "rotate("+parseInt(headBlockBounds.top * .1)+"deg)"
    }
});

const headCard1 = document.querySelector('.head__card_card1')
const headCard2 = document.querySelector('.head__card_card2')

window.addEventListener("scroll", function() {
    if (window.pageYOffset < 1400) {
        card1Bounds = headCard1.getBoundingClientRect()
        card2Bounds = headCard2.getBoundingClientRect()
        headCard1.style.transform = "translateY("+parseInt(card1Bounds.top * .2 / 2)+"px)"
        headCard2.style.transform = "translateY("+parseInt(card2Bounds.top * .1 / 2)+"px)"
    }
});

// inputs 

const input = $('.input')

function inputs() {
    input.on('focus', function () {
        $(this).next().addClass('label_active')
    })

    input.on('blur', function () {
        if ($(this).val().length < 1) {
            $(this).next().removeClass('label_active');
        }
    });
}

$(document).ready(function () {

    $(input).each(function () {
        if ($(this).val().length < 1) {
            $(this).next().removeClass('label_active');
        } else {
            $(this).next().addClass('label_active');
        }
    })

    inputs()
})

// smooth scroll

$(document).ready(function(){
    $("a").on('click', function(event) {
      if (this.hash !== "") {
        event.preventDefault();
        var hash = this.hash;
  
        $('html, body').animate({
          scrollTop: $(hash).offset().top
        }, 800, function(){
          window.location.hash = hash;
        });
      } 
    });
  });
