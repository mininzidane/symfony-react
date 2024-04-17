/* eslint-disable react/prop-types */
import React from 'react';
import Image from 'frontend/js/components/Image';
import { FormattedMessage } from 'react-intl-phraseapp';
import { useAllPhotosModalContext } from 'frontend/js/context/AllPhotosModal';
import useStyles from './useStyles';

function PhotoCell({ lot }) {
  const classes = useStyles();
  const [{ setCurrentLot }] = useAllPhotosModalContext();

  return (
    <div className={classes.root}>
      <Image ratio={75} src={lot.largeImage} fallback lazy alt={lot.description} />

      <button type="button" className={classes.button} onClick={() => setCurrentLot(lot)}>
        <FormattedMessage id="shared.cta.view" />
      </button>
    </div>
  );
}

export default PhotoCell;
