import React from 'react';
import ContainerFullScreen from 'frontend/js/components/ContainerFullScreen';
import FormattedMessage from 'frontend/js/components/FormattedMessage';
import Title from '../Title';
import BidderForm from './Form';
import Summary from './Summary';
import useStyles from './useStyles';

function Bidder() {
  const classes = useStyles();

  return (
    <ContainerFullScreen>
      <Title text={<FormattedMessage id="brokerManagerPage.addNewBroker" />} />

      <div className={classes.root}>
        <BidderForm />
        <Summary />
      </div>
    </ContainerFullScreen>
  );
}

export default Bidder;
