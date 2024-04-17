import React from 'react';
import Container from 'frontend/js/components/Container';
import useBreakpoint from 'frontend/js/hooks/useBreakpoint';
import Map from './Map';
import Content from './Content';
import useStyles from './useStyles';

function Shipping() {
  const classes = useStyles();
  const { isBelowMd } = useBreakpoint();

  return (
    <div className={classes.root}>
      <Container>
        {isBelowMd ? (
          <div>
            <Content />
            <Map />
          </div>
        ) : (
          <div className={classes.desctopGrid}>
            <Map />
            <Content />
          </div>
        )}
      </Container>
    </div>
  );
}

export default Shipping;
