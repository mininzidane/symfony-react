/* eslint-disable react/prop-types */
import React from 'react';
import Container from 'frontend/js/components/Container';
import Contacts from '../Contacts';
import useStyles from './useStyles';

function Subheader({ iso2 }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Container>
        <Contacts iso2={iso2} />
      </Container>
    </div>
  );
}

export default Subheader;
