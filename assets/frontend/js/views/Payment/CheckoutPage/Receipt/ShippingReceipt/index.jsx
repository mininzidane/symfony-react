import React from 'react';
import useIntl from 'frontend/js/hooks/useIntl';
import classnames from 'classnames';
import PaymentService from 'frontend/js/api/PaymentService';
import RouterService from 'frontend/js/api/RouterService';
import Button from 'frontend/js/components/Button';
import NumberService from 'frontend/js/lib/utils/NumberService';
import useCheckoutContext from 'frontend/js/views/Payment/CheckoutPage/_Context/useCheckoutContext';
import CongratulationsCard from 'frontend/js/views/Payment/_Shared/Congratulations/Card';
import LinkHowShippingWorks from './LinkHowShippingWorks';
import PickupInfo from './PickupInfo';
import WireTransferReceipt from './WireTransferReceipt';
import useStyles from './useStyles';
import MarkerBlueSvg from './img/marker-blue.svg';
import MarkerGreenSvg from './img/marker-green.svg';

function ShippingReceipt() {
  const classes = useStyles();
  const intl = useIntl();
  const { receipt } = useCheckoutContext();

  const { method } = receipt;

  if (method === PaymentService.METHOD.WIRE_TRANSFER) {
    return <WireTransferReceipt />;
  }

  const {
    data: {
      shippingOrder: {
        lot: { vehicleYearMakeModel = '', saleLocation: { name: saleLocationName = '' } = {} } = {},
        destination = '',
      } = {},
      transactions = [],
    },
  } = receipt;

  const translationSets = {
    youSuccessfullyPaidForShipping: intl.formatMessage(
      { id: 'receiptPage.youSuccessfullyPaidForShipping' },
      { model: vehicleYearMakeModel, br: <br className="sm-up-hide" /> },
    ),
    viewOrderStatus: intl.formatMessage({ id: 'receiptPage.viewOrderStatus' }),
    lot: intl.formatMessage({ id: 'receiptPage.lot' }),
    shippingFrom: intl.formatMessage({ id: 'receiptPage.shippingFrom' }),
    shippingTo: intl.formatMessage({ id: 'receiptPage.shippingTo' }),
    creditCard: intl.formatMessage({ id: 'receiptPage.creditCard' }),
    refNumber: intl.formatMessage({ id: 'receiptPage.refNumber' }),
    total: intl.formatMessage({ id: 'receiptPage.total' }),
  };

  const { vectorLabel = '' } = transactions && transactions[0];
  const total = transactions.map((item) => Number(item.amount)).reduce((acc, curr) => acc + curr, 0);

  return (
    <CongratulationsCard subtitle={translationSets.youSuccessfullyPaidForShipping}>
      <PickupInfo />
      <div className="m-0-a mt-20" style={{ maxWidth: '480px' }}>
        {transactions.map(({ memo, token }) => (
          <div key={token} className={classnames(classes.tableRow, 'bg-cream')}>
            <div style={{ minWidth: '85px' }} className="ta-l">
              {translationSets.lot}:
            </div>
            <div className="ws-i ta-r">
              <strong>{memo}</strong>
            </div>
          </div>
        ))}

        <div className={classnames(classes.tableRow, 'bg-cream')}>
          <div>
            <div className="grid-x ai-ct w-a no-wrap">
              <div className="svg-icon d-ib mr-10" style={{ minWidth: '14px', height: '20px' }}>
                <img src={MarkerBlueSvg} alt="" />
              </div>
              <span className="ws-n" style={{ lineHeight: '20px' }}>
                {translationSets.shippingFrom}:
              </span>
            </div>
          </div>
          <div className="ta-r fw-7" style={{ lineHeight: '20px' }}>
            Copart {saleLocationName}
          </div>
        </div>

        <div className={classnames(classes.tableRow, 'bg-cream')}>
          <div>
            <div className="grid-x ai-ct w-a no-wrap">
              <div className="svg-icon d-ib mr-10" style={{ minWidth: '14px', height: '20px' }}>
                <img src={MarkerGreenSvg} alt="" />
              </div>
              <span className="ws-n" style={{ lineHeight: '20px' }}>
                {translationSets.shippingTo}:
              </span>
            </div>
          </div>
          <div className="ta-r fw-7" style={{ lineHeight: '20px' }}>
            {destination}
          </div>
        </div>

        <div className="mt-10 pt-2">
          {vectorLabel && (
            <div className={classnames(classes.tableRow, 'bg-cloud')}>
              <div>{translationSets.creditCard}:</div>
              <div>
                <strong>{vectorLabel}</strong>
              </div>
            </div>
          )}
          {transactions.map(({ token }) => (
            <div key={token} className={classnames(classes.tableRow, 'bg-cloud')}>
              <div>{translationSets.refNumber}</div>
              <div>
                <strong>{token}</strong>
              </div>
            </div>
          ))}

          <div className={classnames(classes.tableRow, 'bg-mist', 'mt-2')}>
            <div>
              <strong style={{ textTransform: 'uppercase' }}>{translationSets.total}</strong>
            </div>
            <div>
              <strong>{NumberService.formatCurrency(total, 'USD', true)}</strong> USD
            </div>
          </div>
        </div>

        <Button
          href={RouterService.getRoute('lotsWon')}
          label={translationSets.viewOrderStatus}
          className="mt-30"
          size="lg"
        />
        <LinkHowShippingWorks />
      </div>
      <div className="pb-35 sm-pb-15" />
    </CongratulationsCard>
  );
}

export default ShippingReceipt;
