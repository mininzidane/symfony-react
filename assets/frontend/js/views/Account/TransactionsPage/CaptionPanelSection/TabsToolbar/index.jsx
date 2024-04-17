import React from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import TabsToolbar from 'frontend/js/components/Tabs/TabsToolbar';
import Tab from 'frontend/js/components/Tabs/Tab';
import useStyles from './useStyles';

function TransactionsTabsToolbar() {
  const classes = useStyles();

  return (
    <TabsToolbar className={classes.root}>
      <Tab value="purchases" label={<FormattedMessage id="transactionsPage.purchases" />} />
      <Tab value="deposits" label={<FormattedMessage id="transactionsPage.deposits" />} />
      <Tab id="pending-refunds-tab" value="refunds" label={<FormattedMessage id="transactionsPage.refunds" />} />
      <Tab value="closed-transactions" label={<FormattedMessage id="transactionsPage.closed" />} />
    </TabsToolbar>
  );
}

export default TransactionsTabsToolbar;
