import InstantOfferService from 'frontend/js/api/InstantOfferService';

const OFFER_PAGE_STATUES = {
  OFFER_CREATED: 'offerCreated',
  PENDING_REVIEW: 'pendingReview',
  SELLER_FEEDBACK: 'sellerFeedback',
  OFFER_ACCEPTED: 'offerAccepted',
};

function useOfferPageStatus(instantOffer) {
  const { STATUSES } = InstantOfferService;
  const hasAcceptedPrice = Boolean(instantOffer?.acceptedPrice);

  if (!hasAcceptedPrice) {
    if (instantOffer.status === STATUSES.PENDING_REVIEW) {
      return OFFER_PAGE_STATUES.PENDING_REVIEW;
    }

    if (instantOffer.status === STATUSES.SELLER_FEEDBACK) {
      return OFFER_PAGE_STATUES.SELLER_FEEDBACK;
    }

    return OFFER_PAGE_STATUES.OFFER_CREATED;
  }

  return OFFER_PAGE_STATUES.OFFER_ACCEPTED;
}

export { OFFER_PAGE_STATUES };
export default useOfferPageStatus;
