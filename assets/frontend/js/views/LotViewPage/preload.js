import { LotDetails, BidInformation } from './lazy';

function preload() {
  LotDetails.preload().catch(() => {});
  BidInformation.preload().catch(() => {});
}

export default preload;
