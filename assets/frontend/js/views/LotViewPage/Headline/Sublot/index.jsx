import React from 'react';
import PropTypes from 'prop-types';
import useIntl from 'frontend/js/hooks/useIntl';
import ContentPopover from 'frontend/js/components/ContentPopover';
import useStyles from './useStyles';

function Sublot({ subLotInfo }) {
  const intl = useIntl();
  const classes = useStyles();
  const { name, address, city, state, zip } = subLotInfo;

  const translationSets = {
    sublot: intl.formatMessage({ id: 'shared.label.sublot' }),
    sublotLocation: intl.formatMessage({ id: 'lotPage.saleInfo.sublot' }),
    sublotDescription: intl.formatMessage({ id: 'lotPage.saleInfo.sublot.desc' }),
  };

  return (
    <ContentPopover
      trigger={
        <button type="button" className={classes.trigger}>
          {translationSets.sublot}

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
      popoverTitle={translationSets.sublotLocation}
      popoverClass={classes.popover}
      activeTriggerClassName="is-active"
      offsetTop={5}
      popoverOptions={{ placement: 'bottom-start' }}
    >
      <>
        <div className={classes.address}>
          {name},
          <br />
          {address},
          <br />
          {city}, {state} {zip}
        </div>

        <div className={classes.note}>{translationSets.sublotDescription}</div>
      </>
    </ContentPopover>
  );
}

Sublot.propTypes = {
  subLotInfo: PropTypes.shape({
    name: PropTypes.string,
    address: PropTypes.string,
    city: PropTypes.string,
    state: PropTypes.string,
    zip: PropTypes.string,
  }).isRequired,
};

export default Sublot;
