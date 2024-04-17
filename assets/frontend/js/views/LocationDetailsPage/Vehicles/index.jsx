import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl-phraseapp';

import LotsSuggestionCarousel from 'frontend/js/views/Shared/LotsSuggestionCarousel';

import useStyles from './useStyles';

function Vehicles({ lots, className, locationName }) {
  if (!lots.length) {
    return null;
  }

  const classes = useStyles();
  const [isMounted, setIsMounted] = useState(false);

  return (
    <div className={className} ref={() => setIsMounted(true)}>
      <div className={classes.toolbar}>
        <div>
          <FormattedMessage id="locationDetailsPage.popularVehicles.title" values={{ location: locationName }} />
        </div>
        <div id="controls" className={classes.controls} />
      </div>

      {isMounted && <LotsSuggestionCarousel controlsElementId="controls" lots={lots} analytics={{}} />}
    </div>
  );
}

Vehicles.defaultProps = {
  className: '',
  locationName: '',
};

Vehicles.propTypes = {
  lots: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  className: PropTypes.string,
  locationName: PropTypes.string,
};

export default Vehicles;
