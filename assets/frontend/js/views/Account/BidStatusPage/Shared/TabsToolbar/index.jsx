import React from 'react';
import PropTypes from 'prop-types';
import TabsToolbar from 'frontend/js/components/Tabs/TabsToolbar';
import useIntl from 'frontend/js/hooks/useIntl';
import Tab from 'frontend/js/components/Tabs/Tab';
import useCustomerHelper from 'frontend/js/hooks/useCustomerHelper';
import useStyles from './useStyles';

function BidStatusTabsToolbar({ counts }) {
  const classes = useStyles();
  const intl = useIntl();
  const { currentBidsCount, lostBidsCount, lotsWonCount, brokerShippingContainersCount, isB2BBroker } =
    useCustomerHelper();

  function getLabel(id, count) {
    const label = intl.formatMessage({ id });
    const hasCount = typeof count === 'number';
    const countBadge = ` (${count})`;

    return `${label}${hasCount ? countBadge : ''}`;
  }

  return (
    <TabsToolbar className={classes.root}>
      <Tab value="current-bids" label={getLabel('bidStatusPage.currentBids', counts.current || currentBidsCount)} />
      <Tab value="lots-won" label={getLabel('bidStatusPage.lotsWon', counts.won || lotsWonCount)} />
      <Tab value="lots-lost" label={getLabel('bidStatusPage.lotsLost', counts.lost || lostBidsCount)} />
      {isB2BBroker && (
        <Tab
          value="containers"
          label={getLabel('shared.label.containers', counts.containers || brokerShippingContainersCount)}
        />
      )}
    </TabsToolbar>
  );
}

BidStatusTabsToolbar.propTypes = {
  counts: PropTypes.shape({
    current: PropTypes.number,
    purchases: PropTypes.number,
    containers: PropTypes.number,
    shipping: PropTypes.number,
    won: PropTypes.number,
    lost: PropTypes.number,
  }),
};

BidStatusTabsToolbar.defaultProps = {
  counts: null,
};

export default BidStatusTabsToolbar;
