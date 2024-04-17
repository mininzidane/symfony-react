import React, { useState } from 'react';
import PropTypes from 'prop-types';
import LotService from 'frontend/js/api/LotService';
import CurrencyService from 'frontend/js/api/CurrencyService';
import BidInformationInput from 'frontend/js/views/LotViewPage/BidInformation/BidInformationInput';
import Button from 'frontend/js/components/Button';
import ButtonOutlined from 'frontend/js/components/ButtonOutlined';
import { FormattedMessage } from 'react-intl-phraseapp';
import ConfirmationNotification from 'frontend/js/views/LotViewPage/BidInformation/Sections/ConfirmationNotification';
import useBidDelta from 'frontend/js/hooks/useBidDelta';
import CardIndentedContent from '../../../LotPageCard/CardIndentedContent';
import useStyles from './useStyles';

function MistypedBidForm({ currentBid, maxBid, auction, onMistypedBidConfirm, onCancel, currencyFeeFormat }) {
  const classes = useStyles();
  const maxBidDelta = useBidDelta(maxBid, auction);
  const currentBidDelta = useBidDelta(currentBid, auction);
  const minValue = currentBid + currentBidDelta.increment;
  const updatedMaxStart = Math.max(currentBid, maxBid - maxBidDelta.increment);
  const [bid, setBid] = useState(updatedMaxStart);
  const [isInvalid, setIsInvalid] = useState(false);
  const bidDelta = useBidDelta(bid, auction);

  function handleSubmit() {
    if (bid >= currentBid && bid < maxBid) {
      onMistypedBidConfirm(bid);
    } else {
      setIsInvalid(true);
    }
  }

  function handleMaxBidChange(nextValue) {
    if (isInvalid) {
      setIsInvalid(false);
    }

    if (nextValue <= maxBid) {
      setBid(nextValue);

      if (nextValue === maxBid) {
        setIsInvalid(true);
      }
    }
  }

  return (
    <>
      <ConfirmationNotification amount={bid} type="mistypedBid" currencyFeeFormat={currencyFeeFormat} />
      <CardIndentedContent className={classes.container}>
        <div className={classes.input}>
          <div className={classes.inputLabel}>
            <FormattedMessage id="shared.label.yourMaxBid" />
          </div>

          <BidInformationInput
            value={bid}
            minValue={minValue}
            delta={bidDelta}
            currencyFeeFormat={currencyFeeFormat}
            hasError={isInvalid}
            onChange={handleMaxBidChange}
          />
          {isInvalid && (
            <span className="text-red text-xs">
              <FormattedMessage id="shared.error.invalidAmount" />
            </span>
          )}
        </div>

        <div className={classes.actions}>
          <ButtonOutlined
            className={classes.btn}
            label={<FormattedMessage id="shared.cta.cancel" />}
            onClick={onCancel}
            isBackgroundWhite
          />

          <Button
            className={classes.btn}
            label={<FormattedMessage id="lotPage.cta.confirmBid" />}
            onClick={handleSubmit}
            isDisabled={isInvalid}
          />
        </div>
      </CardIndentedContent>
    </>
  );
}

MistypedBidForm.propTypes = {
  maxBid: PropTypes.number.isRequired,
  currentBid: PropTypes.number.isRequired,
  onMistypedBidConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  auction: PropTypes.string,
  currencyFeeFormat: PropTypes.string,
};

MistypedBidForm.defaultProps = {
  auction: LotService.AUCTION_COPART,
  currencyFeeFormat: CurrencyService.CURRENCY_USD,
};

export default MistypedBidForm;
