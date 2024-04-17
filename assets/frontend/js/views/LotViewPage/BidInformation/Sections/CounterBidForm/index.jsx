import React from 'react';
import PropTypes from 'prop-types';
import useIntl from 'frontend/js/hooks/useIntl';
import LotService from 'frontend/js/api/LotService';
import useBidDelta from 'frontend/js/hooks/useBidDelta';
import NumberService from 'frontend/js/lib/utils/NumberService';
import Button from 'frontend/js/components/Button';
import LotShape from 'frontend/js/lib/propshapes/LotShape';
import BidShape from 'frontend/js/lib/propshapes/BidShape';
import CardIndentedContent from '../../../LotPageCard/CardIndentedContent';
import BidInformationInput from '../../BidInformationInput';
import useStyles from './useStyles';

function CounterBidForm({
  lot,
  customerBid,
  counterBid,
  onCounterBidChange,
  onCounterBidSubmit,
  onKeepBidSubmit,
  onAcceptBidSubmit,
}) {
  const { status, minimumBid, inventoryAuction, currencyFeeFormat } = lot;
  const counterBidDelta = useBidDelta(counterBid, inventoryAuction);
  const isSellerCountered = status === LotService.STATUS_SELLER_COUNTERED;
  const { currentBid = 0 } = customerBid;
  const { formatCurrency } = NumberService;
  const intl = useIntl();
  const classes = useStyles();

  const translationSets = {
    labelYourCurrentBid: intl.formatMessage({
      id: 'shared.label.yourCurrentBid',
      defaultMessage: 'Your Current Bid',
    }),
    ctaKeepCurrentBid: intl.formatMessage({
      id: 'shared.cta.keepCurrentBid',
      defaultMessage: 'Keep Current Bid',
    }),
    labelCounterBid: intl.formatMessage({
      id: 'shared.label.counterBid',
      defaultMessage: 'Counter Bid',
    }),
    labelSellersReserve: intl.formatMessage({
      id: 'shared.label.sellersReserve',
      defaultMessage: "Seller's Reserve",
    }),
    ctaAcceptReserve: intl.formatMessage({
      id: 'shared.cta.acceptReserve',
      defaultMessage: 'Accept Reserve',
    }),
  };

  return (
    <div className={classes.root}>
      {isSellerCountered && (
        <div className={classes.actionsCard}>
          <CardIndentedContent>
            <div className={classes.formInputLabel}>{translationSets.labelYourCurrentBid}</div>
            <div className={classes.formContainer}>
              <div className={classes.inputWrap}>
                <input className={classes.input} type="text" value={formatCurrency(currentBid, 'USD', true)} disabled />
              </div>
              <div className={classes.btnWrap}>
                <Button label={translationSets.ctaKeepCurrentBid} onClick={onKeepBidSubmit} />
              </div>
            </div>
          </CardIndentedContent>
        </div>
      )}

      <div className={classes.actionsCard}>
        <CardIndentedContent>
          <div className={classes.formInputLabel}>{translationSets.labelCounterBid}</div>
          <div className={classes.formContainer}>
            <div className={classes.inputWrap}>
              <BidInformationInput
                value={counterBid}
                minValue={counterBid}
                delta={counterBidDelta}
                currencyFeeFormat={currencyFeeFormat}
                onChange={onCounterBidChange}
              />
            </div>
            <div className={classes.btnWrap}>
              <Button label={translationSets.labelCounterBid} onClick={onCounterBidSubmit} />
            </div>
          </div>
        </CardIndentedContent>
      </div>

      {minimumBid > 0 && (
        <div className={classes.actionsCard}>
          <CardIndentedContent>
            <div className={classes.formInputLabel}>{translationSets.labelSellersReserve}</div>
            <div className={classes.formContainer}>
              <div className={classes.inputWrap}>
                <input className={classes.input} type="text" value={formatCurrency(minimumBid, 'USD', true)} disabled />
              </div>
              <div className={classes.btnWrap}>
                <Button label={translationSets.ctaAcceptReserve} onClick={onAcceptBidSubmit} />
              </div>
            </div>
          </CardIndentedContent>
        </div>
      )}
    </div>
  );
}

CounterBidForm.propTypes = {
  lot: LotShape.isRequired,
  customerBid: BidShape,
  counterBid: PropTypes.number,
  onCounterBidChange: PropTypes.func,
  onKeepBidSubmit: PropTypes.func,
  onCounterBidSubmit: PropTypes.func,
  onAcceptBidSubmit: PropTypes.func,
};

CounterBidForm.defaultProps = {
  customerBid: {},
  counterBid: 0,
  onCounterBidChange: () => {},
  onKeepBidSubmit: () => {},
  onCounterBidSubmit: () => {},
  onAcceptBidSubmit: () => {},
};

export default CounterBidForm;
