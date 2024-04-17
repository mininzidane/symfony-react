/* eslint-disable react/prop-types */
import React from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import TooltipOnHover from 'frontend/js/components/TooltipOnHover';

function PrimaryDamage({ lot }) {
  return (
    <>
      {lot.primaryDamage}

      <TooltipOnHover
        maxWidth={420}
        badgeTop={-1}
        boundariesElement="viewport"
        content={
          <FormattedMessage
            id="shared.label.primaryDamage.tooltip"
            values={{
              title: (chunks) => <div className="fw-7 mb-15">{chunks}</div>,
              br: <br />,
            }}
          />
        }
      />
    </>
  );
}

export default PrimaryDamage;
