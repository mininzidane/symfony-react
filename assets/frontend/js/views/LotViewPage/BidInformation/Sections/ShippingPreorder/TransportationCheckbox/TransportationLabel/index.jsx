import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl-phraseapp';
import NumberService from 'frontend/js/lib/utils/NumberService';
import TooltipOnHover from 'frontend/js/components/TooltipOnHover';
import useStyles from './useStyles';

function TransportationLabel({ requiresCustomQuote, quoteAmount, tooltip }) {
  const classes = useStyles();
  return (
    <div className="bid-information__transportation-label">
      <FormattedMessage id="shared.label.orderAbmTransportation" />:{' '}
      <span className={classes.wrap}>
        {requiresCustomQuote ? (
          <strong>
            <FormattedMessage id="shared.label.customQuote" />
          </strong>
        ) : (
          <span className="ws-n">
            <strong>{NumberService.formatCurrency(quoteAmount)}</strong> USD
          </span>
        )}
      </span>
      {tooltip && (
        <TooltipOnHover
          className={classes.tooltip}
          content={tooltip}
          maxWidth={380}
          placement="bottom-end"
          isFlipEnabled={false}
        />
      )}
    </div>
  );
}

TransportationLabel.propTypes = {
  requiresCustomQuote: PropTypes.bool.isRequired,
  quoteAmount: PropTypes.number.isRequired,
  tooltip: PropTypes.node,
};

TransportationLabel.defaultProps = {
  tooltip: null,
};

export default TransportationLabel;
