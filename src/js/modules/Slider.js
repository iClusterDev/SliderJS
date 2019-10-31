const Slider = {
  current: 0,
  slider: null,
  nextBtn: null,
  prevBtn: null,
  direction: null,

  init: function(sliderElement, nextBtn, prevBtn, sliderDirection) {
    this.direction = sliderDirection || "left";

    if (sliderElement && sliderElement.children.length > 0) {
      this.slider = sliderElement;
      this.slides().forEach((slideItem, index) => {
        if (index === this.current) {
          slideItem.style.opacity = 1;
        } else {
          slideItem.style.opacity = 0;
        }
        slideItem.style[sliderDirection] = `${index * 100}%`;
      });
    }

    if (nextBtn && prevBtn) {
      this.nextBtn = nextBtn;
      this.prevBtn = prevBtn;
      this.updateControls();
      nextBtn.addEventListener("click", () => {
        this.next();
      });
      prevBtn.addEventListener("click", () => {
        this.prev();
      });
    }
  },

  next: function() {
    if (this.current < this.slides().length - 1) {
      this.current += 1;
      this.updateControls();
      this.slides().forEach((slideItem, index) => {
        this.show(slideItem, index);
        this.shift(slideItem, -100);
      });
    }
  },

  prev: function() {
    if (this.current > 0) {
      this.current -= 1;
      this.updateControls();
      this.slides().forEach((slideItem, index) => {
        this.show(slideItem, index);
        this.shift(slideItem, 100);
      });
    }
  },

  show: function(slideItem, index) {
    if (index === this.current) {
      slideItem.style.opacity = 1;
    } else {
      slideItem.style.opacity = 0;
    }
  },

  shift: function(slide, amount) {
    let currentPosition = parseInt(slide.style[this.direction], 10);
    let newPosition = currentPosition + amount;
    slide.style[this.direction] = `${newPosition}%`;
  },

  slides: function() {
    return this.slider ? Array.from(this.slider.children) : [];
  },

  updateControls: function() {
    const first = 0;
    const last = this.slides().length - 1;
    switch (this.current) {
      case first:
        this.prevBtn.classList.add("disabled");
        this.nextBtn.classList.remove("disabled");
        break;
      case last:
        this.prevBtn.classList.remove("disabled");
        this.nextBtn.classList.add("disabled");
        break;
      default:
        this.prevBtn.classList.remove("disabled");
        this.nextBtn.classList.remove("disabled");
        break;
    }
  }
};

const HorizontalSlider = Object.create(Slider);
HorizontalSlider.initialize = function(sliderElement, nextBtn, prevBtn) {
  this.init(sliderElement, nextBtn, prevBtn, "left");
};

const VerticalSlider = Object.create(Slider);
VerticalSlider.initialize = function(sliderElement, nextBtn, prevBtn) {
  this.init(sliderElement, nextBtn, prevBtn, "top");
};

export { HorizontalSlider, VerticalSlider };
