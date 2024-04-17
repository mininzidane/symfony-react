import { useMemo } from 'react';

function useFieldsConfig(config) {
  return useMemo(() => {
    const {
      address = {},
      apartment = {},
      city = {},
      state = {},
      stateCode = null,
      zip = {},
      country = {},
      ...options
    } = config || {};

    return {
      address: {
        name: 'address',
        label: '',
        placeholder: 'Address',
        ...address,
      },
      apartment: {
        name: 'apartment',
        label: '',
        placeholder: 'Apartment, unit, suite, or floor #',
        ...apartment,
      },
      city: { name: 'city', label: '', placeholder: 'City', ...city },
      state: { name: 'state', label: '', placeholder: 'State/Province', ...state },
      stateCode: stateCode ? { id: 'stateCode', ...stateCode } : null,
      zip: { name: 'zip', label: '', placeholder: 'Postal Code', ...zip },
      country: {
        name: 'country',
        label: '',
        placeholder: 'Country',
        ...country,
      },
      ...options,
    };
  }, [config]);
}

export default useFieldsConfig;
