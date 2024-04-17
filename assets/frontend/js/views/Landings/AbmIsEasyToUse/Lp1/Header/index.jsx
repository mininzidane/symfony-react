import React from 'react';
import Container from 'frontend/js/components/Container';
import { FormattedMessage } from 'react-intl-phraseapp';
import Logo from './Logo';
import CopartBroker from './CopartBroker';
import useStyles from './useStyles';

function Header() {
  const classes = useStyles();

  return (
    <header className={classes.root}>
      <Container>
        <div className={classes.wrap}>
          <div className={classes.links}>
            <Logo />
            <CopartBroker />
          </div>
          <h1 className={classes.text}>
            <FormattedMessage id="landings.abmIsEasyToUse.disc100.pageTitle" />
          </h1>
        </div>
      </Container>
    </header>
  );
}

export default Header;
