import useIntl from 'frontend/js/hooks/useIntl';

function useKeysOptions() {
  const intl = useIntl();
  const options = [
    { label: intl.formatMessage({ id: 'sellYourCarPage.keysOptions.yes' }), value: '1' },
    { label: intl.formatMessage({ id: 'sellYourCarPage.keysOptions.no' }), value: '0' },
  ];

  return { options };
}

export default useKeysOptions;
