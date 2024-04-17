import get from 'lodash/get';
import useBidDelta from 'frontend/js/hooks/useBidDelta';
import useLot from 'frontend/js/hooks/useLot';
import useRecommendedBid from 'frontend/js/hooks/useRecommendedBid';

function usePrice(refinements) {
  const { price, lotIdOrVin, auction } = refinements;

  const [lot, isLotLoading] = useLot(lotIdOrVin, auction);
  const [recommendedBid, isRecommendedBidLoading] = useRecommendedBid(lot && lot.id, auction);
  const isLoading = isLotLoading || isRecommendedBidLoading;

  if (!Number.isNaN(price)) {
    return price;
  }

  if (isLoading) {
    return NaN;
  }

  if (recommendedBid) {
    return recommendedBid;
  }

  const suggestedBid = get(lot, 'suggestedBid', 0);
  const startingBid = get(lot, 'startingBid', 0);
  const currentBid = get(lot, 'currentBid', 0);

  if (startingBid) {
    const bidDelta = useBidDelta(startingBid, auction);

    return Math.max(suggestedBid, startingBid + bidDelta.increment);
  }

  return suggestedBid || currentBid || NaN;
}

export default usePrice;
