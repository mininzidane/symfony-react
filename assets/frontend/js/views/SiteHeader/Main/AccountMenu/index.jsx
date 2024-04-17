import React, { useRef, useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Fade from 'frontend/js/components/Fade';
import useBreakpoint from 'frontend/js/hooks/useBreakpoint';
import RouterService from 'frontend/js/api/RouterService';
import t from 'frontend/js/api/TranslatorService';
import Button from 'frontend/js/components/Button';
import useCustomerHelper from 'frontend/js/hooks/useCustomerHelper';
import linksData from './linksData';
import useStyles from './useStyles';

function AccountMenu({ isOpen, onClose, triggerRef }) {
  const {
    isB2BBroker,
    membershipType,
    membershipValidity,
    firstName,
    bidder,
    scheduleA,
    scheduleA2C,
    userDocUploadDisabled,
  } = useCustomerHelper();
  const { isBelowLg } = useBreakpoint();
  const getSpaceAvailableForMenu = () => window.innerHeight - 88; // bottom nav bar height + 2 x 5px paddings
  const { name: membershipName, upgradable: isUpgradable, liveBidding } = membershipType || {};
  const bidderId = bidder && !(scheduleA || scheduleA2C) && bidder.id;
  const [maxHeight, setMaxHeight] = useState(getSpaceAvailableForMenu());

  const menuRef = useRef();
  const classes = useStyles();
  const OVERLAY_ANIMATION_DURATION = 150;

  const { getRoute } = RouterService;
  const hiddenLinks = [];

  if (!membershipValidity) {
    hiddenLinks.push('renewalSettings');
  }

  if (userDocUploadDisabled) {
    hiddenLinks.push('documents');
  }

  if (!isB2BBroker) {
    hiddenLinks.push('brokerManager');
  }

  const closeOnClickOutside = useCallback(
    (event) => {
      if (!triggerRef) {
        return;
      }

      const { target } = event;
      const isTargetOutsideMenu = menuRef.current !== target && !menuRef.current.contains(target);
      const trigger = triggerRef.current;
      const isTriggerClicked = trigger && (trigger === target || trigger.contains(target));

      if (isTargetOutsideMenu && !isTriggerClicked) {
        onClose();
      }
    },
    [onClose],
  );

  const updateMaxHeight = useCallback(() => {
    setMaxHeight(getSpaceAvailableForMenu());
  }, [setMaxHeight]);

  function toggleChatWidgetButton() {
    document.body.classList[isOpen ? 'add' : 'remove']('is-header-menu-open');
  }

  useEffect(() => {
    if (isOpen) {
      updateMaxHeight();
    }
    toggleChatWidgetButton();
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      window.addEventListener('click', closeOnClickOutside);
      window.addEventListener('resize', updateMaxHeight);
    }
    return () => {
      window.removeEventListener('click', closeOnClickOutside);
      window.removeEventListener('resize', updateMaxHeight);
    };
  }, [isOpen, closeOnClickOutside, updateMaxHeight]);

  return (
    <>
      <Fade isOpen={isOpen}>
        <div className={classes.root} ref={menuRef} style={{ maxHeight }}>
          <div className={classnames(classes.accountMenu, { 'is-open': isOpen })}>
            <div className={classes.accountMenuInner}>
              {isBelowLg && (
                <div className={classes.accountMenuWrapper}>
                  <div className={classes.accountMenuGreetingCaption}>
                    {t('header.greeting')}, <strong>{firstName}</strong>
                  </div>
                  {bidderId && Boolean(liveBidding) && (
                    <div className={classes.accountMenuMemberId}>
                      {t('header.bidder')} #{bidderId}
                    </div>
                  )}
                </div>
              )}

              {isUpgradable && (
                <div className={classes.accountMenuMembership}>
                  <div className={classes.accountMenuMembershipTitle}>
                    {t('header.account_menu.current_membership')}:{' '}
                    <strong>{t(`header.account_menu.membership_${membershipName.toLowerCase()}`)}</strong>
                  </div>

                  <Button
                    label={t('header.account_menu.upgrade_membership')}
                    href={getRoute('membershipPlans')}
                    size="sm"
                    color="yellow"
                    className={classes.accountMenuMembershipButton}
                  />
                </div>
              )}

              <ul className={classnames(classes.accountMenuList, { 'is-upgradable': isUpgradable })}>
                {linksData
                  .filter((accountLink) => !hiddenLinks.includes(accountLink.route))
                  .map((link) => (
                    <li key={link.title}>
                      <a href={getRoute(link.route)} className={classes.accountMenuLink}>
                        <div className={classes.accountMenuLinkIcon}>
                          <img src={link.icon} alt={link.title} style={link.iconDimensions} />
                        </div>
                        <span className={classes.accountMenuLinkText}>{link.title}</span>
                      </a>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
      </Fade>

      {triggerRef && (
        <Fade isOpen={isOpen} timeout={OVERLAY_ANIMATION_DURATION}>
          <div
            className={classes.overlay}
            onClick={onClose}
            role="button"
            onKeyPress={onClose}
            tabIndex={-1}
            aria-label="close menu"
          />
        </Fade>
      )}
    </>
  );
}

AccountMenu.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func,
  triggerRef: PropTypes.object,
};

AccountMenu.defaultProps = {
  triggerRef: null,
  onClose: () => {},
};

export default AccountMenu;
