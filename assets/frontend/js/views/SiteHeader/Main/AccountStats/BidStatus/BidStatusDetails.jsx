import React from 'react';
import PropTypes from 'prop-types';
import RouterService from 'frontend/js/api/RouterService';
import t from 'frontend/js/api/TranslatorService';

function BidStatusTooltip({ currentBidsCount, lotsWonCount }) {
  const { getRoute } = RouterService;

  return (
    <div>
      <div className="text-md fw-7">{t('header.bid_status')}</div>

      <div className="mt-5 d-f ai-ct jc-sb">
        <a href={getRoute('currentBids')} className="text-md ws-n">
          {t('header.bid_status.current_bids')}
        </a>
        <span className="text-md fw-7 pl-10">{currentBidsCount}</span>
      </div>

      <div className="mt-5 d-f ai-ct jc-sb">
        <a href={getRoute('lotsWon')} className="text-md ws-n">
          {t('header.bid_status.lots_won')}
        </a>
        <span className="text-md fw-7 pl-10">{lotsWonCount}</span>
      </div>
    </div>
  );
}

BidStatusTooltip.propTypes = {
  currentBidsCount: PropTypes.number.isRequired,
  lotsWonCount: PropTypes.number.isRequired,
};

export default BidStatusTooltip;
