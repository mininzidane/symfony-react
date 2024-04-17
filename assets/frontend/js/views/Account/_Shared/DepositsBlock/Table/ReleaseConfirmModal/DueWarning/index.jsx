/* eslint-disable react/prop-types */
import React from 'react';
import FormattedMessage from 'frontend/js/components/FormattedMessage';
import Amount from 'frontend/js/components/Amount';
import useStyles from './useStyles';

function DueWarning({ due }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.title}>
        <FormattedMessage
          id="depositsPage.transactions.deposits.confirmModal.dueNote.title"
          values={{ amount: <Amount value={due} hasCurrency /> }}
        />
      </div>
      <div className={classes.description}>
        <FormattedMessage id="depositsPage.transactions.deposits.confirmModal.dueNote.description" />
      </div>
    </div>
  );
}

DueWarning.propTypes = {};

export default DueWarning;
