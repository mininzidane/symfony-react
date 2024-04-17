/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import classnames from 'classnames';
import { FormattedMessage } from 'react-intl-phraseapp';
import GoogleAnalyticsService from 'frontend/js/api/GoogleAnalyticsService';
import EventTrackingService from 'frontend/js/api/EventTrackingService';
import { useWatchlistContext } from 'frontend/js/context/WatchlistContext';
import ButtonOutlined from 'frontend/js/components/ButtonOutlined';
import useWatchlist from 'frontend/js/hooks/useWatchlist';
import usePrevNextLot from 'frontend/js/views/LotViewPage/usePrevNextLot';
import RouterService from 'frontend/js/api/RouterService';
import BackToSearchButton from '../BackToSearchButton';
import ShippingControlOutlined from './ShippingControlOutlined';
import WatchlistControlOutlined from './WatchlistControlOutlined';
import useStyles from './useStyles';

function Navigation({ lot, isSelect, isAbmInventory, isNpaInventory }) {
  if (!lot) {
    return null;
  }

  const [{ addWatchlistEntries }] = useWatchlistContext();
  const { id: lotId, sold, inventoryAuction, shippingAvailable } = lot;
  const classes = useStyles();
  const googleAnalyticsService = new GoogleAnalyticsService();
  const { isActive, handleWatchlistClick, isTogglePossible } = useWatchlist(lot);
  const eventTrackingService = new EventTrackingService();
  const searchHash = RouterService.getQueryParam('searchHash');
  const page = RouterService.getQueryParam('page');
  const prevNextLots = usePrevNextLot(lot.id);
  const { prevLot, nextLot } = prevNextLots || {};
  const prevLotLink = RouterService.getRoute('lot', { searchHash, page }, false, {
    id: prevLot?.id,
    slug: prevLot?.slug,
  });
  const nextLotLink = RouterService.getRoute('lot', { searchHash, page }, false, {
    id: nextLot?.id,
    slug: nextLot?.slug,
  });
  const backToSearchLink = RouterService.getRoute('searchResults', {
    recent_search_hash: searchHash,
  });

  useEffect(() => {
    addWatchlistEntries([lot]);
  }, [lot]);

  return (
    <div className={classes.root}>
      {!sold && (
        <div className={classes.accountControls}>
          {shippingAvailable && (
            <ShippingControlOutlined
              isSelect={isSelect}
              isAbmInventory={isAbmInventory}
              isNpaInventory={isNpaInventory}
            />
          )}

          {isTogglePossible && (
            <WatchlistControlOutlined
              id={lotId}
              auction={inventoryAuction}
              isActive={isActive}
              onTriggerClick={handleWatchlistClick}
              isSelect={isSelect}
              isAbmInventory={isAbmInventory}
              isNpaInventory={isNpaInventory}
            />
          )}
        </div>
      )}

      {prevNextLots && (
        <ButtonOutlined
          href={prevLotLink}
          className={classnames(
            classes.link,
            'navigation-control-button',
            isSelect && 'is-select',
            isAbmInventory && 'is-abm-inventory',
            isNpaInventory && 'is-npa-inventory',
          )}
          onClick={() => {
            googleAnalyticsService.sendEvent('tool_bar', 'lot_page', 'prev_lot');
            eventTrackingService.sendEvent({ name: 'prev_lot_button_click', step: 'abm_lotpage' });
          }}
          color="black"
          isInline
          isRegularCase
          isThinBorder
          isDisabled={!prevLot?.id}
          label={
            <>
              <svg
                width="10"
                height="10"
                viewBox="0 0 10 10"
                className={classnames(classes.arrow, !prevLot?.id && 'is-disabled')}
              >
                <path d="M9.99997 4.37559H2.37462L5.87421 0.87568L4.99955 0L0 5L4.99955 10L5.87421 9.12526L2.37462 5.62535H9.99907V4.37559H9.99997Z" />
              </svg>

              <span className={classes.navLabel}>
                <FormattedMessage id="lotPage.navigation.prevLot" />
              </span>
            </>
          }
        />
      )}

      {backToSearchLink && (
        <BackToSearchButton
          href={backToSearchLink}
          isSelect={isSelect}
          isAbmInventory={isAbmInventory}
          isNpaInventory={isNpaInventory}
        />
      )}

      {prevNextLots && (
        <ButtonOutlined
          href={nextLotLink}
          className={classnames(
            classes.link,
            'navigation-control-button',
            isSelect && 'is-select',
            isAbmInventory && 'is-abm-inventory',
            isNpaInventory && 'is-npa-inventory',
          )}
          onClick={() => {
            googleAnalyticsService.sendEvent('tool_bar', 'lot_page', 'next_lot');
            eventTrackingService.sendEvent({ name: 'next_lot_button_click', step: 'abm_lotpage' });
          }}
          color="black"
          isInline
          isRegularCase
          isThinBorder
          isDisabled={!nextLot?.id}
          label={
            <>
              <span className={classes.navLabel}>
                <FormattedMessage id="lotPage.navigation.nextLot" />
              </span>

              <svg
                width="10"
                height="10"
                viewBox="0 0 10 10"
                className={classnames(classes.arrow, !nextLot?.id && 'is-disabled')}
              >
                <path d="M8.09618e-07 5.625L7.625 5.625L4.125 9.125L5 10L10 5L5 -7.54979e-07L4.125 0.874999L7.625 4.375L7.0034e-07 4.375L8.09618e-07 5.625Z" />
              </svg>
            </>
          }
        />
      )}
    </div>
  );
}

export default Navigation;
