import React from 'react';
import PropTypes from 'prop-types';
import useIntl from 'frontend/js/hooks/useIntl';
import classnames from 'classnames';
import NumberService from 'frontend/js/lib/utils/NumberService';
import useStyles from './useStyles';

function Transactions({ className, items }) {
  const classes = useStyles();
  const intl = useIntl();

  if (!items.length) {
    return null;
  }

  const translationSets = {
    creditCard: intl.formatMessage({ id: 'receiptPage.creditCard' }),
    refNumber: intl.formatMessage({ id: 'receiptPage.refNumber' }),
    total: intl.formatMessage({ id: 'receiptPage.total' }),
  };

  const total = items.map((item) => Number(item.amount)).reduce((acc, curr) => acc + curr, 0);

  return (
    <div className={className}>
      {items.map((transaction, index) => (
        <div key={transaction.token} className={classnames(classes.tableRow, 'is-transaction', { 'mt-2': index > 0 })}>
          <div>
            {transaction.vector === 'Credit Card' && (
              <>
                {translationSets.creditCard} {transaction.vectorLabel}
              </>
            )}
            <div>
              {translationSets.refNumber} {transaction.token}
            </div>
          </div>
          <div>{NumberService.formatCurrency(transaction.amount, 'USD', true)}</div>
        </div>
      ))}
      <div className="mt-2">
        <div className={classnames(classes.tableRow, 'is-total')}>
          <div style={{ textTransform: 'uppercase' }}>{translationSets.total} (USD)</div>
          <div>
            <strong>{NumberService.formatCurrency(total, 'USD', true)}</strong>
          </div>
        </div>
      </div>
    </div>
  );
}

Transactions.defaultProps = {
  items: [],
  className: '',
};

Transactions.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({})),
  className: PropTypes.string,
};

export default Transactions;
