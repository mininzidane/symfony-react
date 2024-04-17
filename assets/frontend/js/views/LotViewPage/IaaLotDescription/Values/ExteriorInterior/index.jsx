/* eslint-disable react/prop-types */
import React from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';

function ExteriorInterior({ lot }) {
  const { color, interiorColor } = lot;

  return (
    <>
      {color}/{interiorColor ? <>{interiorColor}</> : <FormattedMessage id="shared.label.unknown" />}
    </>
  );
}

export default ExteriorInterior;
