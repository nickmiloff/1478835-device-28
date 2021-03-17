// Главная страница - Промо-слайдер, слайдер-сервисов, попапы
if (document.body.id == "home-page") {

  var promoSliderList = document.querySelector(".promo-slider__list");
  var servicesSliderList = document.querySelector(".services__list");
  var servicesSliderControl = document.querySelector(".services__list-control");
  var modal = document.querySelector(".modal");
  var mapModal = document.querySelector(".map.modal");
  var mapModalOpenButton = document.querySelector(".contacts__map");
  var mapModalCloseButton = mapModal.querySelector(".modal__button--close");
  var writeUsModal = document.querySelector(".write-us.modal");
  var writeUsModalForm = writeUsModal.querySelector("form");
  var writeUsModalOpenButton =  document.querySelector(".button.button--contacts");
  var writeUsModalCloseButton = writeUsModal.querySelector(".modal__button--close");
  var writeUsModalNameField = writeUsModal.querySelector(".write-us__name");
  var writeUsModalEmailField = writeUsModal.querySelector(".write-us__email");
  var writeUsModalTextField = writeUsModal.querySelector(".write-us__text");

  var ESC_KEYCODE = 27;

  var removePromoSliderActive = function () {
    document.querySelector(".promo-slider__button--active").classList.remove("promo-slider__button--active");
    document.querySelector(".promo-slider__slide--active").classList.remove("promo-slider__slide--active");
  }

  var removeServicesSliderActive = function () {
    servicesSliderControl.querySelector(".button--slider--active").classList.remove("button--slider--active");
    document.querySelector(".services__item--active").classList.remove("services__item--active");
  }

  var checkInputValidity = function (input) {
    if (input.checkValidity() === false) {
      input.classList.add("invalid");
      return false;
    }
    else if (input.checkValidity() === true) {
      input.classList.remove("invalid");
      return true;
    }
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

  window.addEventListener("keydown", function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      if (mapModal.classList.contains("modal--active")) {
        mapModal.classList.remove("modal--active");
        mapModalOpenButton.focus();
      }
      if (writeUsModal.classList.contains("modal--active")) {
        writeUsModal.classList.remove("modal--active");
        writeUsModalOpenButton.focus();
      }
    }
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
    writeUsModal.classList.remove("modal--shake");
    writeUsModal.classList.add("modal--active");
    var localName = localStorage.getItem("name");
    var localEmail = localStorage.getItem("email");
    if (localName) {
      writeUsModalNameField.value = localName;
    }
    if (localEmail) {
      writeUsModalEmailField.value = localEmail
    }
    if (!localName) {
      writeUsModalNameField.focus();
    } else if (!localEmail) {
      writeUsModalEmailField.focus();
    } else {
      writeUsModalTextField.focus();
    }
  });

  writeUsModalNameField.addEventListener("input", function () {
    checkInputValidity(writeUsModalNameField);
  });

  writeUsModalEmailField.addEventListener("input", function () {
    checkInputValidity(writeUsModalEmailField);
  });

  writeUsModalTextField.addEventListener("input", function () {
    checkInputValidity(writeUsModalTextField);
  });

  writeUsModalForm.addEventListener("submit", function (evt) {
    if (writeUsModalForm.checkValidity() === false) {
      evt.preventDefault();

      if (checkInputValidity(writeUsModalNameField)) {
        localStorage.setItem("name", writeUsModalNameField.value);
      }
      if (checkInputValidity(writeUsModalEmailField)) {
        localStorage.setItem("email", writeUsModalEmailField.value);
      }
      checkInputValidity(writeUsModalTextField);

      writeUsModal.classList.remove("modal--shake");
      void writeUsModal.offsetWidth;
      writeUsModal.classList.add("modal--shake");
    }
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
    getX: function (x, mx = 0) {
            if (x < MIN) {
              x = MIN;
            }
            if (x > MAX) {
              x = MAX;
            }
            if (x < firstPin.pin.offsetLeft) {
              x = firstPin.pin.offsetLeft;
            }
            if (firstPin.pin.offsetLeft === secondPin.pin.offsetLeft && (secondPin.pin.offsetLeft - x) > -1 && mx != 0) {
              x = firstPin.pin.offsetLeft + mx;
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

  var toValue = function (pin) {
    if (pin.classList.contains('value-level__pin--first')) {
      return firstPin.value;
    } else {
      return secondPin.value;
    }
  }

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
        x = secondPin.getX(x, em.movementX);
        secondPin.value.value = Math.floor(x / MAX * maxPrice);
      };
    };

    var mouseUpHandler = function (eu) {
      eu.preventDefault();

      console.log(firstPin.value);

      document.removeEventListener("mousemove", mouseMoveHandler);
      document.removeEventListener("mouseup", mouseUpHandler);
    };

    document.addEventListener("mousemove", mouseMoveHandler);
    document.addEventListener("mouseup", mouseUpHandler);
  };

  var mobileSliderHandler = function (evt) {
    evt.preventDefault();

    var touchStart = evt.changedTouches[0].pageX;

    var touchMoveHandler = function (tm) {

      var touchCurrent = tm.changedTouches[0].pageX - touchStart;

      if (evt.target.classList.contains('value-level__pin--first')) {
        var x = firstPin.pin.offsetLeft + touchCurrent;
        x = firstPin.getX(x);
        firstPin.value.value = Math.floor(x / MAX * maxPrice);
      } else {
        var x = secondPin.pin.offsetLeft + touchCurrent;
        x = secondPin.getX(x, touchCurrent);
        secondPin.value.value = Math.floor(x / MAX * maxPrice);
      };

      touchStart = tm.changedTouches[0].pageX;
    };

    var touchEndHandler = function (te) {
      te.preventDefault();

      document.removeEventListener("touchmove", touchMoveHandler);
      document.removeEventListener("touchend", touchEndHandler);
    }

    document.addEventListener("touchmove", touchMoveHandler);
    document.addEventListener("touchend", touchEndHandler);
  }

  var numberChange = function (index) {
    if (index === 0) {
      var x = firstPin.value.value * MAX / maxPrice;
      x = firstPin.getX(x);
      if (x < (firstPin.value.value * MAX / maxPrice)) {
        firstPin.value.value = secondPin.value.value;
      }
    } else {
      var x = secondPin.value.value * MAX / maxPrice;
      x = secondPin.getX(x);
      if (x > (secondPin.value.value * MAX / maxPrice)) {
        secondPin.value.value = firstPin.value.value;
      }
    }
  };

  document.querySelectorAll(".value-level__value").forEach(function (value, index) {
    value.addEventListener("change", function () { numberChange(index); })
  });

  document.querySelectorAll(".value-level__pin").forEach(function (pin, index) {
    pin.addEventListener("mousedown", function (evt) { sliderHandler(evt); });
    pin.addEventListener("touchstart", function (evt) { mobileSliderHandler(evt);})
    pin.addEventListener("keydown", function (evt) {
      if (evt.keyCode === 39) {
        toValue(pin).value = parseInt(toValue(pin).value) + 10;
        numberChange(index);
      }
      if (evt.keyCode === 37) {
        toValue(pin).value = parseInt(toValue(pin).value) - 10;
        numberChange(index);
      }
    });
  });
}
