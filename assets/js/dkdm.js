// randomizer students avatars

const array = [];

for (i = 1; i <= 10; i++) {
  array.push(i);
}

setTimeout(function () {
  $(".bubble").each(function () {
    const randomIndex = array.splice(Math.random() * array.length, 1)[0];
    $(this).attr("src", "../assets/img/dkdm/students/student" + randomIndex + ".jpg");
    $(this).addClass("bubble-loaded");
  });
}, 500);

// portfolio slider

const slider = tns({
  container: ".portfolio__slider",
  items: 3,
  gutter: 20,
  center: true,
  preventScrollOnTouch: "auto",
  controls: false,
  mouseDrag: true,
  responsive: {
    320: {
      fixedWidth: 280,
    },
    767: {
      fixedWidth: 400,
    },
  },
});

// party slider

document.addEventListener("DOMContentLoaded", function () {
  const parties = tns({
    container: ".party__slider",
    mouseDrag: true,
    gutter: 20,
    controls: false,
    preventScrollOnTouch: "auto",
    center: true,
    loop: false,
    fixedWidth: 280,
    nav: false,
    responsive: {
      767: {
        disable: true,
      },
    },
  });

  const imgbox = document.querySelector(".tech__imgbox");

  let marginLeft = imgbox.getBoundingClientRect().left;

  const techSplide = $(".tech__splide");
  const techSplideTrack = $(".tech__splide-track");
  const techSplideList = $(".tech__items");

  const splide = new Splide(".tech__splide", {
    autoWidth: true,
    gap: 11,
    arrows: false,
    padding: marginLeft,
    pagination: false,
  });

  if (matchMedia("(max-width: 767px)").matches) {
    if (!techSplide.hasClass("splide")) {
      addingSliderClasses();
    }
    splide.mount();
  } else {
    removingSliderClasses();
  }

  $(window).on("resize", function () {
    if (matchMedia("(max-width: 767px)").matches) {
      marginLeft = imgbox.getBoundingClientRect().left;

      splide.options = {
        padding: marginLeft,
      };
    }
  });

  function addingSliderClasses() {
    techSplide.addClass("splide");
    techSplideTrack.addClass("splide__track");
    techSplideList.addClass("splide__list");
  }

  function removingSliderClasses() {
    techSplide.removeClass("splide");
    techSplideTrack.removeClass("splide__track");
    techSplideList.removeClass("splide__list");
  }

  const facts_slider = tns({
    container: ".facts__slider",
    mouseDrag: true,
    gutter: 20,
    controls: false,
    preventScrollOnTouch: "auto",
    center: true,
    loop: false,
    fixedWidth: 280,
    nav: false,
    responsive: {
      767: {
        disable: true,
      },
    },
  });
});

// program course accordeon

$(".program-item__header").on("click", function () {
  let height = $(this).next().find("ul")[0].clientHeight + 10;

  if ($(this).parent().hasClass("list--opened")) {
    $(this).next().css("max-height", "0");
  } else {
    $(this)
      .next()
      .css("max-height", height + "px");
  }

  $(this).parent().toggleClass("list--opened");
});

// parallax

const rotatingStar = document.getElementById("rotating-star");
const headBlock = $(".head");

const headCard1 = document.querySelector(".head__card_card1");
const headCard2 = document.querySelector(".head__card_card2");

if (window.matchMedia("(min-width: 767px)").matches) {
  window.addEventListener("scroll", function () {
    if (window.pageYOffset < 1200) {
      headBlockBounds = headBlock[0].getBoundingClientRect();
      rotatingStar.style.transform = "rotate(" + parseInt((headBlockBounds.top * 0.1) / 2) + "deg)";
    }
  });

  window.addEventListener("scroll", function () {
    if (window.pageYOffset < 1400) {
      card1Bounds = headCard1.getBoundingClientRect();
      card2Bounds = headCard2.getBoundingClientRect();
      headCard1.style.transform = "translateY(" + parseInt((card1Bounds.top * 0.2) / 2) + "px)";
      headCard2.style.transform = "translateY(" + parseInt((card2Bounds.top * 0.1) / 2) + "px)";
    }
  });
}

// form handler

const url = "https://study.yodizschool.ru/wp-content/themes/yz-study/restApi/formsHandler.php";
let clntID;
const pipelineID = 6399522; // воронка "ДКДМ"
const statusID = 54776398; //  этап "Первичный контакт"

async function sendDataToAmo() {
  let obj;
  let add = [
    { name: "clientID", value: clntID },
    { name: "pipelineID", value: pipelineID },
    { name: "statusID", value: statusID },
  ];

  obj = {
    data: $("#form").serializeArray(),
    additional: add,
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      mode: "cors",
      body: JSON.stringify(obj),
    });
    let data = await response.json();
  } catch (e) {
    console.error(e);
  }
}

