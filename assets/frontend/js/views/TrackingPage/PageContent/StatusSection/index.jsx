/* eslint-disable react/prop-types */
import React from 'react';
import classnames from 'classnames';
import { FormattedMessage } from 'react-intl-phraseapp';
import useIntl from 'frontend/js/hooks/useIntl';
import useStyles from './useStyles';

function StatusSection({ shippingStatus, step }) {
  const classes = useStyles();
  const intl = useIntl();

  const translatedStatus = intl.formatMessage({
    id: `dynamic.shippingStatus.${shippingStatus}`,
    defaultMessage: shippingStatus,
  });

  return (
    <div className={classes.root}>
      <FormattedMessage id="trackingPage.trackingInformation.shippingStatus" />
      :&nbsp;
      <strong className={classnames(classes.status, step === 0 && 'is-inactive', step === 5 && 'is-done')}>
        {translatedStatus}
      </strong>
    </div>
  );
}

StatusSection.propTypes = {};

export default StatusSection;
