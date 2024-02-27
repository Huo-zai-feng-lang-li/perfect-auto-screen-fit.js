<p align="center">
  <a target="_blank" href="https://jshub.cn/">
  <img alt="autofit" src="./autofit.gif" width="300">
  </a>
</p>

<p align="center">
  <h3 align="center">perfect-auto-screen-fit.js</h3>
</p>

简体中文 | [English](./readme.en.md)

### perfect-auto-screen-fit.js

The most user-friendly adaptive tool to date, large screen adaptive solution, lowest cost solution, and least immersive solution

### introduce

```js
import autofit from "perfect-auto-screen-fit.js";
```

### Quick start

```js
autofit.init();
```

### Using

```js
export default {
	mounted() {
		autofit.init(
			{
				el: "body", // ID selector for the target element
				dw: 1920, // The width of the design draft
				dh: 1080, // The height of the design draft
				resize: true, // Listen for resize events
				transition: 0, // transition time
				delay: 0, // delay time
				limit: 0.1, // The minimum threshold for scaling
			},
			true
		); // Display prompt information during initialization
	},
};
```

> The above are default parameters that can be adjusted according to actual situations. Optional parameters include
>
> JavaScript
>
> - - el: Rendered dom, default to "body", must use id selector
> - - dw: The width of the design draft, default to 1920
> - - dh: The height of the design draft, default to 1080
> - - Resize: Whether to listen to resize events, default to true
> - - transition: transition time, default to 0
> - - Delay: defaults to 0
> - - limit: The default is 0.1. When the scaling threshold is not greater than this value, it will not be scaled. For example, when set to 0.1, the range of 0.9-1.1 will be reset to 1

### The impact of closing perfect auto screen fit. js

When autofit is not initialized, an error may occur where the element cannot be found. Before using autofit. off(), make sure it is initialized.

```js
autofit.off();
```
