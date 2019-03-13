import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { Image, Figcaption } from '../src';

storiesOf('Core.Image', module)
  .add('Simple image', () => (
    <Image
      width={1024}
      height={256}
      alt="test"
      src="https://res.cloudinary.com/anolilab/image/upload/c_scale,w_1024/v1551714118/abenteuer-berg-draussen-1183986.jpg"
    />
  ))
  .add('Image use the window dimension if no width and height are provided', () => (
    <Image
      alt="test"
      src="https://res.cloudinary.com/anolilab/image/upload/c_scale,w_2048/v1551714118/abenteuer-berg-draussen-1183986.jpg"
    />
  ))
  .add('Image with srcset', () => (
    <Image
      alt="test"
      width={1024}
      height={256}
      preload
      placeholder="https://res.cloudinary.com/anolilab/image/upload/c_scale,w_32/v1551714118/abenteuer-berg-draussen-1183986.jpg"
      srcSet="https://res.cloudinary.com/anolilab/image/upload/c_scale,w_150/v1551714118/abenteuer-berg-draussen-1183986.jpg 150w, https://res.cloudinary.com/anolilab/image/upload/c_scale,w_405/v1551714118/abenteuer-berg-draussen-1183986.jpg 405w, https://res.cloudinary.com/anolilab/image/upload/c_scale,w_1024/v1551714118/abenteuer-berg-draussen-1183986.jpg 1024w, https://res.cloudinary.com/anolilab/image/upload/c_scale,w_500,h_750/v1551714118/abenteuer-berg-draussen-1183986.jpg 500w 750h"
    />
  ))
  .add('Image with srcset and automatically found placeholder', () => (
    <Image
      alt="test"
      width={1024}
      height={256}
      preload
      srcSet="https://res.cloudinary.com/anolilab/image/upload/c_scale,w_150/v1551714118/abenteuer-berg-draussen-1183986.jpg 150w, https://res.cloudinary.com/anolilab/image/upload/c_scale,w_405/v1551714118/abenteuer-berg-draussen-1183986.jpg 405w, https://res.cloudinary.com/anolilab/image/upload/c_scale,w_1024/v1551714118/abenteuer-berg-draussen-1183986.jpg 1024w, https://res.cloudinary.com/anolilab/image/upload/c_scale,w_500,h_750/v1551714118/abenteuer-berg-draussen-1183986.jpg 500w 750h"
    />
  ))
  .add('Image with srcset with webp', () => (
    <Image
      alt="test"
      width={1024}
      height={256}
      preload
      src="https://res.cloudinary.com/anolilab/image/upload/c_scale,w_1024/v1551714118/abenteuer-berg-draussen-1183986.jpg"
      srcSet="https://res.cloudinary.com/anolilab/image/upload/c_scale,w_1024/v1551714118/abenteuer-berg-draussen-1183986.webp"
    />
  ))
  .add('Image with a preview url', () => (
    <Image
      width={1024}
      height={256}
      alt="test"
      preload
      placeholder="https://res.cloudinary.com/anolilab/image/upload/c_scale,w_150/v1551714118/abenteuer-berg-draussen-1183986.jpg"
      srcSet="https://res.cloudinary.com/anolilab/image/upload/c_scale,w_300/v1551714118/abenteuer-berg-draussen-1183986.jpg medium, https://res.cloudinary.com/anolilab/image/upload/c_scale,w_1024/v1551714118/abenteuer-berg-draussen-1183986.jpg large"
    />
  ))
  .add('Image with a preview base64 image and serSet with base64 image', () => (
    <Image
      width={1024}
      height={370}
      alt="test"
      preload
      placeholder="data:image/png;base64,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"
      srcSet="data:image/png;base64,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 medium"
    />
  ))
  .add('Image with figcaption', () => (
    <Image
      width={1024}
      height={256}
      alt="test"
      srcSet="https://res.cloudinary.com/anolilab/image/upload/c_scale,w_300/v1551714118/abenteuer-berg-draussen-1183986.jpg medium, https://res.cloudinary.com/anolilab/image/upload/c_scale,w_1024/v1551714118/abenteuer-berg-draussen-1183986.jpg large"
    >
      <Figcaption>
        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
      </Figcaption>
    </Image>
  ))
  .add('Image with figcaption to the right', () => (
    <Image
      width={1024}
      height={256}
      alt="test"
      srcSet="https://res.cloudinary.com/anolilab/image/upload/c_scale,w_300/v1551714118/abenteuer-berg-draussen-1183986.jpg medium, https://res.cloudinary.com/anolilab/image/upload/c_scale,w_1024/v1551714118/abenteuer-berg-draussen-1183986.jpg large"
    >
      <Figcaption align="right">
        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
      </Figcaption>
    </Image>
  ))
  .add('Image with media attribute in srcset', () => (
    <Image
      width={1500}
      height={256}
      alt="test"
      preload
      src="https://via.placeholder.com/920.png/000/fffC/O"
      srcSet="https://via.placeholder.com/920.png/000/fffC/O 1x media=(min-width: 1440px), https://via.placeholder.com/1840.png/000/fffC/O 2x media=(min-width: 1440px), https://via.placeholder.com/960.png/09f/fffC/O media=(min-width: 680px) and (orientation: portrait), https://via.placeholder.com/920.png/000/fffC/O media=(min-width: 680px), https://via.placeholder.com/600.png/000/fffC/O media=(min-width: 300px) and (orientation:portrait), https://via.placeholder.com/300.png/000/fffC/O media=(min-width: 300px)"
    />
  ))
  .add('Many Images with lazy loading and preloading', () => (
    <React.Fragment>
      <Image
        width={1024}
        height={256}
        alt="test"
        preload
        lazy
        placeholder="https://res.cloudinary.com/anolilab/image/upload/c_scale,w_32/v1551714118/abenteuer-berg-draussen-1183986.jpg"
        srcSet="https://res.cloudinary.com/anolilab/image/upload/c_scale,w_300/v1551714118/abenteuer-berg-draussen-1183986.jpg medium, https://res.cloudinary.com/anolilab/image/upload/c_scale,w_1024/v1551714118/abenteuer-berg-draussen-1183986.jpg large"
      />
      <Image
        width={1024}
        height={256}
        alt="test"
        preload
        lazy
        placeholder="https://res.cloudinary.com/anolilab/image/upload/c_scale,w_32/v1551713871/samples/ecommerce/accessories-bag.jpg"
        srcSet="https://res.cloudinary.com/anolilab/image/upload/c_scale,w_300/v1551713871/samples/ecommerce/accessories-bag.jpg medium, https://res.cloudinary.com/anolilab/image/upload/c_scale,w_1024/v1551713871/samples/ecommerce/accessories-bag.jpg large"
      />
      <Image
        width={1024}
        height={256}
        alt="test"
        preload
        lazy
        placeholder="https://res.cloudinary.com/anolilab/image/upload/c_scale,w_32/samples/ecommerce/leather-bag-gray.jpg"
        srcSet="https://res.cloudinary.com/anolilab/image/upload/c_scale,w_300/samples/ecommerce/leather-bag-gray.jpg medium, https://res.cloudinary.com/anolilab/image/upload/c_scale,w_1024/samples/ecommerce/leather-bag-gray.jpg large"
      />
      <Image
        width={1024}
        height={256}
        alt="test"
        preload
        lazy
        placeholder="https://res.cloudinary.com/anolilab/image/upload/c_scale,w_32/v1551713869/samples/landscapes/architecture-signs.jpg"
        srcSet="https://res.cloudinary.com/anolilab/image/upload/c_scale,w_300/v1551713869/samples/landscapes/architecture-signs.jpg medium, https://res.cloudinary.com/anolilab/image/upload/c_scale,w_1024/v1551713869/samples/landscapes/architecture-signs.jpg large"
      />
      <Image
        width={1024}
        height={256}
        alt="test"
        preload
        lazy
        placeholder="https://res.cloudinary.com/anolilab/image/upload/c_scale,w_32/v1551713869/samples/animals/three-dogs.jpg"
        srcSet="https://res.cloudinary.com/anolilab/image/upload/c_scale,w_300/v1551713869/samples/animals/three-dogs.jpg medium, https://res.cloudinary.com/anolilab/image/upload/c_scale,w_1024/v1551713869/samples/animals/three-dogs.jpg large"
      />
      <Image
        width={1024}
        height={256}
        alt="test"
        preload
        lazy
        placeholder="https://res.cloudinary.com/anolilab/image/upload/c_scale,w_32/v1551713862/sample.jpg"
        srcSet="https://res.cloudinary.com/anolilab/image/upload/c_scale,w_300/v1551713862/sample.jpg medium, https://res.cloudinary.com/anolilab/image/upload/c_scale,w_1024/v1551713862/sample.jpg large"
      />
      <Image
        width={1024}
        height={256}
        alt="test"
        preload
        lazy
        placeholder="https://res.cloudinary.com/anolilab/image/upload/c_scale,w_32/v1551713868/samples/bike.jpg"
        srcSet="https://res.cloudinary.com/anolilab/image/upload/c_scale,w_300/v1551713868/samples/bike.jpg medium, https://res.cloudinary.com/anolilab/image/upload/c_scale,w_1024/v1551713868/samples/bike.jpg large"
      />
      <Image
        width={1024}
        height={256}
        alt="test"
        title="title"
        preload
        lazy
        placeholder="https://res.cloudinary.com/anolilab/image/upload/c_scale,w_150/v1551714118/abenteuer-berg-draussen-1183986.jpg"
        srcSet="https://res.cloudinary.com/anolilab/image/upload/c_scale,w_300/v1551714118/abenteuer-berg-draussen-1183986.jpg medium, https://res.cloudinary.com/anolilab/image/upload/c_scale,w_1024/v1551714118/abenteuer-berg-draussen-1183986.jpg large"
        sizes="100w"
      />
    </React.Fragment>
  ));
