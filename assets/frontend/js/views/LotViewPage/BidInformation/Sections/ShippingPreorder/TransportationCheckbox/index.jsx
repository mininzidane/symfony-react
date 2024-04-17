import React from 'react';
import PropTypes from 'prop-types';
import Tickbox from 'frontend/js/components/Form/Tickbox';
import TransportationLabel from './TransportationLabel';

function TransportationCheckbox({ onChange, preorderEnabled, requiresCustomQuote, quoteAmount, tooltip }) {
  return (
    <Tickbox onChange={onChange} value={preorderEnabled} id="transportation-tickbox" name="transportation" touched>
      <TransportationLabel requiresCustomQuote={requiresCustomQuote} quoteAmount={quoteAmount} tooltip={tooltip} />
    </Tickbox>
  );
}

TransportationCheckbox.propTypes = {
  onChange: PropTypes.func.isRequired,
  preorderEnabled: PropTypes.bool.isRequired,
  requiresCustomQuote: PropTypes.bool.isRequired,
  quoteAmount: PropTypes.number.isRequired,
  tooltip: PropTypes.node,
};

TransportationCheckbox.defaultProps = {
  tooltip: null,
};

export default TransportationCheckbox;
