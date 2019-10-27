# SliderJS

A tiny slider component built with Vanilla JavaScript.

### Installing

- Download the .zip file.
- Copy slider.min.css into your working directory and add the link reference to the markup.
- Copy slider.min.js into your working directory and add the script reference to the markup.

### Usage

Add a container with the class .slider and the slides with the class .slide:

```html
<div id="slider" class="slider">
  <div class="slide">slide1</div>
  <div class="slide">slide2</div>
  <div class="slide">slide3</div>
</div>
```

Add a next and prev button triggers with the class .slider-btn:

```html
<div id="prev-btn" class="slider-btn">prev</div>
<div id="next-btn" class="slider-btn">next</div>
```

Initialize the slider component:

```html
<script>
  const slider = Object.create(HorizontalSlider).initialize(
    document.querySelector("#slider"),
    document.querySelector("#next-btn"),
    document.querySelector("#prev-btn")
  );
</script>
```

For a vertical slider use VerticalSlider instead:

```html
<script>
  const slider = Object.create(VerticalSlider).initialize(...);
</script>
```

You are all set!

## Contributing

If you find any issues, feel free to submit a pull request.

## Authors

- **iClusterDev** - _Initial work_ - [iClusterDev](https://github.com/iClusterDev)

## License

This project is licensed under the MIT License.
