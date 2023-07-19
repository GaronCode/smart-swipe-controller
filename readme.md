# smart-swipe-controller
Lib simple add additional tap events in `HTML element`
additional events:
- **swipeLeft**
- **swipeRight**
- **swipeUp**
- **swipeDown**
- **tap**

## Usage

1. Include **SmartSwipeController** and add additional events to `HTML element` like this:
    If you want include as a module
    Copy file from [this](https://github.com/GaronCode/smart-swipe-controller/blob/master/dist/smartSwipeController.esm.js) to your project folder
    ```html
    <script type="module">
    import { SmartSwipeController } from "./smartSwipeController.esm.js";
    new SmartSwipeController(HTML_Element, 30)
    </script>
    ```
    If you want include as *iife-style* (you need use global object `SSC`)
    Copy file from [this](https://github.com/GaronCode/smart-swipe-controller/blob/master/dist/smartSwipeController.iife.js) to your project folder
    ```html
    <script src="smartSwipeController.iife.js"></script>
    <script>
    new SSC.SmartSwipeController(HTML_Element, 30);
    </script>
    ```
2. Now you can subscribe to additional events.
   ```js
    HTML_Element.addEventListener("swipeleft", () => {
        ...
    });

    HTML_Element.addEventListener("swiperight", () => {
        ...
    });

    HTML_Element.addEventListener("swipeup", () => {
        ...
    });

    HTML_Element.addEventListener("swipedown", () => {
        ...
    });

    HTML_Element.addEventListener("tap", () => {
        ...
    });
   ```



