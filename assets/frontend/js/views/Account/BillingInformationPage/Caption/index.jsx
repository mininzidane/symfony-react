import React from 'react';
import useIntl from 'frontend/js/hooks/useIntl';
import CaptionPanel from 'frontend/js/views/Shared/PageSections/CaptionPanel';
import BillingInformationSvg from 'frontend/images/shared/light-blue-set/ic_billing_information.svg';

function Caption() {
  const intl = useIntl();
  const captionLabel = intl.formatMessage({ id: 'billingInformationPage.billingInformation' });
  return <CaptionPanel icon={BillingInformationSvg} label={captionLabel} iconSize={{ width: 18, height: 14 }} />;
}

export default Caption;
