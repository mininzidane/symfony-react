import React from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import PropTypes from 'prop-types';
import TabsContainer from 'frontend/js/components/Tabs/TabsContainer';
import TabsToolbar from 'frontend/js/components/Tabs/TabsToolbar';
import Tab from 'frontend/js/components/Tabs/Tab';
import TabContent from 'frontend/js/components/Tabs/TabContent';
import PaymentService from 'frontend/js/api/PaymentService';
import ClosedRefunds from './ClosedRefunds';
import Deposits from './Deposits';
import PendingRefunds from './PendingRefunds';
import useStyles from './useStyles';

function Transactions({ onCreditCardRelease }) {
  const classes = useStyles();

  function handleSuccessfulDepositRelease(refundType) {
    if (PaymentService.REFUNDABLE_METHODS.includes(refundType)) {
      onCreditCardRelease();
    }
  }

  return (
    <div>
      <TabsContainer defaultTab="deposits">
        <TabsToolbar className={classes.transactionTabs}>
          <Tab
            value="deposits"
            className={classes.tab}
            label={<FormattedMessage id="depositsPage.transactions.deposits.tab" />}
          />
          <Tab
            value="pendingRefunds"
            className={classes.tab}
            label={<FormattedMessage id="depositsPage.transactions.pendingRefunds.tab" />}
          />
          <Tab
            value="closedRefunds"
            className={classes.tab}
            label={<FormattedMessage id="depositsPage.transactions.closedRefunds.tab" />}
          />
        </TabsToolbar>

        <TabContent id="pendingRefunds">
          <PendingRefunds />
        </TabContent>

        <TabContent id="closedRefunds">
          <ClosedRefunds />
        </TabContent>

        <TabContent id="deposits">
          <Deposits onReleaseSuccess={handleSuccessfulDepositRelease} />
        </TabContent>
      </TabsContainer>
    </div>
  );
}

Transactions.propTypes = {
  onCreditCardRelease: PropTypes.func.isRequired,
};

export default Transactions;
