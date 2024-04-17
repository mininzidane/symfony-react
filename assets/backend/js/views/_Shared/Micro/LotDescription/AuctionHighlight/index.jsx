/* eslint-disable react/prop-types */
import React from 'react';
import LotService from 'backend/js/api/LotService';
import HighlightIcons from './img/highlightIcons.png';
import useStyles from './useStyles';

const MAPPING = {
  [LotService.CONDITION_RUN_AND_DRIVE_CODE]: {
    title: 'RUN and DRIVE',
    icon: '-17px 0 0 -65px',
  },
  [LotService.CONDITION_ENGINE_START_PROGRAM_CODE]: {
    title: 'Engine Start Program',
    icon: '-17px 0 0 -116px',
  },
  [LotService.CONDITION_ENHANCED_VEHICLES_CODE]: {
    title: 'Enhanced Vehicle',
    icon: '-117px 0 0 -65px',
  },
};

function AuctionVerification({ lot }) {
  const classes = useStyles();
  const opts = MAPPING[lot.lotCondition];

  if (!opts) {
    return null;
  }

  return (
    <span className={classes.root}>
      <img src={HighlightIcons} alt="Highlight icon" title={opts.title} style={{ margin: opts.icon }} />
    </span>
  );
}

export default AuctionVerification;
