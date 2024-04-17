/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import RouterService from 'frontend/js/api/RouterService';
import Button from 'frontend/js/components/Button';
import ConfirmationModal from 'frontend/js/views/Account/DocumentsAndIds/DocumentsPage/ConfirmationModal';
import useCustomerHelper from 'frontend/js/hooks/useCustomerHelper';

function DocumentToSign({ lotPurchase, ...props }) {
  const [confirmModalDocument, setConfirmModalDocument] = useState(false);
  const { userPadUploadDisabled } = useCustomerHelper();

  if (userPadUploadDisabled || !lotPurchase || lotPurchase.bosSigned) {
    return null;
  }

  return (
    <>
      {lotPurchase.currentEnvelopeAssigned ? (
        <Button
          label={<FormattedMessage id="shared.cta.signNow" />}
          href={RouterService.getRoute('documentsSign', null, null, { token: lotPurchase.token })}
          size="sm"
          isNowrap
          color="yellow"
          {...props}
        />
      ) : (
        <Button
          label={<FormattedMessage id="shared.cta.signNow" />}
          onClick={() => setConfirmModalDocument(lotPurchase)}
          size="sm"
          isNowrap
          color="yellow"
          {...props}
        />
      )}
      <ConfirmationModal document={confirmModalDocument} setDocument={setConfirmModalDocument} />
    </>
  );
}

export default DocumentToSign;
