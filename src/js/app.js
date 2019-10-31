import { HorizontalSlider, VerticalSlider } from "./modules/Slider";

const slider = Object.create(HorizontalSlider).initialize(
  document.querySelector("#slider"),
  document.querySelector("#next-btn"),
  document.querySelector("#prev-btn")
);
