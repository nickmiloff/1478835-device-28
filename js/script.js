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