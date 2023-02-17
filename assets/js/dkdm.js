// randomizer students avatars

// const avatars = $('.avatars')


// window.addEventListener('scroll', function() {
//     const rects = avatars[0].getBoundingClientRect()
//     console.log(rects);

//     if (rects.top < 1000) {
        
//     }
// })

const array= []

for(i=1;i<=10;i++){
    array.push(i)
 }
 
 setTimeout(function() {
     $('.bubble').each(function() {
         const randomIndex = array.splice(Math.random()*array.length,1)[0]
         $(this).attr('src', '../assets/img/dkdm/students/student' + randomIndex +'.jpg')
         $(this).addClass('bubble-loaded')
     })
 }, 500)

// portfolio slider

const slider = tns({
    container: '.portfolio__slider',
    items: 3,
    fixedWidth: 400,
    gutter: 20,
    center: true,
    controls: false,
    mouseDrag: true
});

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

// form handler

function formHandler(id, url) {
    $.ajax({
        url: url,
        type: "POST",
        data: $(id).serialize(),
        beforeSend: function() {
            $(id).find('.submit-btn').attr('disabled', true);
            $(id).find('.submit-btn').addClass('loading-btn');
            $(id).find('.submit-btn').text('Подождите, отправляем...')
        },
        complete: function() {
            $(id).find('.submit-btn').attr('disabled', false);
            $(id).find('.submit-btn').removeClass('loading-btn');
            $(id).find('.submit-btn').text('Отправить')
        },
        success: function (data) {
            // amoSendler(id)
            $('body').addClass('form_done');
            $(id).trigger('reset');
            $('.input__wrap input').val('')
            $('.input__wrap input').attr('value', '')
        }
    });
}

$('#form').validate({
    errorElement: 'span',
    rules: {
        price: {
            required: true
        },
        name: {
            required: true,
            minlength: 3
        },
        email: {
            required: true,
            email: true
        },
        phone: {
            required: true
        }
    },
    messages: {
        email: {
            email: "Некорректный e-mail"
        },
        price: {
            required: "Выберите тариф"
        }
    },
    submitHandler: function () {
        formHandler('#form', '/dkdm/request.php')
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

// interactive block

$('.tech-item').on('click', function() {
    const order = $(this).attr('data-order')
    $('.img-' + order).toggleClass('img_visible')
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

// phone input

$(document).ready(function(){
    const phoneinput = document.querySelector(".phone-mask");

    const iti = intlTelInput(phoneinput, {
        preferredCountries: [
            'ru',
            'by',
            'ua'
        ],
        utilsScript: 'http://127.0.0.1:5500/assets/js/int_tel_input/build/js/utils.js',
        autoPlaceholder: 'aggressive',
        nationalMode: false
    })

    $('.fake-code').text("+7 ")

    $(phoneinput).on('input keyup', function () {
        phoneinput.value = phoneinput.value.replace(/[^\d()+]+$/, '')
    })

    function settingFakeCode() {
        let countryData = iti.getSelectedCountryData();
        $(phoneinput).val('+' + countryData.dialCode)
        $('.fake-code').text("+" + countryData.dialCode + ' ')
        const fakeCodeWidth = $('.fake-code').outerWidth()
        if (window.matchMedia('(max-width: 1024px)').matches) {
            $('.fake-code').css('left', '48px')
        } else {
            if (fakeCodeWidth > 48) {
                $('.fake-code').css('left', '46px')
            } else {
                $('.fake-code').css('left', '47px')
            }
        }
    }

    $(phoneinput).on('focus', function () {
        settingFakeCode()
    })

    phoneinput.addEventListener("countrychange", function () {
        settingFakeCode()
    });

    phoneinput.addEventListener('input', function () {
        let dataCountry = iti.getSelectedCountryData()
        this.value = "+" + dataCountry.dialCode + this.value.slice(dataCountry.dialCode.length + 1);
    });
})
