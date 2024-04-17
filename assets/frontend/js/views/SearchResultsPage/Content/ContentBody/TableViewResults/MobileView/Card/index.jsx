/* eslint-disable react/prop-types */
import React from 'react';
import Container from 'frontend/js/components/Container';
import SchemaEventJsonLdBlock from '../../../SchemaEventJsonLdBlock';
import Body from './Body';
import Footer from './Footer';
import useStyles from './useStyles';

function Card({ lot, lastVisitedLotId }) {
  const classes = useStyles({ isHighlighted: lastVisitedLotId === lot.id });

  return (
    <Container className={classes.root} id={lot.id}>
      <Body lot={lot} />

      <Footer lot={lot} />

      <SchemaEventJsonLdBlock lot={lot} />
    </Container>
  );
}

export default Card;
