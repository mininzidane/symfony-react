import useIntl from 'frontend/js/hooks/useIntl';

function useDamageOptions() {
  const intl = useIntl();
  const options = [
    { label: intl.formatMessage({ id: 'sellYourCarPage.keysOptions.yes' }), value: '1', hasDamagesDescription: true },
    { label: intl.formatMessage({ id: 'sellYourCarPage.keysOptions.no' }), value: '0' },
  ];
  return options;
}

export default useDamageOptions;
