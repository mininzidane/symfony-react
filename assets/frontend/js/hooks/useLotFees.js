import { useEffect, useState } from 'react';
import LotService from 'frontend/js/api/LotService';

function useLotFees(id, auction) {
  const [lotFees, setLotFees] = useState({});

  async function getLotFees() {
    const queryParams = {
      membershipType: 5,
      includeWireFee: true,
      displayUnauthenticated: true,
      auction,
    };

    try {
      const { fees } = await LotService.getLotFees(id, queryParams);
      setLotFees(fees);
    } catch (e) {
      /** Ignore */
    }
  }

  useEffect(() => {
    if (id) {
      getLotFees();
    }
  }, [id]);

  return lotFees;
}

export default useLotFees;
