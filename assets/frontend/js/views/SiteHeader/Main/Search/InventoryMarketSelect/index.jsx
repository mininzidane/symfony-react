/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import classnames from 'classnames';
import Fade from 'frontend/js/components/Fade';
import LocalStorageService from 'frontend/js/lib/utils/LocalStorageService';
import BootstrapService from 'frontend/js/api/BootstrapService';
import useIntl from 'frontend/js/hooks/useIntl';
import AuctionService from 'frontend/js/api/AuctionService';
import useStyles from './useStyles';

function InventoryMarketSelect({
  market,
  setInventoryMarket,
  triggerRef,
  localStorageKey,
  isOpen,
  setIsOpen,
  isFocused,
}) {
  const classes = useStyles();
  const availableAuctions = BootstrapService.getAppValue('availableAuctions', []);
  const hasGermanMarket = availableAuctions.includes(AuctionService.AUCTIONS.COPART_DE);
  const intl = useIntl();

  const markets = [
    {
      key: null,
      label: intl.formatMessage({ id: 'header.inventorySelect.allAuctions' }),
      shortLabel: intl.formatMessage({ id: 'shared.label.all' }),
    },
    {
      key: 'us_can',
      label: intl.formatMessage({ id: 'header.inventorySelect.usaAndCanada' }),
      shortLabel: 'US',
    },
    {
      key: 'de',
      label: intl.formatMessage({ id: 'header.inventorySelect.germany' }),
      shortLabel: 'DE',
    },
  ];

  function updateInventoryType(nextInventoryMarket) {
    setIsOpen(false);
    setInventoryMarket(nextInventoryMarket);
    LocalStorageService.set(localStorageKey, nextInventoryMarket);
  }

  function handleClickAway(e) {
    if (e.target !== triggerRef.current) {
      setIsOpen(false);
    }
  }

  useEffect(() => {
    if (!market) {
      setInventoryMarket(markets[0]);
      LocalStorageService.set(localStorageKey, markets[0]);
    } else if (market.label !== markets[0]?.label) {
      const updatedMarket = markets.find((m) => m.key === market.key);
      if (updatedMarket) {
        setInventoryMarket(updatedMarket);
        LocalStorageService.set(localStorageKey, updatedMarket);
      }
    }
  }, []);

  if (!market || !hasGermanMarket) {
    return null;
  }

  return (
    <div className={classnames(classes.root, isFocused && 'is-focused')}>
      <button
        type="button"
        onMouseDown={() => setIsOpen(!isOpen)}
        className={classnames(classes.trigger, isOpen && 'is-active')}
        ref={triggerRef}
      >
        <span className={classes.label}>{market.shortLabel}</span>{' '}
        <div className={classnames(classes.triangle, isOpen && 'is-active')} />
      </button>

      <ClickAwayListener onClickAway={handleClickAway} mouseEvent="onMouseDown" touchEvent="onTouchStart">
        <div>
          <Fade isOpen={isOpen}>
            <div className={classes.popupWrap}>
              {markets.map((m) => (
                <button
                  type="button"
                  onClick={() => updateInventoryType(m)}
                  className={classes.typeSelectCta}
                  key={m.key}
                >
                  <span>{m.label}</span>
                </button>
              ))}
            </div>
          </Fade>
        </div>
      </ClickAwayListener>
    </div>
  );
}

export default InventoryMarketSelect;
