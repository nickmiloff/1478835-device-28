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
          if (x > (MAX - this.pin.offsetWidth)) {
            x = MAX - this.pin.offsetWidth;
          }
          if (x > (secondPin.pin.offsetLeft - this.pin.offsetWidth)) {
             x = secondPin.pin.offsetLeft - this.pin.offsetWidth;
          }

          this.pin.style.left = x + "px";
          depth.style.left = x + "px";

          return x; }
};

var secondPin = {
  pin: document.querySelector(".value-level__pin--second"),
  value: document.querySelector(".value-level__value--second"),
  label: document.querySelector(".value-level__label--second"),
  getX: function (x) {
          if (x < (MIN + firstPin.pin.offsetWidth)) {
            x = MIN + firstPin.pin.offsetWidth;
          }
          if (x > MAX) {
            x = MAX;
          }
          if (x < firstPin.pin.offsetLeft + firstPin.pin.offsetWidth) {
            x = firstPin.pin.offsetLeft + firstPin.pin.offsetWidth;
          }

          this.pin.style.left = x + "px";
          depth.style.right = (MAX - x) + "px";

          return x;}
}

try {
  var MIN = 0;
  var MAX = line.offsetWidth - firstPin.pin.offsetWidth;
  var maxPrice = firstPin.value.max;
} catch {
  console.log("Is no catalog page");
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
      x = secondPin.getX(x);
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
    firstPin.value.value = Math.floor(x / MAX * maxPrice);
  } else {
    var x = secondPin.value.value * MAX / maxPrice;
    x = secondPin.getX(x);
    secondPin.value.value = Math.floor(x / MAX * maxPrice);
  }
};

document.querySelectorAll(".value-level__value").forEach(function (value) {
  value.addEventListener("change", function (evt) { numberChange(evt); })
});

document.querySelectorAll(".value-level__pin").forEach(function (pin) {
  pin.addEventListener("mousedown", function (evt) { sliderHandler(evt); })
});
// -------------------------------------------------------------------------
var mapPopup = document.querySelector(".map.popup");
var writeUsPopup = document.querySelector(".write-us.popup");

mapPopup.querySelector(".popup__button--close").addEventListener("click", function () {
  mapPopup.classList.remove("popup--active");
  document.querySelector(".contacts__map").focus();
});

writeUsPopup.querySelector(".popup__button--close").addEventListener("click", function () {
  writeUsPopup.classList.remove("popup--active");
  document.querySelector(".button.button--contacts").focus();
});

document.querySelector(".contacts__map").addEventListener("click", function (evt) {
  evt.preventDefault();
  mapPopup.classList.add("popup--active");
  mapPopup.querySelector(".popup__button--close").focus();
});

document.querySelector(".button--contacts").addEventListener("click", function (evt) {
  evt.preventDefault();
  writeUsPopup.classList.add("popup--active");
  writeUsPopup.querySelector(".popup__button--close").focus();
});
//----------------------------------------------------------------------------
var promoSliderButtons = document.querySelectorAll(".promo-slider__button");
var promoSliderList = document.querySelector(".promo-slider__list");

var removePromoSliderActive = function () {
  document.querySelector(".promo-slider__button--active").classList.remove("promo-slider__button--active");
  document.querySelector(".promo-slider__slide--active").classList.remove("promo-slider__slide--active");
}

promoSliderButtons.forEach(function (button, i) {
  button.addEventListener("click", function (evt) {
    evt.preventDefault();

    removePromoSliderActive();
    button.classList.add("promo-slider__button--active");
    promoSliderList.children[i].classList.add("promo-slider__slide--active");
  })
});
//----------------------------------------------------------------------------
var servicesSliderButtons = document.querySelector(".services__list-control").querySelectorAll(".button.button--slider");
var servicesSliderList = document.querySelector(".services__list");

var removeServicesSliderActive = function () {
  document.querySelector(".services__list-control").querySelector(".button--slider--active").classList.remove("button--slider--active");
  document.querySelector(".services__item--active").classList.remove("services__item--active");
}

servicesSliderButtons.forEach(function (button, i) {
  button.addEventListener("click", function (evt) {
    evt.preventDefault();

    removeServicesSliderActive();
    button.classList.add("button--slider--active");
    servicesSliderList.children[i].classList.add("services__item--active");
  })
});