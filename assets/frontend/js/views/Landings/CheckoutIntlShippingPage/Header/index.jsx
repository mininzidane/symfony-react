import React from 'react';
import Container from 'frontend/js/components/Container';
import useBreakpoint from 'frontend/js/hooks/useBreakpoint';
import Logo from './Logo';
import CopartBroker from './CopartBroker';
import Support from './Support';
import LanguageSelect from './LanguageSelect';
import useStyles from './useStyles';

function Header() {
  const classes = useStyles();
  const { isAboveSm } = useBreakpoint();

  return (
    <div className={classes.root}>
      <Container>
        <div className={classes.grid}>
          <Logo />
          {isAboveSm && <CopartBroker />}
          <Support />
          <LanguageSelect />
        </div>
      </Container>
    </div>
  );
}

export default Header;
