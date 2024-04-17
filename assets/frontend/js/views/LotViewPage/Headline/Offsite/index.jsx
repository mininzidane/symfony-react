import React from 'react';
import PropTypes from 'prop-types';
import useIntl from 'frontend/js/hooks/useIntl';
import ContentPopover from 'frontend/js/components/ContentPopover';
import LocationService from 'frontend/js/api/LocationService';
import useStyles from './useStyles';

function Offsite({ offsite }) {
  const intl = useIntl();
  const classes = useStyles();
  const { contactName, address, city, state, zip } = offsite;

  const translationSets = {
    offsite: intl.formatMessage({ id: 'shared.label.offsite' }),
    afterSalePickUp: intl.formatMessage({ id: 'lotPage.offsite.afterSalePickUp' }),
    thisLotIsAnOffsiteLot: intl.formatMessage({ id: 'lotPage.offsite.thisLotIsAnOffsiteLot' }),
  };

  return (
    <ContentPopover
      trigger={
        <button type="button" className={classes.trigger}>
          {translationSets.offsite}

          <svg
            width="6"
            height="3"
            viewBox="0 0 6 3"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={classes.triggerTriangle}
          >
            <path d="M6 0H0L3 3L6 0Z" />
          </svg>
        </button>
      }
      isInline
      popoverTitle={translationSets.afterSalePickUp}
      popoverClass={classes.popover}
      activeTriggerClassName="is-active"
      offsetTop={5}
      popoverOptions={{ placement: 'bottom-start' }}
    >
      <>
        <div className={classes.address}>
          {contactName && (
            <>
              <strong>{contactName.toUpperCase()}</strong>
              <br />
            </>
          )}
          {address && (
            <>
              {address}
              <br />
            </>
          )}
          {LocationService.formatCityStateZip(city, state, zip).toUpperCase()}
        </div>

        <div className={classes.note}>{translationSets.thisLotIsAnOffsiteLot}</div>
      </>
    </ContentPopover>
  );
}

Offsite.propTypes = {
  offsite: PropTypes.shape({
    contactName: PropTypes.string,
    address: PropTypes.string,
    city: PropTypes.string,
    state: PropTypes.string,
    zip: PropTypes.string,
  }).isRequired,
};

export default Offsite;
