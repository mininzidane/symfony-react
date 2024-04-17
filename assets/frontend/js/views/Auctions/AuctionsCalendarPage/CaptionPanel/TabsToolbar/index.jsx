/* eslint-disable react/prop-types */
import React from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import TabsToolbar from 'frontend/js/components/Tabs/TabsToolbar';
import Tab from 'frontend/js/components/Tabs/Tab';
import TabLabel from './TabLabel';
import useStyles from './useStyles';

function TransactionsTabsToolbar({ auctionGroups }) {
  const classes = useStyles();

  return (
    <TabsToolbar className={classes.root}>
      <Tab value="all" label={<TabLabel label={<FormattedMessage id="auctionsCalendar.label.allAuctions" />} />} />
      {auctionGroups.map(({ key, name, disabled }) => (
        <Tab key={key} value={key} disabled={disabled} label={<TabLabel label={name} />} />
      ))}
    </TabsToolbar>
  );
}

export default TransactionsTabsToolbar;
