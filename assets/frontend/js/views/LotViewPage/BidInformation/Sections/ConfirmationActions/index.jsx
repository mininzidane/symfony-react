import React, { useContext, useState, useEffect } from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import PropTypes from 'prop-types';
import LotShape from 'frontend/js/lib/propshapes/LotShape';
import Tickbox from 'frontend/js/components/Form/Tickbox';
import Amount from 'frontend/js/components/Amount';
import useIntl from 'frontend/js/hooks/useIntl';
import Button from 'frontend/js/components/Button';
import ButtonOutlined from 'frontend/js/components/ButtonOutlined';
import useBidDelta from 'frontend/js/hooks/useBidDelta';
import useRecommendedBid from 'frontend/js/hooks/useRecommendedBid';
import ShippingQuoteContext from 'frontend/js/context/ShippingQuoteContext/ShippingQuoteContext';
import NumberService from 'frontend/js/lib/utils/NumberService';
import DateTimeService from 'frontend/js/lib/utils/DateTimeService';
import CardIndentedContent from '../../../LotPageCard/CardIndentedContent';
import BidInformationInput from '../../BidInformationInput';
import CheckmarkSvg from './img/checkmark.svg';
import useStyles from './useStyles';

function ConfirmationActions({
  type,
  amount,
  confirmLabel,
  onConfirm,
  onCancel,
  marginTop,
  offer,
  minOffer,
  onOfferChange,
  isState2StatePreorder,
  isState2StateAccepted,
  lot,
  isAuthenticated,
  isGuestMembership,
  isMaoWithBidIncluded,
  setIsMaoWithBidIncluded,
}) {
  const { inventoryAuction, currencyFeeFormat } = lot;
  const [offerValue, setOfferValue] = useState(offer);

  const [recommendedBid, isRecommendedBidLoading] = useRecommendedBid(lot?.id, lot?.inventoryAuction);
  const { requiresCustomQuote } = useContext(ShippingQuoteContext);
  const isState2StateBlocker = !requiresCustomQuote && isState2StatePreorder && !isState2StateAccepted;
  const { addBusinessDays, format } = DateTimeService;

  const offerDelta = useBidDelta(offer, inventoryAuction);
  const minOfferDelta = useBidDelta(minOffer, inventoryAuction);
  const { formatCurrency } = NumberService;
  const classes = useStyles();
  const intl = useIntl();

  let responseDate;
  if (type === 'makeAnOffer') {
    const date = new Date();
    responseDate = format(addBusinessDays(date, 2));
  }

  const translationSets = {
    labelEnterOffer: intl.formatMessage(
      {
        id: 'lotPage.bidInformation.enterOffer',
      },
      {
        currency: currencyFeeFormat,
      },
    ),
    ctaCancel: intl.formatMessage({
      id: 'shared.cta.cancel',
      defaultMessage: 'Cancel',
    }),
    yourStartingBid: intl.formatMessage({ id: 'lotPage.bidInformation.yourStartingBid' }),
    yourMaxBid: intl.formatMessage({ id: 'lotPage.bidInformation.yourMaxBid' }),
    bidNow: intl.formatMessage(
      {
        id: 'lotPage.bidInformation.bidNowConfirm',
      },
      {
        strong: (chunks) => <strong>{chunks}</strong>,
        amount: formatCurrency(amount, currencyFeeFormat),
        currency: currencyFeeFormat,
      },
    ),
    increaseBid: intl.formatMessage(
      { id: 'lotPage.bidInformation.increaseBidConfirm' },
      {
        strong: (chunks) => <strong>{chunks}</strong>,
      },
    ),
    buyItNow: intl.formatMessage(
      {
        id: 'lotPage.bidInformation.buyItNowConfirm',
      },
      {
        strong: (chunks) => <strong>{chunks}</strong>,
        amount: formatCurrency(amount, currencyFeeFormat),
        currency: currencyFeeFormat,
      },
    ),
    makeAnOffer: intl.formatMessage(
      {
        id: 'lotPage.bidInformation.makeAnOfferConfirm',
      },
      {
        strong: (chunks) => <strong>{chunks}</strong>,
        amount: formatCurrency(amount, currencyFeeFormat),
        currency: currencyFeeFormat,
        responseDate,
      },
    ),
    keepBid: intl.formatMessage(
      {
        id: 'lotPage.bidInformation.keepBidConfirm',
      },
      {
        amount: formatCurrency(amount, currencyFeeFormat),
        currency: currencyFeeFormat,
      },
    ),
    counterBid: intl.formatMessage(
      {
        id: 'lotPage.bidInformation.counterBidConfirm',
      },
      {
        amount: formatCurrency(amount, currencyFeeFormat),
        currency: currencyFeeFormat,
      },
    ),
    acceptMinimum: intl.formatMessage(
      {
        id: 'lotPage.bidInformation.acceptMinimumConfirm',
      },
      {
        amount: formatCurrency(amount, currencyFeeFormat),
        currency: currencyFeeFormat,
      },
    ),
    mistypedBid: intl.formatMessage(
      {
        id: 'lotPage.bidInformation.mistypedBid',
      },
      {
        br: () => <br />,
      },
    ),
    extraIncrementLabel: intl.formatMessage({ id: 'lotPage.bidInformation.label.extraIncrement' }),
  };

  function recommendedBidButtonClick() {
    setOfferValue(recommendedBid);
  }

  useEffect(() => {
    setOfferValue(offer);
  }, [offer]);

  return (
    <div className={classes.root} style={{ ...(marginTop && { marginTop }) }}>
      <CardIndentedContent>
        <div className={classes.description}>
          {type === 'bidNow' && <>{translationSets.bidNow}</>}
          {type === 'increaseBid' && <>{translationSets.increaseBid}</>}
          {type === 'buyItNow' && <>{translationSets.buyItNow}</>}
          {type === 'makeAnOffer' && <>{translationSets.makeAnOffer}</>}
          {type === 'keepBid' && <>{translationSets.keepBid}</>}
          {type === 'counterBid' && <>{translationSets.counterBid}</>}
          {type === 'acceptMinimum' && <>{translationSets.acceptMinimum}</>}
          {type === 'mistypedBid' && <>{translationSets.mistypedBid}</>}
        </div>

        {!!onOfferChange && (
          <>
            {!isRecommendedBidLoading && (recommendedBid !== null || !isAuthenticated || isGuestMembership) && (
              <div className={classes.caption}>
                <div>
                  <strong>
                    <FormattedMessage id="lotPage.recommendedBid" />:
                  </strong>

                  <button type="button" onClick={recommendedBidButtonClick} className={classes.recommendedBidButton}>
                    <Amount value={recommendedBid} />
                  </button>
                </div>

                <img width={16} height={16} src={CheckmarkSvg} alt="checkmark" />
              </div>
            )}

            <div className={classes.offerInput}>
              <div className={classes.inputLabel}>{translationSets.labelEnterOffer}</div>

              <BidInformationInput
                value={offerValue}
                minValue={minOffer + minOfferDelta.increment}
                delta={offerDelta}
                currencyFeeFormat={currencyFeeFormat}
                onChange={onOfferChange}
              />

              <div className={classes.tickbox}>
                <Tickbox
                  id="is-bid-included"
                  name="is-bid-included"
                  onChange={(_, value) => setIsMaoWithBidIncluded(value)}
                  value={isMaoWithBidIncluded}
                >
                  <div className={classes.tickboxLabel}>
                    <FormattedMessage
                      id="lotPage.recommendedBid.maoWithBidIncluded"
                      values={{ amount: <Amount value={offerValue} fontSize={14} hasCurrency /> }}
                    />
                  </div>
                </Tickbox>
              </div>
            </div>
          </>
        )}

        <div className={classes.actions}>
          <ButtonOutlined
            className={classes.btn}
            label={translationSets.ctaCancel}
            isBackgroundWhite
            onClick={onCancel}
          />

          <Button className={classes.btn} label={confirmLabel} onClick={onConfirm} isDisabled={isState2StateBlocker} />
        </div>
      </CardIndentedContent>
    </div>
  );
}

ConfirmationActions.propTypes = {
  amount: PropTypes.number.isRequired,
  type: PropTypes.string,
  confirmLabel: PropTypes.string.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  isState2StatePreorder: PropTypes.bool.isRequired,
  isState2StateAccepted: PropTypes.bool.isRequired,
  isAuthenticated: PropTypes.bool,
  isGuestMembership: PropTypes.bool,
  lot: LotShape,
  marginTop: PropTypes.number,
  onOfferChange: PropTypes.func,
  setIsMaoWithBidIncluded: PropTypes.func,
  offer: PropTypes.number,
  minOffer: PropTypes.number,
  isMaoWithBidIncluded: PropTypes.bool,
};

ConfirmationActions.defaultProps = {
  type: 'bidNow',
  marginTop: null,
  offer: null,
  minOffer: null,
  onOfferChange: null,
  isAuthenticated: false,
  isGuestMembership: false,
  isMaoWithBidIncluded: true,
  lot: {},
  setIsMaoWithBidIncluded: () => {},
};

export default ConfirmationActions;
