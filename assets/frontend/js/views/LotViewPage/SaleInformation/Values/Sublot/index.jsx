/* eslint-disable react/prop-types */
import React from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import isEmpty from 'lodash/isEmpty';
import TooltipOnHover from 'frontend/js/components/TooltipOnHover';

function Sublot({ lot }) {
  if (isEmpty(lot.subLotInfo)) {
    return null;
  }

  const { zip, city, name, state, address } = lot.subLotInfo;

  return (
    <>
      {name},
      <br />
      {address},
      <br />
      {city}, {state} {zip}
      <TooltipOnHover
        maxWidth={320}
        badgeTop={-1}
        isFlipEnabled={false}
        content={<FormattedMessage id="lotPage.saleInfo.sublot.desc" />}
      />
    </>
  );
}

export default Sublot;
