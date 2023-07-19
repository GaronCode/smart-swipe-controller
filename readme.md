

## Usage
1. Include SimpleSwipeController.
    If you want use as:
   -  a module
    ```html
    <script type="module">
    import {SimpleSwipeController} from "./smartImageGallery.esm.js";
    const Settings = { ... }
    const Gallery = new SmartImgGallery( Settings );
    </script>
    ```
    - iife-style (you need use global object `SIG`)
    ```html
    <script src="smartImageGallery.iife.js"></script>
    <script>
    const Settings = { ... }
    const Gallery = new SIG.SmartImgGallery( Settings );
    </script>
    ```
2. Setting up the gallery (object **Settings**)
   (default settings)
    ```js
    const Settings = {
        //  selector a place for embedding a modal window
        containerSelector: "body", 
        // selector to search for displayed images
        imagesSelector: ".gallery img", 
        // flag for displaying the download button
        showDownloadButton: false,
        // flag for displaying copies of images (a copy is determined by an identical src)
        displayCopies: false,
        // transition speed (0 - no transitions)
        animationDuration: 0.3,
        // flag for initializing all handlers and events at once when creating
        init: true,
    }
    ```
    If there was no initialization during creation, you need to use the method `init` (`Gallery.init()`)
3. Done. When you click on the image, a window should appear.


## Methods
| method | action |
| --- | --- |
| hide() | hide modal |
| prev() | show previous img |
| next() | show next img |
| init() | initialization of handlers and events for script |

## События
On `document.body` script triggers the following events:
- **smartGalleryOpen**:  on open
- **smartGalleryClose**: on close
Usage example:
```js
document.body.addEventListener("smartGalleryOpen", () =>
    ...
);

document.body.addEventListener("smartGalleryClose", () =>
    ...
);
```
