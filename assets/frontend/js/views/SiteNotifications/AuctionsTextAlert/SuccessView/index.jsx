import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl-phraseapp';
import Description from '../Description';
import useStyles from './useStyles';

function SuccessView({ ntfkPhoneNumber }) {
  const classes = useStyles();

  let phoneNumber = ntfkPhoneNumber;

  if (window.intlTelInputUtils && window.intlTelInputUtils.formatNumber) {
    phoneNumber = window.intlTelInputUtils.formatNumber(
      phoneNumber,
      null,
      window.intlTelInputUtils.numberFormat.INTERNATIONAL,
    );
  }

  return (
    <div className={classes.wrapper}>
      <div className={classes.title}>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M7 0C8.38447 0 9.73785 0.410543 10.889 1.17971C12.0401 1.94888 12.9373 3.04213 13.4672 4.32122C13.997 5.6003 14.1356 7.00777 13.8655 8.36563C13.5954 9.7235 12.9287 10.9708 11.9497 11.9497C10.9708 12.9287 9.7235 13.5954 8.36563 13.8655C7.00777 14.1356 5.6003 13.997 4.32122 13.4672C3.04213 12.9373 1.94888 12.0401 1.17971 10.889C0.410543 9.73785 0 8.38447 0 7C0 5.14349 0.737498 3.36301 2.05025 2.05025C3.36301 0.737498 5.14349 0 7 0V0ZM10.138 3.535L5.358 8.476L4.058 6.994C3.9414 6.87878 3.7868 6.81 3.62314 6.80055C3.45949 6.79109 3.298 6.8416 3.1689 6.94263C3.0398 7.04365 2.95194 7.18826 2.92177 7.34939C2.89161 7.51052 2.92119 7.67711 3.005 7.818L4.544 10.453C4.61735 10.5693 4.71896 10.6651 4.83936 10.7315C4.95975 10.7979 5.09501 10.8328 5.2325 10.8328C5.37 10.8328 5.50525 10.7979 5.62565 10.7315C5.74604 10.6651 5.84765 10.5693 5.921 10.453C6.164 10.124 10.782 4.277 10.782 4.277C11.353 3.617 10.624 3.041 10.138 3.535Z"
            fill="#226900"
          />
        </svg>

        <span>
          <FormattedMessage id="auctionsTextAlert.success.title" />
        </span>
      </div>

      <div className={classes.msg}>
        <FormattedMessage
          id="auctionsTextAlert.success.msg"
          values={{
            phoneNumber,
            strong: (chunks) => <strong>{chunks}</strong>,
          }}
        />
      </div>

      <Description />
    </div>
  );
}

SuccessView.propTypes = {
  ntfkPhoneNumber: PropTypes.string.isRequired,
};

export default SuccessView;
