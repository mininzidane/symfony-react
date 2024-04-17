import RouterService from 'frontend/js/api/RouterService';

const SCHEMA = {
  auction_type: { type: 'CHECKBOX' },
  body_style: { type: 'CHECKBOX' },
  color: { type: 'CHECKBOX' },
  cylinders: { type: 'CHECKBOX' },
  damage: { type: 'CHECKBOX' },
  distance: { type: 'MULTIVALUE' },
  UOrigin: { type: 'MULTIVALUE', section: 'distance' },
  doc_type: { type: 'CHECKBOX' },
  drive: { type: 'CHECKBOX' },
  engine_type: { type: 'CHECKBOX' },
  featured: { type: 'CHECKBOX' },
  fuel: { type: 'CHECKBOX' },
  location_id: { type: 'CHECKBOX' },
  location_state: { type: 'CHECKBOX' },
  make: { type: 'CHECKBOX' },
  model: { type: 'CHECKBOX' },
  newly_added: { type: 'CHECKBOX' },
  odometer_from: { type: 'MULTIVALUE', section: 'odometer' },
  odometer_to: { type: 'MULTIVALUE', section: 'odometer' },
  p_distance: { type: 'RADIO' },
  sale_date: { type: 'CHECKBOX' },
  sale_location_id: { type: 'CHECKBOX' },
  seller: { type: 'CHECKBOX' },
  transmission: { type: 'CHECKBOX' },
  vehicle_type: { type: 'CHECKBOX' },
  year_from: { type: 'MULTIVALUE', section: 'years' },
  year_to: { type: 'MULTIVALUE', section: 'years' },
  auction: { type: 'CHECKBOX' },
  auction_select: { type: 'SWITCH' },
  exclude_upcoming: { type: 'SWITCH' },
  watchlist_inventory: { type: 'SWITCH' },
  market: { type: 'CHECKBOX' },
};

function getInitialStateFromURL() {
  const state = [];
  const queryParams = RouterService.getCurrentQueryParams();

  Object.entries(queryParams).forEach(([key, value]) => {
    const config = SCHEMA[key];

    if (!config) {
      return;
    }

    const { type, section = key } = config;

    // eslint-disable-next-line default-case
    switch (type) {
      case 'CHECKBOX': {
        String(value)
          .split(',')
          .forEach((v) => {
            state.push({
              type,
              section,
              value: v,
            });
          });
        break;
      }
      case 'RADIO': {
        state.push({
          type,
          section,
          value,
        });
        break;
      }
      case 'SWITCH': {
        state.push({
          type,
          section,
          value,
        });
        break;
      }
      case 'MULTIVALUE': {
        const refinement = state.find((v) => v.section === section);

        if (refinement) {
          refinement.values[key] = value;
        } else {
          state.push({
            type,
            section,
            values: {
              [key]: value,
            },
          });
        }
        break;
      }
    }
  });

  return state;
}

export default getInitialStateFromURL;
