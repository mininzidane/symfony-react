import React from 'react';
import Card from 'frontend/js/components/Card';
import LoadingRow from 'frontend/js/components/LoadingRow';
import PlaceholderSvg from 'frontend/images/shared/various/placeholder.svg';
import useStyles from './useStyles';

function LoadingCard() {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <div className={classes.body}>
        <div className={classes.imageWrap}>
          <img src={PlaceholderSvg} alt="Placeholder" />
        </div>

        <div className={classes.stats}>
          <div className={classes.header}>
            <LoadingRow className={classes.title} />
            <LoadingRow className={classes.watchlist} />
          </div>
          <LoadingRow className={classes.stat1} />
          <LoadingRow className={classes.stat2} />
          <LoadingRow className={classes.stat1} />
          <LoadingRow className={classes.stat2} />
        </div>
      </div>

      <div className={classes.actions}>
        <LoadingRow className={classes.button} />
      </div>
    </Card>
  );
}

export default LoadingCard;
