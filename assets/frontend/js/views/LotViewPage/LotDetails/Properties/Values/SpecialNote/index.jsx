/* eslint-disable react/prop-types */
import React from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';

function SpecialNote({ lot }) {
  if (!lot.specialNote) {
    return (
      <span style={{ fontWeight: 700, color: '#BDBDBD' }}>
        <FormattedMessage id="lotPage.details.specialNote.missing" />
      </span>
    );
  }

  return <span className="fw-4">{lot.specialNote}</span>;
}

export default SpecialNote;
