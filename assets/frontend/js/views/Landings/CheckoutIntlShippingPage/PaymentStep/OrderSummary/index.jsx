/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import intl from 'frontend/js/providers/TranslationProvider/intl';
import RouterService from 'frontend/js/api/RouterService';
import FormattedMessage from 'frontend/js/components/FormattedMessage';
import Link from 'frontend/js/components/Link';
import get from 'lodash/get';
import PaymentService from 'frontend/js/api/PaymentService';
import Button from 'frontend/js/components/Button';
import NumberService from 'frontend/js/lib/utils/NumberService';
import Alert from 'frontend/js/components/Form/Alert';
import NortonBwSvg from 'frontend/images/shared/partners/norton-bw.svg';
import Card from '../../Card';
import useStyles from './useStyles';

function OrderSummary({ vin, shippingFrom, shippingTo, invoices, total, orderId }) {
  const classes = useStyles();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  async function handleSubmit() {
    setIsSubmitting(true);
    setError(null);
    try {
      const payload = {
        shippingOrder: orderId,
        payment: {
          method: PaymentService.METHOD.WIRE_TRANSFER,
        },
      };
      await PaymentService.wireTransferPayment(payload);
      RouterService.redirect('shippingTracking', null, false, { emailOrToken: orderId, vin });
    } catch {
      setError(intl.formatMessage({ id: 'form.error.general' }));
    }

    setIsSubmitting(false);
  }

  return (
    <Card title={<FormattedMessage id="checkoutPage.summary.title" />} className={classes.root} hasPadding={false}>
      <div className={classes.stats}>
        <div className={classes.stat}>
          <div>
            <FormattedMessage id="shared.label.vin" />:
          </div>
          <div>{vin}</div>
        </div>
        <div className={classes.stat}>
          <div>
            <FormattedMessage id="receiptPage.shippingFrom" />:
          </div>
          <div>{shippingFrom}</div>
        </div>
        <div className={classes.stat}>
          <div>
            <FormattedMessage id="receiptPage.shippingTo" />:
          </div>
          <div>{shippingTo}</div>
        </div>
        {invoices &&
          invoices.map((invoice) => {
            const entries = get(invoice, 'items', []).filter((item) => parseFloat(item.due) > 0);
            return entries.map((entry) => (
              <div className={classes.stat} key={`${entry.id}_${entry.productService.name}`}>
                <div>{entry.productService.name}</div>
                <div>{NumberService.formatCurrency(entry.due, 'USD', true)}</div>
              </div>
            ));
          })}
      </div>

      <div className={classes.action}>
        <div className={classes.total}>
          <div className={classes.totalTitle}>
            <FormattedMessage id="depositsPage.cta.total" /> <span>(USD)</span>
          </div>
          <div className={classes.price}>{NumberService.formatCurrency(total, 'USD', true)}</div>
        </div>

        {error && (
          <Alert isShown severity="error" className={classes.error}>
            {error}
          </Alert>
        )}

        <Button
          label={<FormattedMessage id="shared.cta.emailMeInvoice" />}
          isLoading={isSubmitting}
          onClick={handleSubmit}
          size="lg"
        />

        <div className={classes.desc}>
          <FormattedMessage
            id="shared.access.clickAgreement"
            values={{
              cta: intl.formatMessage({ id: 'shared.cta.emailMeInvoice' }),
              a: (chunks) => (
                <Link href={RouterService.getRoute('terms')} isTargetBlank isNoWrap>
                  {chunks}
                </Link>
              ),
              br: ' ',
            }}
          />
        </div>

        <div className={classes.norton}>
          <img src={NortonBwSvg} alt="Norton" width="110" />
        </div>
      </div>
    </Card>
  );
}

export default OrderSummary;
