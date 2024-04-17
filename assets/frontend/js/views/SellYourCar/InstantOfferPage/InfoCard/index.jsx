import React from 'react';
import useBreakpoint from 'frontend/js/hooks/useBreakpoint';
import useIntl from 'frontend/js/hooks/useIntl';
import useStyles from './useStyles';

function InfoCard() {
  const classes = useStyles();
  const intl = useIntl();
  const { isBelowMd } = useBreakpoint();

  const translationSets = {
    card1: intl.formatMessage({ id: 'sellYourCarPage.infoCard.card1' }),
    card2: intl.formatMessage({ id: 'sellYourCarPage.infoCard.card2' }),
    card3: intl.formatMessage({ id: 'sellYourCarPage.infoCard.card3' }),
    card4: intl.formatMessage({ id: 'sellYourCarPage.infoCard.card4' }),
  };

  return (
    <div className={classes.root}>
      <div className={classes.cards}>
        <div className={classes.card}>
          {isBelowMd && <span className={classes.title}>{translationSets.card1}</span>}
        </div>
        <div className={classes.card}>
          {isBelowMd && <span className={classes.title}>{translationSets.card2}</span>}
        </div>
        <div className={classes.card}>
          {isBelowMd && <span className={classes.title}>{translationSets.card3}</span>}
        </div>
        <div className={classes.card}>
          {isBelowMd && <span className={classes.title}>{translationSets.card4}</span>}
        </div>
        {!isBelowMd && (
          <ul className={classes.titles}>
            <li>{translationSets.card1}</li>
            <li>{translationSets.card2}</li>
            <li>{translationSets.card3}</li>
            <li>{translationSets.card4}</li>
          </ul>
        )}
      </div>
    </div>
  );
}

export default InfoCard;
