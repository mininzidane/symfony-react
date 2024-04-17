import React, { useState } from 'react';
import PropTypes from 'prop-types';
import LotShape from 'frontend/js/lib/propshapes/LotShape';
import RouterService from 'frontend/js/api/RouterService';
import AuctionService from 'frontend/js/api/AuctionService';

function JoinNPAAuction({ isAuthenticated, lot, onClick, component: Component, ...rest }) {
  const [isLoading, setIsLoading] = useState(false);

  const { lane } = lot;

  function handleClick(e) {
    onClick(e);

    if (!isAuthenticated) {
      return;
    }

    setIsLoading(true);

    const wi = window.open('', 'NPA Auction', 'width=952,height=780,left=25,top=50,resizable=yes,scrollbars=no');

    AuctionService.getVsaToken()
      .then(({ vsaToken }) => {
        wi.location = RouterService.getRoute(
          'npaLSA',
          {
            lanereferenceId: lane,
            token: vsaToken,
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

JoinNPAAuction.defaultProps = {
  onClick: () => {},
  isAuthenticated: false,
};

JoinNPAAuction.propTypes = {
  lot: LotShape.isRequired,
  onClick: PropTypes.func,
  component: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

export default JoinNPAAuction;
