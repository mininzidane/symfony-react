import React, { memo } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Button from 'frontend/js/components/Button';
import Image from 'frontend/js/components/Image';
import FormattedMessage from 'frontend/js/components/FormattedMessage';
import RouterService from 'frontend/js/api/RouterService';
import useStyles from './useStyles';
import ThumbSrc from './img/thumb.png';

const LocationCard = memo(({ name, address, slug, image, thumbnail, cardClassName }) => {
  const classes = useStyles();
  const src = thumbnail || image || ThumbSrc;

  return (
    <div className={classnames(classes.root, cardClassName)}>
      <Image src={src} alt="" isLazy ratio={75} className={classes.thumb} />
      <div className={classes.container}>
        <div className={classes.title}>{name}</div>
        <div className={classes.row}>
          <div>
            <FormattedMessage id="shared.label.location" />:
          </div>
          <strong>{address}</strong>
        </div>
        <Button
          label={<FormattedMessage id="locationDetailsPage.locationDetails.details.label" />}
          href={RouterService.getRoute('locationView', null, false, { slug })}
          className={classes.button}
        />
      </div>
    </div>
  );
});

LocationCard.propTypes = {
  name: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  image: PropTypes.string,
  cardClassName: PropTypes.string,
  thumbnail: PropTypes.string,
};

LocationCard.defaultProps = {
  image: undefined,
  thumbnail: undefined,
  cardClassName: '',
};

export default LocationCard;
