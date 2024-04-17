import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Fade from 'frontend/js/components/Fade';
import RouterService from 'frontend/js/api/RouterService';
import t from 'frontend/js/api/TranslatorService';
import useCustomerHelper from 'frontend/js/hooks/useCustomerHelper';
import useStyles from './useStyles';

function MyBidsMenu({ isOpen }) {
  const { currentBidsCount, lotsWonCount } = useCustomerHelper();

  const menuRef = useRef();
  const classes = useStyles();

  function toggleChatWidgetButton() {
    document.body.classList[isOpen ? 'add' : 'remove']('is-header-menu-open');
  }

  useEffect(() => {
    toggleChatWidgetButton();
  }, [isOpen]);

  return (
    <>
      <Fade isOpen={isOpen}>
        <div className={classes.root} ref={menuRef}>
          <div className={classnames(classes.accountMenu, { 'is-open': isOpen })}>
            <a href={RouterService.getRoute('currentBids')} className={classes.link}>
              <span>{t('header.bid_status.current_bids')}</span> <strong>{currentBidsCount}</strong>
            </a>
            <a href={RouterService.getRoute('lotsWon')} className={classes.link}>
              <span>{t('header.bid_status.lots_won')}</span> <strong>{lotsWonCount}</strong>
            </a>
          </div>
        </div>
      </Fade>
    </>
  );
}

MyBidsMenu.propTypes = {
  isOpen: PropTypes.bool.isRequired,
};

export default MyBidsMenu;
