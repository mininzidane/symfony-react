import React from 'react';
import { useQuery } from 'react-query';
import BestBrokerService from 'frontend/js/api/BestBrokerService';
import Container from 'frontend/js/components/Container';
import Header from './Header';
import Card from './Card';
import RegistrationForm from './RegistrationForm';
import BrokerInformation from './BrokerInformation';
import AboutCompany from './AboutCompany';
import SoldCars from './SoldCars';
import useStyles from './useStyles';

function BestBrokerPage() {
  const { data: { lots = [] } = {} } = useQuery(['best-broker/lots'], () => BestBrokerService.getLots());

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Header />
      <Container>
        <div className={classes.grid}>
          <div className={classes.main}>
            <Card title="Join Now To Start Bidding">
              <RegistrationForm />
            </Card>
            <Card title="About AutoBidMaster">
              <AboutCompany />
            </Card>
            <Card title="List of Sold cars through AutoBidMaster" hasPadding={false}>
              <SoldCars lots={lots} />
            </Card>
          </div>
          <Card title="Broker Information">
            <BrokerInformation />
          </Card>
        </div>
      </Container>
    </div>
  );
}

export default BestBrokerPage;
