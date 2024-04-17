import React from 'react';
import PropTypes from 'prop-types';
import useCustomerHelper from 'frontend/js/hooks/useCustomerHelper';
import FormattedMessage from 'frontend/js/components/FormattedMessage';
import ButtonOutlined from 'frontend/js/components/ButtonOutlined';
import RouterService from 'frontend/js/api/RouterService';
import DownloadButton from 'frontend/js/views/Shared/DownloadButton';

function DownloadInvoiceBtn({ token, isLotPurchase, isCompact, ...props }) {
  const { brokerDisplayOnlyLotPurchase } = useCustomerHelper();

  let lpQuery = null;
  if (isLotPurchase && brokerDisplayOnlyLotPurchase) {
    lpQuery = { displayLpOnly: true };
  }

  const invoiceUrl = RouterService.getRoute('invoiceView', lpQuery, false, { token });
  const Button = isCompact ? DownloadButton : ButtonOutlined;

  return (
    <Button
      label={<FormattedMessage id={isCompact ? 'shared.label.invoice' : 'shared.cta.downloadInvoice'} />}
      href={invoiceUrl}
      size="sm"
      isNowrap
      isTargetBlank
      isThinBorder
      {...props}
    />
  );
}

DownloadInvoiceBtn.propTypes = {
  token: PropTypes.string.isRequired,
  isLotPurchase: PropTypes.bool,
  isCompact: PropTypes.bool,
};

DownloadInvoiceBtn.defaultProps = {
  isLotPurchase: false,
  isCompact: false,
};

export default DownloadInvoiceBtn;
