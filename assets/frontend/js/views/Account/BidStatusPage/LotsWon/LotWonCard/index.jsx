import React from 'react';
import PropTypes from 'prop-types';
import { LotWonContextProvider } from 'frontend/js/context/LotWonContext';
import Picture from './Picture';
import Content from './Content';
import CtaPrimary from './CtaPrimary';
import CtaSecondary from './CtaSecondary';
import useStyles from './useStyles';

function LotsWonCard({ invoice }) {
  const { largeImage, description } = invoice.lot || {};
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.body}>
        <Picture src={largeImage} alt={description} />
        <Content invoice={invoice} />
      </div>

      <div className={classes.aside}>
        <div className={classes.asideContainer}>
          <LotWonContextProvider invoice={invoice}>
            <CtaPrimary />
            <CtaSecondary />
          </LotWonContextProvider>
        </div>
      </div>
    </div>
  );
}

LotsWonCard.propTypes = {
  invoice: PropTypes.object.isRequired,
};

export default LotsWonCard;
