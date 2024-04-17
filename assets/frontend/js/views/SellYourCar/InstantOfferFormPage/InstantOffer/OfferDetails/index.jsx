import React from 'react';
import PropTypes from 'prop-types';
import useOfferPageStatus, { OFFER_PAGE_STATUES } from './useOfferPageStatus';
import OfferCreated from './OfferCreated';
import OfferReview from './OfferReview';
import NewOffer from './NewOffer';
import OfferAccepted from './OfferAccepted';

function OfferDetails({ instantOffer, updateInstantOffer }) {
  const offerPageStatus = useOfferPageStatus(instantOffer);

  if (offerPageStatus === OFFER_PAGE_STATUES.OFFER_CREATED) {
    return <OfferCreated instantOffer={instantOffer} updateInstantOffer={updateInstantOffer} />;
  }

  if (offerPageStatus === OFFER_PAGE_STATUES.PENDING_REVIEW) {
    return <OfferReview instantOffer={instantOffer} />;
  }

  if (offerPageStatus === OFFER_PAGE_STATUES.SELLER_FEEDBACK) {
    return <NewOffer instantOffer={instantOffer} updateInstantOffer={updateInstantOffer} />;
  }

  return <OfferAccepted instantOffer={instantOffer} updateInstantOffer={updateInstantOffer} />;
}

OfferDetails.propTypes = {
  instantOffer: PropTypes.object.isRequired,
  updateInstantOffer: PropTypes.func.isRequired,
};

export default OfferDetails;
