import React from 'react';
import PropTypes from 'prop-types';
import useIntl from 'frontend/js/hooks/useIntl';
import SellType from '../../../Values/SellType';
import CurrentSale from '../../../Values/CurrentSale';
import NextSale from '../../../Values/NextSale';
import FutureSale from '../../../Values/FutureSale';
import useStyles from './useStyles';

function Details({ auction }) {
  const classes = useStyles();
  const intl = useIntl();

  return (
    <div className={classes.root}>
      <div className={classes.row}>
        <span>{intl.formatMessage({ id: 'shared.label.region' })}:</span>
        <div className={classes.status}>{auction?.location?.region || '—'}</div>
      </div>
      <div className={classes.row}>
        <span>{intl.formatMessage({ id: 'shared.label.sellType' })}:</span>
        <div className={classes.status}>
          <SellType auction={auction} />
        </div>
      </div>
      <div className={classes.row}>
        <span>{intl.formatMessage({ id: 'shared.label.currentSale' })}:</span>
        <div className={classes.status}>
          <CurrentSale auction={auction} />
        </div>
      </div>
      {auction.nextSaleDate && (
        <div className={classes.row}>
          <span>{intl.formatMessage({ id: 'shared.label.nextSale' })}:</span>
          <div className={classes.status}>
            <NextSale auction={auction} />
          </div>
        </div>
      )}
      <div className={classes.row}>
        <span>{intl.formatMessage({ id: 'shared.label.futureSale' })}:</span>
        <div className={classes.status}>
          <FutureSale auction={auction} />
        </div>
      </div>
    </div>
  );
}

Details.propTypes = {
  auction: PropTypes.object.isRequired,
};

export default Details;
