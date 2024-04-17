import React from 'react';
import { useQuery } from 'react-query';
import BootstrapApiService from 'frontend/js/api/BootstrapApiService';
import { FormattedMessage } from 'react-intl-phraseapp';
import TabsToolbar from 'frontend/js/components/Tabs/TabsToolbar';
import Tab from 'frontend/js/components/Tabs/Tab';
import useStyles from './useStyles';

function TransactionsTabsToolbar() {
  const classes = useStyles();

  const { data } = useQuery(['customer-bootstrap'], () => BootstrapApiService.getCustomerBootstrapByApi());

  const { pendingRefundsCount } = data || {};

  return (
    <TabsToolbar className={classes.root}>
      <Tab value="increaseBuyerPower" label={<FormattedMessage id="shared.cta.increaseBuyerPower" />} />
      <Tab
        id="pending-refunds-tab"
        value="pendingRefunds"
        label={
          <span className={classes.flex}>
            <FormattedMessage id="depositsPage.transactions.pendingRefunds.tab" />
            {pendingRefundsCount > 0 && <span className={classes.count}>{pendingRefundsCount || 0}</span>}
          </span>
        }
      />
      <Tab value="closed" label={<FormattedMessage id="depositsPage.transactions.closedRefunds.tab" />} />
    </TabsToolbar>
  );
}

export default TransactionsTabsToolbar;
