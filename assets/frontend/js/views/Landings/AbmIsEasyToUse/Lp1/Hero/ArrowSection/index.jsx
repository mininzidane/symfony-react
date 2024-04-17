import React from 'react';
import { FormattedMessage } from 'react-intl-phraseapp';
import useBreakpoint from 'frontend/js/hooks/useBreakpoint';
import UserSvg from './img/user.svg';
import ArrowRightSvg from './img/arrow-right.svg';
import ArrowDownSvg from './img/arrow-down.svg';
import useStyles from './useStyles';

function ArrowSection() {
  const classes = useStyles();
  const { isBelowMd } = useBreakpoint();

  return (
    <div className={classes.root}>
      <img src={UserSvg} alt="User" />
      <div>
        <FormattedMessage id="landings.lp3.registerPromoLabel" />
      </div>

      {isBelowMd ? (
        <img src={ArrowDownSvg} className={classes.arrow} alt="User" />
      ) : (
        <img src={ArrowRightSvg} className={classes.arrow} alt="User" />
      )}
    </div>
  );
}

ArrowSection.propTypes = {};

export default ArrowSection;
