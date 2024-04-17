import React from 'react';
import PropTypes from 'prop-types';
import Container from 'frontend/js/components/Container';
import FormattedMessage from 'frontend/js/components/FormattedMessage';
import LeadForm from '../LeadForm';
import useStyles from './useStyles';

function HeroVer1({ onSubmit }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Container>
        <div className={classes.grid}>
          <div className={classes.description}>
            <h1 className={classes.title}>
              <FormattedMessage id="sellYourCarPage.hero.title" />
            </h1>
            <h2 className={classes.subtitle}>
              <FormattedMessage id="sellYourCarPage.hero.subtitle" />
            </h2>
            <ul className={classes.list}>
              <li>
                <FormattedMessage id="sellYourCarPage.hero.benefit1" />
              </li>
              <li>
                <FormattedMessage id="sellYourCarPage.hero.benefit2" />
              </li>
              <li>
                <FormattedMessage id="sellYourCarPage.hero.benefit3" />
              </li>
              <li>
                <FormattedMessage id="sellYourCarPage.hero.benefit4" />
              </li>
            </ul>
          </div>
          <LeadForm onSubmit={onSubmit} />
        </div>
      </Container>
    </div>
  );
}

HeroVer1.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default HeroVer1;
