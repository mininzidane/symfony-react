import classNames from 'classnames';
import React, { useEffect } from 'react';
import useStyles from './useStyles';
import LotPurchaseShape from '../../../lib/propshapes/LotPurchaseShape';

const blueimp = require('blueimp-gallery');

function ShippingOrderCarousel({ lotPurchase }) {
  const classes = useStyles();
  const elementID = 'imageCarousel';

  useEffect(() => {
    const imagesContainer = document.getElementById(`${elementID}-images`);
    if (imagesContainer) {
      blueimp(imagesContainer.getElementsByTagName('a'), {
        container: `#${elementID}`,
        carousel: true,
      });
    }
  }, [lotPurchase]);

  return lotPurchase.lot.images.length ? (
    <>
      <div id={`${elementID}-images`} className={classNames(classes.imageCarouselImages)}>
        {lotPurchase.lot.images.map((image, i) => (
          <a key={i} href={image.full}>
            <img src={image.thumbnail} alt={image.thumbnail} />
          </a>
        ))}
      </div>

      <div id={`${elementID}-contain`} className={classNames(classes.imageCarouselContain)}>
        <div
          id={elementID}
          className={classNames(
            classes.imageCarousel,
            'blueimp-gallery blueimp-gallery-carousel blueimp-gallery-controls',
          )}
        >
          <div className="slides" />
          <h3 className="title">&nbsp;</h3>
          <a className="prev" href="#prev">
            ‹
          </a>
          <a className="next" href="#next">
            ›
          </a>
          <a className="play-pause" href="#play-pause">
            &nbsp;
          </a>
          <ol className="indicator" />
        </div>
      </div>
    </>
  ) : (
    <h5 style={{ textAlign: 'center' }}>No Images</h5>
  );
}

ShippingOrderCarousel.propTypes = {
  lotPurchase: LotPurchaseShape.isRequired,
};

export default ShippingOrderCarousel;
