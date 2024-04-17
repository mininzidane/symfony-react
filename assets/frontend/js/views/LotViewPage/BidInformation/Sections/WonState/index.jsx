import React from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import useIntl from 'frontend/js/hooks/useIntl';
import FacebookSvg from 'frontend/images/shared/social/facebook-22x22.svg';
import YelpSvg from 'frontend/images/shared/social/yelp.svg';
import Button from 'frontend/js/components/Button';
import NumberService from 'frontend/js/lib/utils/NumberService';
import RouterService from 'frontend/js/api/RouterService';
import PurchaseService from 'frontend/js/api/PurchaseService';
import DateTimeService from 'frontend/js/lib/utils/DateTimeService';
import CustomerShape from 'frontend/js/lib/propshapes/CustomerShape';
import LotShape from 'frontend/js/lib/propshapes/LotShape';
import LotPurchaseShape from 'frontend/js/lib/propshapes/LotPurchaseShape';
import CancelPurchaseBtn from 'frontend/js/views/Shared/RelistModal/CancelPurchaseButton';
import useRelistAvailable from 'frontend/js/views/Shared/RelistModal/useRelistAvailable';
import DownloadInvoiceBtn from './DownloadInvoiceBtn';
import ShippingOrder from './ShippingOrder';
import useStyles from './useStyles';

