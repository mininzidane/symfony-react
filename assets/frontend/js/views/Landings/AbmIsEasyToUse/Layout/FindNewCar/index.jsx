import React from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import PropTypes from 'prop-types';

import Container from 'frontend/js/components/Container';

import Ford from './Ford';
import Bmw from './Bmw';
import Toyota from './Toyota';
import Chevy from './Chevy';

import Nissan from './Nissan';
import FordMustang from './FordMustang';
import BmwSport from './BmwSport';
import Subaru from './Subaru';

import useStyles from './useStyles';

function FindNewCar({ isSport }) {
  const classes = useStyles();

  return (
    <section className={classes.root}>
      <Container>
        <div className={classes.content}>
          <h2 className={classes.title}>
            <FormattedMessage
              id={
                isSport
                  ? 'landings.abmIsEasyToUse.shared.findNewCar.sportTitle'
                  : 'landings.abmIsEasyToUse.shared.findNewCar.title'
              }
            />
          </h2>
          <div className={classes.items}>
            {!isSport && (
              <>
                <Bmw />
                <Toyota />
                <Ford />
                <Chevy />
              </>
            )}
            {isSport && (
              <>
                <Nissan />
                <FordMustang />
                <BmwSport />
                <Subaru />
              </>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}

FindNewCar.propTypes = {
  isSport: PropTypes.bool,
};

FindNewCar.defaultProps = {
  isSport: false,
};

export default FindNewCar;
