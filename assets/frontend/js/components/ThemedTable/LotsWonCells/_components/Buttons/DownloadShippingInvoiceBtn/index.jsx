import React from 'react';
import PropTypes from 'prop-types';
import FormattedMessage from 'frontend/js/components/FormattedMessage';
import ButtonOutlined from 'frontend/js/components/ButtonOutlined';
import RouterService from 'frontend/js/api/RouterService';

function DownloadShippingInvoiceBtn({ token, ...props }) {
  return (
    <ButtonOutlined
      label={<FormattedMessage id="shared.cta.downloadInvoice" />}
      href={RouterService.getRoute('shippingInvoice', null, false, { token })}
      size="sm"
      isNowrap
      isTargetBlank
      isThinBorder
      {...props}
    />
  );
}

DownloadShippingInvoiceBtn.propTypes = {
  token: PropTypes.string.isRequired,
};

export default DownloadShippingInvoiceBtn;
