# GrowCss Image

```bash
npm install @growcss/image
```

or if you're using yarn

```bash
yarn add @growcss/image
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

`GrowCss image` extends the `<Image srcSet="...">` feature by allowing multiple descriptors for an image
and mixed descriptors in a single srcSet.

### Example image srcSet

`srcSet="foo-s.jpg 150w, foo-sh.jpg 150w 2.0x, foo-m.jpg 405w, foo-mh 2.0x 405w, foo-l 1024w, foo-t 500w 750h"`

### Automatic Density

If _none_ of the image selection strings includes a pixel density descriptor ('x' e.g. `4.0x`), then the image
selection process will automatically compensate for the viewport's pixel density.

#### Examples

``
