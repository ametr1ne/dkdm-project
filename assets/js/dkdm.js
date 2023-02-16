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
    $(this).parent().toggleClass('list--opened')
})

// parallax

const rotatingStar = document.getElementById('rotating-star')
const headBlock = $('.head-block')

window.addEventListener("scroll", function() {
    if (window.pageYOffset < 1200) {
        headBlockBounds = headBlock[0].getBoundingClientRect()
        rotatingStar.style.transform = "rotate("+parseInt(headBlockBounds.top * .1)+"deg)"
    }
});

const headCard1 = document.querySelector('.head-block__card_card1')
const headCard2 = document.querySelector('.head-block__card_card2')

window.addEventListener("scroll", function() {
    if (window.pageYOffset < 1400) {
        card1Bounds = headCard1.getBoundingClientRect()
        card2Bounds = headCard2.getBoundingClientRect()
        headCard1.style.transform = "translateY("+parseInt(card1Bounds.top * .2 / 2)+"px)"
        headCard2.style.transform = "translateY("+parseInt(card2Bounds.top * .1 / 2)+"px)"
    }
});

