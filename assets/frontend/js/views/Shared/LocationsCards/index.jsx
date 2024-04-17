import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import ContainerFullScreen from 'frontend/js/components/ContainerFullScreen';
import LocationCard from './LocationCard';

import useStyles from './useStyles';

const LocationCards = ({ title, locations, containerClassName, cardClassName, scrollContainerClassName }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <ContainerFullScreen className={containerClassName}>
        {title}

        <div className={classnames(classes.container, scrollContainerClassName)}>
          {locations.map(({ name, phone, address, slug, image, thumbnail }) => (
            <LocationCard
              name={name}
              phone={phone}
              address={address}
              slug={slug}
              key={name}
              image={image}
              thumbnail={thumbnail}
              cardClassName={cardClassName}
            />
          ))}
        </div>
      </ContainerFullScreen>
    </div>
  );
};

LocationCards.propTypes = {
  title: PropTypes.node.isRequired,
  containerClassName: PropTypes.string,
  cardClassName: PropTypes.string,
  scrollContainerClassName: PropTypes.string,
  locations: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

LocationCards.defaultProps = {
  containerClassName: '',
  scrollContainerClassName: '',
  cardClassName: '',
};

export default LocationCards;
