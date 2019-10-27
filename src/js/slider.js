import Slider from "./modules/Slider";

(function sliderJs(global) {
  const HorizontalSlider = Object.create(Slider);
  HorizontalSlider.initialize = function(sliderElement, nextBtn, prevBtn) {
    this.init(sliderElement, nextBtn, prevBtn, "left");
  };
  global.HorizontalSlider = HorizontalSlider;

  const VerticalSlider = Object.create(Slider);
  VerticalSlider.initialize = function(sliderElement, nextBtn, prevBtn) {
    this.init(sliderElement, nextBtn, prevBtn, "top");
  };
  global.VerticalSlider = VerticalSlider;
})(window);
