import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { FormattedMessage } from 'react-intl-phraseapp';
import DepositsBlock from 'frontend/js/views/Account/_Shared/DepositsBlock';
import LoadingStateCard from '../LoadingStateCard';
import EmptyCard from '../EmptyCard';
import useStyles from '../useStyles';

function Deposits({ onReleaseSuccess }) {
  const classes = useStyles();

  return (
    <div className={classnames(classes.tableWrap, classes.depositsTable)}>
      <DepositsBlock
        onReleaseSuccess={onReleaseSuccess}
        loader={<LoadingStateCard minHeight={200} />}
        noResults={
          <EmptyCard
            title={<FormattedMessage id="depositsPage.transactions.deposits.empty.title" />}
            subtitle={<FormattedMessage id="depositsPage.transactions.deposits.empty.subtitle" />}
          />
        }
        className={classes.tableContainer}
      />
    </div>
  );
}

Deposits.propTypes = {
  onReleaseSuccess: PropTypes.func.isRequired,
};

export default Deposits;
