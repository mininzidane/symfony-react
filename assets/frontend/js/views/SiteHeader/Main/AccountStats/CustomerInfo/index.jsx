import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import useBreakpoint from 'frontend/js/hooks/useBreakpoint';
import useCustomerHelper from 'frontend/js/hooks/useCustomerHelper';
import t from 'frontend/js/api/TranslatorService';
import Arrow from './Arrow';
import useStyles from '../useStyles';

function CustomerInfo({ onClick, isAccountMenuOpen, accountMenuTriggerRef }) {
  const classes = useStyles();
  const { isAboveLg } = useBreakpoint();
  const { firstName, lastName, bidder, membershipType, scheduleA, scheduleA2C } = useCustomerHelper();
  const { liveBidding } = membershipType || {};
  const bidderId = bidder && !(scheduleA || scheduleA2C) && bidder.id;

  return (
    <button
      type="button"
      className={classnames(classes.link, classes.accountMenuTrigger, {
        [classes.isAccountMenuOpen]: isAccountMenuOpen,
      })}
      onClick={onClick}
      onKeyPress={onClick}
      tabIndex="0"
      ref={accountMenuTriggerRef}
    >
      <div className={classes.userSymbol}>
        {firstName && firstName[0]}
        {lastName && lastName[0]}
      </div>

      {isAboveLg && (
        <div className={classes.linkText}>
          <div className={classes.caption}>
            {t('header.greeting')}, <span style={{ fontWeight: 700 }}>{firstName}</span>
          </div>

          {bidderId && liveBidding && (
            <div className={classes.value} style={{ opacity: 0.4, fontWeight: 400 }}>
              {t('header.bidder')} #{bidderId}
            </div>
          )}
        </div>
      )}

      <div className={classes.arrow}>
        <Arrow />
      </div>
    </button>
  );
}

CustomerInfo.defaultProps = {
  isAccountMenuOpen: false,
};

CustomerInfo.propTypes = {
  onClick: PropTypes.func.isRequired,
  isAccountMenuOpen: PropTypes.bool,
  accountMenuTriggerRef: PropTypes.object.isRequired,
};

export default CustomerInfo;
