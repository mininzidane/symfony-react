import React from 'react';
import PropTypes from 'prop-types';
import useIntl from 'frontend/js/hooks/useIntl';
import classnames from 'classnames';
import NumberService from 'frontend/js/lib/utils/NumberService';
import useStyles from './useStyles';

function LotSimpleCard({ className, lot }) {
  const classes = useStyles();
  const intl = useIntl();

  if (!lot) {
    return null;
  }

  const { id, vin, largeImage, description, currency, highBid } = lot;

  const translationSets = {
    currentBid: intl.formatMessage({ id: 'receiptPage.currentBid' }),
    vin: intl.formatMessage({ id: 'receiptPage.vin' }),
    lot: intl.formatMessage({ id: 'receiptPage.lot' }),
  };

  return (
    <div className={classnames(classes.root, 'bg-cream', className)}>
      {largeImage && <img src={largeImage} alt={description} className={classes.photo} />}
      <div className={classes.data}>
        <div>
          <strong>{description}</strong>
        </div>
        <div>
          {translationSets.lot}: {id}
        </div>
        <div>
          {translationSets.vin}: {vin}
        </div>
        <div>
          <span>{translationSets.currentBid}:</span>&nbsp;
          <strong>{NumberService.formatCurrency(highBid, currency)}</strong>
          <span className="fw-3">{currency}</span>
        </div>
      </div>
    </div>
  );
}

LotSimpleCard.defaultProps = {
  lot: null,
  className: '',
};

LotSimpleCard.propTypes = {
  lot: PropTypes.shape({
    id: PropTypes.string,
    vin: PropTypes.string,
    largeImage: PropTypes.string,
    description: PropTypes.string,
    currency: PropTypes.string,
    highBid: PropTypes.number,
  }),
  className: PropTypes.string,
};

export default LotSimpleCard;
