/* eslint-disable react/prop-types */
import React from 'react';
import GoogleAd from 'frontend/js/components/GoogleAd';
import Card from './Card';

function MobileView({ lots, lastVisitedLotId }) {
  const cards = [];
  let adIndex = 1;

  lots.forEach((lot, index) => {
    // Add ads block every 5 items
    if (adIndex > 5) {
      cards.push(
        <span key={`${index}-ads`}>
          <GoogleAd
            id={`div-gpt-ad-1657811664105-${index}`}
            className="mt-10 mb-10 width-xl-728 width-sm-300"
            adUnitPath="/93216436/Search-Page-728x90-300x50"
            targetsArray={['page_spot', ['bottom_1']]}
            pubTargetsArray={['page', ['main_page']]}
            placement="srp_results_list"
            withSlot
          />
        </span>,
      );
      adIndex = 1;
    }

    cards.push(<Card lot={lot} key={index} lastVisitedLotId={lastVisitedLotId} />);
    adIndex += 1;
  });

  return <div className="qa_car_list">{cards}</div>;
}

MobileView.propTypes = {};

export default MobileView;
