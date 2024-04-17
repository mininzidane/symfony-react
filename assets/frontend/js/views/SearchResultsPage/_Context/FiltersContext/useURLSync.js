import { useMemo, useEffect } from 'react';
import isEmpty from 'lodash/isEmpty';
import RouterService from 'frontend/js/api/RouterService';
import usePreviousNonNullish from 'frontend/js/hooks/usePreviousNonNullish';

const SCHEMA_ORDER = {
  auction: 0,
  p_distance: 1,
  year_from: 2,
  year_to: 3,
  make: 4,
  model: 5,
  doc_type: 6,
  location_state: 7,
  sale_location_id: 8,
  market: 9,
  location_id: 10,
  damage: 11,
  vehicle_type: 12,
  engine_type: 13,
  transmission: 14,
  body_style: 15,
  odometer_from: 16,
  odometer_to: 17,
  fuel: 18,
  drive: 19,
  sale_date: 20,
  auction_type: 21,
  cylinders: 22,
  newly_added: 23,
  seller: 24,
  color: 25,
};

function useURLSync(refinements) {
  const query = useMemo(() => {
    const data = {};

    refinements.forEach((refinement) => {
      const { type, section } = refinement;

      // eslint-disable-next-line default-case
      switch (type) {
        case 'CHECKBOX': {
          data[section] = [...(data[section] || []), refinement.value];
          break;
        }
        case 'RADIO': {
          data[section] = refinement.value;
          break;
        }
        case 'SWITCH': {
          if (refinement.value) {
            data[section] = refinement.value;
          } else {
            delete data[section];
          }
          break;
        }
        case 'MULTIVALUE': {
          Object.assign(data, refinement.values);
          break;
        }
      }
    });

    Object.keys(data).forEach((key) => {
      if (Array.isArray(data[key]) && data[key].length === 1) {
        // eslint-disable-next-line prefer-destructuring
        data[key] = data[key][0];
      }
    });

    return data;
  }, [refinements]);

  const prevQuery = usePreviousNonNullish(query);

  useEffect(() => {
    const state = { ...query };

    Object.keys(prevQuery).forEach((key) => {
      if (!(key in state)) {
        state[key] = undefined;
      }
    });

    if (!isEmpty(state)) {
      RouterService.addQueryParams(state, { pushToHistory: true, paramOrder: SCHEMA_ORDER });
    }
  }, [refinements]);
}

export default useURLSync;
