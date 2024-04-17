/* eslint-disable */
import React from 'react';
import Button from 'frontend/js/components/Button';
import FormattedMessage from 'frontend/js/components/FormattedMessage';
import Container from 'frontend/js/components/Container';
import useBreakpoint from 'frontend/js/hooks/useBreakpoint';
import ScrollService from 'frontend/js/lib/utils/ScrollService';
import HeroImage from 'frontend/js/views/Landings/LoungePage/Hero/img/HeroImage';
import VShapeSvg from './img/v-shape.svg';
import useStyles from './useStyles';

function HeroSection({ iso2 }) {
  const classes = useStyles();
  const { isBelowSm } = useBreakpoint();

  function handleScroll() {
    ScrollService.scrollIntoViewById('lounge-lead-form', 15, 'smooth');

    setTimeout(() => document.getElementById('lounge-lead-name').focus(), 1000);
  }

  return (
    <div className={classes.root}>
      <Container className={classes.container}>
        <div className={classes.info}>
          <h1 className={classes.title}>
            <FormattedMessage id={`loungePage.hero.title.${iso2}`} />
          </h1>
          <p className={classes.subtitle}>
            <FormattedMessage id="loungePage.hero.subtitle" />
          </p>
          <Button
            className={classes.cta}
            label={<FormattedMessage id="loungePage.hero.cta" />}
            onClick={handleScroll}
            isInline
          />
        </div>

        <HeroImage isBelowSm={isBelowSm} iso2={iso2} />
      </Container>

      {!isBelowSm && <img className={classes.arc} src={VShapeSvg} alt="Lounge" />}
    </div>
  );
}

export default HeroSection;
