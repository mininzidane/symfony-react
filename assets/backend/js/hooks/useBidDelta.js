import LotService from 'backend/js/api/LotService';

function getDefaultDeltaByAuction(inventoryAuction) {
  if (inventoryAuction === LotService.AUCTION_IAA) {
    return {
      increment: 25,
      decrement: 25,
    };
  }

  if (inventoryAuction === LotService.AUCTION_NPA) {
    return {
      increment: 100,
      decrement: 100,
    };
  }

  // Copart
  return {
    increment: 1,
    decrement: 1,
  };
}

function getIncrementMapByAuction(inventoryAuction) {
  if (inventoryAuction === LotService.AUCTION_IAA) {
    return [[9999999, 25]];
  }

  if (inventoryAuction === LotService.AUCTION_NPA) {
    return [[9999999, 100]];
  }

  // Copart
  return [
    [5, 1], // [threshold, delta]
    [40, 5],
    [100, 10],
    [1000, 25],
    [5000, 50],
    [25000, 100],
    [50000, 250],
    [100000, 500],
    [9999999, 1000],
  ];
}

function useBidDelta(amount, inventoryAuction) {
  const defaultDelta = getDefaultDeltaByAuction(inventoryAuction);
  const incrementMap = getIncrementMapByAuction(inventoryAuction);

  const updateIncrementDelta = () => {
    const result = defaultDelta;

    for (let index = 0; index < incrementMap.length; index++) {
      const [threshold, increment] = incrementMap[index];
      if (amount === threshold) {
        if (index + 1 < incrementMap.length) {
          [, result.increment] = incrementMap[index + 1];
        } else {
          result.increment = increment;
        }

        result.decrement = increment;
        break;
      }

      if (amount < threshold) {
        result.increment = increment;
        result.decrement = increment;
        break;
      }
    }

    return result;
  };

  return updateIncrementDelta(amount);
}

export default useBidDelta;
