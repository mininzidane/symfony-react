import { useMemo } from 'react';
import useIntl from 'frontend/js/hooks/useIntl';

function useFieldsConfig(config) {
  const intl = useIntl();

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
        placeholder: intl.formatMessage({ id: 'shared.label.address' }),
        ...address,
      },
      apartment: {
        name: 'apartment',
        label: '',
        placeholder: intl.formatMessage({ id: 'shared.label.apartment' }),
        ...apartment,
      },
      city: { name: 'city', label: '', placeholder: intl.formatMessage({ id: 'shared.label.city' }), ...city },
      state: {
        name: 'state',
        label: '',
        placeholder: intl.formatMessage({ id: 'shared.label.stateProvince' }),
        ...state,
      },
      stateCode: stateCode ? { id: 'stateCode', ...stateCode } : null,
      zip: { name: 'zip', label: '', placeholder: intl.formatMessage({ id: 'shared.label.postalCode' }), ...zip },
      country: {
        name: 'country',
        label: '',
        placeholder: intl.formatMessage({ id: 'shared.label.country' }),
        ...country,
      },
      ...options,
    };
  }, [config]);
}

export default useFieldsConfig;
