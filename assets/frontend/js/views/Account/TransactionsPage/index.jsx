import React from 'react';
import { useParams } from 'react-router-dom';
import RouterService from 'frontend/js/api/RouterService';
import TabsContainer from 'frontend/js/components/Tabs/TabsContainer';
import TabContent from 'frontend/js/components/Tabs/TabContent';
import Container from 'frontend/js/components/Container';
import CaptionPanelSection from './CaptionPanelSection';
import Purchases from './Purchases';
import Deposits from './Deposits';
import PendingRefunds from './PendingRefunds';
import ClosedTransactions from './ClosedTransactions';
import useStyles from './useStyles';

function TransactionsPage() {
  const classes = useStyles();
  const { tab } = useParams();

  function handleTabChange(value) {
    RouterService.customRedirect(RouterService.getRoute('transactions', null, false, { tab: value }));
  }

  return (
    <>
      <TabsContainer defaultTab={tab} onChange={handleTabChange}>
        <CaptionPanelSection />
        <Container className={classes.container}>
          <TabContent id="purchases">
            <Purchases />
          </TabContent>
          <TabContent id="deposits">
            <Deposits />
          </TabContent>
          <TabContent id="refunds">
            <PendingRefunds />
          </TabContent>
          <TabContent id="closed-transactions">
            <ClosedTransactions />
          </TabContent>
        </Container>
      </TabsContainer>
    </>
  );
}

export default TransactionsPage;
