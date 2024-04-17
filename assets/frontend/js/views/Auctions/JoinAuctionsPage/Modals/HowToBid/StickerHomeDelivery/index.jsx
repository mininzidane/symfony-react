import React from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import CheckmarkImg from 'frontend/images/shared/various/checkmark.svg';
import Step3StickerImg from './img/sticker.png';
import AutoTransporterImg from './img/icon-auto-transporter.svg';
import useStyles from './useStyles';

function StickerHomeDelivery() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <img src={Step3StickerImg} alt="Background" />
      <div className={classes.content}>
        <img className={classes.icon} src={AutoTransporterImg} alt="AutoTransporter" />
        <div className={classes.title}>
          <FormattedMessage id="joinAuctions.howToBid.homeDelivery" />
        </div>
        <div className={classes.desc}>
          <img src={CheckmarkImg} alt="✔" className={classes.checkmark} />
          &nbsp;
          <FormattedMessage id="joinAuctions.howToBid.available" />
        </div>
      </div>
    </div>
  );
}

export default StickerHomeDelivery;