function WonState({ customer, lot, lotPurchase }) {
  const intl = useIntl();
  const classes = useStyles();
  const { formatCurrency } = NumberService;
  const { formatFromISOString } = DateTimeService;
  const { year, make, model } = lot;
  const { invoice, pickedUp = undefined, token: lotPurchaseToken, activeShippingOrder, vehicleStatus } = lotPurchase;
  const isLotPurchase = Boolean(lotPurchase);
  const { amount, amountApplied, paid = false, dueDate, paidInFull, token } = invoice || {};
  const isInvoiceProcessing = !invoice || !amount;

  const isVehicleRelisted = vehicleStatus === PurchaseService.VEHICLE_STATUSES.RELISTED;
  const isRelistAvailable = useRelistAvailable(lotPurchase, invoice);

  const description = `${year} ${make} ${model}`;
  let step = 0;

  function getStep() {
    step += 1;

    return step;
  }

  const translationSets = {
    title: intl.formatMessage(
      {
        id: 'lotPage.bidInformation.wonCardCongratsTitle',
        defaultMessage: 'Congratulations, {name}!',
      },
      {
        name: customer.firstName,
      },
    ),
    header: intl.formatMessage({
      id: 'lotPage.bidInformation.wonCardCongratsHeader',
      defaultMessage: 'You won the auction.',
    }),
    paymentReceivedTitle: intl.formatMessage({
      id: 'lotPage.bidInformation.wonPaymentReceivedTitle',
      defaultMessage: 'Payment Received',
    }),
    paymentReceivedContent: intl.formatMessage(
      {
        id: 'lotPage.bidInformation.wonPaymentReceivedContent',
        defaultMessage: `Your payment for {description} in the amount of {amount} was received on {paidInFull}. Thank you!`,
      },
      {
        description,
        amount: formatCurrency(amountApplied),
        paidInFull: formatFromISOString(paidInFull),
      },
    ),
    invoiceProcessingTitle: intl.formatMessage({ id: 'lotPage.bidInformation.invoiceProcessingTitle' }),
    invoiceProcessingContent: intl.formatMessage({ id: 'lotPage.bidInformation.invoiceProcessingContent' }),
    paymentDueTitle: intl.formatMessage(
      {
        id: 'lotPage.bidInformation.wonPaymentDueTitle',
        defaultMessage: 'Your payment of {amount} is due.',
      },
      {
        amount: formatCurrency(amount),
      },
    ),
    paymentDueContent: intl.formatMessage(
      {
        id: 'lotPage.bidInformation.wonPaymentDueContent',
        defaultMessage: `
                Your payment for <span>{description}</span> is due
                <span>{formattedDate}</span> and must be made by bank wire
                transfer. Please make prompt payment to avoid late fees.The wire transfer details to make payment are
                included with your invoice.
      `,
      },
      {
        span: (chunks) => <span className="text-black">{chunks}</span>,
        description,
        formattedDate: formatFromISOString(dueDate),
      },
    ),
    pickedUpTitle: intl.formatMessage({
      id: 'lotPage.bidInformation.wonPickedUpTitle',
      defaultMessage: 'Your vehicle was picked up on',
    }),
    pickedUpContent: intl.formatMessage(
      {
        id: 'lotPage.bidInformation.wonPickedUpContent',
        defaultMessage: `
                Thank you for using AutoBidMaster! Please tell us about your shopping experience through one of the
                sites below, or email us at <a>feedback@autobidmaster.com</a>
      `,
      },
      {
        a: (chunks) => <a href="mailto:feedback@autobidmaster.com">{chunks}</a>,
      },
    ),
    bookShippingTitle: intl.formatMessage({
      id: 'shared.cta.bookShipping',
      defaultMessage: 'Book Shipping',
    }),
    shippingContent: intl.formatMessage(
      {
        id: 'lotPage.bidInformation.wonBookShippingContent',
        defaultMessage: `
                  <span>{description}</span> cannot be picked up in person or driven off the lot,
                  it must be shipped from the Copart yard. AutoBidMaster has been shipping with EasyHaul.com for 15
                  years and we recommend them for all domestic and international shipping.
      `,
      },
      {
        span: (chunks) => <span className="text-black">{chunks}</span>,
        description,
      },
    ),
    bosTitle: intl.formatMessage({
      id: 'lotPage.bidInformation.wonBosTitle',
      defaultMessage: 'Sign Purchase Agreement Documents.',
    }),
    bosContent: intl.formatMessage({
      id: 'lotPage.bidInformation.wonBosContent',
      defaultMessage:
        'To process the ownership documents and to finalize your purchase, please sign the Purchase Agreement Documents.',
    }),
    ctaOrder: intl.formatMessage({
      id: 'shared.cta.takeMeToMyOrder',
      defaultMessage: 'Take me to my order',
    }),
  };

  return (
    <div className="bid-information__won-card">
      <div className="bid-information__won-card-title">
        {translationSets.title} <br />
        {translationSets.header}
      </div>

      <div>
        <div className="bid-information__won-card-section text-sm">
          {paid ? (
            <>
              <strong>
                {getStep()}. {translationSets.paymentReceivedTitle}
              </strong>
              <div className="bid-information__won-card-content text-gray">
                {translationSets.paymentReceivedContent}
              </div>
            </>
          ) : (
            <>
              <strong>
                {getStep()}. {translationSets[isInvoiceProcessing ? 'invoiceProcessingTitle' : 'paymentDueTitle']}
              </strong>
              <div className="bid-information__won-card-content text-gray">
                {translationSets[isInvoiceProcessing ? 'invoiceProcessingContent' : 'paymentDueContent']}
              </div>

              {!isInvoiceProcessing && (
                <>
                  {isLotPurchase && (
                    <>
                      <DownloadInvoiceBtn token={token} isLotPurchase={isLotPurchase} size="md" />
                      {isRelistAvailable && (
                        <div className={classes.cancelPurchase}>
                          <CancelPurchaseBtn lotPurchase={lotPurchase} />
                        </div>
                      )}
                    </>
                  )}
                </>
              )}
            </>
          )}
        </div>

        {!isVehicleRelisted && (
          <>
            <div className="bid-information__won-card-section text-sm">
              {pickedUp ? (
                <>
                  <strong>
                    {getStep()}. {description} <span className="text-gray">{translationSets.pickedUpTitle}</span>{' '}
                    {formatFromISOString(pickedUp)}.
                  </strong>
                  <div className="bid-information__won-card-content text-gray">
                    {translationSets.pickedUpContent}
                    <div className="bid-information__won-card-social">
                      <a href="https://www.facebook.com/AutoBidMaster">
                        <img src={FacebookSvg} alt="Yelp" width="50" height="50" />
                      </a>

                      <a href="https://www.yelp.com/biz/autobidmaster-portland-4">
                        <img src={YelpSvg} alt="Yelp" width="50" height="50" />
                      </a>
                    </div>
                  </div>
                  {activeShippingOrder && (
                    <Button
                      href={RouterService.getRoute('shippingTracking', null, false, {
                        emailOrToken: activeShippingOrder?.token,
                        vin: lotPurchase?.vehicleVin,
                      })}
                      label={<FormattedMessage id="trackMyOrderPage.trackMyOrder" />}
                      className="mt-15"
                      isNowrap
                    />
                  )}
                </>
              ) : (
                <>
                  <strong>
                    {getStep()}. {translationSets.bookShippingTitle}
                  </strong>
                  <div className="bid-information__won-card-content text-gray">
                    <div>{translationSets.shippingContent}</div>
                    <ShippingOrder lot={lot} lotPurchase={lotPurchase} />
                  </div>
                </>
              )}
            </div>

            {!customer.userPadUploadDisabled && (
              <div className="bid-information__won-card-section text-sm">
                <strong>
                  {getStep()}. {translationSets.bosTitle}
                </strong>
                <div className="bid-information__won-card-content text-gray">{translationSets.bosContent}</div>

                <Button
                  href={RouterService.getRoute('documents', { signToken: lotPurchaseToken })}
                  label={<FormattedMessage id="shared.label.signAgreement" />}
                  className="mt-15"
                  isNowrap
                />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

WonState.propTypes = {
  customer: CustomerShape.isRequired,
  lot: LotShape.isRequired,
  lotPurchase: LotPurchaseShape,
};

WonState.defaultProps = {
  lotPurchase: {},
};

export default WonState;
