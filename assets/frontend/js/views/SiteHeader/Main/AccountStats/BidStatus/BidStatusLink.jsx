import React from 'react';
import PropTypes from 'prop-types';
import useBreakpoint from 'frontend/js/hooks/useBreakpoint';
import RouterService from 'frontend/js/api/RouterService';
import t from 'frontend/js/api/TranslatorService';
import HammerIcon from './HammerIcon';
import useStyles from '../useStyles';

function BidStatusLink({ currentBidsCount, lotsWonCount, onClick }) {
  const classes = useStyles();
  const { isAboveLg } = useBreakpoint();
  const { getRoute } = RouterService;

  const handleClick = () => {
    onClick();
  };

  return (
    <a
      href={getRoute('currentBids')}
      aria-label={t('header.my_bids')}
      className={classes.link}
      style={{ marginRight: '0' }}
      onClick={handleClick}
    >
      <div className={classes.icon}>
        <HammerIcon />
      </div>

      {isAboveLg && (
        <div className={classes.linkText}>
          <div className={classes.caption}>{t('header.my_bids')}</div>
          <div className={classes.bidStatusValueWrap}>
            <div className={classes.value}>{currentBidsCount}</div>
            <span className={classes.bidStatusSeparator} />
            <div className={classes.value}>{lotsWonCount}</div>
          </div>
        </div>
      )}
    </a>
  );
}

BidStatusLink.propTypes = {
  currentBidsCount: PropTypes.number.isRequired,
  lotsWonCount: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default BidStatusLink;
