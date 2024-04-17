/* eslint-disable react/prop-types */
import React from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import TabsToolbar from 'frontend/js/components/Tabs/TabsToolbar';
import Tab from 'frontend/js/components/Tabs/Tab';
import TabLabel from './TabLabel';
import useStyles from './useStyles';

function TransactionsTabsToolbar({ watchlistCount, savedSearchesCount }) {
  const classes = useStyles();
  const showCounts = watchlistCount !== undefined && savedSearchesCount !== undefined;

  return (
    <TabsToolbar className={classes.root}>
      <Tab
        value="watchlist"
        label={
          <TabLabel
            label={<FormattedMessage id="shared.label.watchlist" />}
            showCount={showCounts}
            count={watchlistCount}
          />
        }
      />
      <Tab
        value="savedSearches"
        label={
          <TabLabel
            label={<FormattedMessage id="shared.label.savedSearches" />}
            showCount={showCounts}
            count={savedSearchesCount}
          />
        }
      />
    </TabsToolbar>
  );
}

export default TransactionsTabsToolbar;
