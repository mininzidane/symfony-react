import React from 'react';
import useStyles from './useStyles';
import Container from '../../../components/Container';
import Card from '../../../components/Card';
import PageTitle from './PageTitle';
import StepNumberLabel from './StepNumberLabel';

function DisputeResolutionPage() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Container>
        <PageTitle />
        <Card className={classes.card}>
          <div className={classes.cardInnerContainer}>
            <StepNumberLabel currentNumber="2A" totalNumber={11} />
          </div>
        </Card>
      </Container>
    </div>
  );
}

export default DisputeResolutionPage;
