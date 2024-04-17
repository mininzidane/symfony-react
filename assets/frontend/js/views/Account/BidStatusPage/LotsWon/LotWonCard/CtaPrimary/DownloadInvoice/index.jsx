import React from 'react';
import PropTypes from 'prop-types';
import useIntl from 'frontend/js/hooks/useIntl';
import RouterService from 'frontend/js/api/RouterService';
import DateTimeService from 'frontend/js/lib/utils/DateTimeService';
import Button from 'frontend/js/components/Button';
import FormattedMessage from 'frontend/js/components/FormattedMessage';
import ContentPopover from 'frontend/js/components/ContentPopover';
import EventTrackingService from 'frontend/js/api/EventTrackingService';
import useCustomerHelper from 'frontend/js/hooks/useCustomerHelper';
import useStyles from './useStyles';

function DownloadInvoice({ token, isLotPurchase, dueDate, className }) {
  const eventTrackingService = new EventTrackingService();
  const classes = useStyles();
  const intl = useIntl();
  const { brokerDisplayOnlyLotPurchase } = useCustomerHelper();

  let query = null;
  if (isLotPurchase && brokerDisplayOnlyLotPurchase) {
    query = { displayLpOnly: true };
  }

  return (
    <ContentPopover
      trigger={<Button label={<FormattedMessage id="shared.cta.payNow" />} size="sm" className={className} />}
      popoverTitle={intl.formatMessage({ id: 'shared.cta.downloadInvoice' })}
      keepMounted={false}
    >
      <>
        <div className={classes.dropdownMessageText}>
          {isLotPurchase ? (
            <FormattedMessage
              id="lotsWonPage.lotPurchase.paymentForPurchaseIsDue"
              values={{
                dueDate: <span className={classes.textBlack}>{DateTimeService.formatFromISOString(dueDate)}</span>,
                span: (chunks) => <span className={classes.textBlack}>{chunks}</span>,
              }}
            />
          ) : (
            <FormattedMessage
              id="lotsWonPage.lotPurchase.paymentForShippingOrderIsDue"
              values={{
                dueDate: <span className={classes.textBlack}>{DateTimeService.formatFromISOString(dueDate)}</span>,
              }}
            />
          )}
        </div>
        <Button
          label={intl.formatMessage({ id: 'shared.cta.payNow' })}
          onClick={() =>
            eventTrackingService.sendEvent({ name: 'download_invoice_button_click', step: 'abm_shipping' })
          }
          size="sm"
          className={classes.dropdownCta}
          href={RouterService.getRoute(isLotPurchase ? 'invoiceView' : 'shippingInvoice', query, false, { token })}
          isTargetBlank
        />
      </>
    </ContentPopover>
  );
}

DownloadInvoice.propTypes = {
  className: PropTypes.string,
  isLotPurchase: PropTypes.bool,
  dueDate: PropTypes.string,
  token: PropTypes.string.isRequired,
};

DownloadInvoice.defaultProps = {
  className: '',
  isLotPurchase: false,
  dueDate: '',
};

export default DownloadInvoice;
