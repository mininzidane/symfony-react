import useIntl from 'frontend/js/hooks/useIntl';
import InstantOfferService from 'frontend/js/api/InstantOfferService';

function useWheelsOptions() {
  const intl = useIntl();
  const { FLAT_TIRES_LIST } = InstantOfferService;
  const options = [
    {
      value: FLAT_TIRES_LIST.ALL_WHEELS_ARE_MOUNTED,
      label: intl.formatMessage({
        id: 'sellYourCarPage.wheelsOptions.allWheelsAreMountedAndTiresAreInflated',
      }),
    },
    {
      value: FLAT_TIRES_LIST.ONE_OR_MORE_TIRES_ARE_FLAT,
      label: intl.formatMessage({ id: 'sellYourCarPage.wheelsOptions.oneOrMoreTiresAreFlat' }),
    },
    {
      value: FLAT_TIRES_LIST.ONE_OR_MORE_WHEELS_ARE_REMOVED,
      label: intl.formatMessage({ id: 'sellYourCarPage.wheelsOptions.oneOrMoreWheelsAreRemoved' }),
    },
  ];
  return options;
}

export default useWheelsOptions;
