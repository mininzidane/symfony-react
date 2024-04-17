import React from 'react';

import { FormattedMessage } from 'react-intl-phraseapp';
import Container from 'frontend/js/components/Container';

import Item from './Item';
import useStyles from './useStyles';

function ThreeEasySteps() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Container className={classes.container}>
        <div className={classes.title}>
          <FormattedMessage id="landings.financing.threeEasySteps.title" />
        </div>

        <div className={classes.items}>
          <Item type={0} />
          <Item type={1} />
          <Item type={2} />
        </div>
      </Container>
    </div>
  );
}

export default ThreeEasySteps;
