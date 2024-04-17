/* eslint-disable react/prop-types */
import React from 'react';
import useIntl from 'frontend/js/hooks/useIntl';
import LotShape from 'frontend/js/lib/propshapes/LotShape';
import DividedLine from 'frontend/js/components/DividedLine';
import useStyles from './useStyles';

function Headline({ lot }) {
  const { year, make, model } = lot;
  const classes = useStyles();
  const intl = useIntl();

  const translationSets = {
    lotId: intl.formatMessage({ id: 'shared.label.lotId' }),
    vin: intl.formatMessage({ id: 'shared.label.vin' }),
  };

  return (
    <div className={classes.root}>
      <div className={classes.headline}>
        <div className={classes.headlineWrap}>
          <h1 className={classes.headlineText}>{`${year} ${make} ${model}`}</h1>

          <DividedLine dividerClassName={classes.divider} className={classes.info}>
            <div className={classes.lotId}>
              <span>{translationSets.lotId}:</span> <strong className={classes.value}>{lot.id}</strong>
            </div>

            <div className={classes.lotId}>
              <span>{translationSets.vin}:</span> <strong className={classes.value}>{lot.vin}</strong>
            </div>
          </DividedLine>
        </div>
      </div>
    </div>
  );
}

Headline.propTypes = {
  lot: LotShape,
};

Headline.defaultProps = {
  lot: null,
};

export default Headline;
