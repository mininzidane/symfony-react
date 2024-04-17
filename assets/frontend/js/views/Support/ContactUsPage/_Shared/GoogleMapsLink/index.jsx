import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl-phraseapp';
import Link from 'frontend/js/components/Link';
import OfficeLocationShape from 'frontend/js/lib/propshapes/OfficeLocationShape';

function GoogleMapsLink({ data, className }) {
  if (!data.mapUrl) {
    return null;
  }

  return (
    <div className={className}>
      <Link href={data.mapUrl} isTargetBlank>
        <FormattedMessage id="contactUsPage.viewOnMap" />
      </Link>
    </div>
  );
}

GoogleMapsLink.propTypes = {
  data: OfficeLocationShape,
  className: PropTypes.string,
};

GoogleMapsLink.defaultProps = {
  data: {},
  className: '',
};

export default GoogleMapsLink;
