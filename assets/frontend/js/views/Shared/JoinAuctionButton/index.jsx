import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import LotShape from 'frontend/js/lib/propshapes/LotShape';
import Button from 'frontend/js/components/Button';
import RouterService from 'frontend/js/api/RouterService';
import LotService from 'frontend/js/api/LotService';
import useCustomerHelper from 'frontend/js/hooks/useCustomerHelper';
import JoinIaaiAuction from './JoinIaaiAuction';
import JoinNPAAuction from './JoinNPAAuction';

function JoinAuctionButton({ lot, onClick, component: Component, ...rest }) {
  const { isAuthenticated } = useCustomerHelper();

  const { id, lane, saleLocation, inventoryAuction } = lot;
  const saleLocationId = saleLocation && saleLocation.id;

  const isIaaAuction = inventoryAuction === LotService.AUCTION_IAA;
  const isCopartDEAuction = inventoryAuction === LotService.AUCTION_COPART_DE;
  const isNPAAuction = inventoryAuction === LotService.AUCTION_NPA;

  const handleClick = useCallback(
    (e) => {
      if (!isAuthenticated) {
        e.preventDefault();
        window.dispatchEvent(new CustomEvent('openAuthModal'));
      }

      onClick(e);
    },
    [onClick],
  );

  if (isNPAAuction) {
    return (
      <JoinNPAAuction
        isAuthenticated={isAuthenticated}
        onClick={handleClick}
        lot={lot}
        component={Component}
        {...rest}
      />
    );
  }

  if (isIaaAuction) {
    return (
      <JoinIaaiAuction
        isAuthenticated={isAuthenticated}
        onClick={handleClick}
        lot={lot}
        component={Component}
        {...rest}
      />
    );
  }

  if (isCopartDEAuction) {
    return (
      <Component
        href={
          isAuthenticated ? RouterService.getRoute('joinAuctionsGermany', { id: saleLocationId, lane, lotId: id }) : ''
        }
        onClick={handleClick}
        {...rest}
      />
    );
  }

  return (
    <Component
      href={isAuthenticated ? RouterService.getRoute('joinAuctions', { id: saleLocationId, lane, lotId: id }) : ''}
      onClick={handleClick}
      {...rest}
    />
  );
}

JoinAuctionButton.defaultProps = {
  onClick: () => {},
  component: Button,
};

JoinAuctionButton.propTypes = {
  lot: LotShape.isRequired,
  onClick: PropTypes.func,
  component: PropTypes.func,
};

export default JoinAuctionButton;
