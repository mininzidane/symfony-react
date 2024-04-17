import { useMemo } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import RouterService from 'frontend/js/api/RouterService';
import StringService from 'frontend/js/lib/utils/StringService';
import { useCustomerLocationContext } from 'frontend/js/context/CustomerLocationContext';

function useFixedCriteria(searchHash) {
  const { geoLocation } = useCustomerLocationContext();
  const location = useLocation();
  const params = useParams();

  return useMemo(() => {
    let fixedCriteria = {};

    if (params.quick_pick) {
      const { quick_pick, make, model, years } = params;

      fixedCriteria = {
        QuickPick: quick_pick,
        ...(make && { Make: make }),
        ...(model && { Model: model }),
        ...(years && {
          year_from: years,
          year_to: years,
        }),
      };
    } else if (params.sale_location) {
      const { sale_location, sale_date } = params;

      fixedCriteria = {
        SaleLocation: sale_location,
        ...(params.sale_date && { SaleDate: sale_date }),
      };
    } else if (params.location_state) {
      fixedCriteria = {
        location_state: params.location_state,
      };
    }

    const initialParams = { ...RouterService.getCurrentQueryParams() };
    Object.keys(initialParams)
      .filter((param) => StringService.isCapitalized(param) && param !== 'UOrigin')
      .forEach((param) => {
        fixedCriteria[param] = initialParams[param];
      });

    if (geoLocation) {
      fixedCriteria.pt = geoLocation;
    }

    return fixedCriteria;
  }, [searchHash, geoLocation, location.pathname]);
}

export default useFixedCriteria;
