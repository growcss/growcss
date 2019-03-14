# GrowCss Image

Speedy, optimized images without the work.

 It provides the fastest, most optimized image loading performance possible for React websites.

## Out of the box it

- Loads the optimal size of image for each device size and screen resolution
- Holds the image position while loading so your page doesn’t jump around as images load
- Uses the “blur-up” effect i.e. it loads a tiny version of the image to show while the full image is loading
- Alternatively provides a “traced placeholder” SVG of the image.
- Lazy loads images which reduces bandwidth and speeds the initial load time
- Uses WebP images if browser supports the format

## Installation

```bash
npm install @growcss/image
```

or if you're using yarn

```bash
yarn add @growcss/image
```

## Usage

To implement Image component into your project you'll need to add the import:

```js
import {Image} from '@growcss/image';
```

After adding import into your project you can use it simply like:

```jsx
<Image alt="your alt text" src="your image" />
```

## GrowCss Image srcSet

The `srcSet` attribute is a string consisting of one or more image selection strings separated by commas. 
Each image selection string is composed of:

1. A url to an image
2. One or more spaces as a separator
3. One or _more_ descriptors separated by spaces
    - width descriptor: a positive integer directly followed by 'w'. e.g. `700w`
    - height descriptor: a positive integer directly followed by 'h'. e.g. `345h`
    - pixel density descriptor: a positive floating point number directly followed by 'x'. e.g. `2.0x`
    - media descriptor: used for the media type in source element

`GrowCss image` extends the `<Image srcSet="...">` feature by allowing multiple descriptors for an image
and mixed descriptors in a single srcSet.

### Example image srcSet

`srcSet="foo-s.jpg 150w, foo-sh.jpg 150w 2.0x, foo-m.jpg 405w, foo-mh 2.0x 405w, foo-l 1024w, foo-t 500w 750h media=(min-width: 300px)"`

### Automatic Density

If _none_ of the image selection strings includes a pixel density descriptor ('x' e.g. `4.0x`), then the image
selection process will automatically compensate for the viewport's pixel density.
