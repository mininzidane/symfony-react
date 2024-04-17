import React from 'react';
import PropTypes from 'prop-types';
import NumberService from 'frontend/js/lib/utils/NumberService';
import { FormattedMessage } from 'react-intl-phraseapp';

function RouteSection({ from, to, price }) {
  return (
    <div className="d-f ai-ct">
      <span>{from}</span>
      <span className="ml-5 mr-5">
        <FormattedMessage id="shared.label.to" />
      </span>
      <span>{to}</span>

      <div className="pl-10 ml-a">{NumberService.formatCurrency(price)}</div>
    </div>
  );
}

RouteSection.propTypes = {
  from: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
};

export default RouteSection;
