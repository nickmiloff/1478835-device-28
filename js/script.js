// Главная страница - Промо-слайдер, слайдер-сервисов, попапы
if (document.body.id == "home-page") {

  var promoSliderList = document.querySelector(".promo-slider__list");
  var servicesSliderList = document.querySelector(".services__list");
  var servicesSliderControl = document.querySelector(".services__list-control");
  var mapModal = document.querySelector(".map.modal");
  var mapModalOpenButton = document.querySelector(".contacts__map");
  var mapModalCloseButton = mapModal.querySelector(".modal__button--close");
  var writeUsModal = document.querySelector(".write-us.modal");
  var writeUsModalOpenButton =  document.querySelector(".button.button--contacts");
  var writeUsModalCloseButton = writeUsModal.querySelector(".modal__button--close");

  var removePromoSliderActive = function () {
    document.querySelector(".promo-slider__button--active").classList.remove("promo-slider__button--active");
    document.querySelector(".promo-slider__slide--active").classList.remove("promo-slider__slide--active");
  }

  var removeServicesSliderActive = function () {
    servicesSliderControl.querySelector(".button--slider--active").classList.remove("button--slider--active");
    document.querySelector(".services__item--active").classList.remove("services__item--active");
  }

  document.querySelectorAll(".promo-slider__button").forEach(function (button, i) {
    button.addEventListener("click", function (evt) {
      evt.preventDefault();

      removePromoSliderActive();
      button.classList.add("promo-slider__button--active");
      promoSliderList.children[i].classList.add("promo-slider__slide--active");
    })
  });

  servicesSliderControl.querySelectorAll(".button.button--slider").forEach(function (button, i) {
    button.addEventListener("click", function (evt) {
      evt.preventDefault();
  
      removeServicesSliderActive();
      button.classList.add("button--slider--active");
      servicesSliderList.children[i].classList.add("services__item--active");
    })
  });

  mapModalCloseButton.addEventListener("click", function () {
    mapModal.classList.remove("modal--active");
    mapModalOpenButton.focus();
  });

  mapModalOpenButton.addEventListener("click", function (evt) {
    evt.preventDefault();
    mapModal.classList.add("modal--active");
    mapModalCloseButton.focus();
  });
      
  writeUsModalCloseButton.addEventListener("click", function () {
    writeUsModal.classList.remove("modal--active");
    writeUsModalOpenButton.focus();
  });
  
  writeUsModalOpenButton.addEventListener("click", function (evt) {
    evt.preventDefault();
    writeUsModal.classList.add("modal--active");
    writeUsModalCloseButton.focus();
  });
}

// Страница каталога - Регулятор цены
if (document.body.id == "catalog-page") {

  var depth = document.querySelector(".value-level__depth");
  var line = document.querySelector(".value-level__line");

  var firstPin = {
    pin: document.querySelector(".value-level__pin--first"),
    value: document.querySelector(".value-level__value--first"),
    label: document.querySelector(".value-level__label--first"),
    getX: function (x) {
            if (x < MIN) {
              x = MIN;
             }
            if (x > MAX) {
              x = MAX;
            }
            if (x > secondPin.pin.offsetLeft) {
               x = secondPin.pin.offsetLeft;
            }

            this.pin.style.left = x + "px";
            depth.style.left = x + "px";

            return x; }
  };

  var secondPin = {
    pin: document.querySelector(".value-level__pin--second"),
    value: document.querySelector(".value-level__value--second"),
    label: document.querySelector(".value-level__label--second"),
    getX: function (x, em) {
            if (x < MIN) {
              x = MIN;
            }
            if (x > MAX) {
              x = MAX;
            }
            if (x < firstPin.pin.offsetLeft) {
              x = firstPin.pin.offsetLeft;
            }
            if (firstPin.pin.offsetLeft === secondPin.pin.offsetLeft && (secondPin.pin.offsetLeft - x) > -1) {
              x = firstPin.pin.offsetLeft + em.movementX;
              x = firstPin.getX(x);
              firstPin.value.value = Math.floor(x / MAX * maxPrice);
            }
          

            this.pin.style.left = x + "px";
            depth.style.right = (MAX - x) + "px";

            return x;}
  }

  var MIN = 0;
  var MAX = line.offsetWidth - firstPin.pin.offsetWidth;
  var maxPrice = firstPin.value.max;

  var sliderHandler = function (evt) {
    evt.preventDefault();

    var mouseMoveHandler = function (em) {
      em.preventDefault();

      if (evt.target.classList.contains('value-level__pin--first')) {
        var x = firstPin.pin.offsetLeft + em.movementX;
        x = firstPin.getX(x);
        firstPin.value.value = Math.floor(x / MAX * maxPrice);
      } else {
        var x = secondPin.pin.offsetLeft + em.movementX;
        x = secondPin.getX(x, em);
        secondPin.value.value = Math.floor(x / MAX * maxPrice);
      };
    };

    var mouseUpHandler = function (eu) {
      eu.preventDefault();

      document.removeEventListener("mousemove", mouseMoveHandler);
      document.removeEventListener("mouseup", mouseUpHandler);
    };

    document.addEventListener("mousemove", mouseMoveHandler);
    document.addEventListener("mouseup", mouseUpHandler);
  };

  var numberChange = function (evt) {
    if (evt.target.classList.contains('value-level__value--first')) {
      var x = firstPin.value.value * MAX / maxPrice;
      x = firstPin.getX(x);
      if (x < (firstPin.value.value * MAX / maxPrice)) {
        firstPin.value.value = Math.floor(x / MAX * maxPrice);
      }
    } else {
      var x = secondPin.value.value * MAX / maxPrice;
      x = secondPin.getX(x);
      if (x < (secondPin.value.value * MAX / maxPrice)) {
        secondPin.value.value = Math.floor(x / MAX * maxPrice);
      }
    }
  };

  document.querySelectorAll(".value-level__value").forEach(function (value) {
    value.addEventListener("change", function (evt) { numberChange(evt); })
  });

  document.querySelectorAll(".value-level__pin").forEach(function (pin) {
    pin.addEventListener("mousedown", function (evt) { sliderHandler(evt); })
  });
}