function formHandler(id, url) {
  sendDataToAmo();

  $.ajax({
    url: url,
    type: "POST",
    data: $(id).serialize(),
    beforeSend: function () {
      $(id).find(".submit-btn").attr("disabled", true);
      $(id).find(".submit-btn").addClass("loading-btn");
      $(id).find(".submit-btn").text("Подождите, отправляем...");
    },
    complete: function () {
      $(id).find(".submit-btn").attr("disabled", false);
      $(id).find(".submit-btn").removeClass("loading-btn");
      $(id).find(".submit-btn").text("Отправить");
    },
    success: function (res) {
      formSubmitted(id);
    },
  });
}

$("#form").validate({
  errorElement: "span",
  rules: {
    price: {
      required: true,
    },
    name: {
      required: true,
      minlength: 3,
    },
    email: {
      required: true,
      email: true,
    },
    phone: {
      required: true,
    },
  },
  messages: {
    email: {
      email: "Некорректный e-mail",
    },
    price: {
      required: "Выберите тариф",
    },
  },
  submitHandler: function () {
    formHandler("#form", "request.php");
  },
});

function formSubmitted(id) {
  $(".form-done").css("display", "flex");
  $(".form-done").addClass("show");
  $(".form-wrap__title")
    .addClass("hide")
    .animate({ height: 0 }, 600, function () {
      $(this).remove();
    });
  $(".form")
    .addClass("hide")
    .animate({ height: 0 }, 600, function () {
      $(this).remove();
    });
  $(".form-wrap__bubbles")
    .addClass("hide")
    .animate({ height: 0 }, 600, function () {
      $(this).remove();
    });
  $(".form-wrap__note")
    .addClass("hide")
    .animate({ height: 0 }, 600, function () {
      $(this).remove();
    });
  // $('.form-done img').animate({borderRadius: 126}, 600)
  $(id).trigger("reset");
  $(".input__wrap input").val("");
  $(".input__wrap input").attr("value", "");
}

// inputs

const input = $(".input");

function inputs() {
  input.on("focus", function () {
    $(this).next().addClass("label_active");
  });

  input.on("blur", function () {
    if ($(this).val().length < 1) {
      $(this).next().removeClass("label_active");
    }
  });
}

$(document).ready(function () {
  $(input).each(function () {
    if ($(this).val().length < 1) {
      $(this).next().removeClass("label_active");
    } else {
      $(this).next().addClass("label_active");
    }
  });

  inputs();
});

// interactive block

$(".tech-item").on("click", function () {
  $(this).toggleClass("tech-item--active");
  // $(this).siblings().removeClass('tech-item--active')

  const order = $(this).attr("data-order");
  $(".img-" + order).toggleClass("img_visible");
});

// smooth scroll

$(document).ready(function () {
  $("a").click(function (e) {
    $("html, body").animate(
      {
        scrollTop: $($.attr(this, "href")).offset().top - 41,
      },
      600
    );
    return false;
  });
});

// phone input

$(document).ready(function () {
  const phoneinput = document.querySelector(".phone-mask");

  const iti = intlTelInput(phoneinput, {
    preferredCountries: ["ru", "by", "ua"],
    utilsScript:
      "http://m9124487.beget.tech/sharipov/dkdm-project/assets/js/int_tel_input/build/js/utils.js",
    autoPlaceholder: "aggressive",
    nationalMode: false,
  });

  $(".fake-code").text("+7 ");

  $(phoneinput).on("input keyup", function () {
    phoneinput.value = phoneinput.value.replace(/[^\d()+]+$/, "");
  });

  function settingFakeCode() {
    let countryData = iti.getSelectedCountryData();
    $(phoneinput).val("+" + countryData.dialCode);
    $(".fake-code").text("+" + countryData.dialCode + " ");
    const fakeCodeWidth = $(".fake-code").outerWidth();
    if (window.matchMedia("(max-width: 767px)").matches) {
      if (fakeCodeWidth < 44) {
        $(".fake-code").css("left", "47px");
      } else if (fakeCodeWidth < 48) {
        $(".fake-code").css("left", "46px");
      } else {
        $(".fake-code").css("left", "47px");
      }
    } else {
      if (fakeCodeWidth > 50) {
        $(".fake-code").css("left", "46.5px");
      } else if (fakeCodeWidth > 48) {
        $(".fake-code").css("left", "47px");
      } else {
        if (fakeCodeWidth > 44) {
          $(".fake-code").css("left", "46px");
        }
      }
    }
  }

  $(phoneinput).on("focus", function () {
    settingFakeCode();
  });

  phoneinput.addEventListener("countrychange", function () {
    settingFakeCode();
  });

  phoneinput.addEventListener("input", function () {
    let dataCountry = iti.getSelectedCountryData();
    this.value = "+" + dataCountry.dialCode + this.value.slice(dataCountry.dialCode.length + 1);
  });
});
