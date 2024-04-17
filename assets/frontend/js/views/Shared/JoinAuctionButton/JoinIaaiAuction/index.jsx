import React, { useState } from 'react';
import PropTypes from 'prop-types';
import LotShape from 'frontend/js/lib/propshapes/LotShape';
import RouterService from 'frontend/js/api/RouterService';
import AuctionService from 'frontend/js/api/AuctionService';

function JoinIaaiAuction({ isAuthenticated, lot, onClick, component: Component, ...rest }) {
  const [isLoading, setIsLoading] = useState(false);

  const { lane, saleLocation } = lot;
  const saleLocationId = saleLocation && saleLocation.id;

  function handleClick(e) {
    onClick(e);

    if (!isAuthenticated) {
      return;
    }

    setIsLoading(true);

    const wi = window.open('', 'IAAI Auction', 'width=952,height=780,left=25,top=50,resizable=yes,scrollbars=no');

    AuctionService.getVsaToken()
      .then(({ vsaToken }) => {
        wi.location = RouterService.getRoute(
          'iaaiLSA',
          {
            full: 'list',
            branchId: saleLocationId,
            lane,
            token: vsaToken,
            baseUrl: RouterService.getFullRoute('home'),
            signInUrl: RouterService.getFullRoute('login'),
            registerUrl: RouterService.getFullRoute('register'),
            runlistUrlType: 'abm',
            supportPageUrl: RouterService.getFullRoute('contactUs'),
            theme: 'abm',
          },
          true,
        );
      })
      .catch(() => {
        wi.close();
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return <Component onClick={handleClick} isLoading={isLoading} {...rest} />;
}

JoinIaaiAuction.defaultProps = {
  onClick: () => {},
  isAuthenticated: false,
};

JoinIaaiAuction.propTypes = {
  lot: LotShape.isRequired,
  onClick: PropTypes.func,
  component: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

export default JoinIaaiAuction;
