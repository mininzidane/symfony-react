/* eslint-disable react/prop-types */
import React from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';

function Schedule({ scheduleA, scheduleA2C }) {
  if (scheduleA) {
    return <FormattedMessage id="shared.label.volumeBuyer" />;
  }

  if (scheduleA2C) {
    return <FormattedMessage id="shared.label.oneTimeBuyer" />;
  }

  return null;
}

export default Schedule;
