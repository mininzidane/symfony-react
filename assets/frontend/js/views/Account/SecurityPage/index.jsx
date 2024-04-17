import React from 'react';
import Container from 'frontend/js/components/Container';

import useStyles from './useStyles';
import Title from './Title';
import Form from './Form';
import Annotation from './Annotation';

function SecurityPage() {
  const classes = useStyles();

  return (
    <>
      <Title />

      <Container className={classes.content}>
        <div className={classes.form}>
          <Form />
        </div>
        <div className={classes.annotation}>
          <Annotation />
        </div>
      </Container>
    </>
  );
}

export default SecurityPage;
