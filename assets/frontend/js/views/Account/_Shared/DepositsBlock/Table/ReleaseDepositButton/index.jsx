import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl-phraseapp';
import TransactionsService from 'frontend/js/api/TransactionsService';
import PaymentService from 'frontend/js/api/PaymentService';
import Button from 'frontend/js/components/Button';

function ReleaseDepositButton({ refundType, onClick, token, amount, bankFeed, creditCard, setButtonsLocked }) {
  const [isLoading, setLoading] = useState();
  const transactionsService = new TransactionsService();
  const isTokenType = PaymentService.REFUNDABLE_METHODS.includes(refundType);

  function getTransactionStatus() {
    setButtonsLocked(true);

    transactionsService
      .getTransactionStatus(token)
      .then((response) => {
        onClick(token, refundType, amount, bankFeed, creditCard, response.isRelease);
      })
      .catch(null)
      .finally(() => {
        setLoading(false);
        setButtonsLocked(false);
      });
  }

  function handleClick() {
    if (isTokenType) {
      setLoading(true);
      getTransactionStatus();
    } else {
      onClick(token, refundType, amount, bankFeed);
    }
  }

  return (
    <>
      {refundType && (
        <Button
          label={<FormattedMessage id="depositsPage.transactions.deposits.releaseDeposit" />}
          onClick={handleClick}
          isLoading={isLoading}
          className="sm-wide"
          color="blue"
          size="sm"
          isInline
        />
      )}
    </>
  );
}

ReleaseDepositButton.propTypes = {
  refundType: PropTypes.string,
  token: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  setButtonsLocked: PropTypes.func.isRequired,
  amount: PropTypes.string,
  creditCard: PropTypes.string,
  bankFeed: PropTypes.object,
};

ReleaseDepositButton.defaultProps = {
  refundType: '',
  amount: '',
  creditCard: '',
  bankFeed: null,
};

export default ReleaseDepositButton;
