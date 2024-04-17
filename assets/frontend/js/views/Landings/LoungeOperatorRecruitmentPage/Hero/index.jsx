import React from 'react';
import Container from 'frontend/js/components/Container';
import FormattedMessage from 'frontend/js/components/FormattedMessage';
import LeadForm from './LeadForm';
import useStyles from './useStyles';

function Hero() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Container>
        <div className={classes.grid}>
          <div className={classes.description}>
            <h1 className={classes.title}>
              <FormattedMessage id="landings.loungeOperatorRecruitmentPage.heroTitle" />
            </h1>
            <h2 className={classes.subtitle}>
              <FormattedMessage id="landings.loungeOperatorRecruitmentPage.heroSubtitle" />
            </h2>
          </div>
          <LeadForm />
        </div>
      </Container>
    </div>
  );
}

export default Hero;
