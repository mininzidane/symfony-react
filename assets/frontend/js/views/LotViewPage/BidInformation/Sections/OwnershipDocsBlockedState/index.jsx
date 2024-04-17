import React from 'react';
import useIntl from 'frontend/js/hooks/useIntl';
import NotificationCard from '../../NotificationCard';

function OwnershipDocsBlockedState() {
  const intl = useIntl();

  const translationSets = {
    content: intl.formatMessage(
      {
        id: 'lotPage.bidInformation.errorNoTitle',
        defaultMessage: `
            Be advised, this vehicle <strong>DOES NOT</strong> come with a <strong>TITLE</strong>. This vehicle{" "}
            <strong>CAN NOT</strong> be registered in US. If you intend to use this vehicle for parts inside the US or
            to export outside of the US, please contact us for instructions to bid on this item. This item can be
            exported, however, additional documentation needs to be processed, the cost is $400. Please let us know if
            you would like us to file for the additional documentation for you, the approximate wait time is 2-6 weeks.
      `,
      },
      {
        strong: (chunks) => <strong>{chunks}</strong>,
      },
    ),
  };

  return (
    <>
      <NotificationCard content={<div>{translationSets.content}</div>} />
    </>
  );
}

export default OwnershipDocsBlockedState;
