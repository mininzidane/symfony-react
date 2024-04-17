import React from 'react';
import useIntl from 'frontend/js/hooks/useIntl';
import NotificationCard from '../../NotificationCard';

function ConfirmationNotification() {
  const intl = useIntl();

  const translationSets = {
    content: intl.formatMessage(
      {
        id: 'lotPage.bidInformation.errorNoBidding',
        defaultMessage: `
          Be advised, this vehicle <strong>DOES NOT</strong> come with a <strong>TITLE</strong>. This vehicle{" "}
          <strong>CAN NOT</strong> be registered in US and may not be exported out of the USA. If you intend to use this
          vehicle for parts inside the US or to export outside of the US, please contact us for instructions to bid on
          this item.
    `,
      },
      {
        strong: (chunks) => <strong>{chunks}</strong>,
      },
    ),
  };

  return <NotificationCard content={<div>{translationSets.content}</div>} />;
}

export default ConfirmationNotification;
