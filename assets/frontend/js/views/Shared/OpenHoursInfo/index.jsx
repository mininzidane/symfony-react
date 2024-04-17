/* eslint-disable react/prop-types */
import React from 'react';
import useIntl from 'frontend/js/hooks/useIntl';

function OpenHoursInfo({ data, ...props }) {
  const intl = useIntl();
  const { timezone, timezoneAbbr, hoursTo, hoursFrom, hasSundayHours, hasSaturdayHours } = data;

  const startDay = intl.formatMessage({ id: `shared.label.${hasSundayHours ? 'sunday' : 'monday'}` });
  const endDay = intl.formatMessage({ id: `shared.label.${hasSaturdayHours ? 'saturday' : 'friday'}` });

  return <div {...props}>{`${startDay}-${endDay}, ${hoursFrom}-${hoursTo} ${timezoneAbbr || timezone}`}</div>;
}

export default OpenHoursInfo;
