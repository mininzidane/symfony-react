import React from 'react';
import PropTypes from 'prop-types';
import FormattedMessage from 'frontend/js/components/FormattedMessage';
import TransactionsService from 'frontend/js/api/TransactionsService';
import TooltipOnHover from 'frontend/js/components/TooltipOnHover';

function TransactionType({ type }) {
  const { AUTHORIZATION_HOLD, HOLD_RELEASED, TRANSACTION_COMPLETED } = TransactionsService.TYPES;

  if (type === AUTHORIZATION_HOLD) {
    return (
      <span>
        <FormattedMessage id="depositsPage.transactions.types.authorizationHold" />
        <TooltipOnHover
          maxWidth={320}
          badgeTop={-2}
          isFlipEnabled={false}
          triggerClassName="pe-a"
          content={<FormattedMessage id="depositsPage.transactions.types.authorizationHold.tooltip" />}
        />
      </span>
    );
  }

  if (type === HOLD_RELEASED) {
    return (
      <span>
        <FormattedMessage id="depositsPage.transactions.types.holdReleased" />
        <TooltipOnHover
          maxWidth={320}
          badgeTop={-2}
          isFlipEnabled={false}
          triggerClassName="pe-a"
          content={<FormattedMessage id="depositsPage.transactions.types.holdReleased.tooltip" />}
        />
      </span>
    );
  }

  if (type === TRANSACTION_COMPLETED) {
    return (
      <span>
        <FormattedMessage id="depositsPage.transactions.types.transactionCompleted" />
        <TooltipOnHover
          maxWidth={320}
          badgeTop={-2}
          isFlipEnabled={false}
          triggerClassName="pe-a"
          content={<FormattedMessage id="depositsPage.transactions.types.transactionCompleted.tooltip" />}
        />
      </span>
    );
  }

  return type;
}

TransactionType.propTypes = {
  type: PropTypes.string,
};

TransactionType.defaultProps = {
  type: '',
};

export default TransactionType;
