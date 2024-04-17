import React from 'react';
import useIntl from 'frontend/js/hooks/useIntl';
import RouterService from 'frontend/js/api/RouterService';
import useCustomerHelper from 'frontend/js/hooks/useCustomerHelper';
import Button from 'frontend/js/components/Button';
import Link from 'frontend/js/components/Link';
import useCheckoutContext from 'frontend/js/views/Payment/CheckoutPage/_Context/useCheckoutContext';
import CongratulationsCard from 'frontend/js/views/Payment/_Shared/Congratulations/Card';
import LinkHowShippingWorks from '../LinkHowShippingWorks';
import PickupInfo from '../PickupInfo';

function WireTransferReceipt() {
  const intl = useIntl();
  const { email: customerEmail } = useCustomerHelper();
  const { receipt } = useCheckoutContext();
  const {
    data: { shippingOrder: { token: orderToken = '', lot: { vehicleYearMakeModel = '' } = {} } = {} },
  } = receipt;

  const translationSets = {
    shippingOrderHasBeenPlaced: intl.formatMessage(
      { id: 'receiptPage.shippingOrderHasBeenPlaced' },
      { model: vehicleYearMakeModel },
    ),
    pleaseCheckYourEmail: intl.formatMessage(
      { id: 'receiptPage.wireTransfer.pleaseCheckYourEmail' },
      {
        strong: () => <strong>{customerEmail}</strong>,
        a: (chunks) => (
          <Link href={RouterService.getRoute('shippingInvoice', null, false, { token: orderToken })} isTargetBlank>
            {chunks}
          </Link>
        ),
      },
    ),
    pleaseNoteKeepInMindThat: intl.formatMessage(
      { id: 'receiptPage.wireTransfer.pleaseNoteKeepInMindThat' },
      {
        strong: (chunks) => <strong>{chunks}</strong>, // only in ES translation
        a: (chunks) => (
          <Link href={RouterService.getRoute('shippingPayment', null, false, { token: orderToken })}>{chunks}</Link>
        ),
      },
    ),
    viewOrderStatus: intl.formatMessage({ id: 'receiptPage.viewOrderStatus' }),
  };

  return (
    <CongratulationsCard subtitle={translationSets.shippingOrderHasBeenPlaced}>
      <PickupInfo />
      <div className="m-0-a mt-20" style={{ maxWidth: '480px' }}>
        <div className="text-sm ta-l bdrs-md bg-cloud" style={{ padding: '12px 22px 20px' }}>
          {translationSets.pleaseCheckYourEmail}
        </div>

        <div className="text-sm ta-l mt-4 bg-cream bdrs-md" style={{ padding: '12px 22px 20px' }}>
          {translationSets.pleaseNoteKeepInMindThat}
        </div>

        <Button
          href={RouterService.getRoute('lotsWon')}
          label={translationSets.viewOrderStatus}
          className="mt-30"
          size="lg"
        />
        <LinkHowShippingWorks />
      </div>
      <div className="pb-35" />
    </CongratulationsCard>
  );
}

export default WireTransferReceipt;
