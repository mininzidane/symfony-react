/* eslint-disable */
import React, { Suspense } from 'react';
import Container from 'frontend/js/components/Container';
import useStyles from './useStyles';
const LotsSuggestionCarousel = React.lazy(() => import('frontend/js/views/Shared/LotsSuggestionCarousel'));

function CarsInStock({ lots, title }) {
  const classes = useStyles();

  if (!lots?.length) {
    return null;
  }

  return (
    <div className={classes.root}>
      <Container className={classes.container}>
        <div className={classes.toolbar}>
          <div className={classes.label}>{title}</div>
          <div id="controls" className={classes.controls} />
        </div>

        <Suspense fallback={null}>
          {lots.length > 0 && <LotsSuggestionCarousel controlsElementId="controls" lots={lots} analytics={{}} />}
        </Suspense>
      </Container>
    </div>
  );
}

export default CarsInStock;
