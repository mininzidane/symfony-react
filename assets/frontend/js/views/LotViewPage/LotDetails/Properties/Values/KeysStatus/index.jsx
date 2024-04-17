/* eslint-disable react/prop-types */
import React from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import LotService from 'frontend/js/api/LotService';
import TooltipOnHover from 'frontend/js/components/TooltipOnHover';

function KeysStatus({ lot }) {
  const { keysStatus } = lot;

  let keysStatusMessage = keysStatus;
  if (keysStatus === LotService.KEY_STATUS_YES) {
    keysStatusMessage = <FormattedMessage id="lotPage.details.keysStatus.yes" />;
  }

  return (
    <>
      {keysStatusMessage}
      <TooltipOnHover
        maxWidth={320}
        badgeTop={-1}
        isFlipEnabled={false}
        content={<FormattedMessage id="lotPage.details.keyStatus.tooltip" />}
      />
    </>
  );
}

export default KeysStatus;
